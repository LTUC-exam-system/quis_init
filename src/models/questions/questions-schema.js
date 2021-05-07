'use strict';

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  image: { type: String },
//   image: { type: Boolean, default: false, required: true },
  level: { type: String},
},
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Question', questionSchema);