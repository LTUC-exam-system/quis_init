'use strict';

const mongoose=require('mongoose');

const user=mongoose.Schema({
    username: {type: String, required: true ,},
    useremail:{type: String, required:true},
    password:{type: String , required:true},
    role: { type: String, enum: ['admin', 'user'] },
});

module.exports=mongoose.model('user', user);