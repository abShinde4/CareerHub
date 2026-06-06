import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    stipend: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    applyLink: { type: String, default: '' },
    sourceLink: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

internshipSchema.index({ title: 'text', company: 'text', location: 'text' });

export default mongoose.model('Internship', internshipSchema);
