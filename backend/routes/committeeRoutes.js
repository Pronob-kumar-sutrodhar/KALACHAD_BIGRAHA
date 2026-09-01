const express = require('express');
const router = express.Router();
const {
  getCommitteeMembers,
  getCommitteeMemberById,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
} = require('../controllers/committeeController');
const { protect, admin } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getCommitteeMembers)
  .post(protect, admin, createCommitteeMember);

router
  .route('/:id')
  .get(getCommitteeMemberById)
  .put(protect, admin, updateCommitteeMember)
  .delete(protect, admin, deleteCommitteeMember);

module.exports = router;
