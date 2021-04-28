import express from 'express';
import { dashboardControllers } from '../../controllers';
import { validateUser } from '../../middlewares';

const router = express.Router();

router.get('/', validateUser, dashboardControllers.dashboardController);

export default router;
