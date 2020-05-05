const generateOutput = (promises, tokens) => {
    return Promise.all(promises)
        .then(results => {
            let bngOutput = ''
            for(let i = 0; i < results.length; ++i) {
                if(!results[i]) {
                    console.log('Not Found!')
                    bngOutput += tokens[i] + ' '
                } else {
                    bngOutput += results[i] + ' '
                }
            }
            return bngOutput.trim()
        })
}

module.exports = generateOutput