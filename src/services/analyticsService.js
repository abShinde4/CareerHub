import api, { publicPost } from './api';

export const trackVisit = (page) =>
  publicPost('/analytics/track', { page }).then((res) => res.data);

export const getAnalytics = () => api.get('/analytics/admin');
