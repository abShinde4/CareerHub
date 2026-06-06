import { Router } from 'express';
import { body } from 'express-validator';
import {
  getJobs,
  getJobById,
  adminGetJobs,
  adminGetJobById,
  createJob,
  updateJob,
  deleteJob,
  publishJob,
  draftJob,
  toggleFeaturedJob,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

const jobValidation = [
  body('title').notEmpty().withMessage('Title required'),
  body('company').notEmpty().withMessage('Company required'),
  body('location').notEmpty().withMessage('Location required'),
  body('salary').notEmpty().withMessage('Salary required'),
  body('experience').notEmpty().withMessage('Experience required'),
  body('category').notEmpty().withMessage('Category required'),
  validate,
];

router.get('/admin/all', protect, adminGetJobs);
router.get('/admin/:id', protect, adminGetJobById);
router.post('/admin', protect, jobValidation, createJob);
router.put('/admin/:id', protect, updateJob);
router.delete('/admin/:id', protect, deleteJob);
router.patch('/admin/:id/publish', protect, publishJob);
router.patch('/admin/:id/draft', protect, draftJob);
router.patch('/admin/:id/feature', protect, toggleFeaturedJob);

router.get('/', getJobs);
router.get('/:id', getJobById);

export default router;
