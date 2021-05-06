'use strict';
const base64 = require('base-64');
const user =require('../models/userCollection');

module.exports=(req,res,next)=>{
    if(!req.headers.authorization){
        next('invalid log in');
        return;
    }
    // console.log("request headers",req.headers)
    let authHeader=req.headers.authorization.split(" ");
    if (authHeader[0]!="Basic"){
        next('invalid log in');
        return;   
    }
    let basic=authHeader.pop();
    let [users,password]=base64.decode(basic).split(":");
    user.authenticate(users,password).then(verified=>{
        // console.log('verified===>>>',verified)
        req.user=verified
        user.generateToken(verified).then(generatedToken=>{
            req.token=generatedToken;

            next()
        }).catch(err=>next('error in token'));
    }).catch(err=>next("invalid log in"));
}