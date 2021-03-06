import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../db/User';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';

dotenv.config();
const TEN_MIN = 1000 * 60 * 10;
const secret = process.env.JWT_SECRET!;

async function createUser(password: string, username: string, email: string) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ErrorWithStatusCode('Email is already in use!!', 400);
  }

  const userSchema = new User({
    username,
    password: hashedPassword,
    email,
  });

  const newUser = await userSchema.save();
  return newUser;
}

export const loginController = async (
  req: { body: { email: any; password: any } },
  res: any,
  next: (arg0: any) => any,
) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      throw new ErrorWithStatusCode('User not exist', 404);
    }

    const compareResult = await bcrypt.compare(password, foundUser.password);
    if (compareResult) {
      const token = await jwt.sign({ user: { email } }, secret, {
        expiresIn: `${TEN_MIN}ms`,
      });
      res.cookie('auth', token, {
        maxAge: TEN_MIN,
        httpOnly: true,
        secure: true,
        samesite: 'lax',
      });
      return res.status(200).json({ message: 'login successful' });
    }

    throw new ErrorWithStatusCode('Wrong email or password', 401);
  } catch (error) {
    return next(error);
  }
};

export const registerController = async (req: any, res: any, next: any) => {
  try {
    const { email, password, username } = req.body;

    const newUser = await createUser(password, username, email);
    if (newUser) {
      const token = jwt.sign({ user: { email } }, secret);
      res.cookie('auth', token, {
        maxAge: TEN_MIN,
        httpOnly: true,
        secure: true,
        samesite: 'Lax',
      });
      return res.json({
        username: newUser.username,
        email: newUser.email,
      });
    }

    throw new ErrorWithStatusCode('Cannot create user', 500);
  } catch (error) {
    return next(error);
  }
};
export const logoutController = async (req: any, res: any, next: any) => {
  try {
    const { auth } = req.cookies;

    if (auth) {
      res.cookie('auth', ' ', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        samesite: 'Lax',
      });
      return res.json({ message: 'logout successful' });
    }
    throw new ErrorWithStatusCode('Oops something went wrong', 500);
  } catch (error) {
    return next(error);
  }
};
