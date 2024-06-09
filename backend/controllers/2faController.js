const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');

// Enable 2FA for user
exports.enable2FA = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const secret = speakeasy.generateSecret({ length: 20 });
        user.twoFactorEnabled = true;
        user.twoFactorSecret = secret.base32;

        await user.save();

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        res.status(200).json({
            message: '2FA enabled',
            secret: secret.base32,
            qrCodeUrl,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Verify 2FA token
exports.verify2FA = (req, res) => {
    const { token } = req.body;
    const user = req.user;

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
    });

    if (verified) {
        res.status(200).json({ message: '2FA verified' });
    } else {
        res.status(401).json({ message: 'Invalid 2FA token' });
    }
};
