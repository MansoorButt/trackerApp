const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getOverdueTasks,
  getTask
} = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/overdue', getOverdueTasks);
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;