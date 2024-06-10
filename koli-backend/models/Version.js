const mongoose = require('mongoose');

const VersionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    versionNumber: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Version', VersionSchema);
