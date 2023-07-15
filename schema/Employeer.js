const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the employeer schema
const EmployeerSchema = new Schema({
  username: {
    type: String,
    // required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true

  },
  email: {
    type: String,
    // required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

// Create and export the Admin model
const Employeer = mongoose.model('Employeer', EmployeerSchema);
module.exports = Employeer;
