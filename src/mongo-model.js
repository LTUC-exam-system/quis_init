
'use strict';
class Model{
    constructor(schema){
        this.schema=schema;
    }
    get(record){
        if (!record){
            record={};
        }
        return this.schema.find(record);
    }
    create(record){
        const newRecord=new this.schema(record);
        return newRecord.save();
    }
    update(_id,record){
        return this.schema.findByIdAndUpdate(_id,record,{new:true});
    }
    delete(_id){
        returnthis.model.findByIdAndDelete(_id);
    }
}
module.exports=Model;