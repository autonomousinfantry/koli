const express = require('express');
const { createVersion, getVersionsByVideo } = require('../controllers/versionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createVersion);
router.get('/:videoId', protect, getVersionsByVideo);

module.exports = router;
