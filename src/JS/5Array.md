# 数组

## 定义数组

const 定义的数组是可以修改的,原因是数组和对象一样是引用类型

```js
const arr1 = new Array(3);
console.log(arr1); // [undefined,undefined,undefined]

const arr2 = ['penguin', 0, true];
arr2[1] = 2; // ['penguin', 2, true ]

const arr3 = Array.of(1, 2);
console.log(arr3); // [1,2]

console.log(arr2.length); // 3
```

### 类型检测

Array.isArray() 用于检测变量是否是数组

```js
let arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true

let obj = {};
console.log(Array.isArray(obj)); // false
```

## 类型转换

数组<==>字符串 两者之间相互转换

### 数组转字符串

```js
const arr = ['pen', 'g', 'in'];
console.log(arr.toString()); // 'pen,g,in'
console.log(String(arr)); // 'pen,g,in'
console.log(arr.join('')); // 'penguin'
```

### Array.from()

类数组、可迭代的对象可以使用 Array.from()转换成数组，类数组：含有 length 属性

```js
const username = 'pen';
console.log(Array.from(username)); // ['p','e','n']

const userInfo = { 0: 'penguin', 1: 3, length: 2 };
console.log(Array.from(userInfo)); // ['penguin', 3]
```

转换成数组后，可以向 map 函数一样，对数组元素进行操作

```js
let str = '123456';
console.log(Array.from(str, (item) => item * 2)); // [2, 4, 6, 8, 10, 12]
```

## 展开语法

### 数组合并

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 5, 6];
console.log([...arr1, ...arr2]); //[1, 2, 3, 4, 1, 2, 5, 6]
```

### 函数传参

```js
let accumulation = (a, ...args) => args.reduce((pre, cur) => pre + cur, a);
// ...args(是个类数组结构) = [2,3,4]
console.log(accumulation(1, 2, 3, 4)); //  10
```

## 解构赋值

### 基本用法

```js
let [name, age, ...remaining] = ['penguin', 18, 'sex', true];
console.log(name, age, remaining); // penguin 18 ['sex',true]

const userInfo = { name, age }; // 对象简写相当于 {name:'penguin',age:18}
let { name, age } = userInfo;
console.log(name, age); // penguin 18
```

### 特殊用法

```js
let [, , url, name = 'kang'] = ['penguin', 'www', 'https://www.penguin.com'];
console.log(url); // 对于不需要的变量使用,只取需要的变量
console.log(name); // 对于获取不到的变量可以设置默认值
```

## 数组增减

### push()

从数组后面追加元素，会改变原数组

```js
const arr = [1, 2, 3];
console.log(arr.push(2, 3)); // 5 返回的是数组的length
console.log(arr); // [1,2,3,2,3]
```

### pop()

从数组后面删除，会改变原数组

```js
const arr = [1, 2, 3];
console.log(arr.pop()); //  3  去除的元素
console.log(arr); // [1,2]
```

### shift()

取出数组的第一个元素,不会改变原数组

```js
const arr = [1, 2, 3];
console.log(arr.shift()); // 1
console.log(arr); // [1,2,3]
```

### unshift()

在数组开头添加元素，会改变原数组

```js
const animal = ['lion', 'tiger', 'fox', 'penguin'];
console.log(animal.unshift('elephant', 'dog')); // 6 返回数组的长度
console.log(animal); // ['elephant','dog','lion','tiger','fox','penguin']
```

### fill()

填充数组，数组必须有长度才可以添加

```js
console.log(Array(2).fill(4)); // [4,4]
const arr = [, ,]; //等价于 arr.length=2
console.log(arr.fill('penguin')); // ['penguin','penguin']

