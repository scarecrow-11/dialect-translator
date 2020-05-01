// Translate Controller
const inputValidator = require('../validator/inputValidator')

module.exports = {
    translate(req, res) {
        // Grab input
        let { input } = req.body

        // Validate input data
        let validate = inputValidator({input})
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        // Tokenize input data
        let tokens = input.split(' ')
        
        // 

        return res.status(200).json({
            message: 'Hello there! You\'re ready to translate ' + input + '.'
        })
    }
}