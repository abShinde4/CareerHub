import api from './api';

export const getGovernmentJobs = (params) => api.get('/government-jobs', { params });
export const getGovernmentJobById = (id) => api.get(`/government-jobs/${id}`);
export const adminGetGovernmentJobs = (params) => api.get('/government-jobs/admin/all', { params });
export const adminGetGovernmentJobById = (id) => api.get(`/government-jobs/admin/${id}`);
export const createGovernmentJob = (data) => api.post('/government-jobs/admin', data);
export const updateGovernmentJob = (id, data) => api.put(`/government-jobs/admin/${id}`, data);
export const deleteGovernmentJob = (id) => api.delete(`/government-jobs/admin/${id}`);
export const publishGovernmentJob = (id) => api.patch(`/government-jobs/admin/${id}/publish`);
export const draftGovernmentJob = (id) => api.patch(`/government-jobs/admin/${id}/draft`);
