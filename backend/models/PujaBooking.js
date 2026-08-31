const mongoose = require('mongoose');

const pujaBookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pujaTitle: { type: String, required: true },
    dakshina: { type: String, default: '$51' },
    devoteeName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    gotra: { type: String },
    nakshatra: { type: String },
    date: { type: String, required: true },
    timeSlot: { type: String, default: '06:30 AM - Mangala Aarti' },
    mode: { type: String, enum: ['In-Person at Mandir', 'Online / Live Stream'], default: 'In-Person at Mandir' },
    prasadDelivery: { type: Boolean, default: false },
    bookingRef: { type: String, required: true, unique: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Confirmed' },
  },
  { timestamps: true }
);

const PujaBooking = mongoose.model('PujaBooking', pujaBookingSchema);
module.exports = PujaBooking;
