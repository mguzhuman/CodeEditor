const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const languageSchema = new Schema({
    label: {type: String},
    value:{type: String},
    filenameExtensions: {type: String}
});

const Language = mongoose.model('language',languageSchema);

module.exports = Language;
