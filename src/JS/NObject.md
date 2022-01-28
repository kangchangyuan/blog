# 对象

## 基础知识

对象是包括属性和方法的数据类型，在原型链中就有提醒，对象是顶层。

### 面向过程编程

在刚开始的编程中的思维和 js 初级入门的要求就是直面过程编程，很容易写出很杂乱的代码，不像 java 或者 c++这种强类型语言一开始就是面向对象编程的写法

```js
// 模拟登录的逻辑
let username = 'penguin';
let password = '1345789624';

function login(username, password) {
  if (username == 'penguin' && password == '1345789624') {
    return true;
  } else {
    return '请检查账号密码是否正确';
  }
}
```

### 面向对象编程

通俗点就是把面向过程的相关参数和方法集合到一个对象中，后面又 class 解决这个问题

```js
let login = {
  username: '',
  password: '',
  post() {
    console.log(this);
    if (this.username == 'penguin' && this.password == '1345789624') {
      return true;
    } else {
      return '请检查账号密码是否正确';
    }
  },
};
login.username = 'penguin';
login.password = '1345789624';
login.post();
```

## Object Oriented Programming(OOP)

- 抽象：将复杂功能隐藏在内部，开放不会影响到内部逻辑的方法或属性给外部使用
- 封装：对象是属性和方法的集合
- 继承：通过代码的复用来减少冗余代码
- 多态：根据不同的形态的对象产生不同的结果

### 基本声明

字面量形式声明对象

```js
let penguin = {
  name: 'penguin',
  getDescript() {
    return `${this.name} is very cute`;
  },
};
```

字面量形式在系统内部也是使用构造函数 new Object 创建的

```js
let penguin = {};
let elephant = new Object();
console.log(penguin, elephant); // {} {}
console.log(penguin.constructor); //ƒ Object() { [native code] }
console.log(elephant.constructor); //ƒ Object() { [native code] }
console.log(penguin.constructor == elephant.constructor); // true
```

### 操作属性

使用.或者[]来获取属性的值，使用中括号的主要场景就是当属性值是变量的时候

```js
let userInfo = {
  name: 'penguin',
  age: 18,
  speakLanguage() {
    console.log('chinese');
  },
};
console.log(userInfo.name); // penguin
console.log(userInfo['age']); // 18
userInfo.speakLanguage(); // chinese
```

删除新增修改对象属性

```js
let userInfo = {
  name: 'penguin',
  age: 18,
  speakLanguage() {
    console.log('chinese');
  },
};
// 新增
userInfo.money = 2000;
// 修改
userInfo.age = 20;
// 删除
delete userInfo.age; // 删除成功返回true
```

### 对象方法

定义在对象中的函数称之方法

```js
// 强行安利一个场景，随意问一个同学得到他们的平均分
// 每个同学自己算自己的平均分显然不显示，这样定义对象也很麻烦
let penguin = {
  name: 'hanhan',
  grade: {
    math: 99,
    english: 99,
    chemistry: 99,
  },
  averageScore() {
    let subjectArr = Object.values(this.grade);
    let total = subjectArr.reduce((total, cur) => (total += cur), 0);
    let subjectNum = subjectArr.length;
    return total / subjectNum;
  },
};
console.log(penguin.averageScore()); // 99
```

### 引用特性

对象和函数、数组一样都是引用类型，即复制只会复制引用的内存地址

```js
let penguin = { name: 'chemistry' };
let dog = penguin;
dog.name = 'math';
console.log(penguin.name); // math
```

对象作为函数参数使用时也会不会产生完全赋值，还是使用同一个对象

- 这时候需要对象的拷贝产生新的对象来和原来的对象的引用地址解绑

```js
let penguin = { age: 2 };
function setAge(animal) {
  animal.age += 2;
}
setAge(penguin);
console.log(penguin.age); // 4
function copyAge(animal) {
  let penguin = animal;
  penguin.age += 1;
}
copyAge(penguin);
console.log(penguin.age); // 5

// 简单的做法,使用扩展语法拷贝一份
function copy(animal) {
  let penguin = { ...animal };
  penguin.age += 10;
}
```

对象的比较时对内存地址的比较，不是对值的比较，所有使用== 和===是一样的

```js
let a = {};
let b = a;
let c = {};
console.log(a == b); // true
console.log(a === b); // true
console.log(a == c); // false
```

### this

this 指当前对象的引用，始终在对象的代码内部使用 this，不同对象的 this 只指向当前对象的引用地址

```js
let penguin = {
  name: '🐧',
  getName() {
    // 如果在这里使用 penguin.name
    // 当penguin=null时就会报错
    return this.name;
  },
};
let dog = penguin;
dog.name = '🐕';
penguin = null;
console.log(dog.getName()); // '🐕'
```

### 展开语法

和在数组中的使用没什么区别

```js
let penguin = { name: '🐧', age: 2 };
let info = { ...penguin, site: 'www.penguin.com' };
console.log(info); // {name:'🐧', age:2, site:'www.penguin.com'}
```

在没有...语法的使用合并两个对象使用的是 Object.assign

```js
let penguin = { name: '🐧', age: 2 };
let info = Object.assign(
  penguin,
  { site: 'www.penguin.com', nickname: 'hanhan' },
  { money: 200 },
);
console.log(info); // {name:'🐧', age:2, site:'www.penguin.com'}
```

## 对象转换

### 对象直接参与计算式，系统会根据场景进行隐式转换 string\number\default

- 如果场景需要字符串类型，调用的顺序为 toString->valueOf
- 如果场景需要数值类型，调用的顺序为 valueOf->toString
- 其他情况下会使用默认值，一般下就按照数值类型使用
  在数值对象在运算中会转换成 number 类型

```js
let num = new Number(1);
console.log(num + 1); // 2
```

数值对象在字符串拼接中会转换成 string 类型

```js
let num = new Number(1);
console.log(num + '4'); // '14'
```

在不明确的条件下会转换成 default，大部分是 number 类型

```js
let num = new Number(2);
console.log(num == '2'); // true
```
