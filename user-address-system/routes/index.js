const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Address = require('../models/Address');


router.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/users/:userId/address', async (req, res) => {
  try {
    const { street, city, state, pincode } = req.body;
    const userId = req.params.userId;
    
    
    const address = new Address({
      street,
      city,
      state,
      pincode,
      user: userId
    });
    await address.save();
    
 
    await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: address._id } }
    );
    
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('addresses');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;