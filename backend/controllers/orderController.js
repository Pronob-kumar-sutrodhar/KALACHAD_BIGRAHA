const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc  Create new order
// @route POST /api/orders
// @access Public / Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    orderItems,
    user: req.user ? req.user._id : undefined,
    shippingAddress,
    paymentMethod: paymentMethod || 'Stripe Online',
    itemsPrice: Number(itemsPrice) || 0,
    taxPrice: Number(taxPrice) || 0,
    shippingPrice: Number(shippingPrice) || 0,
    totalPrice: Number(totalPrice) || 0,
    isPaid: paymentMethod === 'Stripe Online' ? false : false,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc  Get order by ID
// @route GET /api/orders/:id
// @access Public / Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status || 'PAID',
      updateTime: req.body.update_time || new Date().toISOString(),
      emailAddress: req.body.payer ? req.body.payer.email_address : req.body.emailAddress,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  Delete order
// @route DELETE /api/orders/:id
// @access Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.deleteOne();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  Get logged-in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc  Get all orders (admin)
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
  getMyOrders,
  getOrders,
};
