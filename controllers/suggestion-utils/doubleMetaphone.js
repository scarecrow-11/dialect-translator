const doubleMetaphone = (word) => {
    // Trim word
    word = word.trim()

    // Define Phonetic Encoding Array
	let encodes = {"অ": "o", "আ": "a", "া": "a", "ই": "i", "ঈ": "i", "ি": "i", "ী": "i", "উ": "u", "ঊ": "u", "ু": "u",
			   "ূ": "u", "এ": "e", "ে": "e", "ঐ": "oi", "ৈ": "oi", "ও": "o", "ঔ": "ou", "ৌ": "ou", "ক": "k", "খ": "k",
			   "গ": "g", "ঘ": "g", "ঙ": "ng", "ং": "ng", "চ": "c", "ছ": "c", "য": "j", "জ": "j", "ঝ": "j", "ঞ": "n",
			   "ট": "T", "ঠ": "T", "ড": "D", "ঢ": "D", "ঋ": "ri", "র": "r", "ড়": "r", "ঢ়": "r", "ন": "n", "ণ": "n",
			   "ত": "t", "থ": "t", "দ": "d", "ধ": "d", "প": "p", "ফ": "p", "ব": "b", "ভ": "b", "ম": "m", "য়": "y",
			   "ল": "l", "শ": "s", "স": "s", "ষ": "s", "হ": "h", "ঃ": "h", "ৎ": "t", 'ৃ': 'ri'}

	let lettersToBeChecked = ['ক', 'য', 'ঞ', 'ব', 'ম', 'হ', 'ঃ']

    encodedWord = ""
    let i = 0
    let l = word.length
    while(i < l) {
        if(word[i] === '-') {
            encodedWord += '-'
            i += 1
            continue
        }
        if(!lettersToBeChecked.includes(word[i])) {
            encodedWord += encodes[word[i]]
        } else if(word[i] === "ক") {
            if(word.slice(i, i+3) === "ক্ষ") {
                if(i === 0) {
                    encodedWord += "k"
                } else {
                    encodedWord += "kk"
                }
                i += 2
            } else {
                encodedWord += "k"
            }
        } else if(word[i] === "য") {
            if(word.slice(i, i+2) === 'য়') {
                encodedWord += "y"
            } else if(i !== 0 && word.slice(i-1, i+1) === '্য') {
                if(i === 2) {
                    encodedWord += "e"
                } else if(i-3 > -1 && word[i-3] === '\u09CD') {
                    // pass
                } else if(word[i-2] === 'র') {
                    encodedWord += "j"
                } else {
                    if(encodedWord) {
                        encodedWord += encodedWord[encodedWord.length-1]
                    }
                }
            } else {
                encodedWord += "j"
            }
        } else if(word[i] === "ঞ") {
            if(i !== 0 && word[i-1] === '\u09CD') {
                if(word[i-2] === "জ") {
                    if(i === 2 && i+1 !== l && word[i+1] === "া") {
                        encodedWord = encodedWord.slice(0, encodedWord.length-1) + "ge"
						i += 1
                    } else {
                        encodedWord = encodedWord.slice(0, encodedWord.length-1) + "gg"
                    }
                } else {
                    encodedWord += "n"
                }
            } else if(i+1 !== l && ["া", "আ", "ই", "ি", "ঈ", "ী"].includes(word[i+1])) {
                // pass
            } else {
                encodedWord += "n"
            }
        } else if(word[i] === "ব") {
            if(i !== 0 && word[i-1] === '\u09CD') {
                if(i === 2 || (i-3 > -1 && word[i-3] === '\u09CD')) {
                    // pass
                } else if(['গ', 'ম'].includes(word[i-2]) || word.slice(i-3, i+1) === 'উদ্ব') {
                    encodedWord += "b"
                } else {
                    if(encodedWord) {
                        encodedWord += encodedWord[encodedWord.length-1]
                    }
                }
            } else {
                encodedWord += "b"
            }
        } else if(word[i] === "ম") {
            if(i !== 0 && word[i-1] === '\u09CD') {
                if(i === 2 || (i-3 > -1 && word[i-3] === '\u09CD')) {
                    // pass
                } else if(['ক', 'গ', 'ঙ', 'ট', 'ন', 'ণ', 'ল', 'স', 'শ', 'ষ'].includes(word[i-2])) {
                    encodedWord += "m"
                } else {
                    if(encodedWord) {
                        encodedWord += encodedWord[encodedWord.length-1]
                    }
                }
            } else {
                encodedWord += "m"
            }
        } else if(word[i] === "হ") {
            if(word.slice(i+1, i+2) === 'ৃ' || word.slice(i+1, i+3) === '্র') {
                // pass
            } else if(word.slice(i+1, i+3) === '্ণ' || word.slice(i+1, i+3) === '্ন') {
                encodedWord += "n"
            } else if(word.slice(i+1, i+3) === '্ম') {
                encodedWord += "m"
            } else if(word.slice(i+1, i+3) === '্য') {
                encodedWord += "j"
            } else if(word.slice(i+1, i+3) === '্ল') {
                encodedWord += "l"
            } else {
                encodedWord += "h"
            }
        } else if(word[i] === 'ঃ') {
            if(l < 4 && i === l-1) {
                encodedWord += "h"
            } else {
                // pass
            }
        }

        if(i-1 > -1 && word[i-1] === 'ঃ') {
            if(i-1 !== 0 && i-1 !== l-1) {
                if(encodedWord) {
                    encodedWord += encodedWord[encodedWord.length-1]
                }
            }
        }

        i += 1
    }

    return encodedWord.trim()
}

module.exports = doubleMetaphone