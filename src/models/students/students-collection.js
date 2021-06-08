'use strict';

const students = require('./studentsSchema');
const Model = require('../../mongo-model.js');

class studentModel extends Model {
    constructor() {
        super(students);
    }
}
module.exports = new studentModel();
