import { Router } from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import {
  registerVisitor,
  getVisitors,
  updateVisitor,
} from '../controllers/namedVisitorController.js';

const router = Router();

router.post(
  '/',
  [
    body('visitorId').trim().notEmpty().withMessage('visitorId is required'),
    body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('name must be 1-100 characters'),
  ],
  validate,
  registerVisitor
);

router.get('/', protect, getVisitors);
router.patch('/:id', protect, updateVisitor);

export default router;
