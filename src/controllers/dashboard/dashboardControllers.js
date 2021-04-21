import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode.js';
import User from '../../db/User.js';

export const dashboardController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req?.user?.email });
    if (user) {
      return res.json({ username: user.username, email: user.email });
    }
    throw new ErrorWithStatusCode('User not found', 404);
  } catch (error) {
    return next(error);
  }
};
