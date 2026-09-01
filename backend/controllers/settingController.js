const asyncHandler = require('express-async-handler');
const Setting = require('../models/Setting');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Donation = require('../models/Donation');
const Event = require('../models/Event');
const Puja = require('../models/Puja');
const PujaBooking = require('../models/PujaBooking');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const User = require('../models/User');
const Committee = require('../models/Committee');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({});
  }
  res.json(settings);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = new Setting(req.body);
  } else {
    Object.assign(settings, req.body);
  }
  const updatedSettings = await settings.save();
  res.json(updatedSettings);
});

// @desc    Get Admin Dashboard Stats & KPIs
// @route   GET /api/settings/admin-stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  const [
    productsCount,
    orders,
    donations,
    events,
    pujasCount,
    bookings,
    blogsCount,
    contacts,
    usersCount,
    committeeCount,
  ] = await Promise.all([
    Product.countDocuments(),
    Order.find().sort({ createdAt: -1 }),
    Donation.find().sort({ createdAt: -1 }),
    Event.find().sort({ date: 1 }),
    Puja.countDocuments(),
    PujaBooking.find().sort({ createdAt: -1 }),
    Blog.countDocuments(),
    Contact.find().sort({ createdAt: -1 }),
    User.countDocuments(),
    Committee.countDocuments(),
  ]);

  const totalStoreRevenue = orders
    .filter((o) => o.isPaid)
    .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

  const totalDonationsRaised = donations.reduce(
    (acc, curr) => acc + (curr.raised || 0),
    0
  );

  const totalDonorsCount = donations.reduce(
    (acc, curr) => acc + (curr.donorsCount || 0),
    0
  );

  const totalFestivalRsvps = events.reduce(
    (acc, curr) => acc + (curr.rsvpCount || curr.rsvps?.length || 0),
    0
  );

  res.json({
    metrics: {
      totalStoreRevenue,
      totalDonationsRaised,
      totalDonorsCount,
      totalOrdersCount: orders.length,
      paidOrdersCount: orders.filter((o) => o.isPaid).length,
      totalFestivalRsvps,
      activePujaBookings: bookings.length,
      productsCount,
      eventsCount: events.length,
      pujasCount,
      blogsCount,
      contactsCount: contacts.length,
      usersCount,
      committeeCount,
    },
    recentOrders: orders.slice(0, 5),
    recentDonations: donations.slice(0, 5),
    recentBookings: bookings.slice(0, 5),
    recentInquiries: contacts.slice(0, 5),
  });
});

module.exports = { getSettings, updateSettings, getAdminStats };
