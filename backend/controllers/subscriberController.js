import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Subscriber from '../models/Subscriber.js';
import { subscribersToCSV } from '../services/csvExportService.js';

export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const exists = await Subscriber.findOne({ email: email.toLowerCase() });
  if (exists) {
    return res.json({ success: true, message: 'Already subscribed' });
  }
  const subscriber = await Subscriber.create({ email });
  res.status(201).json({ success: true, data: subscriber, message: 'Subscribed successfully' });
});

export const getSubscribers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const total = await Subscriber.countDocuments();
  const subscribers = await Subscriber.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: subscribers, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
  if (!subscriber) throw new ApiError(404, 'Subscriber not found');
  res.json({ success: true, message: 'Subscriber deleted' });
});

export const exportSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  const csv = subscribersToCSV(subscribers);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
  res.send(csv);
});
