import { Router } from 'express';
import { body } from 'express-validator';
import { loginAdmin, getProfile } from '../controllers/adminController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
    validate,
  ],
  loginAdmin
);

router.get('/profile', protect, getProfile);
router.get('/dashboard', protect, getDashboardStats);

export default router;
