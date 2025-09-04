const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


function readBooks() {
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).books;
  } catch (error) {
    console.log('Error reading file, starting with empty array');
    return [];
  }
}


function writeBooks(books) {
  try {
    const data = JSON.stringify({ books }, null, 2);
    fs.writeFileSync('db.json', data);
  } catch (error) {
    console.log('Error writing to file:', error);
  }
}


app.get('/books', (req, res) => {
  try {
    const books = readBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/books/:id', (req, res) => {
  try {
    const books = readBooks();
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/books', (req, res) => {
  try {
    const books = readBooks();
    const newBook = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author,
      year: req.body.year
    };
    
    books.push(newBook);
    writeBooks(books);
    
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`📚 Books API running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /books        - Get all books');
  console.log('   GET    /books/:id    - Get book by ID');
  console.log('   POST   /books        - Add new book');
  console.log('   *                     - 404 for other routes');
});