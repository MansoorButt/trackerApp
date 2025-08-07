import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './Pages.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    tasks, 
    loading, 
    error, 
    pagination,
    fetchTasks, 
    clearError 
  } = useTask();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    overdue: 0
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Calculate stats when tasks change
  useEffect(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const newStats = tasks.reduce((acc, task) => {
      acc.total++;
      
      if (task.status === 'completed') {
        acc.completed++;
      } else {
        acc.pending++;
        
        // Check if overdue
        const dueDate = new Date(task.dueDate);
        if (dueDate < today) {
          acc.overdue++;
        }
      }
      
      return acc;
    }, { total: 0, pending: 0, completed: 0, overdue: 0 });

    setStats(newStats);
  }, [tasks]);

  const handleTaskFormSubmit = () => {
    setShowTaskForm(false);
    // Tasks will be refreshed automatically via context
  };

  const handlePageChange = (page) => {
    fetchTasks(page);
  };

  if (loading && tasks.length === 0) {
    return <Loading message="Loading your tasks..." />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="dashboard-subtitle">
          Here's an overview of your tasks and productivity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number total">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number pending">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number completed">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number overdue">{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Task Management Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Your Tasks</h2>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="btn btn-primary"
            >
              {showTaskForm ? 'Cancel' : '+ Add New Task'}
            </button>
          </div>

          <ErrorMessage message={error} onClose={clearError} />

          {showTaskForm && (
            <div style={{ marginBottom: '24px' }}>
              <TaskForm 
                onSubmit={handleTaskFormSubmit}
                onCancel={() => setShowTaskForm(false)}
              />
            </div>
          )}

          <TaskList 
            tasks={tasks}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;