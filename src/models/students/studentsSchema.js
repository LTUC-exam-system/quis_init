let mongoose = require("mongoose");

let studentSchema = mongoose.Schema({
    firstName: { type: String, requiered: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: false },
    nationallity: { type: String, required: true },
    nationlNumber: { type: String, required: false },
    mark: { type: Object, required: false },
    firstEnterance: { type: Boolean, default: true, required: false }
})
module.exports = mongoose.model("Studens", studentSchema)