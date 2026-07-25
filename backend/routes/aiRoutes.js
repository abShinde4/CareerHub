import { Router } from 'express';
import {
  getAiStatus,
  careerChat,
  resumeReview,
  atsScore,
  coverLetter,
} from '../controllers/aiController.js';
import { uploadResumePDF, handleUploadError } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/status', getAiStatus);
router.post('/chat', careerChat);
router.post('/resume-review', uploadResumePDF, handleUploadError, resumeReview);
router.post('/ats-score', uploadResumePDF, handleUploadError, atsScore);
router.post('/cover-letter', coverLetter);

export default router;
