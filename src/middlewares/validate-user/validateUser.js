import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../db/User.js';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const validateUser = async (req, res, next) => {
  const { auth } = req.cookie;

  const token = await jwt.verify(auth, secret);

  console.log(token);
  await User.findOne({});

  return next();
};
