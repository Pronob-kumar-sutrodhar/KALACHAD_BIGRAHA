const express = require('express');
const router = express.Router();
const {
  createCheckoutSession,
  verifyCheckoutSession,
  createPaymentIntent,
  getStripePublishableKey,
} = require('../controllers/paymentController');

router.get('/config', getStripePublishableKey);
router.post('/create-checkout-session', createCheckoutSession);
router.get('/verify-session/:sessionId', verifyCheckoutSession);
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
