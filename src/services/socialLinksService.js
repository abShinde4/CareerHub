import api from './api';

export const getSocialLinks = () => api.get('/social-links');
export const updateSocialLinks = (data) => api.put('/social-links/admin', data);
