import { Router } from 'express';
import { body } from 'express-validator';
import {
  getInternships,
  getInternshipById,
  adminGetInternships,
  adminGetInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  publishInternship,
  draftInternship,
} from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

const internshipValidation = [
  body('title').notEmpty().withMessage('Title required'),
  body('company').notEmpty().withMessage('Company required'),
  body('stipend').notEmpty().withMessage('Stipend required'),
  body('duration').notEmpty().withMessage('Duration required'),
  body('location').notEmpty().withMessage('Location required'),
  validate,
];

router.get('/admin/all', protect, adminGetInternships);
router.get('/admin/:id', protect, adminGetInternshipById);
router.post('/admin', protect, internshipValidation, createInternship);
router.put('/admin/:id', protect, updateInternship);
router.delete('/admin/:id', protect, deleteInternship);
router.patch('/admin/:id/publish', protect, publishInternship);
router.patch('/admin/:id/draft', protect, draftInternship);

router.get('/', getInternships);
router.get('/:id', getInternshipById);

export default router;
