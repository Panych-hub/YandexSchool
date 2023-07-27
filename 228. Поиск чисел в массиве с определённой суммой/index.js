
function hasArray(nums, k){
    const hash = new Set();
    for (let i = 0; i<nums.length; i++){
        if (hash.has(nums[i])) return true
        else hash.add(k-nums[i])
        // console.log(hash)
    }
    return false;
}
console.log(hasArray([1, 2, 3, 4], 5));
console.log(hasArray([1, 2, 3, 4], 10));
