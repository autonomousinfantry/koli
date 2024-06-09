const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:projectId', protect, activityController.getActivitiesByProject);

module.exports = router;
