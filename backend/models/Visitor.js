import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    ipHash: { type: String, required: true },
    device: { type: String, default: 'desktop' },
    page: { type: String, required: true },
    country: { type: String, default: 'Unknown' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ page: 1 });
visitorSchema.index({ ipHash: 1 });

export default mongoose.model('Visitor', visitorSchema);
