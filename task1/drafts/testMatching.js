function rotateArray(arr) {
    let newArray = [];
    let n = arr.length;
    let m = arr[0].length;
    for (let j=0; j<m; j++){
        let tempArr = []
        for (let i=n-1; i>=0; i--){
            tempArr.push(arr[i][j]);
        }
        newArray.push(tempArr)
    }
    return newArray;
}

function logArr(arr) {
    for (let i=0; i<arr.length; i++){
        console.log(arr[i]);
    }
    console.log('\n');
}
function fullRotate(arr){
    let rotArr = rotateArray(arr);
    for (let i=0; i<4; i++){
        logArr(rotArr);
        rotArr = rotateArray(rotArr);

    }

}

function isMatch(blockA, blockB) {
    function isValid(arr){
        for (let i=0; i<arr.length; i++){
            for (let j=0; j<arr[0].length; j++){
                if (arr[i][j] > 1) return false;
                if (arr[i][j] === 0){
                    if (i > 0 && i < (arr.length - 1) &&
                        (arr[i-1][j] !== 0) && (arr[i+1][j] !== 0)) return false;
                    // if (i < (arr.length - 1) && !(arr[i+1][j] !== 0)) return false;
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
function matching(blockA, blockB) {
    let matchBlock = [];

    let An = blockA.length;
    let Am = blockA[0].length;
    let Bn = blockB.length;
    let Bm = blockB[0].length;

    let A1R = rotateArray(blockA);
    let A2R = rotateArray(A1R);
    let A3R = rotateArray(A2R);

    let B1R = rotateArray(blockB);
    let B2R = rotateArray(B1R);
    let B3R = rotateArray(B2R);

    if (Am === Bm){
        if (isMatch(blockA, blockB)) matchBlock.push([false, false]);
        if (isMatch(A2R, blockB) )matchBlock.push([true, false]);
        if (isMatch(blockA, B2R)) matchBlock.push([false, true]);
        if  (isMatch(A2R, B2R)) matchBlock.push([true, true]);
    }
    if (Am === Bn){
        if (isMatch(blockA, B1R)) matchBlock.push([false, true]);
        if (isMatch(A2R, B1R)) matchBlock.push([true, true]);
        if (isMatch(blockA, B3R)) matchBlock.push([false, true]);
        if (isMatch(A2R, B3R)) matchBlock.push([true, true]);
    }
    if (An === Bn){
        if (isMatch(A1R, B1R)) matchBlock.push([true, true]);
        if (isMatch(A3R, B1R)) matchBlock.push([true, true]);
        if (isMatch(A1R, B3R)) matchBlock.push([true, true]);
        if (isMatch(A3R, B3R)) matchBlock.push([true, true]);
    }
    if (An === Bm){
        if (isMatch(A1R, blockB)) matchBlock.push([true, false]);
        if (isMatch(A3R, blockB)) matchBlock.push([true, false]);
        if (isMatch(A1R, B2R)) matchBlock.push([true, true]);
        if (isMatch(A3R, B2R)) matchBlock.push([true, true]);
    }
    return matchBlock;
}

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
console.log(matching(blocks[0], blocks[1]));