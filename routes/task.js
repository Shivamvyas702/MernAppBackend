const express = require('express');
const router = express.Router();
const Task = require('../models/Task');



// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a task by ID
router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const newTask = new Task({ title, description, dueDate, priority });
  try {
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH route to update task status
router.patch('/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: req.body.status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});


// Delete a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
