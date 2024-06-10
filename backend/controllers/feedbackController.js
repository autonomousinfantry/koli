const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
    const { projectId, rating, comment } = req.body;

    try {
        const feedback = await Feedback.create({
            user: req.user._id,
            project: projectId,
            rating,
            comment,
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const getFeedbacksByProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        const feedbacks = await Feedback.find({ project: projectId }).populate('user', 'name');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = { submitFeedback, getFeedbacksByProject };
