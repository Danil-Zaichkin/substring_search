let fs = require('fs');
let agr = process.argv;
let inputString = fs.readFileSync('input.txt').toString();
let subString = agr[2];

let getHash = function (inputString) {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
        hash += Math.pow(inputString.charCodeAt(i), 2);
    }
    return hash;
}

for (let i = 0; i < inputString.length; i++) {
    let flag = 1;
    if (getHash(subString) === getHash(inputString.slice(i, i+subString.length))) {
        flag = 0;
        let j = 0;
        while (j < subString.length) {
            if (subString.charAt(j) !== inputString.charAt(i+j)) {
                flag = 1;
                break;
            }
            j++;
        }
    }
    if (flag === 0)
        console.log(i+1);
}
