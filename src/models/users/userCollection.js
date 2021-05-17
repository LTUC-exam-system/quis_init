  
'use strict';
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const schema=require('./userSchema');
const Model=require('../../mongo-model');
require ('dotenv').config();
let SECRET =process.env.SECRET;

class User extends Model{
    constructor(){
        super(schema);
    }
   async save(record){
      let object= await this.get({useremail:record.useremail});
      console.log(object);
      if(object.length==0){
          record.password=await bcrypt.hash(record.password,5);
          await this.create(record)
          return record;
      }else{
          return Promise.reject();
      }
    }
   async authenticate(user,password){
     let record= await this.get({useremail:user});
     if (record){
         await bcrypt.compare(password,record[0].password);
         return record[0];
     }
     return Promise.reject();
    }
    async generateToken(user){ 
     let token= jwt.sign({useremail:user.useremail,role:user.role},SECRET);
      return token; 
    }
    async authenticateToken(token){
       
           let tokenObj=await jwt.verify(token,SECRET);
           let object= await this.get({useremail:tokenObj.useremail});
         //    console.log('object from authentication=====>>',object);
           if(object.length >=0){
            return object[0]
           }
           return Promise.reject();
    }
    roleCapability(role){
      switch(role){
        case 'admin':
          return ['reade','create','update','delete','add-user'];
        case 'user':
          return ['reade','create','update','delete'];
        default:
          return null;  
      }
    }
  userCan(role,permission){
    let userRole=this.roleCapability(role);
    if(userRole.includes(permission)){
      return true
    }else{
      return false;
    }
  }
}
// let user = new User
// user.save({
//   username:"admin",
//   useremail:"admin@admin.com",
//   password:"123",
//   role:"admin"
// })
module.exports= new User;