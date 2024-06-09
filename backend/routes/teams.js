const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, teamController.createTeam);
router.post('/add-member', protect, teamController.addMember);
router.get('/:projectId', protect, teamController.getTeamByProject);
router.post('/remove-member', protect, teamController.removeMember);

module.exports = router;
