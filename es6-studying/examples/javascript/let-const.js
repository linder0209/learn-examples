'use strict';
{
    let a = 10;
    var b = 1;
}
console.info(a);
console.info(b);

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6

function do_something() {
    console.log(foo); // ReferenceError
    let foo = 2;
}

let foo = 'outer';

function bar(func = x => foo) {
    let foo = 'inner';
    console.log(func()); // outer
}

bar();

/*function func(arg) {
    let arg; // 报错
}*/

function func(arg) {
    {
        let arg; // 不报错
    }
}

const PI = 3.1415;
PI // 3.1415

//下面是一个将对象彻底冻结的函数。
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key, value) => {
        if ( typeof obj[key] === 'object' ) {
        constantize( obj[key] );
    }
});
};

(function (){
    'use strict';
    console.log(foo) //foo is not defined
    {
        console.log(foo) //undefined
        let foo = 2;
        console.log(foo)//2
    }
}());

function* fibs() {
    var a = 0;
    var b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5