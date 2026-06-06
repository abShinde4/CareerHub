import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';
import Admin from '../models/Admin.js';

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email?.toLowerCase() });
  if (!admin) throw new ApiError(401, 'Invalid email or password');
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');
  res.json({
    success: true,
    data: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    },
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin });
});
