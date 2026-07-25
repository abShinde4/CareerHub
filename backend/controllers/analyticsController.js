import asyncHandler from '../utils/asyncHandler.js';
import Visitor from '../models/Visitor.js';
import { hashIp, detectDevice } from '../utils/hashIp.js';
import {
  isAdminRoute,
  isPublicRoute,
  isLocalhostRequest,
  isProductionTrackingEnabled,
  publicVisitorFilter,
  hasAdminAuth,
} from '../utils/analyticsFilter.js';

export const trackVisit = asyncHandler(async (req, res) => {
  const page = (req.body.page || '/').split('?')[0];

  // Never track in development / localhost
  if (!isProductionTrackingEnabled() || isLocalhostRequest(req)) {
    return res.json({ success: true, tracked: false, reason: 'development' });
  }

  // Never track admin routes or authenticated admin sessions
  if (isAdminRoute(page) || hasAdminAuth(req) || req.body.isAdminVisit) {
    return res.json({ success: true, tracked: false, reason: 'admin' });
  }

  // Only track known public website pages
  if (!isPublicRoute(page)) {
    return res.json({ success: true, tracked: false, reason: 'not_public' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  await Visitor.create({
    ipHash: hashIp(ip),
    device: detectDevice(userAgent),
    page,
    country: req.body.country || 'Unknown',
    userAgent,
    isAdminVisit: false,
  });

  res.status(201).json({ success: true, tracked: true });
});

const withDateFilter = (dateFilter) => ({
  ...publicVisitorFilter,
  ...(dateFilter ? { createdAt: dateFilter } : {}),
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, today, weekly, monthly, uniqueVisitors, topPages, deviceStats, countryStats, dailyVisits] = await Promise.all([
    Visitor.countDocuments(publicVisitorFilter),
    Visitor.countDocuments(withDateFilter({ $gte: startOfDay })),
    Visitor.countDocuments(withDateFilter({ $gte: startOfWeek })),
    Visitor.countDocuments(withDateFilter({ $gte: startOfMonth })),
    Visitor.distinct('ipHash', publicVisitorFilter),
    Visitor.aggregate([
      { $match: publicVisitorFilter },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Visitor.aggregate([
      { $match: publicVisitorFilter },
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Visitor.aggregate([
      { $match: publicVisitorFilter },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Visitor.aggregate([
      { $match: withDateFilter({ $gte: startOfWeek }) },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  res.json({
    success: true,
    data: {
      totalVisitors: total,
      todayVisitors: today,
      weeklyVisitors: weekly,
      monthlyVisitors: monthly,
      uniqueVisitors: uniqueVisitors.length,
      topPages: topPages.map((p) => ({ page: p._id, count: p.count })),
      deviceStats: deviceStats.map((d) => ({ device: d._id, count: d.count })),
      countryStats: countryStats.map((c) => ({ country: c._id, count: c.count })),
      dailyVisits: dailyVisits.map((d) => ({ date: d._id, count: d.count })),
    },
  });
});
