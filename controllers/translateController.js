// Translate Controller
const inputValidator = require('../validator/inputValidator')
const fixNegation = require('./translate-utils/fixNegation')
const translateWord = require('./translate-utils/translateWord')
const generateOutput = require('./translate-utils/generateOutput')

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

        // Handle negations
        tokens = fixNegation(tokens)
        
        let bngWordsPromises = []
        // Word to Word Mapping
        tokens.forEach(token => {
            // Assemble promises for each word resolve, reject, pending
            bngWordsPromises.push(translateWord(token))
        })

        // Resolve all the 'translateWord' promises to generate the output
        generateOutput(bngWordsPromises, tokens)
            .then(bng => {
                return res.status(200).json({
                    bng
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: 'Server Error Occurred!'
                })
            })

        // return res.status(200).json({
        //     message: 'Hello there! You\'re ready to translate ' + ctg + '.'
        // })
    }
}