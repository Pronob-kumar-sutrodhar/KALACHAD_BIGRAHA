const express = require('express');
const router = express.Router();
const { submitContact, getContactInquiries } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(submitContact).get(protect, admin, getContactInquiries);

module.exports = router;
