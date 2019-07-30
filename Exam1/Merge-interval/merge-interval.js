let merge = function (intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }
  intervals.sort((a, b) => a[0] - b[0]);
  // Brute Force
  // for (let i = 0; i < intervals.length - 1; i++) {
  //   for (let j = 0; j < intervals.length; j++) {
  //     if (i === j) {
  //       continue;
  //     }
  //     if (intervals[i][0] <= intervals[j][0] && intervals[j][0] <= intervals[i][1]) {
  //       if (intervals[i][0] <= intervals[j][1] && intervals[j][1] <= intervals[i][1]) {
  //         intervals.splice(j, 1);
  //         j--;
  //       } else if (intervals[j][0] <= intervals[i][1] && intervals[i][1] <= intervals[j][1]) {
  //         let temp = [intervals[i][0], intervals[j][1]];
  //         intervals.splice(i, 1, temp);
  //         intervals.splice(j, 1);
  //         j--;
  //       }
  //     } else if (intervals[j][0] <= intervals[i][0] && intervals[i][0] <= intervals[j][1]) {
  //       if (intervals[j][0] <= intervals[i][1] && intervals[i][1] <= intervals[j][1]) {
  //         intervals.splice(i, 1);
  //       } else if (intervals[i][0] <= intervals[j][1] && intervals[j][1] <= intervals[i][1]) {
  //         let temp = [intervals[j][0], intervals[i][1]];
  //         intervals.splice(i, 1, temp);
  //         intervals.splice(j, 1);
  //       }
  //     }
  //   }
  // }
  // return intervals;

  let prev = intervals[0]
  let res = [prev];
  intervals.forEach((cur) => {
    if (prev[1] >= cur[0]) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      res.push(cur);
      prev = cur;
    }
  }, intervals[1])
  return res;
}
let arr = [
  [321, 336], [421, 427], [170, 184], [6, 21], [178, 193], [412, 417],
  [136, 141], [244, 247], [0, 3], [172, 175], [223, 234], [368, 376],
  [180, 197], [101, 108], [442, 460], [213, 216], [153, 159], [369, 385],
  [481, 488], [411, 430], [363, 378], [197, 216], [453, 454], [463, 476],
  [256, 271], [336, 355], [186, 203], [47, 65], [254, 254], [458, 474],
  [238, 249], [311, 315], [10, 22], [272, 275], [259, 262], [354, 356],
  [211, 222], [474, 478], [492, 509], [117, 117], [424, 430], [79, 81],
  [363, 370], [180, 197], [479, 489], [165, 183], [14, 30], [314, 318],
  [8, 14], [367, 386], [121, 122], [242, 246], [125, 141], [348, 357],
  [5, 23], [70, 71], [124, 133], [243, 250], [128, 143], [456, 464],
  [266, 279], [178, 178], [449, 461], [156, 165], [430, 433], [428, 439],
  [96, 98], [88, 89], [90, 106], [191, 206], [106, 119], [376, 386],
  [114, 125], [69, 72], [247, 264], [203, 208], [350, 363], [145, 156],
  [225, 226], [460, 467], [176, 177], [410, 414], [263, 281], [346, 360],
  [287, 296], [301, 314], [354, 364], [124, 132], [1, 6], [211, 211],
  [275, 281], [465, 470], [499, 501], [129, 145], [115, 124], [83, 94],
  [182, 188], [416, 434], [344, 358], [4, 15], [355, 360], [377, 386],
  [187, 200], [29, 30]
]
console.log(merge(arr).sort((a, b) => a[0] - b[0]));
