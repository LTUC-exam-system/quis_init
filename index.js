'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false 
  })
  .then(() => {
    server.start();
  })
  .catch((err) => console.log(err));