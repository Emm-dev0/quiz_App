const mongoose = require('mongoose');

const getuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  // age: { type: Number },
  createdAt: { type: Date, default: Date.now },
  image: { type: Buffer },
  imageContentType: { type: String }
});


const getquestionsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: Array,
  correct: { type: String, required: true }
});

const imgModelSchema = new mongoose.Schema({
  image: { type: Buffer },
  imageContentType: { type: String }
});

const getUser = mongoose.model('getUser', getuserSchema);
const questions = mongoose.model('questions', getquestionsSchema);
const imgModel = mongoose.model('imgModel', imgModelSchema);

module.exports = { getUser, questions, imgModel }