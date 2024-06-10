const Folder = require('../models/Folder');
const User = require('../models/User');

const createFolder = async (req, res) => {
  const { name, projectId } = req.body;

  try {
    const folder = await Folder.create({ name, project: projectId, user: req.user._id });
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const createPrivateFolder = async (req, res) => {
  const { name, projectId } = req.body;

  try {
    const folder = await Folder.create({ name, project: projectId, user: req.user._id, isPrivate: true });
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const renameFolder = async (req, res) => {
  const { folderId, newName } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    folder.name = newName;
    await folder.save();
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const moveFolder = async (req, res) => {
  const { folderId, newProjectId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    folder.project = newProjectId;
    await folder.save();
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const copyFolder = async (req, res) => {
  const { folderId, targetProjectId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    const newFolder = await Folder.create({
      name: folder.name,
      project: targetProjectId,
      user: folder.user,
      isPrivate: folder.isPrivate,
    });
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const duplicateFolder = async (req, res) => {
  const { folderId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    const newFolder = await Folder.create({
      name: `${folder.name} (Copy)`,
      project: folder.project,
      user: folder.user,
      isPrivate: folder.isPrivate,
    });
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const makeFolderPrivate = async (req, res) => {
  const { folderId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    folder.isPrivate = true;
    await folder.save();
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const deleteFolder = async (req, res) => {
  const { folderId } = req.body;

  try {
    await Folder.findByIdAndDelete(folderId);
    res.json({ message: 'Folder deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

const shareFolder = async (req, res) => {
  const { folderId, userEmail } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    folder.sharedWith.push(user._id);
    await folder.save();
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  createFolder,
  createPrivateFolder,
  renameFolder,
  moveFolder,
  copyFolder,
  duplicateFolder,
  makeFolderPrivate,
  deleteFolder,
  shareFolder,
};
