const express = require('express');
const { submitFeedback, getFeedbacksByProject } = require('../controllers/feedbackController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/:projectId', getFeedbacksByProject);

module.exports = router;
