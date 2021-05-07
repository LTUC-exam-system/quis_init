'use strict';

const mongoose = require('mongoose');


const optionSchema = mongoose.Schema({
    question_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    option: { type: String, required: true },
    correct: { type: Boolean, default: false, required: true },
    image: { type: String },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Option', optionSchema);