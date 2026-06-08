import api from './api';

export const joinTalentCommunity = (email) => api.post('/talent-community', { email });
