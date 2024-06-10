const Project = require('../models/Project');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Proje oluşturma fonksiyonu
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    user: req.user._id,
  });

  if (project) {
    res.status(201).json(project);
  } else {
    res.status(400);
    throw new Error('Invalid project data');
  }
});

// Projeleri getirme fonksiyonu
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

// Proje durumunu güncelleme fonksiyonu
const updateProjectStatus = asyncHandler(async (req, res) => {
  const { projectId, status } = req.body;

  const project = await Project.findById(projectId);

  if (project) {
    project.status = status;
    await project.save();
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// Proje paylaşma fonksiyonu
const shareProject = asyncHandler(async (req, res) => {
  const { projectId, userEmail } = req.body;

  const project = await Project.findById(projectId);
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  project.sharedWith.push(user._id);
  await project.save();
  res.json(project);
});

// Public projeleri getirme fonksiyonu
const getPublicProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ isPublic: true });
  res.json(projects);
});

module.exports = { createProject, getProjects, updateProjectStatus, shareProject, getPublicProjects };
