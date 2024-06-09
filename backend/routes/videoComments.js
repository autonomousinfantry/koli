const express = require('express');
const router = express.Router();
const videoCommentController = require('../controllers/videoCommentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:videoId', protect, videoCommentController.getCommentsByVideo);
router.post('/', protect, videoCommentController.addComment);

module.exports = router;
