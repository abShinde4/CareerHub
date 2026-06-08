import { Router } from 'express';
import { body } from 'express-validator';
import { joinTalentCommunity, getTalentMembers } from '../controllers/talentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.post(
  '/',
  [body('email').isEmail().withMessage('Valid email required'), validate],
  joinTalentCommunity
);

router.get('/', protect, getTalentMembers);

export default router;
