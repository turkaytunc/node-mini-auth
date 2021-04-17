import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const validateUser = async (req, res, next) => {
  try {
    const { auth } = req.cookies;

    const token = await jwt.verify(auth, secret);

    req.user = token.user;

    return next();
  } catch (error) {
    return next(error);
  }
};
