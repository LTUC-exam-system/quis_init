'use strict';

const option = require('./options-schema.js');
const Model = require('../userModel.js');

class optionModel extends Model {
    constructor() {
        super(option);
    }
}
module.exports = new optionModel();