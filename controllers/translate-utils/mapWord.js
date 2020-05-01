const Dictionary = require('../../model/Dictionary')

const mapWord = (res, ctg) => {
    console.log(ctg)
    Dictionary.find()
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Server Error Occurred!'
            })
        })
}

module.exports = mapWord