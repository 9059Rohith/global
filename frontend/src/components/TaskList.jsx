import TaskItem from "./TaskItem";

const emptyMessages = {
  all: "No tasks yet. Add one above!",
  active: "No active tasks!",
  completed: "No completed tasks yet!",
};

const TaskList = ({ tasks, filter, loading, onEdit, onToggle, onRemove }) => {
  if (!tasks.length) {
    return <p className="empty-state">{emptyMessages[filter]}</p>;
  }

  return (
    <section className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          loading={loading}
          onEdit={onEdit}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
};

export default TaskList;
