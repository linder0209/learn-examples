# 转换器 Babel 命令

$ npm install --global babel

## 控制台执行

$ babel-node

$ babel-node es6.js

## babel命令可以将ES6代码转为ES5代码


$ babel es6.js
"use strict";

console.log([1, 2, 3].map(function (x) {
  return x * x;
}));

$ babel es6.js -o es5.js
 或者
$ babel es6.js --out-file es5.js

## 浏览器环境

$ npm install babel-core

<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>