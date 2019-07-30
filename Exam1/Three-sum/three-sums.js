let threeSum = function (nums) {
  let length = nums.length;
  let result = [];
  if (length < 3) {
    return result;
  }

  nums.sort(function (a, b) { return a - b; })
  for (let i = 0; i < length - 2; i++) {
    if (nums[i] > 0) { break; }
    else if (i > 0 && nums[i] === nums[i - 1]) { continue; }

    let left = i + 1;
    let right = length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (nums[left] === nums[left + 1]) left++;
        while (nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum > 0) {
        while (nums[right] === nums[right - 1]) right--;
        right--;
      } else {
        while (nums[left] === nums[left + 1]) left++;
        left++;
      }
    }
  }
  return result;
};