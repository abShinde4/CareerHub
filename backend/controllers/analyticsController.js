import asyncHandler from '../utils/asyncHandler.js';
import Visitor from '../models/Visitor.js';
import { hashIp, detectDevice } from '../utils/hashIp.js';

export const trackVisit = asyncHandler(async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const { page, country } = req.body;
  const userAgent = req.headers['user-agent'] || '';

  await Visitor.create({
    ipHash: hashIp(ip),
    device: detectDevice(userAgent),
    page: page || '/',
    country: country || 'Unknown',
    userAgent,
  });

  res.status(201).json({ success: true });
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, today, weekly, monthly, uniqueVisitors, topPages, deviceStats, countryStats, dailyVisits] = await Promise.all([
    Visitor.countDocuments(),
    Visitor.countDocuments({ createdAt: { $gte: startOfDay } }),
    Visitor.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Visitor.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Visitor.distinct('ipHash'),
    Visitor.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Visitor.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Visitor.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Visitor.aggregate([
      { $match: { createdAt: { $gte: startOfWeek } } },
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
