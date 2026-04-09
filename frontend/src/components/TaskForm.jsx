import { useState } from "react";

const TaskForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setLocalError("Title cannot be empty");
      return;
    }

    setLocalError("");

    try {
      await onSubmit(title);
      setTitle("");
    } catch {
      // API errors are handled globally in the hook.
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title" className="task-form__label">
        Add a new task
      </label>
      <div className="task-form__controls">
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (localError) {
              setLocalError("");
            }
          }}
          placeholder="What should be done next?"
          maxLength={200}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Add Task
        </button>
      </div>
      {localError ? <p className="task-form__error">{localError}</p> : null}
    </form>
  );
};

export default TaskForm;
