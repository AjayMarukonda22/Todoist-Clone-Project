const express = require('express');
const taskController = require('../controllers/todo.controller');

const router = express.Router();

router.post('/', taskController.createTodo);
router.get('/', taskController.getAllTodos);
router.get('/:id', taskController.getTodoById);
router.get('/project/:id', taskController.getTodosByProjectId);
router.put('/:id', taskController.updateTodoById);
router.delete('/:id', taskController.deleteTodoById);

module.exports = router;