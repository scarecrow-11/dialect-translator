const Word = require('../../model/Word')

const mapWord = (res, ctg) => {
    return Word.findOne({ctg})
        .exec()
        .then(result => {
            return result
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Server Error Occurred!'
            })
        })
}

module.exports = mapWord