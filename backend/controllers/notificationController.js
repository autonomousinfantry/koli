const Notification = require('../models/Notification');
const io = require('../server');

// Get notifications by user ID
exports.getNotificationsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new notification
exports.createNotification = async (type, message, userId) => {
    const newNotification = new Notification({ type, message, userId });
    try {
        await newNotification.save();
        io.emit('newNotification', newNotification); // Emit notification to clients
    } catch (err) {
        console.error('Error creating notification', err);
    }
};
