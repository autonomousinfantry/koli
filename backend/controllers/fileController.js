const File = require('../models/File');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

// AWS S3 setup
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer S3 setup
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
}).single('file');

// Upload a file to S3
exports.uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const { projectId } = req.body;

        const newFile = new File({
            name: req.file.originalname,
            url: req.file.location,
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
