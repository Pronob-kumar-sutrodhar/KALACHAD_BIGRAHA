const express = require('express');
const router = express.Router();
const { createPaymentIntent, getStripePublishableKey } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/config', getStripePublishableKey);
router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;
