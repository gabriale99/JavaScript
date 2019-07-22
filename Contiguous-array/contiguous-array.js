'use strict'
let findMaxLength = function (nums) {
  let hash = new Map();
  let sum = 0;
  let maxLength = 0;
  console.log(nums);
  nums.forEach((num, i) => {
    if (num === 0) {
      num = -1;
    }

    sum += num;
    if (sum === 0) {
      maxLength = i + 1;
      // console.log("Start from 0 : " + maxLength);
    }
    // console.log(sum);
    if (hash.has(sum)) {
      let curLen = i - hash.get(sum);
      if (curLen > maxLength) {
        maxLength = curLen;
      }
    } else {
      hash.set(sum, i);
    }
    // console.log(hash);
  });
  return maxLength;
};

console.log(findMaxLength([1, 0, 0, 1, 0, 1, 1]));