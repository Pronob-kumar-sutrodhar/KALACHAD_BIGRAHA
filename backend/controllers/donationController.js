const asyncHandler = require('express-async-handler');
const Donation = require('../models/Donation');

// @desc  Get all donations (with limit and category filter)
// @route GET /api/donations
// @access Public
const getDonations = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 50;
  const category = req.query.category && req.query.category !== 'All' ? { category: req.query.category } : {};

  const donations = await Donation.find(category).sort({ raised: -1 }).limit(limit);

  if (req.query.format === 'raw') {
    res.json(donations);
  } else {
    res.json({
      donations,
      count: donations.length,
    });
  }
});

// @desc  Get donation by ID
// @route GET /api/donations/:id
// @access Public
const getDonationById = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (donation) {
    res.json(donation);
  } else {
    res.status(404);
    throw new Error('Donation campaign not found');
  }
});

// @desc  Process a donation & generate 80G tax receipt
// @route POST /api/donations/:id/donate or POST /api/donations/donate
// @access Public
const processDonation = asyncHandler(async (req, res) => {
  const { amount, name, email, gotra, isAnonymous, causeId } = req.body;
  const targetId = req.params.id || causeId;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('Invalid donation amount');
  }

  const receiptId = `KMT-${Math.floor(100000 + Math.random() * 900000)}`;

  let donation = null;
  if (targetId) {
    donation = await Donation.findById(targetId);
  }

  if (donation) {
    donation.raised = (donation.raised || 0) + Number(amount);
    donation.donorsCount = (donation.donorsCount || 0) + 1;
    donation.donors.push({
      name: isAnonymous ? 'Anonymous Devotee' : name || 'Devotee',
      email,
      gotra,
      amount: Number(amount),
      isAnonymous: Boolean(isAnonymous),
      receiptId,
      date: new Date(),
    });
    await donation.save();
  }

  res.status(200).json({
    success: true,
    message: 'Donation processed successfully with blessings!',
    receiptId,
    amount: Number(amount),
    donor: isAnonymous ? 'Anonymous Devotee' : name,
    gotra: gotra || 'Universal Welfare',
    taxExemptStatus: '80G Verified 501(c)(3) Certificate Available',
    donation,
  });
});

// @desc  Create a donation campaign
// @route POST /api/donations
// @access Private/Admin
const createDonation = asyncHandler(async (req, res) => {
  const { title, description, image, raised, goal, category } = req.body;

  const donation = new Donation({
    title,
    description,
    image,
    raised: raised || 0,
    goal: goal || 50000,
    category: category || 'Annadaan Seva',
  });

  const createdDonation = await donation.save();
  res.status(201).json(createdDonation);
});

// @desc  Update a donation campaign
// @route PUT /api/donations/:id
// @access Private/Admin
const updateDonation = asyncHandler(async (req, res) => {
  const { title, description, image, raised, goal, category } = req.body;

  const donation = await Donation.findById(req.params.id);
  if (donation) {
    donation.title = title || donation.title;
    donation.description = description || donation.description;
    donation.image = image || donation.image;
    donation.raised = raised !== undefined ? raised : donation.raised;
    donation.goal = goal !== undefined ? goal : donation.goal;
    donation.category = category || donation.category;

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } else {
    res.status(404);
    throw new Error('Donation not found');
  }
});

// @desc  Delete a donation campaign
// @route DELETE /api/donations/:id
// @access Private/Admin
const deleteDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (donation) {
    await donation.deleteOne();
    res.json({ message: 'Donation campaign removed' });
  } else {
    res.status(404);
    throw new Error('Donation campaign not found');
  }
});

module.exports = {
  getDonations,
  getDonationById,
  processDonation,
  createDonation,
  updateDonation,
  deleteDonation,
};
