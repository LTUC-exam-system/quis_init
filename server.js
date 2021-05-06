'use strict';

const express=require('express');
const cors=require('cors');
const morgan = require('morgan');
const server= express();
const router= require('./src/router');
const notFound = require('./src/middleware/404');
const errorHandle = require('./src/middleware/500');


 server.use(express.json());
 server.use(cors());
 server.use(morgan('dev'));
 server.use('/',router);

 server.get('/errorRoute',(req,res)=>{
     throw new Error('this route is 500 status')
 })
//  server.use('*', notFound);
//  server.use(errorHandle);

module.exports={
    server:server,
    start:port =>{
        let PORT=port||process.env.PORT||3000;
        server.listen(PORT,()=>console.log(`listening on ${PORT}`));
    }
};