const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  // age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
