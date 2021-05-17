'use strict';

const mongoose=require('mongoose');

const user=mongoose.Schema({
    username: {type: String, required: true ,},
    useremail:{type: String, required:true ,unique:true,
        validate: {
            // isAsync: true,
            validator: async(value, isValid)=>{
                try{
                const self = this;
                return await self.constructor.findOne({ email: value })
                .exec(async(err, user)=>{
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self._id === user._id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(true);
                    }

                }).catch(err=>next("inside validator"));}
                catch (err){
                    console.error(err);
                }
            },
            message:  'The email address is already taken!'
        },
    },
    password:{type: String , required:true},
    role: { type: String, enum: ['admin', 'user'] },
});

module.exports=mongoose.model('user', user);