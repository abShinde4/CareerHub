import axios from 'axios';

/** Dev: `/api` via Vite proxy. Production: set VITE_API_URL if needed. */
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  if (!config.publicRoute) {
    const token = localStorage.getItem('careerhub-admin-token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('careerhub-admin-token');
      localStorage.removeItem('careerhub-admin');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

/** Public requests — never attach admin Bearer token. */
export const publicPost = (url, body, config = {}) =>
  api.post(url, body, { ...config, publicRoute: true });

export const publicGet = (url, config = {}) =>
  api.get(url, { ...config, publicRoute: true });

export default api;
