import { generateJSON } from './geminiService.js';

export const scoreATS = async (resumeText, jobDescription = '') => {
  const jdSection = jobDescription
    ? `Job Description:\n${jobDescription.slice(0, 5000)}`
    : 'No specific job description provided. Score against general industry standards.';

  return generateJSON(
    `Perform ATS analysis and return JSON with keys:
    overallScore (number 0-100),
    keywordMatch (number 0-100),
    missingSkills (string array),
    formattingScore (number 0-100),
    suggestions (string array)

    ${jdSection}

    Resume:
    ${resumeText}`,
    'You are an ATS (Applicant Tracking System) expert.'
  );
};
