const crypto = require("crypto");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../store/taskStore");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../validators/taskValidator");

const listTasks = (req, res) => {
  res.status(200).json({
    success: true,
    data: getAllTasks(),
  });
};

const addTask = (req, res) => {
  const validation = validateCreateTask(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      error: validation.message,
    });
  }

  const task = {
    id: crypto.randomUUID(),
    title: req.body.title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  createTask(task);

  return res.status(201).json({
    success: true,
    data: task,
  });
};

const updateTaskCompletion = (req, res) => {
  const validation = validateUpdateTask(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      error: validation.message,
    });
  }

  const updatedTask = updateTask(req.params.id, validation.changes);

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      error: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedTask,
  });
};

const removeTask = (req, res) => {
  const deleted = deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};

module.exports = {
  listTasks,
  addTask,
  updateTaskCompletion,
  removeTask,
};
