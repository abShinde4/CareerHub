import api from './api';

export const getActiveHighlights = () => api.get('/hero-highlights/active');
export const adminGetHighlights = () => api.get('/hero-highlights/admin/all');
export const createHighlight = (data) => api.post('/hero-highlights/admin', data);
export const updateHighlight = (id, data) => api.put(`/hero-highlights/admin/${id}`, data);
export const deleteHighlight = (id) => api.delete(`/hero-highlights/admin/${id}`);
export const toggleHighlight = (id) => api.patch(`/hero-highlights/admin/${id}/toggle`);
export const reorderHighlights = (order) => api.patch('/hero-highlights/admin/reorder', { order });
