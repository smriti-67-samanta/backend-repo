const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = new User({ name, email });
    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;