import express from 'express';
import { dashboardControllers } from '../../controllers/index.js';
import { validateUser } from '../../middlewares/index.js';

const router = express.Router();

router.get('/', validateUser, dashboardControllers.dashboardController);

export default router;
