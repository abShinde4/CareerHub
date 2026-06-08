import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import HeroHighlight from '../models/HeroHighlight.js';

export const getActiveHighlights = asyncHandler(async (req, res) => {
  const highlights = await HeroHighlight.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
  res.json({ success: true, data: highlights });
});

export const getHighlights = asyncHandler(async (req, res) => {
  const highlights = await HeroHighlight.find().sort({ sortOrder: 1, createdAt: -1 });
  res.json({ success: true, data: highlights });
});

export const createHighlight = asyncHandler(async (req, res) => {
  const highlight = await HeroHighlight.create(req.body);
  res.status(201).json({ success: true, data: highlight });
});

export const updateHighlight = asyncHandler(async (req, res) => {
  const highlight = await HeroHighlight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!highlight) throw new ApiError(404, 'Hero highlight not found');
  res.json({ success: true, data: highlight });
});

export const deleteHighlight = asyncHandler(async (req, res) => {
  const highlight = await HeroHighlight.findByIdAndDelete(req.params.id);
  if (!highlight) throw new ApiError(404, 'Hero highlight not found');
  res.json({ success: true, message: 'Hero highlight deleted' });
});

export const toggleHighlight = asyncHandler(async (req, res) => {
  const highlight = await HeroHighlight.findById(req.params.id);
  if (!highlight) throw new ApiError(404, 'Hero highlight not found');
  highlight.isActive = !highlight.isActive;
  await highlight.save();
  res.json({ success: true, data: highlight });
});

export const reorderHighlights = asyncHandler(async (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order)) throw new ApiError(400, 'Order array required');
  await Promise.all(order.map((id, index) => HeroHighlight.findByIdAndUpdate(id, { sortOrder: index })));
  const highlights = await HeroHighlight.find().sort({ sortOrder: 1 });
  res.json({ success: true, data: highlights });
});
