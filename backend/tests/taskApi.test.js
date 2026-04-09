const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const request = require("supertest");
const app = require("../src/app");
const { tasks } = require("../src/store/taskStore");

const TASKS_FILE = path.join(__dirname, "..", "src", "store", "tasks.json");

const resetState = () => {
  tasks.splice(0, tasks.length);
  fs.writeFileSync(TASKS_FILE, "[]\n", "utf8");
};

test.beforeEach(() => {
  resetState();
});

test("GET /tasks returns an empty array initially", async () => {
  const response = await request(app).get("/tasks");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.deepEqual(response.body.data, []);
});

test("POST /tasks creates a task with required fields", async () => {
  const response = await request(app).post("/tasks").send({ title: "Buy groceries" });

  assert.equal(response.status, 201);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.title, "Buy groceries");
  assert.equal(response.body.data.completed, false);
  assert.ok(response.body.data.id);
  assert.ok(response.body.data.createdAt);
});

test("POST /tasks validates empty title", async () => {
  const response = await request(app).post("/tasks").send({ title: "   " });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error, "Title is required");
});

test("PATCH /tasks/:id updates completed status", async () => {
  const created = await request(app).post("/tasks").send({ title: "Read book" });

  const response = await request(app)
    .patch(`/tasks/${created.body.data.id}`)
    .send({ completed: true });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.completed, true);
});

test("PATCH /tasks/:id updates title", async () => {
  const created = await request(app).post("/tasks").send({ title: "Old title" });

  const response = await request(app)
    .patch(`/tasks/${created.body.data.id}`)
    .send({ title: "New title" });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.title, "New title");
});

test("DELETE /tasks/:id removes a task", async () => {
  const created = await request(app).post("/tasks").send({ title: "Delete me" });

  const response = await request(app).delete(`/tasks/${created.body.data.id}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.message, "Task deleted");

  const allTasks = await request(app).get("/tasks");
  assert.equal(allTasks.body.data.length, 0);
});
