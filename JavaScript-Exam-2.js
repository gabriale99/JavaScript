Array.prototype.filter = function (fn) {
    let result = []

    this.forEach((x) => {
        if (fn(x)) {
            result.push(x);
        }
    });

    return result;
};

let x = [1, 2, 3, 4]
console.log(x.filter(y => (y % 2) === 0))

Array.prototype.map = function (fn) {
    let result = new Array(this.length)

    this.forEach((x, i) => {
        result[i] = fn(x);
    });

    return result;
};

x = [1, 2, 3, 4]
console.log(x.map(y => y * 2))

Array.prototype.reduce = function (fn, initialValue) {
    if (this.length < 1) {
        return 0;
    }

    let accumulate = !!initialValue ? initialValue : this[0];
    let x = accumulate === initialValue ? 0 : 1;
    for (; x < this.length; x++) {
        accumulate = fn(accumulate, this[x]);
    }

    return accumulate;
};

x = [1, 2, 3, 4]
console.log(x.reduce((y, z) => y * z));

function debounce(fn, wait) {
    let isDebounced = false;
    return function () {
        if (!isDebounced) {
            fn.apply(fn, arguments);
            isDebounced = true;
            setTimeout(() => isDebounced = false, wait);
        }
    }
}

function throttle(fn, limit) {
    let isThrottled = false, savedArgs, savedThis;
    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        fn.apply(this, arguments);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs && savedThis) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = null;
                savedThis = null;
            }
        }, wait);
    }
}

Function.prototype.bind = function (context) {
    let fn = this;
    let prevArgs = [].slice.call(arguments, 1)
    return function () {
        let newArgs = [].slice.call(arguments, 1)
        let combineArgs = [].concat(prevArgs, newArgs);
        return fn.apply(context, combineArgs);
    }
};


var foo = {
    x: 3
}

var bar = function () {
    console.log(this.x);
}

bar(); // undefined

var boundFunc = bar.bind(foo);

boundFunc(); // 3

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
    let idx = 0;
    function printTask() {
        if (!list[idx]) return;
        let curTask = list[idx];
        setTimeout(() => {
            console.log(`${new Date()} -> '${curTask.Value}'`);
            idx++;
            printTask();
        }, curTask.Time)
    }
    printTask();
}

printTasks(input);