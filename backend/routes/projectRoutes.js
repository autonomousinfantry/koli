const express = require('express');
const router = express.Router();
const { createProject, getProjects, updateProjectStatus, shareProject, getPublicProjects } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.put('/status', protect, updateProjectStatus);
router.put('/share', protect, shareProject);
router.get('/public', getPublicProjects);

module.exports = router;
