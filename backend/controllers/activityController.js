const Activity = require('../models/Activity');

// Get activities by project ID
exports.getActivitiesByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const activities = await Activity.find({ projectId }).sort({ createdAt: -1 });
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new activity
exports.createActivity = async (message, projectId) => {
    const newActivity = new Activity({ message, projectId });
    try {
        await newActivity.save();
    } catch (err) {
        console.error('Error creating activity', err);
    }
};
