'use strict';

const users=require('../models/users/userCollection');

module.exports=(req,res,next)=>{
    if(!req.headers.authorization){next('not logged in yet');return;};
    let authHeaders=req.headers.authorization.split(" ");
    // console.log('authorisation headers====>',authHeaders);
    if(authHeaders[0]!='Bearer'){next('invalid header bearers');return;};
    let token=authHeaders[1];
    console.log('token from Headers===>',token);
    users.authenticateToken(token).then(validUser=>{
        console.log("authorised user",validUser);
         req.user = validUser;
        next();
    }).catch(err=>next('invalid Token!'));
}