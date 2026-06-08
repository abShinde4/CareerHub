import { Router } from 'express';
import { body } from 'express-validator';
import {
  getGovernmentJobs,
  getGovernmentJobById,
  adminGetGovernmentJobs,
  adminGetGovernmentJobById,
  createGovernmentJob,
  updateGovernmentJob,
  deleteGovernmentJob,
  publishGovernmentJob,
  draftGovernmentJob,
} from '../controllers/governmentJobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

const validation = [
  body('title').notEmpty(),
  body('department').notEmpty(),
  body('location').notEmpty(),
  validate,
];

router.get('/admin/all', protect, adminGetGovernmentJobs);
router.get('/admin/:id', protect, adminGetGovernmentJobById);
router.post('/admin', protect, validation, createGovernmentJob);
router.put('/admin/:id', protect, updateGovernmentJob);
router.delete('/admin/:id', protect, deleteGovernmentJob);
router.patch('/admin/:id/publish', protect, publishGovernmentJob);
router.patch('/admin/:id/draft', protect, draftGovernmentJob);

router.get('/', getGovernmentJobs);
router.get('/:id', getGovernmentJobById);

export default router;
