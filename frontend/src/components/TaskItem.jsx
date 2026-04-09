import { useState } from "react";

const TaskItem = ({ task, loading, onEdit, onToggle, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(task.title);
  const [editError, setEditError] = useState("");

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleSave = async () => {
    if (!titleDraft.trim()) {
      setEditError("Title cannot be empty");
      return;
    }

    try {
      await onEdit(task.id, titleDraft);
      setEditError("");
      setIsEditing(false);
    } catch {
      // API error is shown in app-level banner.
    }
  };

  const handleCancel = () => {
    setTitleDraft(task.title);
    setEditError("");
    setIsEditing(false);
  };

  return (
    <article className="task-item">
      <label className="task-item__checkbox-wrap">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          disabled={loading}
        />
      </label>

      <div className="task-item__content">
        {isEditing ? (
          <div className="edit-wrap">
            <input
              type="text"
              value={titleDraft}
              onChange={(event) => {
                setTitleDraft(event.target.value);
                if (editError) {
                  setEditError("");
                }
              }}
              maxLength={200}
              disabled={loading}
            />
            <div className="task-item__actions">
              <button type="button" className="action-btn" onClick={handleSave} disabled={loading}>
                Save
              </button>
              <button type="button" className="action-btn action-btn--ghost" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            </div>
            {editError ? <p className="task-item__error">{editError}</p> : null}
          </div>
        ) : (
          <>
            <h3 className={task.completed ? "task-title task-title--completed" : "task-title"}>
              {task.title}
            </h3>
            <div className="task-item__actions task-item__actions--inline">
              <button
                type="button"
                className="action-btn"
                onClick={() => {
                  setTitleDraft(task.title);
                  setIsEditing(true);
                }}
                disabled={loading}
              >
                Edit
              </button>
            </div>
          </>
        )}
        <p className="task-date">Created {formattedDate}</p>
      </div>

      <button
        type="button"
        className="delete-btn"
        onClick={() => onRemove(task.id)}
        disabled={loading}
        aria-label={`Delete ${task.title}`}
      >
        🗑 Delete
      </button>
    </article>
  );
};

export default TaskItem;
