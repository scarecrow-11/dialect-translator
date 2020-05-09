const router = require('express').Router()
const { getSuggestion } = require('../controllers/suggestionController')

// Suggestion Route
// localhost:4000/api/suggestion
router.post('/suggestion', getSuggestion)

module.exports = router