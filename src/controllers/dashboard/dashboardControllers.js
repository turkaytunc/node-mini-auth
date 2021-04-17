import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode.js';
import User from '../../db/User.js';

export const dashboardController = async (req, res, next) => {
  try {
    if (req.user) {
      console.log(req.user);

      const user = await User.findOne({ email: req.user.email });
      return res.json(user);
    }

    const err = new ErrorWithStatusCode('Cannot create user', 500);
    return next(err);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
