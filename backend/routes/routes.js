const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all Task
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a Task
router.post('/', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// Update a task
router.put('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
