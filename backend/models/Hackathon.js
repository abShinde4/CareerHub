import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organizer: { type: String, required: true, trim: true },
    prizePool: { type: String, required: true, trim: true },
    registrationLink: { type: String, default: '' },
    lastDate: { type: Date },
    description: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

hackathonSchema.index({ title: 'text', organizer: 'text' });

export default mongoose.model('Hackathon', hackathonSchema);
