import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Internship from '../models/Internship.js';

const buildQuery = (query, publishedOnly = true) => {
  const filter = publishedOnly ? { status: 'published' } : {};
  if (query.location) filter.location = { $regex: query.location, $options: 'i' };
  if (query.company) filter.company = { $regex: query.company, $options: 'i' };
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { company: { $regex: query.search, $options: 'i' } },
      { location: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filter;
};

export const getInternships = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildQuery(req.query, true);
  const total = await Internship.countDocuments(filter);
  const internships = await Internship.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: internships, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findOne({ _id: req.params.id, status: 'published' });
  if (!internship) throw new ApiError(404, 'Internship not found');
  const related = await Internship.find({
    _id: { $ne: internship._id },
    status: 'published',
    company: internship.company,
  })
    .limit(4)
    .sort({ createdAt: -1 });
  res.json({ success: true, data: internship, related });
});

export const adminGetInternships = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = buildQuery(req.query, false);
  if (req.query.status) filter.status = req.query.status;
  const total = await Internship.countDocuments(filter);
  const internships = await Internship.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: internships, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const adminGetInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (!internship) throw new ApiError(404, 'Internship not found');
  res.json({ success: true, data: internship });
});

export const createInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.create(req.body);
  res.status(201).json({ success: true, data: internship });
});

export const updateInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!internship) throw new ApiError(404, 'Internship not found');
  res.json({ success: true, data: internship });
});

export const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findByIdAndDelete(req.params.id);
  if (!internship) throw new ApiError(404, 'Internship not found');
  res.json({ success: true, message: 'Internship deleted' });
});

export const publishInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
  if (!internship) throw new ApiError(404, 'Internship not found');
  res.json({ success: true, data: internship });
});

export const draftInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
  if (!internship) throw new ApiError(404, 'Internship not found');
  res.json({ success: true, data: internship });
});
