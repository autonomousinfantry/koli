const Project = require('../models/Project');
const Notification = require('../models/Notification');

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new project
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const newProject = new Project({
        name,
        description,
        userId: req.user._id,
    });

    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.name = name || project.name;
            project.description = description || project.description;

            const updatedProject = await project.save();
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.remove();
            res.status(200).json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update project status
exports.updateProjectStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.status = status;
            await project.save();

            // Create a notification for the status update
            const newNotification = new Notification({
                type: 'status',
                message: `Project "${project.name}" status updated to ${status}`,
                projectId: project._id,
                userId: project.userId, // Assuming project has userId field
            });
            await newNotification.save();

            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search projects by name
exports.searchProjects = async (req, res) => {
    const { query } = req.query;
    try {
        const projects = await Project.find({
            name: { $regex: query, $options: 'i' },
            userId: req.user._id, // Only search user's projects
        });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