// 指定位置添加 [index,index) 前闭后开区间，两个值相同时填充无效
// 大于数组长度时按数组的最大长度，和第二个参数不填效果一样
const animal = ['elephant', 'tiger', 'fox'];
console.log(animal.fill('dog', 1, 1)); // ['elephant','tiger','fox']
console.log(animal.fill('dog', 1, 2)); // ['elephant','dog','fox']
console.log(animal.fill('dog', 1, 3)); // ['elephant','dog','dog']
console.log(animal.fill('dog', 1, 10)); // ['elephant','dog','dog']
console.log(animal.fill('dog', 1)); // ['elephant','dog','dog']
```

### slice()

截取数组，相对于 shift 和 pop，slice 可以获取多个元素，不会改变原数组

```js
// [index,index)
const fruit = ['apple', 'banana', 'grape', 'strawberry'];
console.log(fruit.slice(1, 2)); // ['banana']
console.log(fruit); // ['apple','banana','grape','strawberry']
```

### splice()

很综合的一个方法，可以增，删，替换数组中的元素，会改变原数组，返回删除的元素。第一个参数是开始下标，第二个参数是数量，第三个参数(可以是多个值)，插入都替换的位置上，可以比原来的元素多

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.splice(2, 5)); // [3,4,5,6,7]
console.log(arr); // [1,2,8,9]
```

替换元素

```js
const arr = [1, 2, 3, 4, 5, 6];
console.log(arr.splice(1, 3, 'penguin', 'dog', 'tiger', 'lion')); // [2,3,4] =>['penguin','dog','tiger','lion']
console.log(arr); // [1,'penguin','dog','tiger','lion',5,6]
```

向前后追加元素

```js
const arr = [1, 2, 3];

console.log(arr.splice(arr.length, 0, 'penguin', 'elephant')); // []
console.log(arr); // [1,2,3,'penguin','elephant']

console.log(arr.splice(0, 0, 'lion')); // []
console.log(arr); // ['lion', 1,2,3,'penguin','elephant']
```

数组元素移动

```js
function move(targetArr, from, to) {
  if (from < 0 || to >= targetArr.length) {
    throw Error('参数越界了！');
  }
  let newArr = [...targetArr];
  let targetItem = newArr.splice(from, 1);
  newArr.splice(to, 0, ...targetItem);
  return newArr;
}
console.log(move([1, 2, 3, 4], 2, 0)); // [3,1,2,4]
```

### 清空数组

把数组赋值成[]

```js
//  使用const 定义的数组不可以赋值为[],let 可以
const arr2 = [1, 2, 3];
const users = [{ name: 'penguin' }, { name: 'elephant' }];
console.log((arr2 = [])); //Uncaught TypeError: Assignment to constant variable.

// 对于多个数组的引用来说，两个数组同时指向的是同一块内存空间
// 当数组置空是可以看作重新开辟了一块内存空间，不会改变剩下的数组引用
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr1 = [];
console.log(arr2); // [1,2,3]
let students = [{ name: 'penguin' }, { name: 'elephant' }];
let classmans = students;
students = [];
console.log(classmans); // [{name:'penguin'},{name:'elephant'}]
```

length=0 会直接把引用内存的空间地址直接清空，关联数组都变成空

```js
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr1.length = 0;
console.log(arr1); // []
console.log(arr2); // []
```

## 合拼拆分

### join()

不传参默认是以,连接 join(',') 等价于 jion()

```js
const someword = ['I', 'am', 'penguin'];
console.log(someword.join()); // I,am,penguin
console.log(someword.join('*')); // I*am*penguin
```

### split()

和 join 相反的操作

```js
const someword = 'I,am,penguin';
console.log(someword.split(',')); // ['I','am', 'penguin']
```

### concat()

合并两个数组，用...语法更加简单直观

```js
const animal = ['penguin', 'lion'];
const fruit = ['grape', 'strawberry'];
const name = ['zhang', 'kang'];

const mergeArr = animal.concat(fruit, name);
console.log(mergeArr); // ['penguin','lion','grape','strawberry','zhang','kang']

const result = [...animal, ...fruit];
console.log(result); // ['penguin','lion','grape','strawberry']
```

### copyWithin()

copyWithin(target,start,end) target 复制到数组的位置下标，start 开始复制下标，end 结束下标

