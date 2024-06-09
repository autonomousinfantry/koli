const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team
exports.createTeam = async (req, res) => {
    const { name, projectId } = req.body;
    try {
        const newTeam = new Team({ name, projectId });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a member to the team
exports.addMember = async (req, res) => {
    const { teamId, userId, role } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        team.members.push({ userId, role });
        await team.save();
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get team members by project ID
exports.getTeamByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const team = await Team.findOne({ projectId }).populate('members.userId', 'username email');
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove a member from the team
exports.removeMember = async (req, res) => {
    const { teamId, userId } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        team.members = team.members.filter(member => member.userId.toString() !== userId);
        await team.save();
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
