const mongoose = require('mongoose');

const pujaSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Puja title is required'], trim: true },
    description: { type: String, required: true },
    price: { type: String, required: true, default: '$51 Dakshina' },
    image: { type: String, required: true },
    category: { type: String, default: 'Daily Aarti' },
    schedule: { type: String, default: 'Daily 06:30 AM & 06:30 PM' },
    benefits: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Puja = mongoose.model('Puja', pujaSchema);
module.exports = Puja;
