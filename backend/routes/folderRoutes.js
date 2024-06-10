const express = require('express');
const { createFolder, createPrivateFolder, renameFolder, moveFolder, copyFolder, duplicateFolder, makeFolderPrivate, deleteFolder, shareFolder } = require('../controllers/folderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createFolder);
router.post('/create-private', protect, createPrivateFolder);
router.put('/rename', protect, renameFolder);
router.put('/move', protect, moveFolder);
router.put('/copy', protect, copyFolder);
router.put('/duplicate', protect, duplicateFolder);
router.put('/make-private', protect, makeFolderPrivate);
router.delete('/delete', protect, deleteFolder);
router.put('/share', protect, shareFolder);

module.exports = router;
