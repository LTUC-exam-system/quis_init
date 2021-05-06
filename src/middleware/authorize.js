'use strict';
const users=require('../models/userCollection');

module.exports=(capability)=>{
    return(req,res,next)=>{
        console.log('hello from authorised middleware',req.user);
        let user=req.user;
        let authorized=users.userCan(user.role,capability);
        if(authorized){next()}
        else{res.status(403).send('Acess Denied!!!')};

    };
};