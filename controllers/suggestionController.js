const connectDB = require('../connectDB')

module.exports = {
    getSuggestion(req, res) {
        // Connect to Database
        connectDB()

        // Grab input
        let { ctg } = req.body

        // Tokenize input data and get the last word
        ctg = ctg.trim()
        let tokens = ctg.split(' ')
        let word = tokens[tokens.length-1]

        // Get Suggestion

        return res.status(200).json({
            suggestion: word
        })
    }
}