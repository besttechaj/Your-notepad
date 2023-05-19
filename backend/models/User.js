//creating Model/collection for user's data

const mongoose = require('mongoose');

//define schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating collection/model for user's data [ model name is 'user' ]
const User = mongoose.model('user', UserSchema);

//due to .createIndexes() you will not be allowed to enter the duplicate values
User.createIndexes();
module.exports = User;
