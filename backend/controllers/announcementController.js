import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Announcement from '../models/Announcement.js';

export const getActiveAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findOne({ isActive: true }).sort({ updatedAt: -1 });
  res.json({ success: true, data: announcement });
});

export const getAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find().sort({ updatedAt: -1 });
  res.json({ success: true, data: announcements });
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  if (req.body.isActive) {
    await Announcement.updateMany({}, { isActive: false });
  }
  const announcement = await Announcement.create(req.body);
  res.status(201).json({ success: true, data: announcement });
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  if (req.body.isActive) {
    await Announcement.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
  }
  const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!announcement) throw new ApiError(404, 'Announcement not found');
  res.json({ success: true, data: announcement });
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);
  if (!announcement) throw new ApiError(404, 'Announcement not found');
  res.json({ success: true, message: 'Announcement deleted' });
});

export const toggleAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) throw new ApiError(404, 'Announcement not found');
  if (!announcement.isActive) {
    await Announcement.updateMany({}, { isActive: false });
    announcement.isActive = true;
  } else {
    announcement.isActive = false;
  }
  await announcement.save();
  res.json({ success: true, data: announcement });
});
