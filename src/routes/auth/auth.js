import express from 'express';
import { authControllers } from '../../controllers/index.js';

const { registerController, loginController } = authControllers;

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

export default router;
