const asyncHandler = require('express-async-handler');
const Puja = require('../models/Puja');
const PujaBooking = require('../models/PujaBooking');

// @desc  Get all puja offerings
// @route GET /api/pujas
// @access Public
const getPujas = asyncHandler(async (req, res) => {
  const category = req.query.category && req.query.category !== 'All' ? { category: req.query.category } : {};
  const pujas = await Puja.find(category);
  res.json({
    pujas,
    count: pujas.length,
  });
});

// @desc  Get puja offering by ID
// @route GET /api/pujas/:id
// @access Public
const getPujaById = asyncHandler(async (req, res) => {
  const puja = await Puja.findById(req.params.id);
  if (puja) {
    res.json(puja);
  } else {
    res.status(404);
    throw new Error('Puja service not found');
  }
});

// @desc  Book a Puja / Sankalp
// @route POST /api/pujas/book
// @access Public
const bookPuja = asyncHandler(async (req, res) => {
  const {
    pujaTitle,
    dakshina,
    devoteeName,
    phone,
    email,
    gotra,
    nakshatra,
    date,
    timeSlot,
    mode,
    prasadDelivery,
  } = req.body;

  if (!devoteeName || !phone || !date) {
    res.status(400);
    throw new Error('Please provide devotee name, contact phone, and date for puja sankalp.');
  }

  const bookingRef = `PUJA-${Math.floor(10000 + Math.random() * 90000)}`;

  const booking = new PujaBooking({
    user: req.user ? req.user._id : undefined,
    pujaTitle: pujaTitle || 'Daily Aarti & Archana',
    dakshina: dakshina || '৳ ৫০১ দক্ষিণা',
    devoteeName,
    phone,
    email,
    gotra,
    nakshatra,
    date,
    timeSlot: timeSlot || '06:30 AM - Mangala Aarti',
    mode: mode || 'In-Person at Mandir',
    prasadDelivery: Boolean(prasadDelivery),
    bookingRef,
    status: 'Confirmed',
  });

  const createdBooking = await booking.save();

  res.status(201).json({
    success: true,
    message: 'Puja Sankalp registered successfully! Priest will chant mantras in your name.',
    booking: createdBooking,
    bookingRef,
  });
});

// @desc  Get logged-in devotee puja bookings
// @route GET /api/pujas/mybookings
// @access Private
const getMyPujaBookings = asyncHandler(async (req, res) => {
  const bookings = await PujaBooking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
});

// @desc  Get all puja bookings (admin)
// @route GET /api/pujas/bookings
// @access Private/Admin
const getAllPujaBookings = asyncHandler(async (req, res) => {
  const bookings = await PujaBooking.find({}).sort({ createdAt: -1 });
  res.json(bookings);
});

// @desc  Update devotee booking status (admin)
// @route PUT /api/pujas/bookings/:id
// @access Private/Admin
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await PujaBooking.findById(req.params.id);
  if (booking) {
    booking.status = status || booking.status;
    const updated = await booking.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc  Delete devotee booking (admin)
// @route DELETE /api/pujas/bookings/:id
// @access Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await PujaBooking.findById(req.params.id);
  if (booking) {
    await booking.deleteOne();
    res.json({ message: 'Booking removed' });
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc  Create a new puja offering type
// @route POST /api/pujas
// @access Private/Admin
const createPuja = asyncHandler(async (req, res) => {
  const { title, description, price, image, category, schedule, benefits } = req.body;
  const puja = new Puja({
    title,
    description,
    price: price || '৳ ৫০১ দক্ষিণা',
    image: image || '/assets/img/puja/1.webp',
    category: category || 'Daily Aarti',
    schedule: schedule || 'Daily 06:30 AM & 06:30 PM',
    benefits: benefits || [],
  });
  const createdPuja = await puja.save();
  res.status(201).json(createdPuja);
});

// @desc  Update puja offering
// @route PUT /api/pujas/:id
// @access Private/Admin
const updatePuja = asyncHandler(async (req, res) => {
  const { title, description, price, image, category, schedule, benefits } = req.body;
  const puja = await Puja.findById(req.params.id);
  if (puja) {
    puja.title = title || puja.title;
    puja.description = description || puja.description;
    puja.price = price || puja.price;
    puja.image = image || puja.image;
    puja.category = category || puja.category;
    puja.schedule = schedule || puja.schedule;
    if (benefits) puja.benefits = benefits;

    const updated = await puja.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Puja offering not found');
  }
});

// @desc  Delete puja offering
// @route DELETE /api/pujas/:id
// @access Private/Admin
const deletePuja = asyncHandler(async (req, res) => {
  const puja = await Puja.findById(req.params.id);
  if (puja) {
    await puja.deleteOne();
    res.json({ message: 'Puja offering removed' });
  } else {
    res.status(404);
    throw new Error('Puja offering not found');
  }
});

module.exports = {
  getPujas,
  getPujaById,
  bookPuja,
  getMyPujaBookings,
  getAllPujaBookings,
  updateBookingStatus,
  deleteBooking,
  createPuja,
  updatePuja,
  deletePuja,
};
