const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const translateRouter = require('./routes/translateRoutes')

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/translate', translateRouter)

app.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to the Dialect Translator.'
    })
})

// Web Application Listen on PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Server is listening on PORT ' + PORT + '...')
    mongoose.connect('mongodb://localhost/dialect-translator', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Database connected...')
    })
})