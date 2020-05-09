const connectDB = require('../connectDB')
const getSuggestion = require('./suggestion-utils/getSuggestions')

module.exports = {
    suggestion(req, res) {
        // Connect to Database
        connectDB()

        // Grab input
        let { ctg } = req.body

        // Tokenize input data and get the last word
        ctg = ctg.trim()
        let tokens = ctg.split(' ')
        let word = tokens[tokens.length-1]

        // Get Suggestion
        getSuggestion(word, 3)
            .then(result => {
                return res.status(200).json({
                    suggestions: result
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: 'Server Error Occurred!' 
                })
            })
    }
}