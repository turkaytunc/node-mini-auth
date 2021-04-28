import express from 'express';
import { authControllers } from '../../controllers';

const {
  registerController,
  loginController,
  logoutController,
} = authControllers;

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);

export default router;
