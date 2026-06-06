import api from './api';

export const getHackathons = (params) => api.get('/hackathons', { params });
export const getHackathonById = (id) => api.get(`/hackathons/${id}`);
export const adminGetHackathons = (params) => api.get('/hackathons/admin/all', { params });
export const adminGetHackathonById = (id) => api.get(`/hackathons/admin/${id}`);
export const createHackathon = (data) => api.post('/hackathons/admin', data);
export const updateHackathon = (id, data) => api.put(`/hackathons/admin/${id}`, data);
export const deleteHackathon = (id) => api.delete(`/hackathons/admin/${id}`);
export const publishHackathon = (id) => api.patch(`/hackathons/admin/${id}/publish`);
export const draftHackathon = (id) => api.patch(`/hackathons/admin/${id}/draft`);
