export const subscribersToCSV = (subscribers) => {
  const header = 'Email,Created At\n';
  const rows = subscribers
    .map((s) => `"${s.email}","${new Date(s.createdAt).toISOString()}"`)
    .join('\n');
  return header + rows;
};
