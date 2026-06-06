import api from './api';

export const loginAdmin = (email, password) => api.post('/admin/login', { email, password });
export const getDashboard = () => api.get('/admin/dashboard');
export const getProfile = () => api.get('/admin/profile');
