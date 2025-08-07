import api from './api';

const taskService = {
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      
      if (response.data.success) {
        return response.data.data.task;
      }
      
      throw new Error(response.data.message || 'Failed to create task');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to create task'
      );
    }
  },

  // Get all user tasks with pagination
  getTasks: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/tasks?page=${page}&limit=${limit}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error('Failed to fetch tasks');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch tasks'
      );
    }
  },

  // Get a single task
  getTask: async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      
      if (response.data.success) {
        return response.data.data.task;
      }
      
      throw new Error('Task not found');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch task'
      );
    }
  },

  // Update a task
  updateTask: async (taskId, updateData) => {
    try {
      const response = await api.patch(`/tasks/${taskId}`, updateData);
      
      if (response.data.success) {
        return response.data.data.task;
      }
      
      throw new Error(response.data.message || 'Failed to update task');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to update task'
      );
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      
      if (response.data.success) {
        return true;
      }
      
      throw new Error('Failed to delete task');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete task'
      );
    }
  },

  // Get overdue tasks
  getOverdueTasks: async () => {
    try {
      const response = await api.get('/tasks/overdue');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error('Failed to fetch overdue tasks');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch overdue tasks'
      );
    }
  }
};

export default taskService;