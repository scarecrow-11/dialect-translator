const router = require('express').Router()

// Translation Route
// localhost:4000/api/translate
router.post('/', (req, res, next) => {
    let input = req.body.input
    console.log(input)
    res.json({
        message: 'Hello there! You\'re ready to translate ' + input + '.'
    })
})

module.exports = router