'use strict';

const question = require('./questions-schema.js');
const Model = require('../../mongo-model');

class questionModel extends Model {
    constructor() {
        super(question);
    }
}
module.exports = new questionModel();