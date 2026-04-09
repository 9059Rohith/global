const fs = require("fs");
const path = require("path");

const DATA_FILE_PATH = path.join(__dirname, "tasks.json");

const loadTasks = () => {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return [];
  }

  try {
    const rawData = fs.readFileSync(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const tasks = loadTasks();

const persistTasks = () => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
};

const getAllTasks = () => tasks;

const getTaskById = (id) => tasks.find((task) => task.id === id);

const createTask = (task) => {
  tasks.push(task);
  persistTasks();
  return task;
};

const updateTask = (id, changes) => {
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  Object.assign(task, changes);
  persistTasks();
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  persistTasks();
  return true;
};

module.exports = {
  tasks,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
