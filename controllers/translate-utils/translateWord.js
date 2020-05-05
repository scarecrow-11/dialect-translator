const mapWord = require('./mapWord')
const { getStemSuffix, getBanglaSuffix } = require('./suffixHandler')

const translateWord = word => {
    return mapWord(word)
        .then(result => {
            if(!result) {
                // If Word-to-Word mapping is NOT successfull

                // Split into Stem+Suffix
                let stemSuffix = getStemSuffix(word)
                if(stemSuffix.length <= 0) {
                    // If ctg Word can't be splitted
                    return word
                } else {
                    // If ctg Word is successfully splitted
                    // Translate ctg Stem using word-to-word mapping
                    return mapWord(stemSuffix[0])
                        .then(result => {
                            if(!result) {
                                // If even ctgStem translation in NOT successfull with Word-to-Word mapping
                                // Return original ctg word
                                return word
                            } else {
                                // Generate bng Word using Suffix transformation rules
                                let bngStem = result.bng
                                let bngSuffix = getBanglaSuffix(bngStem, stemSuffix[1])
                                let bngWord = bngStem + bngSuffix
                                return bngWord
                            }
                        })
                }
            } else {
                // Word-to-Word mapping successful
                return result.bng
            }
        })
}

module.exports = translateWord