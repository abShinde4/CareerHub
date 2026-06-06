import api from './api';

export const subscribe = (email) => api.post('/subscribe', { email });
export const getSubscribers = (params) => api.get('/subscribers', { params });
export const deleteSubscriber = (id) => api.delete(`/subscribers/${id}`);
export const exportSubscribersCSV = () =>
  api.get('/subscribers/export/csv', { responseType: 'blob' });
