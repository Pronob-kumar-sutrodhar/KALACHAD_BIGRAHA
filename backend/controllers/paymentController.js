const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc  Create Stripe payment intent (for orders and donations)
// @route POST /api/payment/create-payment-intent
// @access Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', description = 'Krishna Temple Payment' } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('Invalid payment amount');
  }

  // Stripe amount is in smallest currency unit (cents)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    description,
    automatic_payment_methods: { enabled: true },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
});

// @desc  Get Stripe publishable key
// @route GET /api/payment/config
// @access Public
const getStripePublishableKey = asyncHandler(async (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_PUBLISHABLE_KEY_HERE',
  });
});

module.exports = { createPaymentIntent, getStripePublishableKey };
