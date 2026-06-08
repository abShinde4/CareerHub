import { Router } from 'express';
import { getSocialLinks, updateSocialLinks } from '../controllers/socialLinksController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getSocialLinks);
router.put('/admin', protect, updateSocialLinks);

export default router;
