const Comment = require('../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
    const { text, timestamp, fileId, userId } = req.body;
    try {
        const newComment = new Comment({ text, timestamp, fileId, userId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get comments by file ID
exports.getCommentsByFile = async (req, res) => {
    const { fileId } = req.params;
    try {
        const comments = await Comment.find({ fileId }).populate('userId', 'username');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
