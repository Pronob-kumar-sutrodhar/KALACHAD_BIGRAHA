const express = require('express');
const router = express.Router();
const {
  getDonations,
  getDonationById,
  processDonation,
  createDonation,
  updateDonation,
  deleteDonation,
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getDonations).post(protect, admin, createDonation);
router.route('/donate').post(processDonation);
router.route('/:id/donate').post(processDonation);
router.route('/:id').get(getDonationById).put(protect, admin, updateDonation).delete(protect, admin, deleteDonation);

module.exports = router;
