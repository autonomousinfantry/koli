const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, commentController.addComment);
router.get('/:fileId', protect, commentController.getCommentsByFile);

module.exports = router;
