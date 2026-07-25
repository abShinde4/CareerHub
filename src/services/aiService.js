import api from './api';

export const getAiStatus = () => api.get('/ai/status');

export const sendChatMessage = (messages, userName) =>
  api.post('/ai/chat', { messages, userName });

export const reviewResume = (formData) =>
  api.post('/ai/resume-review', formData);

export const scoreResumeATS = (formData) =>
  api.post('/ai/ats-score', formData);

export const generateCoverLetter = (payload) =>
  api.post('/ai/cover-letter', payload);
