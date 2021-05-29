'use strict';

const studentsSchema = require('./studentsSchema');
const Model = require('../../mongo-model');

class studentModel extends Model {
    constructor() {
        super(studentsSchema);
    }
}
module.exports = new studentModel();