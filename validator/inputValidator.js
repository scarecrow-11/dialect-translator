const { Language } = require('node-nlp');

const language = new Language();

const validate = data => {
    let error = {}

    // Check blank input
    if (!data.ctg) {
        error.ctg = 'Please provide an input.'
    }

    // Guess Language
    const guess = language.guess(data.ctg)
    if (guess.length !== 0) {
        if (guess[0].language !== 'Bengali') {
            error.ctg = 'Please write in Bangla.'
        }
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate