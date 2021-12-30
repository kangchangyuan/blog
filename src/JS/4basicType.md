# 基本类型

## 类型检测

### typeof

用于返回变量的原始类型

- number、string、boolean
- function
- object
- undefined
- 为啥没有 array，同时 typeof 数组为什么是 object？

```js
let num = 1;
console.log(typeof num); // number

let str = '1';
console.log(typeof str); // string

let name;
console.log(typeof name); // 对于未赋值的变量，返回类型为undefined

function add() {}
console.log(typeof add); // function

let arr = [1, 2, 3];
console.log(typeof arr); // object

let obj = { name: 'penguin' };
console.log(typeof obj); // object
```

### instanceof

用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
_注：也可以理解为是否是这个对象的实例，typeof 不能区分 array，instanceof 可以_

```js
let zoo = ['lion', 'targe', 'monkey'];
console.log(zoo instanceof Array); // true
console.log(zoo instanceof Object); // true

// 数组是对象，对象不是数组，这个问题留着后面深入了解
let lionInfo = { name: 'bobo', age: 2 };
console.log(lionInfo instanceof Object); // true
console.log(lionInfo instanceof Array); // false

class User {}
let people = new User();
console.log(people instanceof User); // true
```

## String

### 模板字面量

字符串拼接

```js
let year = '2020';
let month = '09';
let day = '10';
console.log(`${year}年${month}月${day}日`); // 2020年09月10日
```

### 获取长度

- length

```js
let username = 'penguin';
console.log(username.length);
```

### 大小写转换

- toUpperCase()
- toLowerCase()

```js
let username = 'penGuin';
console.log(username.toUpperCase()); // PENGUIN
console.log(username.toLowerCase()); // penguin
```

### 去掉空格

- trim() 去掉所有空格
- trimLeft() 去掉左边的空格
- trimRight() 去掉右边的空格

```js
let username = ' penguin ';
console.log(username.trim()); // 'penguin'
```

### 截取字符串

- slice()
- substr()
- substring()
  _注：substr 和 slice、substring 的不同点在于第二参数是返回的数量而不是结束的位置_

```js
let username = 'penguin';
console.log(username.slice(2)); // nguin
console.log(username.substr(2)); // nguin
console.log(username.substring(2)); // nguin

// 区间 [index,index)
console.log(username.slice(2, 4)); // ngu
console.log(username.substr(2, 4)); // ngu
console.log(username.substring(2, 4)); // ngui
```

### 查找字符串

- indexOf() 从左往右查找，找不到返回-1 找到返回下标
- lastIndexOf() 从右往左查找，找不到返回-1 找到返回下标
- search() 找不到返回-1 找到返回目标的位置下标
- includes() 返回值 true 或 false

```js
let username = 'lovelypenguin';
// indexOf() 第一参数是目标值，第二参数是开始查找的位置
console.log(username.indexOf('i')); // 1
console.log(username.indexOf('e', 6)); // 7

console.log(username.includes('i')); // true

console.log(username.search('en')); // 7 目标开始出现的下标值
console.log(username.search(/e/i)); // 7 可以使用正则表达式
```

### 替换字符串

- replace() 不改变原变量的值

```js
let bookName = 'I have a dream';
console.log(bookName.replace('d', 'D')); // I have a Dream
console.log(bookName.replace(/ /g, '-')); // I-have-a-dream
```

### 重复生成

- repeat()

```js
let IdNum = '350702199505206888';
console.log(`${IdNum.slice(0, -6)}${'*'.repeat(6)}`);
// 350702199505******
```

### 类型转换

- split() 字符串转数组
- toString() 数组转字符串默认逗号连接
- join() 数组转字符串，默认逗号连接可以传入连接符

```js
let name = 'penguin';
console.log(name.split('')); // [p,e,n,g,u,i,n]
let dateStr = '2020-12-05';

console.log(dateStr.split('-')); // [2020,12,05]

let arr = ['lovely', 'penguin'];
console.log(arr.toString()); // 'lovely,penguin'
console.log(arr.join('&')); // 'lovely&penguin'
```

