const Task = require('../models/Task');

// GET /api/tasks
exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  };

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Görev bulunamadı.' });
  res.json(task);
};

// POST /api/tasks
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      user: req.userId
    });
    await task.save();
    res.status(201).json(task);
  };

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    const { title, description, done } = req.body;
  
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // sadece kendi görevin
      { title, description, done },
      { new: true }
    );
  
    if (!task) {
      return res.status(404).json({ message: 'Görev bulunamadı veya yetkisiz işlem.' });
    }
  
    res.json(task);
  };

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Görev bulunamadı.' });
  res.json({ message: 'Görev silindi' });
};
