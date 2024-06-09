const express = require('express');
const router = express.Router();
const { getComments, addComment, deleteComment, updateComment } = require('../controllers/commentsController');

router.get('/:videoId', getComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);
router.put('/:id', updateComment);

module.exports = router;
