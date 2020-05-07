const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const translateRouter = require('./routes/translateRoutes')
const path = require('path')

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/ctg', translateRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to the Dialect Translator.'
    })
})

// Web Application Listen on PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Server is listening on PORT ' + PORT + '...')
})