import api from './api';

export const getInternships = (params) => api.get('/internships', { params });
export const getInternshipById = (id) => api.get(`/internships/${id}`);
export const adminGetInternships = (params) => api.get('/internships/admin/all', { params });
export const adminGetInternshipById = (id) => api.get(`/internships/admin/${id}`);
export const createInternship = (data) => api.post('/internships/admin', data);
export const updateInternship = (id, data) => api.put(`/internships/admin/${id}`, data);
export const deleteInternship = (id) => api.delete(`/internships/admin/${id}`);
export const publishInternship = (id) => api.patch(`/internships/admin/${id}/publish`);
export const draftInternship = (id) => api.patch(`/internships/admin/${id}/draft`);
