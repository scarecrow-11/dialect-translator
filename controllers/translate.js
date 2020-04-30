// Translate Controller
module.exports = {
    translate(req, res) {
        let input = req.body.input
        console.log(input)
        res.json({
            message: 'Hello there! You\'re ready to translate ' + input + '.'
        })
    }
}