import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getVisitorName, hasVisitorName } from '../utils/visitorName';
import {
  getOrCreateVisitorId,
  isVisitorRegistered,
  hasSessionVisitRecorded,
  markSessionVisitRecorded,
  markVisitorRegistered,
} from '../utils/visitorIdentity';
import { recordReturnVisit, registerVisitor } from '../services/namedVisitorService';

const isAdminPath = (path) => path === '/admin' || path.startsWith('/admin/');

export function useNamedVisitorTracking() {
  const location = useLocation();

  useEffect(() => {
    if (isAdminPath(location.pathname)) return;

    if (hasVisitorName() && !isVisitorRegistered()) {
      const visitorId = getOrCreateVisitorId();
      registerVisitor(visitorId, getVisitorName())
        .then(() => {
          markVisitorRegistered();
          markSessionVisitRecorded();
        })
        .catch(() => {});
      return;
    }

    if (!hasVisitorName() || !isVisitorRegistered()) return;
    if (hasSessionVisitRecorded()) return;

    const visitorId = getOrCreateVisitorId();
    recordReturnVisit(visitorId)
      .then(() => markSessionVisitRecorded())
      .catch(() => {});
  }, [location.pathname]);
}
