import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchTasks as fetchTasksApi,
  createTask as createTaskApi,
  toggleTask as toggleTaskApi,
  updateTaskTitle as updateTaskTitleApi,
  deleteTask as deleteTaskApi,
} from "../api/taskApi";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setErrorWithTimeout = useCallback((message) => {
    setError(message);

    window.setTimeout(() => {
      setError(null);
    }, 4000);
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);

    try {
      const loadedTasks = await fetchTasksApi();
      setTasks(loadedTasks);
      setError(null);
    } catch (err) {
      setErrorWithTimeout(err.message);
    } finally {
      setLoading(false);
    }
  }, [setErrorWithTimeout]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(
    async (title) => {
      setLoading(true);

      try {
        const newTask = await createTaskApi(title);
        setTasks((currentTasks) => [newTask, ...currentTasks]);
        setError(null);
      } catch (err) {
        setErrorWithTimeout(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setErrorWithTimeout],
  );

  const toggleTask = useCallback(
    async (id, currentCompleted) => {
      setLoading(true);

      try {
        const updatedTask = await toggleTaskApi(id, !currentCompleted);
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === id ? updatedTask : task)),
        );
        setError(null);
      } catch (err) {
        setErrorWithTimeout(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setErrorWithTimeout],
  );

  const removeTask = useCallback(
    async (id) => {
      setLoading(true);

      try {
        await deleteTaskApi(id);
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
        setError(null);
      } catch (err) {
        setErrorWithTimeout(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setErrorWithTimeout],
  );

  const editTaskTitle = useCallback(
    async (id, title) => {
      setLoading(true);

      try {
        const updatedTask = await updateTaskTitleApi(id, title);
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === id ? updatedTask : task)),
        );
        setError(null);
      } catch (err) {
        setErrorWithTimeout(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setErrorWithTimeout],
  );

  const state = useMemo(
    () => ({
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
    }),
    [tasks, loading, error, filter, clearError, addTask, editTaskTitle, toggleTask, removeTask],
  );

  return state;
};
