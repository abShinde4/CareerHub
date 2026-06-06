import '../config/loadEnv.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const seedAdmin = async () => {
  const mongoUri = process.env.MONGO_URI;
  console.log('MONGO_URI:', mongoUri);

  if (!mongoUri) {
    console.error('MONGO_URI is undefined. Create backend/.env first.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');
    const email = process.env.ADMIN_EMAIL || 'admin@careerhub.com';
    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('Admin already exists');
      process.exit(0);
    }
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const hashed = await bcrypt.hash(password, 12);
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email,
      password: hashed,
      role: 'admin',
    });
    console.log(`Admin seeded: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seedAdmin();
