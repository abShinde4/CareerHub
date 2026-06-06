import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    companyLogo: { type: String, default: '' },
    location: { type: String, required: true, trim: true },
    salary: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['full-time', 'internship', 'wfh', 'hackathon', 'fresher', 'part-time', 'government'],
    },
    applyLink: { type: String, default: '' },
    sourceLink: { type: String, default: '' },
    description: { type: String, default: '' },
    skills: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', company: 'text', location: 'text' });

export default mongoose.model('Job', jobSchema);
