const Video = require('../models/Video');
const asyncHandler = require('express-async-handler');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Multer S3 config
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    },
  }),
});

// Video yükleme fonksiyonu
const uploadVideo = asyncHandler(async (req, res) => {
  upload.array('video', 1)(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }

    const video = await Video.create({
      url: req.files[0].location,
      user: req.user._id,
    });

    if (video) {
      res.status(201).json(video);
    } else {
      res.status(400);
      throw new Error('Invalid video data');
    }
  });
});

// Videoları getirme fonksiyonu
const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ user: req.user._id });
  res.json(videos);
});

// Video durumunu güncelleme fonksiyonu
const updateVideoStatus = asyncHandler(async (req, res) => {
  const { videoId, status } = req.body;

  const video = await Video.findById(videoId);

  if (video) {
    video.status = status;
    await video.save();
    res.json(video);
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});

// Public videoyu getirme fonksiyonu
const getPublicVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video && video.isPublic) {
    res.json(video);
  } else {
    res.status(404);
    throw new Error('Video not found or not public');
  }
});

// Videoları arama fonksiyonu
const searchVideos = asyncHandler(async (req, res) => {
  const searchTerm = req.query.q;
  const videos = await Video.find({ user: req.user._id, title: { $regex: searchTerm, $options: 'i' } });
  res.json(videos);
});

module.exports = { uploadVideo, getVideos, updateVideoStatus, getPublicVideo, searchVideos };
