import { Router } from 'express';
import { body } from 'express-validator';
import {
  subscribe,
  getSubscribers,
  deleteSubscriber,
  exportSubscribers,
} from '../controllers/subscriberController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.post(
  '/',
  [body('email').isEmail().withMessage('Valid email required'), validate],
  subscribe
);

router.get('/', protect, getSubscribers);
router.get('/export/csv', protect, exportSubscribers);
router.delete('/:id', protect, deleteSubscriber);

export default router;
