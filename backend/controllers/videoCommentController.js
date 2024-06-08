const VideoComment = require('../models/VideoComment');

// Get comments by video ID
exports.getCommentsByVideo = async (req, res) => {
    const { videoId } = req.params;
    try {
        const comments = await VideoComment.find({ videoId }).populate('userId', 'username').sort({ timestamp: 1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new comment
exports.addComment = async (req, res) => {
    const { videoId, userId, timestamp, text } = req.body;
    try {
        const newComment = new VideoComment({ videoId, userId, timestamp, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
