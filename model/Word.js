const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wordSchema = new Schema({
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

const Word = mongoose.model('words', wordSchema)
module.exports = Word