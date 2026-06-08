import { Router } from 'express';
import { body } from 'express-validator';
import {
  getActiveAnnouncement,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncement,
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/active', getActiveAnnouncement);
router.get('/admin/all', protect, getAnnouncements);
router.post('/admin', protect, [body('text').notEmpty(), validate], createAnnouncement);
router.put('/admin/:id', protect, updateAnnouncement);
router.delete('/admin/:id', protect, deleteAnnouncement);
router.patch('/admin/:id/toggle', protect, toggleAnnouncement);

export default router;
