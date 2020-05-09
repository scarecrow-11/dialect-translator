// STILL BUGGY !!!!!!!!!!!!!!!!!!!!!

const lcsDistance = (str1, str2) => {
    // find the length of the strings
    let m = str1.length
    let n = str2.length

    // declaring the array for storing the dp values
    let L = []  // L stores dp values
    let temp = []
    for(let i = 0; i < n+1; ++i) {
        temp.push(null)
    }
    for(let i = 0; i < m+1; ++i) {
        L.push(temp)
    }

    // Following steps build L[m+1][n+1] in bottom up fashion 
    // Note: L[i][j] contains length of LCS of str1[0..i-1] 
    // and str2[0..j-1]
    for(let i = 0; i < m+1; ++i) {
        for(let j = 0; j < n+1; ++j) {
            if(i === 0 || j === 0) {
                L[i][j] = 0
            } else if(str1[i-1] === str2[j-1]) {
                L[i][j] = L[i-1][j-1] + 1
            } else {
                L[i][j] = Math.max(L[i-1][j], L[i][j-1])
            }
        }
    }

    // L[m][n] contains the length of LCS of str1[0..n-1] & str2[0..m-1]
    return L[m][n]
}

let res = lcsDistance('abbadscasvagfaye5azdghaag', 'bbbb')
console.log(res)

module.exports = lcsDistance