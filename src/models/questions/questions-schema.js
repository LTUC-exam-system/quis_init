'use strict';

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  image: { type: String ,default:"",required:false},
//   image: { type: Boolean, default: false, required: true },
  level: { type: String, default:"low",enum:["low","high","intermediate"]},
});
module.exports = mongoose.model('Question', questionSchema);