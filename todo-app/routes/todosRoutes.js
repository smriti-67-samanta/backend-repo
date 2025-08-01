const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

// GET all todos
router.get('/', todosController.getAllTodos);

// GET todo by ID
router.get('/:id', todosController.getTodoById);

// POST create new todo
router.post('/', todosController.createTodo);

// PUT update todo
router.put('/:id', todosController.updateTodo);

// DELETE todo
router.delete('/:id', todosController.deleteTodo);

// GET search todos
router.get('/search', todosController.searchTodos);

module.exports = router;