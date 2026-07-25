import { createRequire } from 'module';
import { generateJSON } from './geminiService.js';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const extractTextFromPDF = async (buffer) => {
  const data = await pdfParse(buffer);
  const text = (data.text || '').trim();
  if (!text || text.length < 50) {
    const err = new Error('Could not extract enough text from PDF. Try a text-based PDF.');
    err.statusCode = 400;
    throw err;
  }
  return text.slice(0, 15000);
};

export const extractTextFromInput = async (file, textFallback = '') => {
  if (file) return extractTextFromPDF(file.buffer);
  const text = (textFallback || '').trim();
  if (text.length < 50) {
    const err = new Error('Please upload a PDF or paste resume text (min 50 characters).');
    err.statusCode = 400;
    throw err;
  }
  return text.slice(0, 15000);
};

export const analyzeResume = async (resumeText) => {
  return generateJSON(
    `Analyze this resume and return JSON with keys:
    overallScore (number 0-100),
    strengths (string array),
    weaknesses (string array),
    missingSkills (string array),
    formattingSuggestions (string array),
    grammarSuggestions (string array),
    improvementTips (string array)

    Resume:
    ${resumeText}`,
    'You are an expert resume reviewer for the Indian job market.'
  );
};
