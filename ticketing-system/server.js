const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


function readTickets() {
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).tickets;
  } catch (error) {
    return [];
  }
}


function writeTickets(tickets) {
  try {
    const data = JSON.stringify({ tickets }, null, 2);
    fs.writeFileSync('db.json', data);
  } catch (error) {
    console.log('Error writing file:', error);
  }
}


function validateTicket(req, res, next) {
  const { title, description, priority, user } = req.body;
  
  if (!title || !description || !priority || !user) {
    return res.status(400).json({ 
      error: "Data insufficient, please provide all required fields" 
    });
  }
  
  next();
}


app.get('/tickets', (req, res) => {
  try {
    const tickets = readTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/tickets/:id', (req, res) => {
  try {
    const tickets = readTickets();
    const ticket = tickets.find(t => t.id === parseInt(req.params.id));
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/tickets', validateTicket, (req, res) => {
  try {
    const tickets = readTickets();
    const newTicket = {
      id: tickets.length + 1,
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      user: req.body.user,
      status: "pending" 
    };
    
    tickets.push(newTicket);
    writeTickets(tickets);
    
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`🎫 Ticketing System running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /tickets        - Get all tickets');
  console.log('   GET    /tickets/:id    - Get ticket by ID');
  console.log('   POST   /tickets        - Create new ticket');
});