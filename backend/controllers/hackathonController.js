import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Hackathon from '../models/Hackathon.js';

const buildQuery = (query, publishedOnly = true) => {
  const filter = publishedOnly ? { status: 'published' } : {};
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { organizer: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filter;
};

export const getHackathons = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildQuery(req.query, true);
  const total = await Hackathon.countDocuments(filter);
  const hackathons = await Hackathon.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: hackathons, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getHackathonById = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findOne({ _id: req.params.id, status: 'published' });
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  const related = await Hackathon.find({
    _id: { $ne: hackathon._id },
    status: 'published',
  })
    .limit(4)
    .sort({ createdAt: -1 });
  res.json({ success: true, data: hackathon, related });
});

export const adminGetHackathons = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildQuery(req.query, false);
  if (req.query.status) filter.status = req.query.status;
  const total = await Hackathon.countDocuments(filter);
  const hackathons = await Hackathon.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: hackathons, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const adminGetHackathonById = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  res.json({ success: true, data: hackathon });
});

export const createHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.create(req.body);
  res.status(201).json({ success: true, data: hackathon });
});

export const updateHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  res.json({ success: true, data: hackathon });
});

export const deleteHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  res.json({ success: true, message: 'Hackathon deleted' });
});

export const publishHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  res.json({ success: true, data: hackathon });
});

export const draftHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  res.json({ success: true, data: hackathon });
});
