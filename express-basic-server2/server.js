
const express = require('express');


const app = express();


const PORT = 3000;


app.get('/home', (req, res) => {
    res.send('<h1>Welcome to Home Page</h1>');
});


app.get('/aboutus', (req, res) => {
    res.json({ message: "Welcome to About Us" });
});


app.get('/contactus', (req, res) => {
    res.send(`
        <h2>Contact Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Main Street, City, Country</p>
    `);
});


app.use((req, res) => {
    res.status(404).send('404 Not Found');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.on('error', (error) => {
    console.error('Server error:', error);
});