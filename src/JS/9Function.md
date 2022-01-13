# 函数

## 基础知识

### 声明

函数也是对象

```js
// 使用对象类定义
let fn = new Function('title', 'console.log(title)');
console.log(fn instanceof Object); // true
```

函数声明定义函数和匿名函数赋给一个变量形式定义函数

- 函数声明的函数会变量提升到全局，容易造成 window 方法的同名覆盖
- 匿名函数赋给一个变量形式的函数声明，不会提升到 window 上,同时后面一般需要加上;结尾
  函数式声明

```js
fn('函数提升');
function fn(title) {
  console.log(title);
}
// window.fn() 同样可以调用函数，因为这种方式定义的函数会挂在到全局中
```

### 匿名函数

匿名函数赋给一个变量

```js
fn(); // 和变量未定义一样时   undefined
let fn = function (title) {
  console.log(title);
};
window.fn(); // window.fun is not a funtion
```

使用标准的函数声明的函数优先级高于使用 var 声明的函数

```js
fn(2); // 2
function fn(index) {
  console.log(index);
}
var fn = function (index) {
  console.log(`var:${index}`);
};
```

匿名函数常见于各种回调函数的形式讲的通俗点就是没有名字的函数

```js
setTimeout(() => console.log('匿名函数打印'), 1000);
// 其中 ()=>console.log('匿名函数打印') 即使匿名函数
```

### 立即执行函数

可以用来定义私有作用域，防止全局污染

```js
(function () {
  var penguin = 'PENGUIN';
})();
console.log(penguin)(
  // penguin is not defined

  // 之前的插件封装常用到这种方法
  function () {
    // 使用id获取节点
    var href = window.location.href;
    window.$ = {
      href,
    };
    console.log(location);
  },
)(window);
console.log($.href);
```

es6 中可以使用 let、const 完成相关的功能

```js
{
  let penguin = 'LITTLE';
}
console.log(penguin); //penguin is not defined
```

### 函数提升

解析器会优先提取函数并放在代码树顶端，使用变量声明的函数不会产生函数提升

```js
fn(); // fn
function fn() {
  console.log('fn');
}
/**
 * 执行的流程式
 * 1. var fun
 * 2. 给fun 赋值
 * 所有在var 函数定义之前打印的是undefined自然不是个function
 */
console.log(fun); // undefined
fun(); // fun is not a function
var fun = function () {
  console.log('fun');
};
```

### 形参和实参

形式上的参数，实际传递的参数

- 形参不能大于实参，实参可以大于形参
- 实参没有传值是，形参为 undefined

```js
// a,b 是行参，1,2,3是实参
function fun(a, b) {
  console.log(a + b);
}
fun(1, 2, 3); // 3
fun(1); // NaN 原因是Number(1)+undefined = NaN
```

### 默认参数

之前的写法相对麻烦要判断下参数是否有值，没有的话赋值，现在可以在形参后面直接赋值

```js
function fun(a, b) {
  b = b || 2;
  return a + b;
}
function fn(a, b = 2) {
  return a + b;
}
```

默认参数要放在后面

```js
function fn(a = 2, b) {
  console.log(a + b);
}
fn(3); // NaN
// 这种默认参数没啥意义，还是要同时传递2个参数
```

如果我想让两个参数的值相同要怎么定义

```js
function fn(a, b = a) {
  console.log(a + b);
}
fn(1); // 2
function fn(a = 2, b = a) {
  console.log(a + b);
}
fn(); // 4
```

升序降序小例子

```js
const luckNum = [5, 8, 9, 7, 1, 6];
function sortArr(arr, sortType = 'asc') {
  return arr.sort((a, b) => (sortType == 'asc' ? a - b : b - a));
}
console.log(sortArr(luckNum)); // [1, 5, 6, 7, 8, 9]
console.log(sortArr(luckNum, 'desc')); // [9, 8, 7, 6, 5, 1]
```

### 函数参数

```js

```

## this

## apply、call、bind
