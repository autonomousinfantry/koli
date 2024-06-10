const Comment = require('../models/Comment');
const asyncHandler = require('express-async-handler');

// Yorum ekleme fonksiyonu
const addComment = asyncHandler(async (req, res) => {
  const { videoId, text, timestamp } = req.body;

  const comment = await Comment.create({
    video: videoId,
    user: req.user._id,
    text,
    timestamp,
  });

  if (comment) {
    res.status(201).json(comment);
  } else {
    res.status(400);
    throw new Error('Invalid comment data');
  }
});

// Videoya ait yorumları getirme fonksiyonu
const getCommentsByVideo = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId });
  res.json(comments);
});

module.exports = { addComment, getCommentsByVideo };
