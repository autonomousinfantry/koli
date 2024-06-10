const express = require('express');
const { createTask, getTasksByProject, updateTaskStatus, updateTaskDetails } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createTask);
router.get('/:projectId', protect, getTasksByProject);
router.put('/status', protect, updateTaskStatus);
router.put('/details', protect, updateTaskDetails);

module.exports = router;