## Boolean

### 隐式转换

和 boolean 值进行对比是，两个变量同时转换成数值进行比较

```js
let a = 'penguin';
let b = true;
console.log(a == b); // false
/**
 * 其实是 Number(a) 和 Number(b) 进行比较
 * Number(a) => NaN //
 * Number(b) => 1 // false => 0  true => 1
 * ([],null,0,'' => 0)
 * ([2] => 2)
 * ([1,2,3], {}, 'srting', undefined => NaN)
 */
```

### 显示转换

```js
let a = 'PENGUIN';
let b = false;
console.log(Boolean(a) == Boolean(b)); // false
/**
 * 其实是 Boolean(a) 和 Boolean(b) 进行比较
 * Boolean(a) => true
 * Boolean(b) => false
 * (undefined,null,NaN,0,'' => false)
 * ([1,2,3], [1], [], {}, 'srting',非0 => true)
 */
// Boolean(a) == !!a 可以用!! 代替Boolean()
console.log(!!a == !!b); // false
```

## Number

- isInteger()
- toFixed() 传入小数点位数
- parseInt()
- parseFloat()

```js
// 判断数值是否为整数
console.log(Number.isInteger(3.14)); // false

// 四舍五路
console.log((3.1415926).toFixed(3)); // 3.142

/*
 * 可以格式化字符串只留下浮点数部分，数值前的空格也可以去掉
 * 只对是数值开头的的字符串有效，数值前面可以为空
 */
// 转换成整型数值
console.log(parseInt(99.8987)); // 99
console.log(parseInt('  99.8987PENGUIN')); // 99

// 转换成浮点型
console.log(parseFloat(99.8987)); // 99.8987
console.log(parseFloat('  99.8987penguin')); // 99.8987
```

### NaN

对于使用 Number()无法转变成数字的值都称为 NaN (not a number)

- undefined
- {}
- 大于一个元素的数组
- 非空字符串

### 0.1+0.2 != 0.3 ?

精度丢失，在 php,python,go 等大部分编程语言中都存在这个问题

```js
let a = 0.1;
let b = 0.2;
console.log(a + b); // 0.30000000000000004

// 解决办法，同时扩大到整数进行相加减，然后在转换成小数 (1*10+2*10) / 10
function transformation(a, b) {
  let n1 = a.split('.')[1].length;
  let n2 = b.split('.')[1].length;
  let m = Math.pow(10, Math.max(n1, n2));
  return (a * m + b * m) / m;
}
console.log(transformation(a + b)); // 0.3
```

## Math

### 最大最小值

```js
let arr = [1, 3, 2];
console.log(Math.max(...arr)); // 3
console.log(Math.min(...arr)); // 1
```

### 值取舍

- ceil()
- floor()
- round()

```js
// 向上取整
console.log(Math.ceil(3.14)); // 4
// 四舍五入
console.log(Math.round(3.14)); // 3
// 向下取整
console.log(Math.floor(3.14)); // 3
```

### random（随机数）

区间 [0,1)

```js
// 返回 0-100 随机数 不包括 100
let randomNum = Math.random() * 100; // [0,99.9999)
console.log(Math.floor(randomNum));
// 返回 0-100 随机数 包括 100
let randomNum = Math.random() * (100 + 1); // [0,99.9999)
console.log(Math.floor(randomNum));
```

## Date

```js
// 获取时间戳单位秒
const timestamp = Date.now();
const currentDate = new Date(); // 获取当前日期时间
console.log(currentDate.getTime()); // 获取时间戳单位毫秒

console.log(currentDate.getDay()); // 返回周几
console.log(currentDate.getFullYear()); // 返回年
console.log(currentDate.getMonth()); // 返回月
console.log(currentDate.getDate()); // 返回日
console.log(currentDate.getHours()); // 返回时
console.log(currentDate.getMinutes()); // 返回分
console.log(currentDate.getSeconds()); // 返回秒
```

### 格式化时间

```js
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const config = {
    YYYY: date.geFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: data.getMinutes(),
    ss: data.getSeconds(),
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}
```
