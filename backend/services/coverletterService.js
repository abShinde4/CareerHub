import { generateText } from './geminiService.js';

export const generateCoverLetter = async ({ company, role, resume, experience }) => {
  return generateText(
    `Write a professional cover letter for:
    Company: ${company}
    Role: ${role}
    Experience: ${experience || 'Not specified'}

    Resume summary/context:
    ${(resume || '').slice(0, 8000)}

    Requirements:
    - Professional tone
    - 3-4 paragraphs
    - Include greeting and sign-off placeholder
    - Tailored to the role and company
    - No markdown`,
    'You are an expert career coach writing cover letters for Indian professionals.'
  );
};
