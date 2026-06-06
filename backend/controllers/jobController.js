import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Job from '../models/Job.js';

const buildJobQuery = (query, publishedOnly = true) => {
  const filter = publishedOnly ? { status: 'published' } : {};
  if (query.category) filter.category = query.category;
  if (query.location) filter.location = { $regex: query.location, $options: 'i' };
  if (query.experience) filter.experience = { $regex: query.experience, $options: 'i' };
  if (query.company) filter.company = { $regex: query.company, $options: 'i' };
  if (query.featured === 'true') filter.isFeatured = true;
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { company: { $regex: query.search, $options: 'i' } },
      { location: { $regex: query.search, $options: 'i' } },
      { skills: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filter;
};

export const getJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildJobQuery(req.query, true);
  const total = await Job.countDocuments(filter);
  const jobs = await Job.find(filter)
    .sort({ isFeatured: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, status: 'published' });
  if (!job) throw new ApiError(404, 'Job not found');
  const related = await Job.find({
    _id: { $ne: job._id },
    status: 'published',
    $or: [{ category: job.category }, { company: job.company }],
  })
    .limit(4)
    .sort({ createdAt: -1 });
  res.json({ success: true, data: job, related });
});

export const adminGetJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildJobQuery(req.query, false);
  if (req.query.status) filter.status = req.query.status;
  const total = await Job.countDocuments(filter);
  const jobs = await Job.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const adminGetJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, data: job });
});

export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, data: job });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, data: job });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, message: 'Job deleted' });
});

export const publishJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, data: job });
});

export const draftJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, data: job });
});

export const toggleFeaturedJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) throw new ApiError(404, 'Job not found');
  job.isFeatured = !job.isFeatured;
  await job.save();
  res.json({ success: true, data: job });
});
