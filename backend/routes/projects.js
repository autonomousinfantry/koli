const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, projectController.getProjects)
    .post(protect, projectController.createProject);

router.route('/:id')
    .get(protect, projectController.getProjectById)
    .put(protect, projectController.updateProject)
    .delete(protect, projectController.deleteProject);

router.patch('/:id/status', protect, projectController.updateProjectStatus);

router.get('/search', protect, projectController.searchProjects);

module.exports = router;
