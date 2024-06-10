const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['Devam Ediyor', 'İnceleme Gerekiyor', 'Onaylandı', 'Tamamlandı'], 
        default: 'Devam Ediyor' 
    },
}, { timestamps: true });

VideoSchema.index({ name: 'text' });

module.exports = mongoose.model('Video', VideoSchema);
