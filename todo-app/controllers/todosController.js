const Todo = require('../models/Todo');

exports.getAllTodos = (req, res) => {
  try {
    const todos = Todo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTodoById = (req, res) => {
  try {
    const todo = Todo.getById(parseInt(req.params.id));
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTodo = (req, res) => {
  try {
    const { title, completed = false } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = Todo.create({ title, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    const updatedTodo = Todo.update(parseInt(id), updates);
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = Todo.delete(parseInt(id));
    if (deleted.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.searchTodos = (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const results = Todo.search(q);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No todos found' });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};