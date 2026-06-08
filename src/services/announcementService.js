import api from './api';

export const getActiveAnnouncement = () => api.get('/announcements/active');
export const adminGetAnnouncements = () => api.get('/announcements/admin/all');
export const createAnnouncement = (data) => api.post('/announcements/admin', data);
export const updateAnnouncement = (id, data) => api.put(`/announcements/admin/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/announcements/admin/${id}`);
export const toggleAnnouncement = (id) => api.patch(`/announcements/admin/${id}/toggle`);
