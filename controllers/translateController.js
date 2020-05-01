// Translate Controller
const inputValidator = require('../validator/inputValidator')
const mapWord = require('./translate-utils/mapWord')

module.exports = {
    translate(req, res) {
        // Grab input
        let { ctg } = req.body

        // Validate input data
        let validate = inputValidator({ctg})
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        // Tokenize input data
        ctg = ctg.trim()
        let tokens = ctg.split(' ')
        console.log(tokens)
        
        // Word to Word Mapping
        mapWord(res, 'Hello')

        return res.status(200).json({
            message: 'Hello there! You\'re ready to translate ' + ctg + '.'
        })
    }
}