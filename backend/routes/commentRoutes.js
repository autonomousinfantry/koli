const express = require('express');
const router = express.Router();
const { addComment, getCommentsByVideo } = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addComment);
router.get('/:videoId', protect, getCommentsByVideo);

module.exports = router;
