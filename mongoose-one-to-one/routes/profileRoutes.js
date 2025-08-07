const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');


router.post('/', async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;
    
   
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
 
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists for this user' });
    }
    
    const profile = new Profile({ bio, socialMediaLinks, user });
    await profile.save();
    
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;