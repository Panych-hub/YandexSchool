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
        let isFirst = false;
        let isLast = false;

        for (let i=0; i<=minLen; i++){
            // console.log(i);
            isFirst = true;
            isLast = true;
            let mergePart = [];
            for (let j=0; j<i; j++){
                let tempMerge = [];
                for (let k=0; k<blockA[0].length; k++){
                    tempMerge.push(blockA[j][k] + blockB[blockB.length - j - 1][k]);
                }
                mergePart.push(tempMerge);
            }

            mergeArray = [...blockB.slice(0, blockB.length - i), ...mergePart, ...blockA.slice(i ,)]

            for (let i=0; i<mergeArray[0].length; i++){
                if (mergeArray[0][i] === 0) isLast = false;
                if (mergeArray[mergeArray.length - 1][i] === 0) isFirst = false;
            }
            mergeIsValid = mergeIsValid || isValid((mergeArray));
            if (mergeIsValid){
                // console.log(isFirst, isLast);
                // logArr(mergeArray);

                return [mergeIsValid, [isFirst, isLast]]
            }


            // console.log(isValid((mergeArray)));



        }


        return [mergeIsValid, [isLast, isFirst]];
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
            if (isMatch(blockA, blockB)[0]) matchBlock.push([false, false, isMatch(blockA, blockB)[1]]);
            if (isMatch(A2R, blockB)[0]) matchBlock.push([true, false, isMatch(A2R, blockB)[1]]);
            if (isMatch(blockA, B2R)[0]) matchBlock.push([false, true, isMatch(blockA, B2R)[1]]);
            if (isMatch(A2R, B2R)[0]) matchBlock.push([true, true, isMatch(A2R, B2R)[1]]);
        }
        if (Am === Bn){
            if (isMatch(blockA, B1R)[0]) matchBlock.push([false, true, isMatch(blockA, B1R)[1]]);
            if (isMatch(A2R, B1R)[0]) matchBlock.push([true, true, isMatch(A2R, B1R)[1]]);
            if (isMatch(blockA, B3R)[0]) matchBlock.push([false, true, isMatch(blockA, B3R)[1]]);
            if (isMatch(A2R, B3R)[0]) matchBlock.push([true, true, isMatch(A2R, B3R)[1]]);
        }
        if (An === Bn){
            if (isMatch(A1R, B1R)[0]) matchBlock.push([true, true, isMatch(A1R, B1R)[1]]);
            if (isMatch(A3R, B1R)[0]) matchBlock.push([true, true, isMatch(A3R, B1R)[1]]);
            if (isMatch(A1R, B3R)[0]) matchBlock.push([true, true, isMatch(A1R, B3R)[1]]);
            if (isMatch(A3R, B3R)[0]) matchBlock.push([true, true, isMatch(A3R, B3R)[1]]);
        }
        if (An === Bm){
            if (isMatch(A1R, blockB)[0]) matchBlock.push([true, false, isMatch(A1R, blockB)[1]]);
            if (isMatch(A3R, blockB)[0]) matchBlock.push([true, false, isMatch(A3R, blockB)[1]]);
            if (isMatch(A1R, B2R)[0]) matchBlock.push([true, true, isMatch(A1R, B2R)[1]]);
            if (isMatch(A3R, B2R)[0]) matchBlock.push([true, true, isMatch(A3R, B2R)[1]]);
        }
        return matchBlock;
    }
    // let optionsOfMatch = [];
    function getOptionsOfMatch(blocks) {
        let optionsOfMatch = new Set;
        for (let i = 0; i < blocks.length; i++){
            for (let j = i + 1; j < blocks.length; j++){
                // console.log(i, j);
                let blockA = blocks[i].form;
                let blockB = blocks[j].form;
                let tempResult = matching(blockA, blockB);
                // console.log(tempResult, tempResult.length);

                if (tempResult.length !== 0){
                    for (let temp of tempResult){
                        // console.log(temp, (blocks[i].id) + ' ' + temp[0] + ' ' + temp[2][0],
                        //     (blocks[j].id) + ' ' + temp[1] + ' ' + temp[2][1]);

                        optionsOfMatch.add((blocks[i].id) + ' ' + temp[0] + ' ' + temp[2][0] +'/' +
                            (blocks[j].id) + ' ' + temp[1] + ' ' + temp[2][1]);
                    }
                    // optionsOfMatch.push([blocks[i].id, blocks[j].id, ...tempResult]);

                    // optionsOfMatch.set((blocks[j].id) + ' ' + tempResult[0][1],
                    //     (blocks[i].id)+ ' ' + tempResult[0][0]);
                }

                let tempResult2 = matching(blockB, blockA)
                // console.log('2', tempResult2, tempResult2.length);
                if (tempResult2.length !== 0){
                    for (let temp of tempResult2){
                        // console.log(temp);
                        // console.log(temp, (blocks[j].id) + ' ' + temp[0] + ' ' + temp[2][0],
                        //     (blocks[i].id) + ' ' + temp[1] + ' ' + temp[2][1]);
                        optionsOfMatch.add((blocks[j].id) + ' ' + temp[0] + ' ' + temp[2][0] +'/' +
                            (blocks[i].id) + ' ' + temp[1] + ' ' + temp[2][1]);
                    }
                    // optionsOfMatch.push([blocks[i].id, blocks[j].id, ...tempResult]);

                    // optionsOfMatch.set((blocks[j].id) + ' ' + tempResult[0][1],
                    //     (blocks[i].id)+ ' ' + tempResult[0][0]);
                }
                console.log();

            }
        }
        console.log(optionsOfMatch);
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
        let matchKeys = [];

        let keysOption = [];
        let valuesOption = [];

        for (let option of optionsOfMatch){
            keysOption.push(option.split('/')[0]);
            valuesOption.push(option.split('/')[1]);
        }

        console.log(keysOption, valuesOption);
        for (let i=0; i<keysOption.length; i++){
            if (keysOption[i].split(' ')[2] === 'true'){
                let key = keysOption[i];

                let tempKey = valuesOption[i];
                let path = [key, tempKey];
                function pathing(path, lastKey){
                    // console.log(path, lastKey);
                    if (path.length === blocks.length){
                        if (path[path.length - 1].split(' ')[2] === 'true') return path;
                        return ;
                    }
                    for (let i=0; i<keysOption.length; i++){
                        // console.log('-', lastKey);
                        if (keysOption[i] === lastKey){
                            // console.log('--', lastKey);
                            let tempPath = path.slice();
                            tempPath.push(valuesOption[i]);
                            let ansPath = pathing(tempPath, valuesOption[i]);
                            if (ansPath) return ansPath;
                        }
                    }
                }
                path = pathing(path, tempKey)
                if (path){
                    if (path.length === blocks.length){
                        ansPath = path;
                    }
                    console.log(path);
                }

            }

        }
        // console.log(ansPath);
        console.log(ansPath);
        return ansPath;
    }
    function getAns(ansPath) {
        let result = [];
        for (let i=0; i<ansPath.length; i++){
            let tempPart = {};
            tempPart.blockId = Number(ansPath[i].split(' ')[0]);
            tempPart.position = i + 1;
            tempPart.isRotated = (ansPath[i].split(' ')[1]) === 'true';
            result.push(tempPart);
        }
        return result;
    }

    let optionsOfMatch = getOptionsOfMatch(blocks);
    // console.log(optionsOfMatch);
    let ansPath = getPath(optionsOfMatch);
    // console.log(ansPath);
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
    }],

    [{
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
        }],

    [{
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
console.log(layout(blocks[0]));
