const mongoose = require('mongoose')
const Word = require('../../model/Word')
const doubleMetaphone = require('./doubleMetaphone')
const levenshteinDistance = require('./levenshteinDistance')
//const connectDB = require('../../connectDB')

const getSuggestions = (word, count) => {

    //connectDB()
    // Encode word1 with Double Metaphone
    let wordEnc = doubleMetaphone(word)

    // Get all ctg words and compare encodings
    return Word.find()
        .exec()
        .then(results => {
            // Encode each result with Double Metaphone and compare with word1Enc
            let levDistArray = []
            let suggestions = []
            for(let i = 0; i < results.length; ++i) {
                let ctg = results[i].ctg
                // Encode ctg with Double Metaphone
                let ctgEnc = doubleMetaphone(ctg)
                let levDist = levenshteinDistance(wordEnc, ctgEnc)
                
                levDistArray.push({ctg, dist: levDist})
            }

            // Get maximum match results from levDistArray
            levDistArray = levDistArray.sort((a, b) => {
                return a.dist - b.dist
            })

            // Get top suggestions
            for(let i = 0; i < count; ++i) {
                suggestions.push(levDistArray[i].ctg)
            }

            return suggestions
        })
}

module.exports = getSuggestions