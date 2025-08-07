import React, { useState } from "react";
import { useTask } from "../../context/TaskContext";
import {
  getTaskStatusText,
  canMarkCompleted,
  formatDateTime,
} from "../../utils/dateHelpers";
import TaskForm from "./TaskForm";
import "./Tasks.css";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, loading } = useTask();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusInfo = getTaskStatusText(task.dueDate, task.status);
  const canComplete = canMarkCompleted(task.dueDate);

  const handleStatusToggle = async () => {
    if (task.status === "completed") {
      await updateTask(task._id, { status: "pending" });
    } else {
      if (!canComplete) {
        alert("Cannot mark task as completed - due date is in the future");
        return;
      }
      await updateTask(task._id, { status: "completed" });
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleEditSubmit = () => {
    setShowEditForm(false);
  };

  const handleDelete = async () => {
    if (showDeleteConfirm) {
      await deleteTask(task._id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (showEditForm) {
    return (
      <TaskForm
        editTask={task}
        onSubmit={handleEditSubmit}
        onCancel={() => setShowEditForm(false)}
      />
    );
  }

  return (
    <div className={`task-item ${task.status} ${statusInfo.class}`}>
      <div className="task-content">
        <div className="task-main">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-actions">
              <button
                onClick={handleEdit}
                className="btn btn-sm btn-secondary"
                disabled={loading}
                title="Edit task"
              >
                ✏️
              </button>
              {!showDeleteConfirm ? (
                <button
                  onClick={handleDelete}
                  className="btn btn-sm btn-danger"
                  disabled={loading}
                  title="Delete task"
                >
                  🗑️
                </button>
              ) : (
                <div className="delete-confirm">
                  <button
                    onClick={handleDelete}
                    className="btn btn-sm btn-danger"
                    disabled={loading}
                    title="Confirm delete"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    className="btn btn-sm btn-secondary"
                    disabled={loading}
                    title="Cancel delete"
                  >
                    ✗
                  </button>
                </div>
              )}
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            <span className="task-due-date">
              📅 Due: {formatDateTime(task.dueDate)}
            </span>
            <span className={`task-status ${statusInfo.class}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>

        <div className="task-checkbox">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={handleStatusToggle}
              disabled={loading || (task.status === "pending" && !canComplete)}
            />
            <span className="checkmark"></span>
          </label>
          {task.status === "pending" && !canComplete && (
            <small className="hover-hint">Cannot complete future task</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
