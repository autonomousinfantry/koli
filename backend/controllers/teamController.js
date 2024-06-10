const Team = require('../models/Team');
const User = require('../models/User');

const createTeam = async (req, res) => {
    const { name, members } = req.body;

    try {
        const team = await Team.create({
            name,
            members,
            owner: req.user._id,
        });

        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({ owner: req.user._id }).populate('members', 'name email');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const addMember = async (req, res) => {
    const { teamId, memberId } = req.body;

    try {
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        team.members.push(memberId);
        await team.save();

        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = { createTeam, getTeams, addMember };
