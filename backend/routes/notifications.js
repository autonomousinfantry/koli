const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/user/:userId', protect, notificationController.getNotificationsByUser);
router.patch('/:id/read', protect, notificationController.markAsRead);

module.exports = router;
