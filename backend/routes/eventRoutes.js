const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  rsvpEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getEvents).post(protect, admin, createEvent);
router.route('/:id').get(getEventById).put(protect, admin, updateEvent).delete(protect, admin, deleteEvent);
router.route('/:id/rsvp').post(rsvpEvent);

module.exports = router;
