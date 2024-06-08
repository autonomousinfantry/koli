const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, fileController.uploadFile);
router.get('/:projectId', protect, fileController.getFilesByProject);

module.exports = router;
