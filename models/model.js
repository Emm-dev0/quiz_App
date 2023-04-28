const mongoose = require('mongoose');

const adduserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  // age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const getuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  // age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});



const addUser = mongoose.model('addUser', adduserSchema);
const getUser = mongoose.model('getUser', getuserSchema);

module.exports = { addUser, getUser }