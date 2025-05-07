const Task = require('../models/Task');

// GET /api/tasks
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Görev bulunamadı' });
  res.json(task);
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.status(201).json(task);
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  const { title, description, done } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, done },
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Güncellenecek görev bulunamadı' });
  res.json(task);
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: 'Silinecek görev bulunamadı' });
  res.json({ message: 'Görev silindi' });
};
