import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { isGeminiAvailable, chatWithHistory } from '../services/geminiService.js';
import { extractTextFromInput, analyzeResume } from '../services/resumeService.js';
import { scoreATS } from '../services/atsService.js';
import { generateCoverLetter } from '../services/coverletterService.js';

export const getAiStatus = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    available: isGeminiAvailable(),
    message: isGeminiAvailable() ? 'AI Service ready' : 'AI Service unavailable',
  });
});

export const careerChat = asyncHandler(async (req, res) => {
  const { messages, userName } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new ApiError(400, 'Messages are required');
  }

  const reply = await chatWithHistory(messages, userName || 'User');
  res.json({ success: true, reply });
});

export const resumeReview = asyncHandler(async (req, res) => {
  const resumeText = await extractTextFromInput(req.file, req.body.resumeText);
  const analysis = await analyzeResume(resumeText);
  res.json({ success: true, data: analysis });
});

export const atsScore = asyncHandler(async (req, res) => {
  const resumeText = await extractTextFromInput(req.file, req.body.resumeText);
  const jobDescription = req.body.jobDescription || '';
  const result = await scoreATS(resumeText, jobDescription);
  res.json({ success: true, data: result });
});

export const coverLetter = asyncHandler(async (req, res) => {
  const { company, role, resume, experience } = req.body;

  if (!company?.trim() || !role?.trim()) {
    throw new ApiError(400, 'Company and role are required');
  }

  const letter = await generateCoverLetter({
    company: company.trim(),
    role: role.trim(),
    resume: resume || '',
    experience: experience || '',
  });

  res.json({ success: true, letter });
});
