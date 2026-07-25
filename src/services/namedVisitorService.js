import api, { publicPost } from './api';

export const registerVisitor = (visitorId, name) =>
  publicPost('/visitors', { visitorId, name }).then((res) => res.data);

export const recordReturnVisit = (visitorId) =>
  publicPost('/visitors', { visitorId }).then((res) => res.data);

export const getVisitors = (params = {}) => api.get('/visitors', { params });
