const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');


router.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/add-book', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/rent-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { rentedBooks: bookId } },
      { new: true }
    );
    
    
    await Book.findByIdAndUpdate(
      bookId,
      { $addToSet: { rentedBy: userId } },
      { new: true }
    );
    
    res.json({ message: 'Book rented successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/user-rentals/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('rentedBooks');
    res.json(user.rentedBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;