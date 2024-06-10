const express = require('express');
const router = express.Router();
const { uploadVideo, getVideos, updateVideoStatus, getPublicVideo, searchVideos } = require('../controllers/videoController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/upload', protect, uploadVideo);
router.get('/', protect, getVideos);
router.put('/status', protect, updateVideoStatus);
router.get('/public/:id', getPublicVideo);
router.get('/search', protect, searchVideos);

module.exports = router;
