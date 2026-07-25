const VISITOR_ID_KEY = 'careerhub-visitor-id';
const VISITOR_REGISTERED_KEY = 'careerhub-visitor-registered';
const SESSION_VISIT_KEY = 'careerhub-session-visit-recorded';

export const getVisitorId = () => localStorage.getItem(VISITOR_ID_KEY) || '';

export const getOrCreateVisitorId = () => {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
};

export const isVisitorRegistered = () => localStorage.getItem(VISITOR_REGISTERED_KEY) === 'true';

export const markVisitorRegistered = () => {
  localStorage.setItem(VISITOR_REGISTERED_KEY, 'true');
};

export const hasSessionVisitRecorded = () => sessionStorage.getItem(SESSION_VISIT_KEY) === 'true';

export const markSessionVisitRecorded = () => {
  sessionStorage.setItem(SESSION_VISIT_KEY, 'true');
};
