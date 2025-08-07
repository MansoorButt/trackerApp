import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert alert-error">
      <div className="d-flex justify-content-between align-items-center">
        <span>{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="btn btn-sm"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#721c24',
              padding: '4px 8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;