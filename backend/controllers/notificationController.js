const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).populate('relatedProject relatedVideo');
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const markAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = { getNotifications, markAsRead };
