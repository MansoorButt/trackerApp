import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            📝 Task Tracker
          </Link>
        </div>

        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-welcome">
                Hello, {user?.name || 'User'}
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-outline btn-sm logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;