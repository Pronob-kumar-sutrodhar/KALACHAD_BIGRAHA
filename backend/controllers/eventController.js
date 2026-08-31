const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// @desc  Get all events (with limit and category filter)
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 50;
  const category = req.query.category && req.query.category !== 'All' ? { category: req.query.category } : {};

  const events = await Event.find(category).sort({ date: 1 }).limit(limit);

  if (req.query.format === 'raw') {
    res.json(events);
  } else {
    res.json({
      events,
      count: events.length,
    });
  }
});

// @desc  Get event by ID
// @route GET /api/events/:id
// @access Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc  RSVP / Register for festival event
// @route POST /api/events/:id/rsvp
// @access Public
const rsvpEvent = asyncHandler(async (req, res) => {
  const { name, email, phone, gotra, attendees } = req.body;

  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  const rsvp = {
    name: name || 'Devotee',
    email,
    phone,
    gotra,
    attendees: Number(attendees) || 1,
    date: new Date(),
  };

  event.rsvps.push(rsvp);
  event.rsvpCount = event.rsvps.length;
  await event.save();

  res.status(200).json({
    success: true,
    message: 'RSVP registered successfully! We look forward to your presence.',
    rsvp,
  });
});

// @desc  Create an event
// @route POST /api/events
// @access Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, image, date, time, location, category, organizer, priest } = req.body;
  const event = new Event({
    title,
    description,
    image,
    date,
    time: time || '10:00 AM – 01:00 PM EST',
    location: location || 'Krishna Mega Temple &bull; Main Sanctum',
    category: category || 'Grand Festival',
    organizer: organizer || 'Temple Mahotsav Committee',
    priest: priest || 'Pandit Rakesh K. Pandey',
  });
  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc  Update an event
// @route PUT /api/events/:id
// @access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, image, date, time, location, category, organizer, priest } = req.body;

  const event = await Event.findById(req.params.id);
  if (event) {
    event.title = title || event.title;
    event.description = description || event.description;
    event.image = image || event.image;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.category = category || event.category;
    event.organizer = organizer || event.organizer;
    event.priest = priest || event.priest;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc  Delete an event
// @route DELETE /api/events/:id
// @access Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

module.exports = {
  getEvents,
  getEventById,
  rsvpEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
