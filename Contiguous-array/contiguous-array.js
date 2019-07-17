let findMaxLength = function (nums) {
  let hash = new Map();
  let sum = 0;
  let maxLength = 0;

  nums.forEach((num, i) => {
    if (num === 0) {
      num = -1;
    }

    sum += num;
    if (sum === 0) {
      maxLength = i + 1;
    }

    if (hash.has(sum + nums.length)) {
      let curLen = i - hash.get(sum + nums.length);
      if (curLen > maxLength) {
        maxLength = curLen;
      }
    } else {
      hash.set(sum + nums.length, i);
    }
  });
  return maxLength;
};

console.log(findMaxLength([0, 0, 1, 0, 0, 1, 1]));