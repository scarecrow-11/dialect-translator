const router = require('express').Router()
const { translate } = require('../controllers/translateController')

// Translation Route
// localhost:4000/api/translate
router.post('/translate', translate)

module.exports = router