// Date helper functions for task management

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getDaysDifference = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Remove time component for accurate date comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const getTaskStatusText = (dueDate, status) => {
  if (status === 'completed') {
    return { text: 'Completed', class: 'completed' };
  }
  
  const daysDiff = getDaysDifference(dueDate);
  
  if (daysDiff < 0) {
    const overdueDays = Math.abs(daysDiff);
    return {
      text: `Overdue by ${overdueDays} day${overdueDays !== 1 ? 's' : ''}`,
      class: overdueDays > 5 ? 'critically-overdue' : 'overdue'
    };
  } else if (daysDiff === 0) {
    return { text: 'Due today', class: 'due-today' };
  } else if (daysDiff === 1) {
    return { text: 'Due tomorrow', class: 'due-soon' };
  } else {
    return { text: `Due in ${daysDiff} days`, class: 'due-later' };
  }
};

export const isOverdue = (dueDate, status) => {
  if (status === 'completed') return false;
  return getDaysDifference(dueDate) < 0;
};

export const isCriticallyOverdue = (dueDate, status) => {
  if (status === 'completed') return false;
  const daysDiff = getDaysDifference(dueDate);
  return daysDiff < 0 && Math.abs(daysDiff) > 5;
};

export const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
};

export const canMarkCompleted = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Remove time component for accurate comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  return due <= today;
};