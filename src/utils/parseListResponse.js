/** Ignore stale list responses when search/page changes quickly. */
export const parseListResponse = (response, requestId, currentRequestId) => {
  if (requestId !== currentRequestId) return null;
  const payload = response?.data;
  return {
    items: Array.isArray(payload?.data) ? payload.data : [],
    pagination: payload?.pagination || {},
  };
};
