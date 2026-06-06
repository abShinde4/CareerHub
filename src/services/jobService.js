import api from './api';

export const getJobs = (params) => api.get('/jobs', { params });
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const adminGetJobs = (params) => api.get('/jobs/admin/all', { params });
export const adminGetJobById = (id) => api.get(`/jobs/admin/${id}`);
export const createJob = (data) => api.post('/jobs/admin', data);
export const updateJob = (id, data) => api.put(`/jobs/admin/${id}`, data);
export const deleteJob = (id) => api.delete(`/jobs/admin/${id}`);
export const publishJob = (id) => api.patch(`/jobs/admin/${id}/publish`);
export const draftJob = (id) => api.patch(`/jobs/admin/${id}/draft`);
export const toggleFeaturedJob = (id) => api.patch(`/jobs/admin/${id}/feature`);
