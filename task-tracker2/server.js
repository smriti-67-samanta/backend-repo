const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


function readTasks() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    return JSON.parse(data).tasks;
  } catch (error) {
    console.log('Starting with empty tasks array');
    return [];
  }
}


function writeTasks(tasks) {
  try {
    const data = JSON.stringify({ tasks }, null, 2);
    fs.writeFileSync('tasks.json', data);
  } catch (error) {
    console.log('Error writing file:', error);
  }
}


app.get('/tasks', (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/tasks/filter', (req, res) => {
  try {
    const tasks = readTasks();
    const tagQuery = req.query.tag?.toLowerCase();
    
    if (!tagQuery) {
      return res.status(400).json({ error: 'Tag query parameter is required' });
    }
    
    const filteredTasks = tasks.filter(task => 
      task.tag.toLowerCase() === tagQuery
    );
    
    res.json(filteredTasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/tasks', (req, res) => {
  try {
    const tasks = readTasks();
    const newTask = {
      id: tasks.length + 1,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      priority: req.body.priority || "medium",
      status: req.body.status || "pending"
    };
    
    tasks.push(newTask);
    writeTasks(tasks);
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.put('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
      id: taskId 
    };
    
    writeTasks(tasks);
    
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.delete('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    writeTasks(tasks);
    
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`✅ Task Tracker running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /tasks           - Get all tasks');
  console.log('   GET    /tasks/filter    - Filter tasks by tag');
  console.log('   POST   /tasks           - Add new task');
  console.log('   PUT    /tasks/:id       - Update task');
  console.log('   DELETE /tasks/:id       - Delete task');
});