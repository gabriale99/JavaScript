Array.prototype.filter = function (fn) {
    let result = []
    this.forEach((x) => {
        if (fn(x)) {
            result.push(x);
        }
    });
    return result;
};

let x = [1,2,3,4]
console.log(x.filter(y => (y % 2) === 0 ))

Array.prototype.map = function (fn) {
    let result = new Array(this.length)
    this.forEach((x, i) => {
        result[i] = fn(x);
    });
    return result;
};

Array.prototype.reduce = function (fn) {

};


function debouce(fn, wait) {

}

function throttle(fn, limit) {

}

Function.prototype.bind = function () {

};

let input = [
    {
        Value: 'a',
        Time: 2000
    },
    {
        Value: 'b',
        Time: 1000
    },
    {
        Value: 'c',
        Time: 3000
    },
];

// We need to output ‘a’ after 2 seconds, putput ‘b’ 1 second after ‘a’, and output ‘c’ 3 seconds after ‘b’
// for example we start at 10: 00am

// 10: 00: 02 -> ‘a’
// 10: 00: 03 -> ‘b’
// 10: 00: 06 -> ‘c’

function printTasks(list) {

}

