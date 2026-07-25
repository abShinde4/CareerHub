import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import {
  upsertNamedVisitor,
  listNamedVisitors,
  patchNamedVisitor,
} from '../services/namedVisitorService.js';

export const registerVisitor = asyncHandler(async (req, res) => {
  const { name, visitorId } = req.body;

  if (!visitorId?.trim()) {
    throw new ApiError(400, 'visitorId is required');
  }

  const visitor = await upsertNamedVisitor({ visitorId, name }, req);

  res.status(visitor.visitCount === 1 && visitor.status === 'new' ? 201 : 200).json({
    success: true,
    data: visitor,
  });
});

export const getVisitors = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const search = req.query.search || '';

  const { visitors, stats, pagination } = await listNamedVisitors({ page, limit, search });

  res.json({
    success: true,
    data: visitors,
    stats,
    pagination,
  });
});

export const updateVisitor = asyncHandler(async (req, res) => {
  const visitor = await patchNamedVisitor(req.params.id, req);
  res.json({ success: true, data: visitor });
});
