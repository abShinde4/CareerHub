import crypto from 'crypto';

export const hashIp = (ip) =>
  crypto.createHash('sha256').update(ip + (process.env.JWT_SECRET || 'salt')).digest('hex');

export const detectDevice = (userAgent = '') => {
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipod/.test(ua)) return 'mobile';
  if (/ipad|tablet/.test(ua)) return 'tablet';
  return 'desktop';
};
