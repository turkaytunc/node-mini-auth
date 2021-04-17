import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../db/User.js';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode.js';

dotenv.config();
const TEN_MIN = 1000 * 60 * 10;
const secret = process.env.JWT_SECRET;

async function createUser(password, username, email) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const userSchema = new User({
    username,
    password: hashedPassword,
    email,
  });

  const newUser = await userSchema.save();
  return newUser;
}

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      const err = new ErrorWithStatusCode('User not exist', 404);
      return next(err);
    }

    const compareResult = await bcrypt.compare(password, foundUser.password);
    if (compareResult) {
      const token = await jwt.sign({ user: { email } }, secret, { expiresIn: `${TEN_MIN}ms` });
      res.cookie('auth', token, { maxAge: TEN_MIN, httpOnly: true });
      return res.status(200).json(token);
    }

    const err = new ErrorWithStatusCode('Wrong email or password', 401);
    return next(err);
  } catch (error) {
    return next(error);
  }
};

export const registerController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const newUser = await createUser(password, username, email);
    if (newUser) {
      const token = await jwt.sign({ user: { email } }, secret);
      res.cookie('auth', token, { maxAge: TEN_MIN, httpOnly: true });
      return res.json({
        username: newUser.username,
        email: newUser.email,
        token,
      });
    }

    const err = new ErrorWithStatusCode('Cannot create user', 500);
    return next(err);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
