import { Router } from 'express';
import { body } from 'express-validator';
import {
  getActiveHighlights,
  getHighlights,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  toggleHighlight,
  reorderHighlights,
} from '../controllers/heroHighlightController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/active', getActiveHighlights);
router.get('/admin/all', protect, getHighlights);
router.post('/admin', protect, [
  body('companyName').notEmpty(),
  body('roleTitle').notEmpty(),
  body('salaryText').notEmpty(),
  validate,
], createHighlight);
router.put('/admin/:id', protect, updateHighlight);
router.delete('/admin/:id', protect, deleteHighlight);
router.patch('/admin/:id/toggle', protect, toggleHighlight);
router.patch('/admin/reorder', protect, reorderHighlights);

export default router;
