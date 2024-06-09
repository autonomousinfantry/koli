const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env dosyasını okumak için dotenv'i konfigüre edin
const authRoutes = require('./controllers/authController');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

if (!CONNECTION_URL) {
  console.error("Error: MongoDB URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
