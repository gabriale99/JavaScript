let permute = function (nums) {
  let result = [];

  function findSolutions(arr, perm, res) {
    if (arr.length <= 0) {
      res.push(perm);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let tempPerm = [...perm];
        tempPerm.push(arr[i]);
        let tempArr = [...arr];
        tempArr.splice(i, 1);
        findSolutions(tempArr, tempPerm, res);

      }
    }
  }

  findSolutions(nums, [], result)
  return result;
};

console.log(permute([1, 2, 3]));