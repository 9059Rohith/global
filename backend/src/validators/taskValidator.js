const validateCreateTask = (body) => {
  if (!body || typeof body.title !== "string") {
    return { valid: false, message: "Title is required" };
  }

  const title = body.title.trim();

  if (!title) {
    return { valid: false, message: "Title is required" };
  }

  if (title.length > 200) {
    return { valid: false, message: "Title must be 200 characters or fewer" };
  }

  return { valid: true };
};

const validateUpdateTask = (body) => {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Request body is required" };
  }

  const changes = {};

  if (Object.hasOwn(body, "completed")) {
    if (typeof body.completed !== "boolean") {
      return { valid: false, message: "completed must be a boolean" };
    }

    changes.completed = body.completed;
  }

  if (Object.hasOwn(body, "title")) {
    if (typeof body.title !== "string") {
      return { valid: false, message: "Title is required" };
    }

    const trimmedTitle = body.title.trim();

    if (!trimmedTitle) {
      return { valid: false, message: "Title is required" };
    }

    if (trimmedTitle.length > 200) {
      return { valid: false, message: "Title must be 200 characters or fewer" };
    }

    changes.title = trimmedTitle;
  }

  if (!Object.keys(changes).length) {
    return { valid: false, message: "At least one field (title or completed) is required" };
  }

  return { valid: true, changes };
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
