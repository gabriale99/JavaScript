let arr = [
  1,
  2,
  [3, 4, [5, 6, 0]],
  4,
  [3, 7],
  0
];

function flatten(arr, useDFS) {
  let res = [];
  if (useDFS) { // dfs
    function dfs(arr, res) {
      arr.forEach(element => {
        if (Array.isArray(element)) {
          dfs(element, res)
        } else {
          res.push(element);
        }
      });
      return res;
    }
    return dfs(arr, res);
  } else { // bfs
    let queue = arr;
    while (queue.length > 0) {
      let cur = queue.shift();

      if (Array.isArray(cur)) {
        queue.push.apply(queue, cur);
      } else {
        res.push(cur);
      }
    }
    return res;
  }
}

console.log(flatten(arr, true));
console.log(flatten(arr, false));