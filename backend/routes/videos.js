const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../models/Video');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.single('video'), async (req, res) => {
  try {
    const newVideo = new Video({
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    await video.remove();
    res.status(200).json({ message: 'Video removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
