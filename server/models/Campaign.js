const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title:     { type: String, required: true },
    message:   { type: String, required: true },
    story:     { type: String, default: '' },
    imageUrl:  { type: String, default: '' },
    category: {
      type: String,
      enum: ['Water', 'Health', 'Education', 'Environment', 'Community', 'Other'],
      default: 'Other',
    },
    sources: [
      {
        label: { type: String },
        url:   { type: String },
      },
    ],
    goalAmount:     { type: Number, required: true, default: 0 },
    raisedAmount:   { type: Number, default: 0 },
    reachTarget:    { type: Number, default: 0 },
    reachDelivered: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'live', 'completed'],
      default: 'pending',
    },
    
    // 👇 NEW: Review Data 👇
    reviewedBy:  { type: String },
    reviewNotes: { type: String },
    checklist:   { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);