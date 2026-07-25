/** Routes that must never be tracked */
export const isAdminRoute = (page = '') => {
  const path = page.split('?')[0];
  return path === '/admin' || path.startsWith('/admin/');
};

const PUBLIC_ROUTE_PATTERNS = [
  /^\/$/,
  /^\/job\/[^/]+$/,
  /^\/internship\/[^/]+$/,
  /^\/hackathon\/[^/]+$/,
  /^\/government-jobs$/,
  /^\/government-job\/[^/]+$/,
  /^\/about$/,
  /^\/contact$/,
  /^\/privacy-policy$/,
  /^\/terms-and-conditions$/,
  /^\/terms$/,
  /^\/disclaimer$/,
  /^\/careers$/,
  /^\/ai-tools$/,
  /^\/ai-tools\/career-chat$/,
  /^\/ai-tools\/resume-review$/,
  /^\/ai-tools\/ats-score$/,
  /^\/ai-tools\/cover-letter$/,
];

export const isPublicRoute = (page = '') => {
  const path = page.split('?')[0];
  if (isAdminRoute(path)) return false;
  return PUBLIC_ROUTE_PATTERNS.some((pattern) => pattern.test(path));
};

export const isLocalhostRequest = (req) => {
  const host = (req.headers.host || '').toLowerCase();
  const origin = (req.headers.origin || req.headers.referer || '').toLowerCase();
  const localhostPattern = /localhost|127\.0\.0\.1|0\.0\.0\.0/;
  return localhostPattern.test(host) || localhostPattern.test(origin);
};

export const isProductionTrackingEnabled = () =>
  process.env.NODE_ENV === 'production' || process.env.ANALYTICS_ENABLED === 'true';

/** MongoDB filter: public website visitors only */
export const publicVisitorFilter = {
  isAdminVisit: { $ne: true },
  page: { $not: /^\/admin(\/|$)/ },
};

export const hasAdminAuth = (req) => {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ');
};
