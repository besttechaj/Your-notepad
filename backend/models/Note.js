//creating model/collection for user's Notes

const mongoose = require('mongoose');

//defining schema for user's notes
const NotesSchema = new mongoose.Schema({
  //adding user field amd fetching that user from another mongoose model using ref:"another_model/collection name". Due to this logic we can add user in our notes model/collection.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating collection/model for user data [model name is 'notes']
module.exports = mongoose.model('notes', NotesSchema);
