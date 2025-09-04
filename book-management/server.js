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
    return [];
  }
}


function writeBooks(books) {
  try {
    const data = JSON.stringify({ books }, null, 2);
    fs.writeFileSync('db.json', data);
  } catch (error) {
    console.log('Error writing file:', error);
  }
}



app.get('/admin/books', (req, res) => {
  try {
    const books = readBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/admin/books', (req, res) => {
  try {
    const books = readBooks();
    const newBook = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      status: "available"
    };
    
    books.push(newBook);
    writeBooks(books);
    
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});




app.get('/reader/books', (req, res) => {
  try {
    const books = readBooks();
    const availableBooks = books.filter(book => book.status === "available");
    res.json(availableBooks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/reader/borrow/:id', (req, res) => {
  try {
    const books = readBooks();
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const book = books[bookIndex];
    
    if (book.status !== "available") {
      return res.status(400).json({ error: 'Book is not available' });
    }
    
    if (!req.body.readerName) {
      return res.status(400).json({ error: 'Reader name is required' });
    }
    
   
    book.status = "borrowed";
    book.borrowedBy = req.body.readerName;
    book.borrowedDate = new Date().toISOString().split('T')[0]; 
    
    writeBooks(books);
    
    res.json({ 
      message: 'Book borrowed successfully', 
      book: book 
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`📚 Book Management System running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   ADMIN:');
  console.log('     GET    /admin/books        - Get all books');
  console.log('     POST   /admin/books        - Add new book');
  console.log('   READER:');
  console.log('     GET    /reader/books       - Get available books');
  console.log('     POST   /reader/borrow/:id  - Borrow a book');
});