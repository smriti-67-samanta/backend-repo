const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(express.json());


app.use('/api/tasks', require('./routes/tasks'));


app.get('/', (req, res) => {
  res.json({ message: 'Task Management System API' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});