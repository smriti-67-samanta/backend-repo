const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: false
  },
  socialMediaLinks: {
    type: [String],
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  }
});

module.exports = mongoose.model('Profile', profileSchema);