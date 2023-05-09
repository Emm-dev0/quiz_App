const mongoose = require('mongoose');

const getuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  // age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});


const getquestionsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: Array,
  correct: { type: String, required: true }
});


const getUser = mongoose.model('getUser', getuserSchema);
const questions = mongoose.model('questions', getquestionsSchema);

module.exports = { getUser, questions }