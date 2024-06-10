const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Kullanıcı kayıt rotası
router.post('/register', registerUser);

// Kullanıcı giriş rotası
router.post('/login', loginUser);

// Kullanıcı profilini güncelleme rotası (korumalı)
router.put('/profile', protect, updateUserProfile);

module.exports = router;
