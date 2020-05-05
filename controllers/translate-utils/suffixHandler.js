// Necessary as different rules apply based on last character of bngStem based on Vowel and Consonants

let vowels = ["অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "ঌ", "এ", "ঐ", "ও", "ঔ"]
let consonants = ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ", "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "শ", "ষ", "স", "হ", "ড়", "ঢ়", "য়", "ৎ","ং", "ঃ", "‍ঁ"]

let diacriticVowels = ["া", "ি", "ী", "ু", "ূ", "ৃ", "ে", "ৈ", "ো", "ৌ"]
let diacriticConsonants = ["‍্", "‍্য", "‍‍‍‍্র", "‍‍র্", "‍্ব", ""]

const suffixHandler = {
    getStemSuffix(word) {
        // Split ctg word into Stem+Suufix
        let ctgSuffixes = ["ত", "রে", "ে", "র", "গান", "্যা"]
        let out = []

        ctgSuffixes.forEach(i => {
            if(word.endsWith(i)) {
                let stem = word.slice(0, word.length-i.length)
                let suffix = i
                out.push(stem)
                out.push(suffix)
                return out
            }
        })

        return out
    },
    getBanglaSuffix(bngStem, ctgSuffix) {
        // Get Bangla Suffix corresponding to Chittagonian
        let suffixesForVowels = {"ত": "তে", "রে": "কে", "ে": "য়", "র": "র", "গান": "টি", "্যা": "্যা"}
        let suffixesForConsonants = {"ত": "ে", "রে": "কে", "ে": "ে", "র": "ের", "গান": "টি", "্যা": "ের"}

        // Checked For NOUNS Only

        let bngSuffix = ''
        if((vowels.includes(bngStem.slice(-1))) || (diacriticVowels.includes(bngStem.slice(-1)))) {
            //bngSuffix = suffixesForVowels.get(suffix)
            if(suffixesForVowels.hasOwnProperty(ctgSuffix)) {
                // If suffix not found return ctg suffix
                bngSuffix = ctgSuffix
            } else {
                bngSuffix = suffixesForVowels[ctgSuffix]
            }
        } else if((consonants.includes(bngStem.slice(-1))) || (diacriticConsonants.includes(bngStem.slice(-1)))) {
            if(!suffixesForConsonants.hasOwnProperty(ctgSuffix)) {
                // If suffix not found return ctg suffix
                bngSuffix = ctgSuffix
            } else {
                bngSuffix = suffixesForConsonants[ctgSuffix]
            }
        }

        return bngSuffix
    }
}

module.exports = suffixHandler