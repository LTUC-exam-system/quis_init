"use strict"

let mongoose = require("mongoose");
 


let studentSchema = new mongoose.Schema({
    firstName: { type: String, requiered: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    birthDate: { type: String, required: false },
    nationallity: { type: String, required: true },
    nationlNumber: { type: String, required: false },
    mark: { type: Number, required: false ,default: 0 },
    firstEnterance: { type: Boolean, default: true, required: false },
    refcode:{type:String,required:false,}
});


// var counter = mongoose.model('Students', studentSchema);

// studentSchema.pre('save', async function(next) {
    
//     await counter.findByIdAndUpdate({_id:this._id} , function(error, counter)   {
        
//         this.refcode=uuidv5( this.email, MY_NAMESPACE);
//         console.log(this.refcode)
//         if(error)
//           return next(error);
//         next();
//     });
// });

module.exports = mongoose.model('Students', studentSchema);;