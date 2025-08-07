import api from './api';
import { setCookie, getCookie, deleteCookie, setUserData, getUserData, clearUserData } from '../utils/cookieHelpers';

const authService = {
  // Register new user
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData, {
        withCredentials: true // Enable cookies
      });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store JWT in httpOnly cookie (will be set by backend)
        // But for fallback, also store in regular cookie
        setCookie('auth_token', token, 7);
        setUserData(user);
        
        return { user, token };
      }
      
      throw new Error(response.data.message || 'Signup failed');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || 'Signup failed'
      );
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true // Enable cookies
      });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store JWT in httpOnly cookie (will be set by backend)
        // But for fallback, also store in regular cookie
        setCookie('auth_token', token, 7);
        setUserData(user);
        
        return { user, token };
      }
      
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me', {
        withCredentials: true
      });
      
      if (response.data.success) {
        const user = response.data.data.user;
        setUserData(user);
        return user;
      }
      
      throw new Error('Failed to get user data');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to get user data'
      );
    }
  },

  // Logout user
  logout: () => {
    // Clear httpOnly cookie (handled by backend call)
    deleteCookie('auth_token');
    clearUserData();
    
    // Call logout endpoint to clear httpOnly cookie on server
    api.post('/auth/logout', {}, { withCredentials: true }).catch(() => {
      // Ignore errors on logout
    });
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = getCookie('auth_token');
    const user = getUserData();
    return !!token && !!user;
  },

  // Get stored user data
  getStoredUser: () => {
    return getUserData();
  },

  // Get stored token (from cookie)
  getToken: () => {
    return getCookie('auth_token');
  }
};

export default authService;