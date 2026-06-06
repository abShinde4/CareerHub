import api from './api';

export const globalSearch = (params) => api.get('/search', { params });
