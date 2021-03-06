# 闭包

## 作用域

全局作用域只有一个，每个函数又都有自己的作用域

- 编译器运行时会将变量定义在其所在的作用域中
- 使用变量时会从当前作用域开始往上查找变量
- 作用域就俄罗斯套娃，不断的都有外面的套娃
  函数被执行后其环境变量将从内存中删除。

```js
function count() {
  let total = 0;
}
count();
// count()执行结束了，就会删掉函数定义的内部变量
// 等下次在执行的时候在定义一遍，结束后在删除
```

函数每次调用都会创建一个新作用域

```js
let penguin = '企鹅';
function fn1() {
  let username = 'penguin';
  function fn2() {
    let age = 18;
    console.log(penguin, username);
  }
  fn2();
}
// 外层的作用域不能使用里面的变量，内层的作用域可以使用所有外层的变量
```

如果子函数被使用时父级的环境将被保留，这个就是闭包的原理

```js
function fn() {
  let age = 18;
  return function () {
    console.log(++age);
  };
}
let num = fn();
num(); // 19
num(); // 20
```

构造函数也是很好的例子，子函数被外部使用构造函数此时就是父函数，将被保留

```js
function People() {
  let age = 18;
  this.add = function () {
    console.log(++age);
  };
}
let penguin = new People();
penguin.add(); // 19
penguin.add(); // 20

let dog = new People();
dog.add(); // 19
```

### let/const

使用 let\const 解决 var 中 for 循环中的变量提升问题，申明的变量在块级作用域中而不是在全局

```js
let arr = [];
for (var i = 0; i < 10; i++) {
  arr.push(() => i);
}
console.log(arr[4]()); // 10
// 这个就很奇怪了不是理应时 4 怎么变成10了
// 因为这里的i时同一个变量，循环后的值时10
```

没有 let、const 的使用就是使用闭包的特性来解决这个问题

```js
let arr = [];
for (var i = 0; i < 10; i++) {
  (function (num) {
    arr.push(() => num);
  })(i);
}
console.log(arr[4]()); // 4
```

使用 let\const 现在就能很简单实现这个功能

```js
let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(() => i);
}
console.log(arr[4]()); // 4
```

## 闭包列子

### 获取价格区间

用来获取区间值 a 和 b

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function between(a, b) {
  return (v) => v >= a && v <= b;
}
console.log(arr.filter(between(3, 8)));
```

### 内存泄漏

闭包特性中上下级作用域会为函数保留数据，从而造成父级中的变量无法在内存中释放

```js
let btns = document.querySelectorAll('buttom');
btns.forEach(function (item) {
  item.addEventListener('click', function () {
    console.log(item.id);
  });
});
```

上面的例子会造成 item 无法在内存中得到释放，于是改造下，主动释放掉变量内存

```js
let btns = document.querySelectorAll('buttom');
btns.forEach(function (item) {
  let elementId = item.id;
  item.addEventListener('click', function () {
    console.log(elementId);
    console.log(item); // null
  });
  item = null;
});
```

### this 问题

在闭包里无法访问在父级中正确的 this 值

```js
let penguin = {
  name: 'hanhan',
  speak: function () {
    // this 这里的this指的是 penguin
    return function () {
      // 此时的this是window，按照闭包的特性我们向上找this应该是penguin这个对象
      // 为啥不是父级的this
      return this.name;
    };
  },
};
let a = penguin.speak();
a(); // undefined
```

es5 的解决办法,在父级中定义一个变量来接收 this 的值

```js
let penguin = {
  name: 'hanhan',
  speak: function () {
    let that = this;
    return function () {
      return that.name; // hanhan
    };
  },
};
```

es6 中可以使用箭头函数来解决 this 的指向问题

```js
let penguin = {
  name: 'hanhan',
  speak: function () {
    return () => this.name;
  },
};
```
