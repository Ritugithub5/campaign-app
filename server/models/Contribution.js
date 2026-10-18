const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount:     { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contribution', contributionSchema);