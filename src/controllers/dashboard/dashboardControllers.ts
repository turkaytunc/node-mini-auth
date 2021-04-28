import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import User from '../../db/User';

export const dashboardController = async (req: any, res: any, next: any) => {
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
