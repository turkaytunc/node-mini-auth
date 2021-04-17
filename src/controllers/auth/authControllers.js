import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../db/User.js';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.findOne({ email });
    const compareResult = await bcrypt.compare(password, newUser.password);

    console.log(newUser);
    console.log(compareResult);

    const token = await jwt.sign({ user: { email } }, secret);

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
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

    const token = await jwt.sign({ user: { email } }, secret);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
