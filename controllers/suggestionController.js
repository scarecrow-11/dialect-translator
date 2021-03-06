const connectDB = require('../connectDB')
const getSuggestion = require('./suggestion-utils/getSuggestions')

// http://localhost:4000/api/ctg/suggestion
module.exports = {
    suggestion(req, res) {
        // Connect to Database
        connectDB()

        // Grab input
        let word = req.body.ctg

        // Tokenize input data and get the last word
        word = word.trim()

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