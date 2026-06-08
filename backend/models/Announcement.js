import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Announcement', announcementSchema);
