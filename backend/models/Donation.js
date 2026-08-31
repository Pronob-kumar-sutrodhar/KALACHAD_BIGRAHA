const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Anonymous Devotee' },
    email: { type: String },
    gotra: { type: String },
    amount: { type: Number, required: true },
    isAnonymous: { type: Boolean, default: false },
    receiptId: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const donationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Donation title is required'], trim: true },
    description: { type: String, required: [true, 'Donation description is required'] },
    image: { type: String, required: [true, 'Donation image is required'] },
    raised: { type: Number, default: 0 },
    goal: { type: Number, required: [true, 'Donation goal is required'] },
    category: {
      type: String,
      required: [true, 'Donation category is required'],
      default: 'Annadaan Seva',
    },
    donorsCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    donors: [donorSchema],
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
