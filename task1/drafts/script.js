function layout(blocks) {

    function logArr(arr) {
        for (let i=0; i<arr.length; i++){
            console.log(arr[i]);
        }
        console.log('\n');
    }
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
        // logArr(blockB);
        // logArr(blockA);
        let minLen = Math.min(blockA.length, blockB.length);
        let mergeArray = [];
        let mergeIsValid = false;

        for (let i=0; i<=minLen; i++){
            // console.log(i);
            let mergePart = [];
            for (let j=0; j<i; j++){
                let tempMerge = [];
                for (let k=0; k<blockA[0].length; k++){
                    tempMerge.push(blockA[j][k] + blockB[blockB.length - j - 1][k]);
                }
                mergePart.push(tempMerge);
            }

            mergeArray = [...blockB.slice(0, blockB.length - i), ...mergePart, ...blockA.slice(i ,)]
            // logArr(mergeArray);
            mergeIsValid = mergeIsValid || isValid((mergeArray));
            // console.log(isValid((mergeArray)));
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
    // let optionsOfMatch = [];
    function getOptionsOfMatch(blocks) {
        let optionsOfMatch = new Map;
        for (let i = 0; i < blocks.length; i++){
            for (let j = i + 1; j < blocks.length; j++){
                // console.log(i, j);
                let blockA = blocks[i].form;
                let blockB = blocks[j].form;
                let tempResult = matching(blockA, blockB)
                if (tempResult.length !== 0){
                    // optionsOfMatch.push([blocks[i].id, blocks[j].id, ...tempResult]);
                    optionsOfMatch.set((blocks[i].id) + ' ' + tempResult[0][0],
                        (blocks[j].id)+ ' ' + tempResult[0][1]);
                    // optionsOfMatch.set((blocks[j].id) + ' ' + tempResult[0][1],
                    //     (blocks[i].id)+ ' ' + tempResult[0][0]);
                }
                let tempResult2 = matching(blockB, blockA)
                if (tempResult2.length !== 0){
                    // optionsOfMatch.push([blocks[i].id, blocks[j].id, ...tempResult]);
                    optionsOfMatch.set((blocks[j].id) + ' ' + tempResult2[0][0], (blocks[i].id)+ ' ' + tempResult2[0][1]);
                }


            }
        }
        return optionsOfMatch;
    }
    // function pathIsValid (path){
    //     let firstId = path[0].split(' ')[0];
    //     let lastId = path[path.length - 1].split(' ')[0];
    //     let firstBlock;
    //     let lastBlock;
    //     for (let i=0; i<blocks.length; i++){
    //         if (blocks[i].id.toString() === firstId) firstBlock = blocks[i].form;
    //         if (blocks[i].id.toString() === lastId) lastBlock = blocks[i].form;
    //     }
    //     let lenFirst = firstBlock.length ? path[0].split(' ')[1] === 'true' :
    //         firstBlock[0].length;
    //     let lenLast = lastBlock.length ? path[path.length - 1].split(' ')[1] === 'true' :
    //         lastBlock[0].length;
    //     for (let i=0; i<lenFirst;)
    // }
    function getPath(optionsOfMatch) {
        let ansPath;
        for (let key of optionsOfMatch.keys()){

            let tempKey = optionsOfMatch.get(key);
            let path = [key, tempKey];

            while (optionsOfMatch.has(tempKey)){
                // console.log(tempKey, optionsOfMatch.get(optionsOfMatch.get(tempKey)));
                tempKey = optionsOfMatch.get(tempKey);
                path.push(tempKey);
                if (path.length === blocks.length) break;
                // if (tempKey !== optionsOfMatch.get(tempKey)){
                //     console.log(tempKey, optionsOfMatch.get(tempKey));
                //     tempKey = optionsOfMatch.get(tempKey);
                //     path.push(tempKey);
                // }

            }

            if (path.length === blocks.length){
                ansPath = path;
            }
            console.log(path);
        }
        // console.log(ansPath);
        return ansPath;
    }
    function getAns(ansPath) {
        let result = [];
        for (let i=0; i<ansPath.length; i++){
            let tempPart = {};
            tempPart.position = i + 1;
            tempPart.blockId = Number(ansPath[i].split(' ')[0]);
            tempPart.isRotated = (ansPath[i].split(' ')[1]) === 'true';
            result.push(tempPart);
        }
        return result;
    }

    let optionsOfMatch = getOptionsOfMatch(blocks);
    console.log(optionsOfMatch);
    let ansPath = getPath(optionsOfMatch);
    console.log(ansPath);
    let answer = getAns(ansPath);
    return answer;

}

const blocks = [[{
    "id": 738,
    "form": [
        [1, 0],
        [1, 1]
    ]
},
    {
        "id": 841,
        "form": [
            [1, 1],
            [0, 1]
        ]
    }], [{
    "id": 443,
    "form": [
        [1, 0, 1],
        [1, 1, 1]
    ]
},
    {
        "id": 327,
        "form": [
            [0, 1, 0],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 0],
            [0, 1, 0]
        ]
    },
    {
        "id": 891,
        "form": [
            [0, 0, 1],
            [1, 0, 1],
            [1, 1, 1]
        ]
    }],
    [{
    "id": 4892,
    "form": [
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
},
    {
        "id": 1839,
        "form": [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 0, 0]
        ]
    },
    {
        "id": 8183,
        "form": [
            [0, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 0],
            [0, 1, 0]
        ]
    }], [{
    "id": 1,
    "form": [
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
},
    {
        "id": 2,
        "form": [
            [0, 0, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    },
    {
        "id": 3,
        "form": [
            [0, 1, 1],
            [1, 1, 1],
            [0, 1, 0]
        ]
    }]];
console.log(layout(blocks[3]));
