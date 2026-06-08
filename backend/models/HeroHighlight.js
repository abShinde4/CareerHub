import mongoose from 'mongoose';

const heroHighlightSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    roleTitle: { type: String, required: true, trim: true },
    salaryText: { type: String, required: true, trim: true },
    position: {
      type: String,
      enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'top-left',
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('HeroHighlight', heroHighlightSchema);
