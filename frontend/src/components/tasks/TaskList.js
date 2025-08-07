import React from 'react';
import TaskItem from './TaskItem';
import Loading from '../common/Loading';
import './Tasks.css';

const TaskList = ({ tasks, loading, pagination, onPageChange }) => {
  if (loading && tasks.length === 0) {
    return <Loading message="Loading tasks..." />;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started with managing your productivity!</p>
      </div>
    );
  }

  const handlePageChange = (page) => {
    if (page !== pagination.currentPage && !loading) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrev || loading}
        className="pagination-btn"
      >
        ← Previous
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={loading}
          className="pagination-btn"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(<span key="dots1" className="pagination-dots">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          className={`pagination-btn ${i === pagination.currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        pages.push(<span key="dots2" className="pagination-dots">...</span>);
      }
      
      pages.push(
        <button
          key={pagination.totalPages}
          onClick={() => handlePageChange(pagination.totalPages)}
          disabled={loading}
          className="pagination-btn"
        >
          {pagination.totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNext || loading}
        className="pagination-btn"
      >
        Next →
      </button>
    );

    return (
      <div className="pagination">
        <div className="pagination-info">
          Showing page {pagination.currentPage} of {pagination.totalPages} 
          ({pagination.totalTasks} total tasks)
        </div>
        <div className="pagination-controls">
          {pages}
        </div>
      </div>
    );
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h4>
          {pagination.totalTasks} Task{pagination.totalTasks !== 1 ? 's' : ''}
        </h4>
        {loading && (
          <div className="loading-indicator">
            <div className="spinner-sm"></div>
          </div>
        )}
      </div>

      <div className="task-items">
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>

      {renderPagination()}
    </div>
  );
};

export default TaskList;