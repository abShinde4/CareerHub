import { Router } from 'express';
import { body } from 'express-validator';
import {
  getHackathons,
  getHackathonById,
  adminGetHackathons,
  adminGetHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  publishHackathon,
  draftHackathon,
} from '../controllers/hackathonController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

const hackathonValidation = [
  body('title').notEmpty().withMessage('Title required'),
  body('organizer').notEmpty().withMessage('Organizer required'),
  body('prizePool').notEmpty().withMessage('Prize pool required'),
  validate,
];

router.get('/admin/all', protect, adminGetHackathons);
router.get('/admin/:id', protect, adminGetHackathonById);
router.post('/admin', protect, hackathonValidation, createHackathon);
router.put('/admin/:id', protect, updateHackathon);
router.delete('/admin/:id', protect, deleteHackathon);
router.patch('/admin/:id/publish', protect, publishHackathon);
router.patch('/admin/:id/draft', protect, draftHackathon);

router.get('/', getHackathons);
router.get('/:id', getHackathonById);

export default router;
