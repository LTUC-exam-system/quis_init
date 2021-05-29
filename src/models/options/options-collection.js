'use strict';

const option = require('./options-schema.js');
const Model = require('../../mongo-model.js');

class optionModel extends Model {
    constructor() {
        super(option);
    }
}
module.exports = new optionModel();