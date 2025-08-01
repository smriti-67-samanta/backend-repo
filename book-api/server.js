const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Initialize database
const adapter = new FileSync('db.json');
const db = low(adapter);

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize database defaults
db.defaults({ books: [] }).write();

// Helper function to generate new ID
const getNextId = () => {
  const books = db.get('books').value();
  return books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
};

// CRUD Operations

// 1. POST /books - Add new book
app.post('/books', (req, res) => {
  try {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBook = {
      id: getNextId(),
      title,
      author,
      year: parseInt(year)
    };

    db.get('books').push(newBook).write();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. GET /books - Get all books
app.get('/books', (req, res) => {
  try {
    const books = db.get('books').value();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. GET /books/:id - Get book by ID
app.get('/books/:id', (req, res) => {
  try {
    const book = db.get('books').find({ id: parseInt(req.params.id) }).value();
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. PUT /books/:id - Update book
app.put('/books/:id', (req, res) => {
  try {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedBook = db.get('books')
      .find({ id: parseInt(req.params.id) })
      .assign({ 
        title,
        author,
        year: parseInt(year)
      })
      .write();

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 5. DELETE /books/:id - Delete book
app.delete('/books/:id', (req, res) => {
  try {
    const book = db.get('books').remove({ id: parseInt(req.params.id) }).write();
    
    if (!book.length) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 6. GET /books/search - Search books by author or title
app.get('/books/search', (req, res) => {
  try {
    const { author, title } = req.query;
    
    if (!author && !title) {
      return res.status(400).json({ error: 'Author or title parameter is required' });
    }

    let query = db.get('books');

    if (author) {
      const authorSearch = author.toLowerCase();
      query = query.filter(book => 
        book.author.toLowerCase().includes(authorSearch)
    }

    if (title) {
      const titleSearch = title.toLowerCase();
      query = query.filter(book => 
        book.title.toLowerCase().includes(titleSearch))
    }

    const books = query.value();

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});