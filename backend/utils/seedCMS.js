import '../config/loadEnv.js';
import mongoose from 'mongoose';
import Announcement from '../models/Announcement.js';
import HeroHighlight from '../models/HeroHighlight.js';
import SocialLinks from '../models/SocialLinks.js';

const seedCMS = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is undefined');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');

    const announcementCount = await Announcement.countDocuments();
    if (announcementCount === 0) {
      await Announcement.create({
        text: '500+ new opportunities added today',
        isActive: true,
      });
      console.log('Default announcement seeded');
    }

    const highlightCount = await HeroHighlight.countDocuments();
    if (highlightCount === 0) {
      await HeroHighlight.insertMany([
        { companyName: 'Google', roleTitle: 'Google SWE', salaryText: '₹40 LPA', position: 'top-left', sortOrder: 0, isActive: true },
        { companyName: 'Microsoft', roleTitle: 'MS Intern', salaryText: '₹80K/mo', position: 'top-right', sortOrder: 1, isActive: true },
        { companyName: 'Zoho', roleTitle: 'Zoho Dev', salaryText: '₹12 LPA', position: 'bottom-left', sortOrder: 2, isActive: true },
      ]);
      console.log('Default hero highlights seeded');
    }

    const socialCount = await SocialLinks.countDocuments();
    if (socialCount === 0) {
      await SocialLinks.create({
        youtube: 'https://www.youtube.com/@ArmanShinde',
        instagram: 'https://instagram.com/careerhub',
        linkedin: 'https://linkedin.com/company/careerhub',
        telegram: 'https://t.me/careerhub',
        twitter: 'https://twitter.com/careerhub',
        whatsapp: 'https://wa.me/careerhub',
      });
      console.log('Default social links seeded');
    }

    console.log('CMS seed complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seedCMS();
