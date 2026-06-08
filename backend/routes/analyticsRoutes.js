import { Router } from 'express';
import { trackVisit, getAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/track', trackVisit);
router.get('/admin', protect, getAnalytics);

export default router;
