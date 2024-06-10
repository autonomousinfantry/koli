const Version = require('../models/Version');
const Video = require('../models/Video');

const createVersion = async (req, res) => {
    const { videoId, url, name } = req.body;

    try {
        const video = await Video.findById(videoId);
        const versionNumber = video.versions.length + 1;

        const version = await Version.create({
            name,
            url,
            user: req.user._id,
            project: video.project,
            video: videoId,
            versionNumber,
        });

        video.versions.push(version._id);
        await video.save();

        res.status(201).json(version);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const getVersionsByVideo = async (req, res) => {
    const { videoId } = req.params;

    try {
        const versions = await Version.find({ video: videoId }).sort({ versionNumber: -1 });
        res.json(versions);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = { createVersion, getVersionsByVideo };
