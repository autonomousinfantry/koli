const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');

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
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    await file.remove();
    res.status(200).json({ message: 'File removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
