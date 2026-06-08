import api from './api';

export const trackVisit = (page) => api.post('/analytics/track', { page });
export const getAnalytics = () => api.get('/analytics/admin');
