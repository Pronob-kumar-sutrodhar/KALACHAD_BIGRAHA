const express = require('express');
const router = express.Router();
const {
  getPujas,
  getPujaById,
  bookPuja,
  getMyPujaBookings,
  getAllPujaBookings,
  createPuja,
} = require('../controllers/pujaController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPujas).post(protect, admin, createPuja);
router.route('/book').post(bookPuja);
router.route('/mybookings').get(protect, getMyPujaBookings);
router.route('/bookings').get(protect, admin, getAllPujaBookings);
router.route('/:id').get(getPujaById);

module.exports = router;
