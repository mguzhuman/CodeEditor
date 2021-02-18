const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    id: {type: String},
    value: {type: String},
    date: {type: String},
    name: {type: String},
    language: {type: String},
    response: {type: String, default: ''},
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
