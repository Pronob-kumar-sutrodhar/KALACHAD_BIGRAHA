const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
  getAdminStats,
} = require('../controllers/settingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSettings).put(protect, admin, updateSettings);
router.route('/admin-stats').get(protect, admin, getAdminStats);

module.exports = router;
