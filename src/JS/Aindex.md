# JS 基础知识

## 变量定义

变量的定义使用 let 或者 const 申明定义，不推荐使用 var

- 简单理解定义常量使用 const

- 定义可变的量使用 let

- 使用 null 赋值引用类型如对象，用 undefined 赋值原始类型 number string

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

- add 是方法名
- 括号内的 a 和 b 是传参
- return 表示方法的返回值

```js
function add(a, b) {
  return a + b;
}
add(1, 2);
```

## 特殊说明

### 变量提升

解析器解析代码的过程是先把声明的变量提升最前面，然后在执行赋值操作

```js
console.log(age); // undefined
var age = 2;
console.log(age); // 2
```

上面代码的执行顺序说明

```js
var age;
console.log(a); // undefined
age = 2;
console.log(age); // 2
```

在看个特别的列子,理论上的打印结果应该是 username is not defined 实际上确是 undefined

```js
var username = 'penguin';
function printName() {
  // 变量提升了，不管下面的代码是否能进入执行，var username;
  if (false) {
    var username = 'dog';
  }
  console.log(username); // undefined
}
printName();
```

### 暂时性死区

变量在作用域中已经存在，但是在申明之前使用而产生的一种错误

```js
console.log(name); // Cannot access 'name' before initialization
let name = 'penguin';
```

### 作用域

let 和 const 都拥有块级作用域，在作用域中的变量在外面是不允许访问和修改的，不过反过来是可以访问的；

> 这个可以理解为，在一栋楼里所有的业主都能访问进入一楼的大门，但是每一个单元的门只能他的业主才能进入

```js
function build() {
  let furniture = 'chair';
  if (true) {
    let furniture = 'sofa';
    console.log(furniture); //sofa
  }
  console.log(furniture); //chair
}
```
