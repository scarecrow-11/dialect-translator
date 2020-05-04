const Word = require('../../model/Word')

const mapWord = (ctg) => {
    return Word.findOne({ctg})
        .exec()
        .then(result => {
            return result
        })
}

module.exports = mapWord