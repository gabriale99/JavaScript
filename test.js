'use strict'
let a = "123";
let b = a;
a = "234";
// console.log(a, b)

a = [1, 2, 3, 4]
b = a;
a.push(5);
// console.log(a, b)

b = a.concat(6)
// console.log(a, b)

a = [...a, 7]
// console.log(a, b)

// let salaries = {
//     John: 100,
//     Ann: 160,
//     Pete: 130
// }
// let sum = 0;
// for ( let salary in salaries ) {
//     sum += salaries[salary];
// }
// console.log(sum);

let x = (a) => a % 2 === 0;
console.log(x(2))
console.log(Math.round(6.35 * 10) / 10)
function random(min, max) {
  return min + (Math.random() * (max - min));
}
console.log(random(1, 5));

function randomInteger(min, max) {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
}
console.log(randomInteger(1, 5));
console.log("\u{20331}");

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(field) {
  return function (a, b) {
    return a[field] - b[field];
  }
}

console.log(users.sort(byField('name')));
console.log(users.sort(byField('age')));

// let search = 'A';
// let regex = new RegExp(`(.${search}|${search}.|${search})`, "gi")
// console.log("AZ".match(regex));


const fetch = require("node-fetch");
let arr = [];
async function sth() {
  let regex = new RegExp('(.)*darth(.)*', 'gi');
  let response = await fetch('https://swapi.co/api/people/')
  let json = await response.json();
  json.results.forEach(result => {
    if (result['name'].match(regex)) {
      arr.push(result);
    }
  })
  return json;
}
console.log(sth());