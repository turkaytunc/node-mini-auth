import dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../db/User.js';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const userSchema = new User({
      userName: Math.random().toString(),
      password: hashedPassword,
      email,
    });

    const newUser = await userSchema.save();

    console.log(newUser);

    const token = await sign({ user: { email } }, secret);

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
};

export const registerController = (req, res) => {
  return res.json({ message: 'auth/register' });
};
