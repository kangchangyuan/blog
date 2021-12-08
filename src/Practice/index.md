# JS 基础知识

## 变量定义

变量的定义使用 let 或者 const 申明定义，不推荐使用 var

1. 简单理解定义常量使用 const
2. 定义可变的量使用 let

```js
let index = 0;
const userName = 'penguin';
```

## 代码注释

代码注释有两种

```js
// 我是单行注释
/**
 * 我表示多行注释
 * 可以写很多行文字
 */
```

## 方法定义

使用关键字 function 声明一个方法

1. add 是方法名
2. 括号内的 a 和 b 是传参
3. return 表示方法的返回值

```js
function add(a, b) {
  return a + b;
}
add(1, 2);
```
