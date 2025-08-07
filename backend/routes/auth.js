const express = require('express');
const { signup, login, getMe, logout } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/signup
router.post('/signup', signup);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   GET /api/auth/me
router.get('/me', authenticateToken, getMe);

// @route   POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;