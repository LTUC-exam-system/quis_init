'use strict';

const question = require('./questions-schema.js');
const Model = require('../userModel.js');

class questionModel extends Model {
    constructor() {
        super(question);
    }
}
module.exports = new questionModel();