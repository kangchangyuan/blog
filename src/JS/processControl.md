# 流程控制

## if

```js
let age = 18;
if (age >= 18) {
  conselog.log('成年人');
}
```

## if else

```js
let age = 18;
if (age >= 18) {
  conselog.log('成年人');
} else if (age < 18) {
  conselog.log('未成年人');
} else {
  conselog.log('估计是个外星人');
}
```

## 三元表达式

```js
let age = 18;
age >= 18 ? conselog.log('成年人') : conselog.log('未成年人');
```

## switch

当有多个条件判断的时候推荐使用 switch

- 如果表达式等于 case 值，执行 case 中的代码
- break 会终止执行推出当前的 switch
- 没有任何条件匹配时执行 default 代码
- 如果 case 执行后没有 break 终止逻辑会继续执行代码直到遇到下个 break，如果都没有直接执行到 default 代码然后结束当前的 switch 代码逻辑

```js
let age = 18;
switch (age) {
  case age >= 18:
    console.log('你已经成年了');
    break;
  case age < 18:
    console.log('未成年人');
  case age < 3:
    console.log('还没到上幼儿园的年龄');
    break;
  default:
    console.log('请输入正确的年龄');
}
```

## while

循环执行，需要设置跳出循环的条件，不然很容易造成死循环

```js
let row = 5;
while (row-- != 0) {
  console.log(row);
}
// 4 3 2 1 0
```

## do while

这个和 while 不同的一点就是，会先执行循环，判断在后面

```js
let row = 5;
do {
  console.log(row);
} while (row-- != 0);
// 5 4 3 2 1 0
```

## for

最常用的循环语句，var 定义变量会变量提升导致污染到全局，推荐使用 let，let 拥有块级作用域

```js
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
console.log(i); // 5
```

```js
let i = 0;
for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
console.log(i); // 0
```

99 乘法表

```js
for (let i = 1; i < 10; i++) {
  let res = '';
  for (let j = 1; j < i + 1; j++) {
    // console.table(`${i}*${j}`)
    res += `${i}*${j}=${i * j} `;
  }
  console.log(res);
}
```

## break continue

break 跳出当前循环

```js
// 当i=5 的时候推出循环
for (let i = 0; i < 10; i++) {
  if (i == 5) {
    console.log(i); // 5
    break;
  }
  console.log(i); // 0 1 2 3 4
}
```

continue 跳过当前次的循环，执行下一次循环

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2) continue;
  // 跳过奇数次的循环
  console.log(i); // 2 4 6 8 10
}
```

## label

给循环体定义一个标签名字，用于明确 break、continue 哪一个循环体

```js
first: for (let i = 1; i < 10; i++) {
  let res = '';
  two: for (let j = 1; j < i + 1; j++) {
    // 奇数跳过执行
    if (i % 2) continue two;
    // 8*5
    if (i * j == 40) {
      break first;
    }
    res += `${i}*${j}=${i * j} `;
  }
  console.log(res);
}
```

## for in

主要用于遍历对象，当然数组也可以

```js
let userInfo = [
  { name: 'zhang', age: 18 },
  { name: 'zheng', age: 20 },
  { name: 'li', age: 40 },
];

for (const key in userInfo) {
  const element = userInfo[key];
  console.log(element.age);
}
let people = { name: 'zhang', age: 40 };

for (const key in people) {
  console.log(key); // name,age
}
```

## for of

多用于遍历数组，map,set,字符串，有点可以同时获取 key 和 value

- keys() 获取所有的 key 值
- entries() 获取[key,value]

```js
let userInfo = [
  { name: 'zhang', age: 18 },
  { name: 'zheng', age: 20 },
  { name: 'li', age: 40 },
];
for (const item of userInfo) {
  console.log(item.age);
}

let keys = ['name', 'age'];

for (const [key, value] of keys.entries()) {
  console.log(key, value); // 0,name 1,age
}
```
