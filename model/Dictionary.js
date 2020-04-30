const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dictionarySchema = new Schema({
    ctg: {
        type: String,
        required: true
    },
    bng: {
        type: String,
        required: true
    },
    pos: String
})

const Dictionary = mongoose.model('Dictionary', dictionarySchema)
module.exports = Dictionary