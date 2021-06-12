'use strict';

const studentsSchema = require('./studentsSchema');
const Model = require('../../mongo-model');
const uuidv5 = require ('uuid').v5;
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';


class studentModel extends Model {
    constructor() {
        super(studentsSchema);
    }
    async saveNew(object){
      let record = await this.create(object);
      let data= await this.getById(record._id);
     await  this.update(record._id,{refcode:uuidv5( data.email, MY_NAMESPACE)})
     let records =await this.get();
    //  console.log("from saveNew",records)
     return records
    }
}
module.exports = new studentModel();