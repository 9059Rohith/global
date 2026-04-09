# Task Manager

Full-stack Task Manager built for a technical assignment using:

- Frontend: React (Vite) + plain CSS
- Backend: Node.js + Express
- Storage: In-memory store with JSON file persistence

## Assignment Coverage

### Core Requirements

- View all tasks
- Create task with validation
- Mark task as completed
- Delete task
- Loading and error states in UI
- REST API with clear JSON responses and structured backend layers

### Bonus Implemented

- Filter tasks by All / Active / Completed
- Edit existing task title inline
- Persist tasks to `backend/src/store/tasks.json`
- Docker setup for one-command run

## Project Structure

```text
task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── store/
│   │   └── validators/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 18+
- npm
- Docker Desktop (optional)

## Local Run

### 1) Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Docker Run

From project root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:4173`
- Backend: `http://localhost:5000`

Stop:

```bash
docker compose down
```

## API Reference

Base URL: `http://localhost:5000`

### GET /tasks

- Description: Return all tasks
- Request body: none

Response `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": "a6eff510-ebda-4d92-b232-ce7ed44c7c11",
      "title": "Example task",
      "completed": false,
      "createdAt": "2026-04-09T14:44:07.456Z"
    }
  ]
}
```

### POST /tasks

- Description: Create a new task

Request body:

```json
{
  "title": "Buy groceries"
}
```

Response `201`:

```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2026-04-09T14:44:07.456Z"
  }
}
```

Validation error `400`:

```json
{
  "success": false,
  "error": "Title is required"
}
```

### PATCH /tasks/:id

- Description: Update one or more task fields

Request body examples:

```json
{ "completed": true }
```

```json
{ "title": "Updated title" }
```

```json
{ "title": "Updated title", "completed": true }
```

Response `200`:

```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Updated title",
    "completed": true,
    "createdAt": "2026-04-09T14:44:07.456Z"
  }
}
```

Validation error `400`:

```json
{
  "success": false,
  "error": "completed must be a boolean"
}
```

Not found `404`:

```json
{
  "success": false,
  "error": "Task not found"
}
```

### DELETE /tasks/:id

- Description: Delete a task
- Request body: none

Response `200`:

```json
{
  "success": true,
  "message": "Task deleted"
}
```

Not found `404`:

```json
{
  "success": false,
  "error": "Task not found"
}
```

## Design & Code Notes

- Backend is organized by concern: routes, controllers, validators, store, middleware.
- Frontend uses a custom hook (`useTasks`) to centralize API calls, loading, and error state.
- Error messages from API are shown directly in UI for transparency.
- Task persistence is file-based and intentionally lightweight for assignment scope.

## Assumptions & Trade-offs

- Single-user app (no auth/roles).
- No external database to keep implementation small and fast.
- JSON file persistence is sufficient for assignment demos, but not for concurrent production workloads.

## Submission Note

This project intentionally prioritizes correctness, readability, and clear separation of concerns within a 1-2 hour assignment scope.
