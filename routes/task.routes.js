const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.get('/project/:id', taskController.getTasksByProjectId);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);

module.exports = router;