const fixNegation = (tokens) => {
    let len = tokens.length
    for(let i = 0; i < len; ++i) {
        if((i < len-1) && (tokens[i].trim() === "ন" || tokens[i].trim() === "নঁ")) {
            let temp = tokens[i]
            tokens[i] = tokens[i+1]
            tokens[i+1] = temp
            i++
        }
    }
    return tokens
}

module.exports = fixNegation