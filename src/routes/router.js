'use strict';

const express=require('express');
const router=express.Router();
const user=require('../models/users/userCollection');
const basicAuth=require('../middleware/basic');
const bearer=require('../middleware/bearer');
const authorized=require('../middleware/authorize');

router.post('/setup',(req,res,next)=>{
    // console.log(req.body)
    user.save(req.body)
    .then(users=>{
        user.generateToken(users).then(result=>{
            // console.log('result from geneate toke',result);
            //add header
            res.status(200).send({token:result});
        }).catch(err=>next('invalid log'))
    }).catch(err=>res.status(403).send("error in creating the user object"));
});

router.post('/adduser',bearer,authorized('add-user'),(req,res,next)=>{
    // console.log(req.body)
    user.save(req.body)
    .then(users=>{
        user.generateToken(users).then(result=>{
            // console.log('result from geneate toke',result);
            //add header
            res.status(200).send({token:result});
        }).catch(err=>next('invalid log'))
    }).catch(err=>res.status(403).send("error in creating the user object"));
});
router.post('/signin',basicAuth,(req,res)=>{
    res.set('auth',req.token);
    res.cookie('token',req.token);
    // console.log('user from sign in-----',req.user);
    res.status(200).send({token:req.token,user:req.user});
});
router.get('/users',bearer,authorized('reade'),(req,res)=>{
    user.get().then((result)=>{
        res.status(200).send({results:result});
    });
});

module.exports=router;