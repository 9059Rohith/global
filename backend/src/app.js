const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/tasks", tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
