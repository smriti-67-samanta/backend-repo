const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Member = require('../models/Member');


router.post('/add-book', async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/add-member', async (req, res) => {
  try {
    const { name, email } = req.body;
    const member = new Member({ name, email });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/borrow-book', async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    
   
    const book = await Book.findById(bookId);
    if (book.status !== 'available') {
      return res.status(400).json({ error: 'Book is not available' });
    }
    
    
    await Book.findByIdAndUpdate(
      bookId,
      { 
        $addToSet: { borrowers: memberId },
        status: 'borrowed'
      }
    );
    
  
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { borrowedBooks: bookId } }
    );
    
    res.json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/member-borrowed-books/:memberId', async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId)
      .populate('borrowedBooks');
    res.json(member.borrowedBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;