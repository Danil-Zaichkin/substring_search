let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync('input.txt').toString()
let t = arg[2]

function bruteForce(inputStr, subStr) {
    let res = new Array;
    let j = 0;
    for (let i = 0; i < inputStr.length - subStr.length + 1; i++) {
        while(j < subStr.length && subStr[j] === inputStr[i+j])
            j++;
        if (j === subStr.length)
            res.push(i+1);
        j = 0;
    }
    return res
}

function hashSearch(inputStr, subStr) {
    let res = new Array;
    let j = 0;
    const subStrHash = getHash(subStr);
    let inputStrHash = getHash(inputStr.substring(0, subStr.length));
    for (let i = 0; i < inputStr.length - subStr.length + 1; i++) {
        if (subStrHash === inputStrHash) {
            while (j < subStr.length && inputStr[i + j] === subStr[j]) {
                j++;
            }
            if (j === subStr.length)
                res.push(i+1);
        }
        inputStrHash -= (inputStr.charCodeAt(i) * inputStr.charCodeAt(i));
        inputStrHash += (inputStr.charCodeAt(i + subStr.length) * inputStr.charCodeAt(i + subStr.length));
        j = 0;
    }
    return res

    function getHash(str) {
        let strHash = 0;
        for (let i = 0; i < str.length; i++) {
            strHash += (str.charCodeAt(i) * str.charCodeAt(i));
        }
        return strHash;
    }
}

function algRabinKarp(inputStr, subStr) {
    let res = new Array();
    let j = 0;
    let c = Math.pow(2, subStr.length - 1)
    const subStrHash = getHash(subStr);
    let inputStrHash = getHash(inputStr.substring(0, subStr.length));
    for (let i = 0; i < inputStr.length - subStr.length + 1; i++) {
        if (subStrHash === inputStrHash) {
            j = 0;
            while (j < subStr.length && subStr[j] === inputStr[i + j])
                j++;
            if (j === subStr.length)
                res.push(i+1);
        }
        inputStrHash = (inputStrHash - inputStr.charCodeAt(i)*c) * 2 + inputStr.charCodeAt(i + subStr.length)

    }
    return res

    function getHash(str) {
        let strHash = 0;
        for (let i = 0; i < str.length; i++) {
            strHash += (str.charCodeAt(i) * Math.pow(2, str.length-i-1))
        }
        return strHash
    }
}

switch (arg[3]) {
    case 'bf':
        console.log(bruteForce(s, t));
        break
    case 'h':
        console.log(hashSearch(s, t));
        break
    case 'rk':
        console.log(algRabinKarp(s, t));
        break
}

