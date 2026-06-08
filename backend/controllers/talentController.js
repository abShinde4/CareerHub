import asyncHandler from '../utils/asyncHandler.js';
import TalentCommunity from '../models/TalentCommunity.js';

export const joinTalentCommunity = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const exists = await TalentCommunity.findOne({ email: email.toLowerCase() });
  if (exists) {
    return res.json({ success: true, message: 'Already part of our talent community' });
  }
  const member = await TalentCommunity.create({ email });
  res.status(201).json({ success: true, data: member, message: 'Joined talent community successfully' });
});

export const getTalentMembers = asyncHandler(async (req, res) => {
  const members = await TalentCommunity.find().sort({ createdAt: -1 });
  res.json({ success: true, data: members });
});
