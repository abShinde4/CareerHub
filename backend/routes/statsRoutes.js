import { Router } from 'express';
import { getPublicStats } from '../controllers/dashboardController.js';

const router = Router();

router.get('/', getPublicStats);

export default router;
