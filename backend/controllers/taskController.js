const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title, description, project, assignedTo, dueDate, priority } = req.body;

    try {
        const task = await Task.create({ title, description, project, assignedTo, dueDate, priority });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const getTasksByProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const updateTaskStatus = async (req, res) => {
    const { taskId, status } = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = status;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

const updateTaskDetails = async (req, res) => {
    const { taskId, title, description, assignedTo, dueDate, priority } = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.assignedTo = assignedTo || task.assignedTo;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = { createTask, getTasksByProject, updateTaskStatus, updateTaskDetails };
