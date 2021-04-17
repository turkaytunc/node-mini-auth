import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode.js';
import User from '../../db/User.js';

export const dashboardController = async (req, res, next) => {
  try {
    if (req.user) {
      console.log(req.user);

      const user = await User.findOne({ email: req.user.email });
      return res.json({ username: user.username, email: user.email });
    }

    const err = new ErrorWithStatusCode('User not found', 404);
    return next(err);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
