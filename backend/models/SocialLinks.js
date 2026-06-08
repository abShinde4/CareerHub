import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema(
  {
    youtube: { type: String, default: 'https://www.youtube.com/@ArmanShinde' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    telegram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('SocialLinks', socialLinksSchema);
