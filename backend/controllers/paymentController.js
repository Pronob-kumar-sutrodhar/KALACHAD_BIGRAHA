const asyncHandler = require('express-async-handler');

// Helper to reliably get Stripe instance with active secret key
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined. Please set it in your backend .env file.');
  }
  return require('stripe')(secretKey);
};

// @desc    Create Stripe Checkout Session (Redirects to Stripe Hosted Portal)
// @route   POST /api/payment/create-checkout-session
// @access  Public / Devotees
const createCheckoutSession = asyncHandler(async (req, res) => {
  const {
    items = [],
    amount,
    title,
    customerEmail,
    successUrl,
    cancelUrl,
    orderId,
    type = 'order',
  } = req.body;

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const stripe = getStripeInstance();

  let line_items = [];

  if (items && items.length > 0) {
    line_items = items.map((item) => {
      const unitAmount = Math.max(Math.round(Number(item.price || 0) * 100), 50); // amount in cents/poisha
      return {
        price_data: {
          currency: 'bdt', // Bangladeshi Taka
          product_data: {
            name: item.name || 'Sacred Temple Offering',
            description: item.description || `Krishna Mega Temple - ${type.toUpperCase()}`,
            images: item.image && item.image.startsWith('http') ? [item.image] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: item.qty || item.quantity || 1,
      };
    });
  } else if (amount && amount > 0) {
    line_items = [
      {
        price_data: {
          currency: 'bdt',
          product_data: {
            name: title || (type === 'donation' ? 'মন্দির সেবা দান (Temple Seva Donation)' : 'শ্রীমন্দির পূজা সংকল্প (Puja Sankalp)'),
            description: `Devotional offering at Sri Sri Krishna Mega Temple (Ref: ${orderId || 'Direct'})`,
          },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      },
    ];
  } else {
    res.status(400);
    throw new Error('Please provide valid items or amount for payment');
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    customer_email: customerEmail || undefined,
    success_url: successUrl || `${clientUrl}/checkout?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId || ''}&status=success`,
    cancel_url: cancelUrl || `${clientUrl}/checkout?status=cancelled`,
    metadata: {
      orderId: orderId || '',
      type,
      customerEmail: customerEmail || '',
    },
  });

  res.json({
    id: session.id,
    url: session.url, // Real official Stripe Checkout URL
  });
});

// @desc    Verify Stripe Checkout Session after redirect
// @route   GET /api/payment/verify-session/:sessionId
// @access  Public
const verifyCheckoutSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    res.status(400);
    throw new Error('Session ID required');
  }

  try {
    const stripe = getStripeInstance();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({
      id: session.id,
      paymentStatus: session.payment_status, // 'paid', 'unpaid', 'no_payment_required'
      status: session.status, // 'complete', 'open', 'expired'
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      customerEmail: session.customer_details?.email || session.customer_email,
      customerName: session.customer_details?.name,
      metadata: session.metadata,
    });
  } catch (error) {
    res.status(404);
    throw new Error(`Stripe session error: ${error.message}`);
  }
});

// @desc    Create Stripe payment intent (for in-page card element)
// @route   POST /api/payment/create-payment-intent
// @access  Public
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'bdt', description = 'Krishna Temple Payment' } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('Invalid payment amount');
  }

  const stripe = getStripeInstance();
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

// @desc    Get Stripe publishable key
// @route   GET /api/payment/config
// @access  Public
const getStripePublishableKey = asyncHandler(async (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  });
});

module.exports = {
  createCheckoutSession,
  verifyCheckoutSession,
  createPaymentIntent,
  getStripePublishableKey,
};
