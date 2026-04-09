const express = require("express");
const {
  listTasks,
  addTask,
  updateTaskCompletion,
  removeTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", listTasks);
router.post("/", addTask);
router.patch("/:id", updateTaskCompletion);
router.delete("/:id", removeTask);

module.exports = router;
