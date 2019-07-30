let convert = function (s, numRows) {
  if (numRows <= 1) {
    return s;
  } else {
    let arr = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
      arr[i] = "";
    }
    let diagonal = numRows - 2;
    for (let i = 0; i < s.length; i++) {
      let idx = i % (diagonal + numRows);
      if (idx >= numRows) {
        idx = numRows + diagonal - idx;
      }
      arr[idx] += s[i];
    }
    return arr.join("");
  }
};

let numRows = 4;
let arr = new Array(numRows);