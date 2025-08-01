// Import Express
const express = require('express');

// Create Express app
const app = express();

// Set the port
const PORT = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Dummy user data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  { id: 3, name: "Bob Smith", email: "bob@example.com" }
];

// Route: GET /users/get - Returns single user
app.get('/users/get', (req, res) => {
  // Return the first user
  res.json(users[0]);
});

// Route: GET /users/list - Returns all users
app.get('/users/list', (req, res) => {
  // Return all users
  res.json(users);
});

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});