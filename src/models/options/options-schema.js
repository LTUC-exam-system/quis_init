'use strict';

const mongoose = require('mongoose');


const optionSchema = mongoose.Schema({
   option_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    option: { type: String, required: true ,unique:true},
    correct: { type: Boolean, required: true },
    image: { type: String ,default:"",required:false},
});

module.exports = mongoose.model('Option', optionSchema);