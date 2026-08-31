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
    phone: phone || '',
    subject: subject || 'General Devotee Inquiries',
    message,
    status: 'new',
  });

  const savedContact = await contact.save();

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

// @desc  Delete contact inquiry
// @route DELETE /api/contact/:id
// @access Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    await contact.deleteOne();
    res.json({ message: 'Inquiry removed' });
  } else {
    res.status(404);
    throw new Error('Inquiry not found');
  }
});

module.exports = { submitContact, getContactInquiries, deleteContact };
