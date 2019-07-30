
let peek = (stack) => stack[stack.length - 1];
let find132pattern = function (nums) {
  if (nums.length < 3) {
    return false;
  }
  let stack = []
  let mins = new Array(nums.length);
  mins[0] = nums[0];
  for (let i = 1; i < mins.length; i++) {
    mins[i] = Math.min(mins[i - 1], nums[i]);
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] > mins[i]) {
      if (stack.length < 1 || peek(stack) > nums[i]) {
        stack.push(nums[i]);
      } else {
        while (stack.length > 0 && peek(stack) < nums[i]) {
          if (stack.pop() > mins[i]) {
            return true;
          }
        }
      }
    }
  }

  // Credit to https://leetcode.com/problems/132-pattern/discuss/141109/Inspired-Javascript-solution-72-ms
  // let stack = [];
  // let mid = -Infinity;
  // for (let i = nums.length - 1; i >= 0; i--) {
  //     if (nums[i] < mid) {
  //         return true;
  //     }
  //     while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
  //         mid = stack.pop();
  //     }
  //     stack.push(nums[i]);
  // }

  return false;
};
let arr = [3, 1, 4, 2]
console.log(find132pattern(arr));
