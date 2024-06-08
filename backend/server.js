const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/files'); // Eğer bir files routes oluşturduysanız

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFile = (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    return s3.upload(params).promise();
};

app.post('/upload', async (req, res) => {
    try {
        const file = req.files.file;
        const data = await uploadFile(file);
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes); // Eğer bir files routes oluşturduysanız

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
