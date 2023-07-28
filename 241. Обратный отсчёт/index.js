function createCountdown(n) {
    if (!Number.isInteger(n)) n = 0;
    let count = Math.floor(n);
    if (n < 0) count = 0;
    return () => {
        if (count === 0){
            return 0
        }
        return count--
    }

}

const countdownFrom2 = createCountdown(true)

console.log(countdownFrom2()) // 2
console.log(countdownFrom2()) // 1
console.log(countdownFrom2(2)) // 0
console.log(countdownFrom2()) // 0


const countdownFrom1 = createCountdown(5)

console.log(countdownFrom1()) // 2
console.log(countdownFrom1()) // 1
console.log(countdownFrom1(2)) // 0
console.log(countdownFrom1()) // 0

console.log(countdownFrom2()) // 0

console.log(countdownFrom1()) // 0

console.log(countdownFrom2()) // 0