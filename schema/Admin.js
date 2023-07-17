const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the admin schema
const AdminSchema = new Schema({
  username: {
    type: String,
    // required: true,
    // unique: true
  },
  password: {
    type: String,
    // required: true
    default :""
  },
  email: {
    type: String,
    // required: true,
    // unique: true
  },
  setpassword:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Admin model
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
