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
        
        let bngWordsPromises = []
        // Word to Word Mapping
        tokens.forEach(token => {
            bngWordsPromises.push(mapWord(token))
        })

        // Resolve all the 'mapWord' promises to generate the output
        Promise.all(bngWordsPromises)
            .then(results => {
                // Handle for null promise when word not found FIX NEEDED !
                let bngOutput = ''
                results.forEach(result => {
                    bngOutput += result.bng + ' '
                })
                return bngOutput.trim()
            })
            .then(bng => {
                // Return the translation as json response
                // Translation sentence held in 'bng'
                return res.status(200).json({
                    output: bng
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