```js
/**
 * 会入侵目标位置上的元素，复制的元素会覆盖目标下标之后的元素，而不是插入
 * 会改变原数组
 * end 可以越界结果是一致的
 * start 不能为负数，负数无效结果还是原数组
 * [start,end)
 */
const arr1 = [1, 2, 3, 4, 5, 6, 7];
console.log(arr1.copyWithin(4, 1, 3)); // [1,2,3,4,2,3,7]
console.log(arr1); // [1,2,3,4,2,3,7]

const arr2 = [1, 2, 3, 4, 5];
console.log(arr1.copyWithin(4, -1, 3)); // [1,2,3,4,5]
```

## 查找元素

### indexOf()

查找元素，找到返回下标，未找到返回 -1，是严格匹配，1 和'1' 是不同的

```js
const zoo = ['penguin', 'lion', 'elephant', 1];
console.log(zoo.indexOf('lion')); // 1
console.log(zoo.indexOf('1')); // -1

//  lastIndexOf 和 indexOf 的区别在于从右往左查找
console.log(zoo.lastIndexOf('elephant')); // 2
```

### includes()

// 查找的结果为 Boolean 值

```js
const fruit = ['strawberry', 'apple', 'banana'];
console.log(fruit.includes('apple')); // true

function includes(arr, key) {
  for (let item of arr) {
    if (item == key) return true;
  }
  return false;
}
```

### find()

可以用来查找引用类型 返回找的的结果值或者 undefined(找到就不继续了)

```js
let userInfo = [{ name: 'ZHANG' }, { name: 'LI', name: 'ZHANG' }];
let result = userInfo.find((item) => item.name == 'ZHANG');
console.log(result); // {name:'ZHANG'}
```

find 原理实现

```js
function find(arr, callback) {
  for (let item of arr) {
    if (callback(item)) {
      return item;
    }
  }
  return undefined;
}
```

### findIndex()

返回下标，找不到返回-1

```js
const arr = [1, 2, 3, 4, 1, 5, 6];
let result = arr.findIndex((item) => item == 5);
console.log(result); // 5
```

## 排序

### reverse()

反转数组顺序

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.reverse()); // [5,4,3,2,1]
```

### sort()

根据调整从小到大或从大到小排序 Array.sort((a,b)=>a-b

- 负数 从小到大
- 正数 从大到小

```js
const arr = [1, 6, 5, 7, 9, 2, 3, 4, 8];
let min2max = arr.sort((a, b) => a - b);
console.log(min2max); //[1, 2, 3, 4, 5, 6, 7, 8, 9]

let max2min = arr.sort((a, b) => b - a);
console.log(max2min); // [9, 8, 7, 6, 5, 4, 3, 2, 1]
```

## 拓展方法

### every()

遍历所有的元素，所有的元素都要返回真才为真类似串联电路

```js
const userScore = [
  { name: 'penguin', score: 60 },
  { name: 'lion', score: 70 },
  { name: 'cat', score: 59 },
];
let result = userScore.every((animal) => animal.score >= 60);
// false
```

### some(item,index?,array?)

只要有一个元素满足就为真

```js
const userScore = [
  { name: 'penguin', score: 60 },
  { name: 'lion', score: 70 },
  { name: 'cat', score: 59 },
];
let result = userScore.some((animal) => animal.score >= 60);
// true
```

### filter()

过滤元素，只返回满足条件的元素

```js
const userScore = [
  { name: 'penguin', score: 60 },
  { name: 'lion', score: 70 },
  { name: 'cat', score: 59 },
];
let result = userScore.filter((animal) => animal.score < 60);
console.log(result); // [{name:'cat',score:59}]
```

### map()

返回满足条件的元素，但是不直接返回元素，同时会返回 undefined

```js
const userScore = [
  { name: 'penguin', score: 60 },
  { name: 'lion', score: 70 },
  { name: 'cat', score: 59 },
];
let result = userScore.map((animal) => {
  if (animal.score >= 60) return animal;
});
console.log(result); //  [{…}, {…}, undefined]
```

### reduce((prev,cur,index?,array?)=>{},pre?)

经典的使用场景求和

```js
const goods = [
  { name: 'penguin', score: 60 },
  { name: 'lion', score: 70 },
  { name: 'cat', score: 59 },
];
let result = goods.reduce((toal, goods) => (toal += goods.score), 0);
console.log(result);
```
