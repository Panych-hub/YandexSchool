const blocks = [
    [
        [1, 0, 1],
        [1, 1, 1]]
    ,
    [
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]];
function logArr(arr) {
    for (let i=0; i<arr.length; i++){
        console.log(arr[i]);
    }
    console.log('\n');
}

function isMatch(blockA, blockB) {
    function isValid(arr){
        for (let i=0; i<arr.length; i++){
            for (let j=0; j<arr[0].length; j++){
                if (arr[i][j] > 1) return false;
                if (arr[i][j] === 0){
                    if (i > 0 && !(arr[i-1][j] === 0)) return false;
                    if (i < arr.length && !(arr[i+1][j] === 0)) return false;
                }
            }
        }
        return true;
    }
    logArr(blockB);
    logArr(blockA);
    let minLen = Math.min(blockA.length, blockB.length);
    let mergeArray = [];
    let mergeIsValid = false;
    for (let i=0; i<=minLen; i++){
        console.log(i);
        let mergePart = [];
        for (let j=0; j<i; j++){
            let tempMerge = [];
            for (let k=0; k<blockA[0].length; k++){
                tempMerge.push(blockA[j][k] + blockB[blockB.length - j - 1][k]);
            }
            mergePart.push(tempMerge);
        }

        mergeArray = [...blockB.slice(0, blockB.length - i), ...mergePart, ...blockA.slice(i ,)]
        logArr(mergeArray);
        mergeIsValid = mergeIsValid || isValid((mergeArray));
        console.log(isValid((mergeArray)));
    }
    return mergeIsValid;
}
console.log(isMatch(blocks[0], blocks[1]));