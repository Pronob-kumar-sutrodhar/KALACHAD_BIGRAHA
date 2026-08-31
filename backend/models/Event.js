const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    gotra: { type: String },
    attendees: { type: Number, default: 1 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Event title is required'], trim: true },
    description: { type: String, required: [true, 'Event description is required'] },
    image: { type: String, required: [true, 'Event image is required'] },
    date: { type: Date, required: [true, 'Event date is required'] },
    time: { type: String, default: '10:00 AM – 01:00 PM EST' },
    location: { type: String, required: [true, 'Event location is required'], default: 'Krishna Mega Temple &bull; Main Sanctum' },
    category: { type: String, required: [true, 'Event category is required'], default: 'Grand Festival' },
    organizer: { type: String, default: 'Temple Mahotsav Committee' },
    priest: { type: String, default: 'Pandit Rakesh K. Pandey' },
    rsvpCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    rsvps: [rsvpSchema],
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
