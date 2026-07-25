const VISITOR_NAME_KEY = 'careerhub-visitor-name';

export const getVisitorName = () => localStorage.getItem(VISITOR_NAME_KEY) || '';

export const setVisitorName = (name) => {
  const trimmed = (name || '').trim();
  if (trimmed) localStorage.setItem(VISITOR_NAME_KEY, trimmed);
};

export const hasVisitorName = () => Boolean(getVisitorName());
