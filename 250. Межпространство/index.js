function foo(str){
    if(str.charCodeAt(0) < 'G'.charCodeAt(0) ||
        str.charCodeAt(0) > 'U'.charCodeAt(0) ||
        str[0] === 'I' || str[0] === 'J') return null
    if(str[1] < '3' || str[1] > '8' ||
        str[2] < '3' || str[2] > '8' ||
        str[3] < '3' || str[3] > '8') return null
    if (str[4] !== 'B' && str[4] !== 'T')return null
    if (str[4] === 'B'){
        if (str[5] !== 'C' &&
            str[5] !== 'K' &&
            str[5] !== 'M' &&
            str[5] !== 'B') return null
        if (str[6] !== 'G' &&
            str[6] !== 'J' &&
            str[6] !== 'P') return null
        }
    else if (str[4] === 'T'){
        if (str[5] !== 'O' &&
            str[5] !== 'R' &&
            str[5] !== 'S') return null
        if (str[6] !== '8' &&
            str[6] !== 'J' &&
            str[6] !== 'M' &&
            str[6] !== 'E') return null
    }
    if (str.length > 32 || str.length < 9) return null
    for (let i=7; i<str.length - 1; i++){
        if (!(str[i] >= '0' && str[i] <= '9' ||
        str.charCodeAt(i) >= 'A'.charCodeAt(0) &&
            str.charCodeAt(i) <='Y'.charCodeAt(0))) return null
    }
    if (str[str.length - 1] !== 'Z') return null
    const arr = [...str];
    return [arr.slice(0, 4).join(''), arr[4],
        arr[5] + arr[6], arr.slice(7, str.length-1).join('')]
}
console.log(foo('O464TR849BM182BDZ'))
console.log(foo('U345BMG123456789ABCDEFZ'))
console.log(foo('G333TR81Z'))
console.log(foo('A333TR81Z'))
console.log(foo('I333TR81Z'))
console.log(foo('G233TR81Z'))
console.log(foo('G333TR8Z'))
console.log(foo('G333TRZZ'))