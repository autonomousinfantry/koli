const express = require('express');
const router = express.Router();
const { enable2FA, verify2FA } = require('../controllers/2faController');
const { protect } = require('../middleware/authMiddleware');

router.post('/enable', protect, enable2FA);
router.post('/verify', protect, verify2FA);

module.exports = router;
