function foo(nums, len1, nums2, len2) {
    let i = 0;
    let j = 0;
    let res = [];
    while (i<len1 && j<len2){

        if (nums2[j] < nums[i]){
            res.push(nums2[j]);
            j++;

        }
        else{
            res.push(nums[i]);
            i++;
        }
    }
    while(i<len1){
        res.push(nums[i]);
        i++;
    }
    while(j<len2){
        res.push(nums2[j]);
        j++;
    }

    nums1 = res;
}
let nums1 = [46,55,88,0,0,0,0,0];
const nums2 = [18,29,80,90, 100];
foo(nums1, 3, nums2, 5);
console.log(nums1);