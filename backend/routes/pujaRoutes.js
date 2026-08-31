const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/pujaController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPujas).post(protect, admin, createPuja);
router.route('/book').post(bookPuja);
router.route('/mybookings').get(protect, getMyPujaBookings);
router.route('/bookings').get(protect, admin, getAllPujaBookings);
router.route('/bookings/:id').put(protect, admin, updateBookingStatus).delete(protect, admin, deleteBooking);
router.route('/:id').get(getPujaById).put(protect, admin, updatePuja).delete(protect, admin, deletePuja);

module.exports = router;
