const express = require('express');
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todosRoutes');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());


app.use('/todos', todosRoutes);


app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});