const File = require('../models/File');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage }).single('file');

// Upload a file
exports.uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const { projectId } = req.body;

        const newFile = new File({
            name: req.file.filename,
            url: `/uploads/${req.file.filename}`,
            projectId,
        });

        try {
            await newFile.save();
            res.status(201).json(newFile);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

// Get files by project ID
exports.getFilesByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const files = await File.find({ projectId });
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
