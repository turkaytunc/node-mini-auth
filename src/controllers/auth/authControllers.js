import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../db/User.js';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      return res.status(404).json({ message: 'User not exist' });
    }

    const compareResult = await bcrypt.compare(password, foundUser.password);
    if (compareResult) {
      const token = await jwt.sign({ user: { email } }, secret);
      return res.status(200).json(token);
    }

    return res.status(401).json({ message: 'Wrong email or password' });
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const userSchema = new User({
      username,
      password: hashedPassword,
      email,
    });

    await userSchema.save();

    const token = await jwt.sign({ user: { email } }, secret);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
