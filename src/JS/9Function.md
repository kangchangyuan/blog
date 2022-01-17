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

函数可以作为参数使用

```js
function fn(item) {
  return item >= 3;
}
console.log([1, 2, 3, 4, 5].filter(fn)); // [3,4,5]
```

### arguments

arguments 是函数形参的集合

```js
function sum() {
  return [...arguments].reduce((total, num) => (total += num), 0);
}
console.log(sum(1, 2, 3, 4, 5, 6)); // 21
```

使用...语法更好理解

```js
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 2, 3, 4, 5, 6)); // 21
```

### 箭头函数

- 用箭头简化 function 关键字
- 如有返回值只有一行表达式可以省略{}
- 形参只有一个值是可以省略()

```js
let sum = function (a, b) {
  return a + b;
};
let sum = (a, b) => a + b;
```

### 递归调用

不断的调用自身来达到循环任务

```js
// 来看下 3*2*1的阶乘
function recursive(num) {
  // if(num==1) return 1
  // return num*recursive(--num)
  return num == 1 ? 1 : num * recursive(--num);
}
console.log(recursive(3)); // 6

// 用递归完成reduce的操作
function sum(...num) {
  // if(num.length==1) return num.pop()
  // return num.pop() + sum(...num)
  return num.length == 1 ? num.pop() : num.pop() + sum(...num);
}
console.log(sum(1, 2, 3));
```

## this

调用函数时 this 会隐式传递给函数，指的式函数调用关联对象，也被称之为上下文

### 函数调用

```js
function post() {
  console.log(this); // window
}
// 在严格模式下的全局this是undefined
('use strict');
function get() {
  console.log(this); // undefined
}
```

### 方法调用

函数是对象中的方法属性时，此时的 this 指向当前对象

#### 构造函数

定义的函数当被 new 出来即使构造函数，一般构造函数包含属性和方法。函数中的上下文指向被 new 出来的实例对象

- 构造函数就是作用就是用来生成实例对象
- this 指向当前实例话的对象

```js
function User() {
  this.name = 'penguin';
  this.speak = function () {
    console.log(this); //User {name: 'penguin', speak: ƒ}
    console.log(`this user name is ${this.name}`);
  };
}
let people = new User();
console.log(people.speak());
```

#### 对象字面量

- 属性方法中的 this 指向当前的对象
- 属性方法中的方法的 this 指向的时 window

```js
const animal = {
  name: 'elephant',
  cry() {
    console.log(this); //{name: 'elephant', cry: ƒ}
    function run() {
      console.log(this); //window
    }
    run();
  },
};
animal.cry();
```

在方法中的 this 指向时可以改变的，forEach、map 的第二参数传入 this

```js
let animal = {
  name: 'elephant',
  nickname: ['l', 'p'],
  hasNickName() {
    return this.nickname.forEach(function (item) {
      console.log(this); //window
      console.log(`${this.name}-${item}`);
    }, this);
  },
};
animal.hasNickName();
```

#### 箭头函数

- 箭头函数没有 this、arguments
- 箭头函数的 this 可以理解为指向父级对象中的 this，也可以理解为外层的 this 指向

```js
const animal = {
  name: 'elephant',
  cry() {
    console.log(this); //{name: 'elephant', cry: ƒ}
    return () => {
      console.log(this); // {name: 'elephant', cry: ƒ}
    };
  },
};
animal.cry();
```

## apply、call、bind

改变 this 指向的方法

- apply 用于数组的传递 apply(null,[])
- call 用于多个形参传递 call(null,...arguments)
- bind 和 call、apply 的不同在于不会立即执行，返回新的函数需要调用执行

### 原理分析

构造函数中的 this 是个空对象，在构造函数中可以设置相应的变量和方法

```js
function Person(name) {
  // 默认this = {}
  this.name = name;
  this.fn = function () {
    console.log(this.name);
  };
}
let penguin = new Person('penguin');
```

可以改变原有的构造函数中 this 指向

```js
function Person(name) {
  this.name = name;
}
let dog = {};
Person.call(dog, 'PENGUIN'); // 传入dog对象改变了构造函数中的this对象
console.log(dog.name); // PENGUIN
```

### apply

```js
function log(...title) {
  console.log(title); //  ['apply','penguin']
  console.log(`${title}-${this.name}`);
}
let penguin = {
  name: 'hanhan',
};
let dog = {
  name: 'action',
};
log.apply(penguin, ['apply', 'penguin']);
```

### call

```js
function log(title) {
  console.log(title); //  call
  console.log(`${title}-${this.name}`);
}
let penguin = {
  name: 'hanhan',
};
let dog = {
  name: 'action',
};
log.call(dog, 'call');
```

### bind

bind 会复制新的函数，在新的函数调用的时候不能传参

```js
let fn1 = function () {};
let fn2 = fn1;
console.log(fn1 == fn2); // true

// bind 会复制返回一个新的函数
let fn3 = fn1.bind();
console.log(fn1 == fn3); // false
```

```js
function fn(a, b) {
  console.log(a, b); // 1，2
  console.log(this); // {name:'penguin'}
}
let newFn = fn.bind({ name: 'penguin' }, 1, 2);
newFn(3, 4); // 3,4 无效，优先使用在bind中传入的实参，先入为主
```
