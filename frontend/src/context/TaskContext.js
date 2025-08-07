import React, { createContext, useContext, useState, useCallback } from 'react';
import taskService from '../services/tasks';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    hasNext: false,
    hasPrev: false
  });

  const fetchTasks = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await taskService.getTasks(page, limit);
      
      setTasks(response.tasks);
      setPagination(response.pagination);
      
      return { success: true, tasks: response.tasks };
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch tasks';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newTask = await taskService.createTask(taskData);
      
      // Add new task to the beginning of the list
      setTasks(prevTasks => [newTask, ...prevTasks]);
      
      return { success: true, task: newTask };
    } catch (error) {
      const errorMessage = error.message || 'Failed to create task';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedTask = await taskService.updateTask(taskId, updateData);
      
      // Update the task in the list
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? updatedTask : task
        )
      );
      
      return { success: true, task: updatedTask };
    } catch (error) {
      const errorMessage = error.message || 'Failed to update task';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      setError(null);
      
      await taskService.deleteTask(taskId);
      
      // Remove task from the list
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete task';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getOverdueTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await taskService.getOverdueTasks();
      
      return { success: true, tasks: response.tasks, count: response.count };
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch overdue tasks';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const refreshTasks = () => {
    fetchTasks(pagination.currentPage);
  };

  const value = {
    tasks,
    loading,
    error,
    pagination,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    getOverdueTasks,
    clearError,
    refreshTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};