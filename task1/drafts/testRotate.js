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

export function logArr(arr) {
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

let arr = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
];
logArr(arr);
// fullRotate(arr);

