const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
  dailyCaloriesGoal: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  activities: {
    type: [String],
    required: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
