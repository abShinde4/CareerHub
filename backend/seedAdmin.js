import './config/loadEnv.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

const DEFAULT_ADMIN = {
  name: 'Admin',
  email: 'admin@careerhub.com',
  password: 'admin123',
  role: 'admin',
};

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

    const email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN.email).toLowerCase();
    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log(`Admin already exists: ${email}`);
      await mongoose.disconnect();
      process.exit(0);
    }

    const plainPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || DEFAULT_ADMIN.name,
      email,
      password: hashedPassword,
      role: DEFAULT_ADMIN.role,
    });

    console.log('Admin seeded successfully!');
    console.log(`  Name:     ${admin.name}`);
    console.log(`  Email:    ${admin.email}`);
    console.log(`  Password: ${plainPassword}`);
    console.log('Login at: http://localhost:5173/admin/login');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();
