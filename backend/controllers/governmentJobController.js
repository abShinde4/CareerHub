import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import GovernmentJob from '../models/GovernmentJob.js';

const buildQuery = (query, publishedOnly = true) => {
  const filter = publishedOnly ? { status: 'published' } : {};
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { department: { $regex: query.search, $options: 'i' } },
      { location: { $regex: query.search, $options: 'i' } },
    ];
  }
  if (query.location) filter.location = { $regex: query.location, $options: 'i' };
  if (query.featured === 'true') filter.featured = true;
  return filter;
};

export const getGovernmentJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildQuery(req.query, true);
  const total = await GovernmentJob.countDocuments(filter);
  const jobs = await GovernmentJob.find(filter)
    .sort({ featured: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getGovernmentJobById = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.findOne({ _id: req.params.id, status: 'published' });
  if (!job) throw new ApiError(404, 'Government job not found');
  const related = await GovernmentJob.find({ _id: { $ne: job._id }, status: 'published', department: job.department }).limit(4);
  res.json({ success: true, data: job, related });
});

export const adminGetGovernmentJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildQuery(req.query, false);
  if (req.query.status) filter.status = req.query.status;
  const total = await GovernmentJob.countDocuments(filter);
  const jobs = await GovernmentJob.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
  res.json({ success: true, data: jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const adminGetGovernmentJobById = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.findById(req.params.id);
  if (!job) throw new ApiError(404, 'Government job not found');
  res.json({ success: true, data: job });
});

export const createGovernmentJob = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.create(req.body);
  res.status(201).json({ success: true, data: job });
});

export const updateGovernmentJob = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!job) throw new ApiError(404, 'Government job not found');
  res.json({ success: true, data: job });
});

export const deleteGovernmentJob = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.findByIdAndDelete(req.params.id);
  if (!job) throw new ApiError(404, 'Government job not found');
  res.json({ success: true, message: 'Government job deleted' });
});

export const publishGovernmentJob = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
  if (!job) throw new ApiError(404, 'Government job not found');
  res.json({ success: true, data: job });
});

export const draftGovernmentJob = asyncHandler(async (req, res) => {
  const job = await GovernmentJob.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
  if (!job) throw new ApiError(404, 'Government job not found');
  res.json({ success: true, data: job });
});
