import '../config/loadEnv.js';
import mongoose from 'mongoose';
import Visitor from '../models/Visitor.js';

const cleanupAdminAnalytics = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is undefined');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');

    const result = await Visitor.deleteMany({
      $or: [
        { page: { $regex: '^/admin' } },
        { isAdminVisit: true },
      ],
    });

    console.log(`Removed ${result.deletedCount} admin analytics records`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Cleanup failed:', err.message);
    process.exit(1);
  }
};

cleanupAdminAnalytics();
