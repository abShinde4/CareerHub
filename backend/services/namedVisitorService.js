import NamedVisitor from '../models/NamedVisitor.js';
import ApiError from '../utils/ApiError.js';
import { parseBrowser, getClientIp, detectDevice } from '../utils/visitorUtils.js';

const buildMeta = (req) => {
  const userAgent = req.headers['user-agent'] || '';
  return {
    ipAddress: getClientIp(req),
    userAgent,
    browser: parseBrowser(userAgent),
    device: detectDevice(userAgent),
  };
};

export const upsertNamedVisitor = async ({ visitorId, name }, req) => {
  if (!visitorId?.trim()) {
    throw new ApiError(400, 'visitorId is required');
  }

  const id = visitorId.trim();
  const meta = buildMeta(req);
  const existing = await NamedVisitor.findOne({ visitorId: id });

  if (!existing) {
    if (!name?.trim()) {
      throw new ApiError(404, 'Visitor not found');
    }
    return NamedVisitor.create({
      visitorId: id,
      name: name.trim(),
      ...meta,
      firstVisit: new Date(),
      lastVisit: new Date(),
      visitCount: 1,
      status: 'new',
    });
  }

  existing.lastVisit = new Date();
  existing.visitCount += 1;
  existing.status = 'returning';
  existing.ipAddress = meta.ipAddress;
  existing.userAgent = meta.userAgent;
  existing.browser = meta.browser;
  existing.device = meta.device;
  if (name?.trim() && !existing.name) {
    existing.name = name.trim();
  }
  await existing.save();
  return existing;
};

export const getNamedVisitorStats = async () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [total, today, returning, unique] = await Promise.all([
    NamedVisitor.countDocuments(),
    NamedVisitor.countDocuments({ lastVisit: { $gte: startOfDay } }),
    NamedVisitor.countDocuments({ visitCount: { $gt: 1 } }),
    NamedVisitor.countDocuments(),
  ]);

  return { totalVisitors: total, todayVisitors: today, returningVisitors: returning, uniqueVisitors: unique };
};

export const listNamedVisitors = async ({ page = 1, limit = 10, search = '' }) => {
  const query = search.trim()
    ? {
        $or: [
          { name: { $regex: search.trim(), $options: 'i' } },
          { visitorId: { $regex: search.trim(), $options: 'i' } },
          { ipAddress: { $regex: search.trim(), $options: 'i' } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;
  const [visitors, total, stats] = await Promise.all([
    NamedVisitor.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    NamedVisitor.countDocuments(query),
    getNamedVisitorStats(),
  ]);

  return {
    visitors,
    stats,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    },
  };
};

export const patchNamedVisitor = async (id, req) => {
  const visitor = await NamedVisitor.findById(id);
  if (!visitor) throw new ApiError(404, 'Visitor not found');

  const meta = buildMeta(req);
  visitor.lastVisit = new Date();
  visitor.visitCount += 1;
  visitor.status = 'returning';
  visitor.ipAddress = meta.ipAddress;
  visitor.userAgent = meta.userAgent;
  visitor.browser = meta.browser;
  visitor.device = meta.device;
  await visitor.save();
  return visitor;
};
