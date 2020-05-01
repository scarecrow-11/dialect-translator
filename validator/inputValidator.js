const { Language } = require('node-nlp');

const language = new Language();

const validate = data => {
    // FIX NEEDED FOR BLANK INPUT ERROR!!!
    let error = {}
    console.log(data)

    // Check blank input
    if (!data.input) {
        error.input = 'Please provide an input.'
    }

    // Guess Language
    const guess = language.guess(data.input)
    if (guess.length !== 0) {
        if (guess[0].language !== 'Bengali') {
            error.input = 'Please write in Bangla.'
        }
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate