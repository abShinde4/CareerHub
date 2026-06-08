import asyncHandler from '../utils/asyncHandler.js';
import SocialLinks from '../models/SocialLinks.js';

const getOrCreate = async () => {
  let links = await SocialLinks.findOne();
  if (!links) {
    links = await SocialLinks.create({});
  }
  return links;
};

export const getSocialLinks = asyncHandler(async (req, res) => {
  const links = await getOrCreate();
  res.json({ success: true, data: links });
});

export const updateSocialLinks = asyncHandler(async (req, res) => {
  let links = await SocialLinks.findOne();
  if (!links) {
    links = await SocialLinks.create(req.body);
  } else {
    Object.assign(links, req.body);
    await links.save();
  }
  res.json({ success: true, data: links });
});
