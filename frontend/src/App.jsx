import { useMemo } from "react";
import FilterBar from "./components/FilterBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import "./App.css";

function App() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    clearError,
    addTask,
    editTaskTitle,
    toggleTask,
    removeTask,
  } = useTasks();

  const filteredTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <main className="app-shell">
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />

      <section className="card">
        <header className="header">
          <p className="eyebrow">Productivity Studio</p>
          <h1>Task Manager</h1>
        </header>

        <TaskForm onSubmit={addTask} loading={loading} />

        {error ? (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button type="button" onClick={clearError} aria-label="Dismiss error">
              ×
            </button>
          </div>
        ) : null}

        {loading ? <p className="loading-text">Loading...</p> : null}

        <FilterBar filter={filter} setFilter={setFilter} loading={loading} />

        <p className="task-count">{remainingCount} task(s) remaining</p>

        <TaskList
          tasks={filteredTasks}
          filter={filter}
          loading={loading}
          onEdit={editTaskTitle}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
      </section>
    </main>
  );
}

export default App;
