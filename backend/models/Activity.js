const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Activity', activitySchema);
