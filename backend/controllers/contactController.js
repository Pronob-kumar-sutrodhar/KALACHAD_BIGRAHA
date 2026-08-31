const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

// @desc  Handle contact form / prayer request submission
// @route POST /api/contact
// @access Public
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please fill in name, email, and message fields.');
  }

  const contact = new Contact({
    name,
    email,
    phone,
    subject: subject || 'General Devotee Inquiries',
    message,
    status: 'new',
  });

  const savedContact = await contact.save();

  console.log('--- New Devotee Inquiry / Prayer Request ---');
  console.log(`Name:    ${name}`);
  console.log(`Email:   ${email}`);
  console.log(`Phone:   ${phone}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('--------------------------------------------');

  res.status(200).json({
    success: true,
    message: 'Thank you! Your message and prayer request have been recorded. Our temple team will respond shortly.',
    inquiry: savedContact,
  });
});

// @desc  Get all contact inquiries (admin)
// @route GET /api/contact
// @access Private/Admin
const getContactInquiries = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = { submitContact, getContactInquiries };
