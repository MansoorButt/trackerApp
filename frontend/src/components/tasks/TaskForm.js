import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import ErrorMessage from '../common/ErrorMessage';
import './Tasks.css';

const TaskForm = ({ onSubmit, onCancel, editTask = null }) => {
  const { createTask, updateTask, loading } = useTask();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: editTask?.title || '',
    description: editTask?.description || '',
    dueDate: editTask ? 
      new Date(editTask.dueDate).toISOString().slice(0, 16) : 
      ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Task title is required');
      return false;
    }

    if (formData.title.length > 100) {
      setError('Task title cannot exceed 100 characters');
      return false;
    }

    if (!formData.dueDate) {
      setError('Due date is required');
      return false;
    }

    const dueDate = new Date(formData.dueDate);
    const now = new Date();
    
    if (dueDate <= now) {
      setError('Due date must be in the future');
      return false;
    }

    if (formData.description && formData.description.length > 500) {
      setError('Description cannot exceed 500 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    };

    let result;
    if (editTask) {
      result = await updateTask(editTask._id, taskData);
    } else {
      result = await createTask(taskData);
    }

    if (result.success) {
      onSubmit && onSubmit();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-header">
          <h3>{editTask ? 'Edit Task' : 'Add New Task'}</h3>
        </div>

        <ErrorMessage message={error} onClose={() => setError('')} />

        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter task title"
            maxLength={100}
            required
          />
          <small className="text-muted">
            {formData.title.length}/100 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter task description (optional)"
            rows={4}
            maxLength={500}
          />
          <small className="text-muted">
            {formData.description.length}/500 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date & Time *
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-control"
            required
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : editTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;