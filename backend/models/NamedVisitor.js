import mongoose from 'mongoose';

const namedVisitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    browser: { type: String, default: 'Unknown' },
    device: { type: String, default: 'desktop' },
    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    visitCount: { type: Number, default: 1, min: 1 },
    status: { type: String, enum: ['new', 'returning'], default: 'new' },
  },
  { timestamps: true, collection: 'namedvisitors' }
);

namedVisitorSchema.index({ createdAt: -1 });
namedVisitorSchema.index({ name: 'text', visitorId: 'text', ipAddress: 'text' });

export default mongoose.model('NamedVisitor', namedVisitorSchema);
