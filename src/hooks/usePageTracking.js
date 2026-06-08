import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../services/analyticsService';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackVisit(location.pathname).catch(() => {});
  }, [location.pathname]);
}
