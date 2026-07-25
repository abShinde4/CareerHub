import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../services/analyticsService';

const isAdminPath = (path) => path === '/admin' || path.startsWith('/admin/');

const isLocalhost = () => {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
};

const PUBLIC_PATTERNS = [
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

const isPublicPath = (path) => PUBLIC_PATTERNS.some((p) => p.test(path));

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Skip admin panel, localhost, and non-production builds
    if (isAdminPath(path)) return;
    if (isLocalhost()) return;
    if (!import.meta.env.PROD) return;
    if (!isPublicPath(path)) return;

    // Skip if admin token exists (logged-in admin browsing public pages)
    if (localStorage.getItem('careerhub-admin-token')) return;

    trackVisit(path).catch(() => {});
  }, [location.pathname]);
}
