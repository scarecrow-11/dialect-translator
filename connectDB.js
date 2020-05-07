const mongoose = require('mongoose')

const connectDB = () => {
    const localURI = 'mongodb://localhost/dialect-translator'
    const cloudURI = 'mongodb+srv://'+process.env.dbUsername+':'+process.env.dbPassword+'@dictionary-74kzq.mongodb.net/dialect-translator?retryWrites=true&w=majority'
    
    mongoose.connect(cloudURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Database connected...')
    })
}

module.exports = connectDB