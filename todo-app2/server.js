const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


function readTodos() {
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).todos;
  } catch (error) {
    return [];
  }
}


function writeTodos(todos) {
  try {
    const data = JSON.stringify({ todos }, null, 2);
    fs.writeFileSync('db.json', data);
  } catch (error) {
    console.log('Error writing file:', error);
  }
}


app.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/todos', (req, res) => {
  try {
    const todos = readTodos();
    const newTodo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: req.body.completed || false
    };
    
    todos.push(newTodo);
    writeTodos(todos);
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`✅ Todo App running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /todos        - Get all todos');
  console.log('   POST   /todos        - Add new todo');
});