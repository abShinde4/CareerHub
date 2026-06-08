import mongoose from 'mongoose';

const governmentJobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    salary: { type: String, default: '' },
    qualification: { type: String, default: '' },
    totalVacancies: { type: String, default: '' },
    applicationStartDate: { type: Date },
    applicationEndDate: { type: Date },
    officialWebsite: { type: String, default: '' },
    notificationPDF: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: 'government' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

governmentJobSchema.index({ title: 'text', department: 'text', location: 'text' });

export default mongoose.model('GovernmentJob', governmentJobSchema);
