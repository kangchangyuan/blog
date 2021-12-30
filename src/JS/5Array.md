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

## 元素增减

### push()

从数组后面追加元素

```js
const arr = [1, 2, 3];
console.log(arr.push(2, 3)); // 5 返回的是数组的length
console.log(arr); // [1,2,3,2,3]
```
