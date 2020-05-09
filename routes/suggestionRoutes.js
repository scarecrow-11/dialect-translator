const router = require('express').Router()
const { suggestion } = require('../controllers/suggestionController')

// Suggestion Route
// localhost:4000/api/suggestion
router.post('/suggestion', suggestion)

module.exports = router