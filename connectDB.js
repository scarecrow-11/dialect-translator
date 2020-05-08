const mongoose = require('mongoose')

const connectDB = () => {
    const localURI = 'mongodb://localhost/dialect-translator'
    mongoose.connect(process.env.MONGODB_URI || localURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Database connected...')
    })
}

module.exports = connectDB