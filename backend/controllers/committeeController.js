const asyncHandler = require('express-async-handler');
const Committee = require('../models/Committee');

// @desc    Get all committee members
// @route   GET /api/committee
// @access  Public
const getCommitteeMembers = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { isActive: true };
  const members = await Committee.find(filter).sort({ order: 1, createdAt: 1 });
  res.json({
    count: members.length,
    members,
  });
});

// @desc    Get single committee member by ID
// @route   GET /api/committee/:id
// @access  Public
const getCommitteeMemberById = asyncHandler(async (req, res) => {
  const member = await Committee.findById(req.params.id);
  if (!member) {
    res.status(404);
    throw new Error('Committee member not found');
  }
  res.json(member);
});

// @desc    Create a new committee member
// @route   POST /api/committee
// @access  Private/Admin
const createCommitteeMember = asyncHandler(async (req, res) => {
  const {
    nameBn,
    nameEn,
    designationBn,
    designationEn,
    photo,
    phone,
    email,
    addressBn,
    addressEn,
    bioBn,
    bioEn,
    order,
    isActive,
  } = req.body;

  const member = new Committee({
    nameBn,
    nameEn,
    designationBn,
    designationEn,
    photo: photo || '/assets/img/volunteers/1.webp',
    phone: phone || '',
    email: email || '',
    addressBn: addressBn || '',
    addressEn: addressEn || '',
    bioBn: bioBn || '',
    bioEn: bioEn || '',
    order: Number(order) || 0,
    isActive: isActive !== undefined ? Boolean(isActive) : true,
  });

  const createdMember = await member.save();
  res.status(201).json(createdMember);
});

// @desc    Update committee member
// @route   PUT /api/committee/:id
// @access  Private/Admin
const updateCommitteeMember = asyncHandler(async (req, res) => {
  const member = await Committee.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Committee member not found');
  }

  const {
    nameBn,
    nameEn,
    designationBn,
    designationEn,
    photo,
    phone,
    email,
    addressBn,
    addressEn,
    bioBn,
    bioEn,
    order,
    isActive,
  } = req.body;

  member.nameBn = nameBn !== undefined ? nameBn : member.nameBn;
  member.nameEn = nameEn !== undefined ? nameEn : member.nameEn;
  member.designationBn = designationBn !== undefined ? designationBn : member.designationBn;
  member.designationEn = designationEn !== undefined ? designationEn : member.designationEn;
  member.photo = photo !== undefined ? photo : member.photo;
  member.phone = phone !== undefined ? phone : member.phone;
  member.email = email !== undefined ? email : member.email;
  member.addressBn = addressBn !== undefined ? addressBn : member.addressBn;
  member.addressEn = addressEn !== undefined ? addressEn : member.addressEn;
  member.bioBn = bioBn !== undefined ? bioBn : member.bioBn;
  member.bioEn = bioEn !== undefined ? bioEn : member.bioEn;
  member.order = order !== undefined ? Number(order) : member.order;
  member.isActive = isActive !== undefined ? Boolean(isActive) : member.isActive;

  const updatedMember = await member.save();
  res.json(updatedMember);
});

// @desc    Delete committee member
// @route   DELETE /api/committee/:id
// @access  Private/Admin
const deleteCommitteeMember = asyncHandler(async (req, res) => {
  const member = await Committee.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Committee member not found');
  }

  await member.deleteOne();
  res.json({ message: 'Committee member deleted successfully' });
});

module.exports = {
  getCommitteeMembers,
  getCommitteeMemberById,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
};
