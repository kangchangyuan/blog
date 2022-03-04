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

### 基础知识

对象直接参与计算式，系统会根据场景进行隐式转换 string\number\default

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

### Symbol.toPrimitive

内部自定义 Symbol.toPrimitive 方法来处理所有的转换场景

```js
let pet = {
  [Symbol.toPrimitive](hint) {
    console.log(hint);
  },
};
// 下面分别转换成number string default进行运算
console.log(+pet); //number
console.log(`${pet}`); // string
console.log(pet + ''); // default
```

### valueOf\toString

可以自定义对象的 valueOf\toString 的返回值

```js
let penguin = {
  name: 'lucky',
  age: 2,
};
console.log(penguin.valueOf()); // {name:'lucky',age:2}
console.log(penguin.toString()); // [object Object]
let elephant = {
  name: 'lucky',
  age: 18,
  toString() {
    return this.name;
  },
  valueOf() {
    return this.age;
  },
};
console.log(elephant + 1); // 19
console.log(`${elephant} is very cute!`); // lucky is very cute!
```

## 解构赋值

解构事一种更加简洁的赋值特性，可以理解为分解一个数据的结构

### 基本使用

常规对象赋值解构

```js
let penguin = { name: 'lucky', age: 2 };
let { name, age: currentAge } = penguin;
console.log(name); // lucky
// 重新定义赋值变量的名称需要写在原有变量名称的后面
console.log(currentAge); // 2
```

接收函数的返回值

```js
function sum() {
  return {
    name: 'penguin',
    age: 2,
  };
}
const { name, age } = sum();
console.log(age); // 2
```

函数中传参和默认参数

```js
function creatObj({ name, age = 3 }) {
  console.log(name);
}
creatObj({ name: 'penguin' });
```

### 简洁定义

变量名和赋值的变量名相同时可以简写

```js
let name = 'penguin';
let penguin = {
  name,
  age: 15,
};
console.log(penguin); // {name:'penguin',age:15}
```

只解构部分的变量名

- 数组在前面添加多个[,,,define]
- 对象在前面必须要指定一个变量可以为{_,_,define}

```js
let [, age] = ['penguin', 15];
console.log(age); // 15
let { _, age } = { name: 'penguin', age: 15 };
concole.log(age); // 15
```

### 嵌套解构

可以操作多层复杂的数据结构

```js
const penguin = {
  name: 'pale',
  girlInfo: {
    name: 'origin',
  },
  interest: ['football', 'piano'],
};
let {
  _,
  girlInfo: { name },
  interest: [, musical],
} = penguin;
console.log(name); // origin
console.log(musical); //piano
```

## 属性管理

### 添加属性

```js
let penguin = { name: 'penguin' };
penguin.age = 15;
penguin['nicknam'] = '🐧';
console.log(penguin); // {name:'penguin',age:15,nickname:'🐧'}
```

### 删除属性

```js
let pet = { name: 'penguin', age: 15, nickname: '🐧' };
delete pet.name;
console.log(pet); // {age:15,nickname:'🐧'}
```

### 检测属性

hasOwnProperty 检测对象自身是否包含指定的属性，不检测原型链上继承的属性

```js
let pet = { name: 'penguin', age: 15, nickname: '🐧' };
console.log(pet.hasOwnProperty('name')); // true
console.log(pet.hasOwnProperty('udid')); // false
```

数组相关属性

```js
const arr = [1, 2, 3, true];
console.log(arr.hasOwnProperty('length')); // true
console.log(arr.hasOwnProperty('concat')); // false
// concat 数组对象能用不代表时其本身的属性
```

使用 in 来检测是否时原型对象上的属性

```js
let obj = { a: 1 };
let bear = { name: '🐻' };
Object.setPrototypeOf(obj, bear);
console.log(obj); // 这时obj的原型时bear，bear的原型时顶层Object

console.log('name' in obj); // true name是bear的属性，bear又是obj的原型所以为真
console.log(obj.hasOwnProperty('name')); // false
```

### 获取属性名

```js
let penguin = { name: 'penguin', age: 15, nickname: '🐧' };
const propertyNames = Object.getOwnPropertyNames(penguin);
console.log(propertyNames); // [name,age,nickname]
```

### 复制属性

Object.assign 可以复制一个或多个对象的属性值

```js
let fox = { name: 'foxmail' };
fox = Object.assign(fox, { age: 1, nickname: 'knight' }, { interest: 'piano' });
console.log(fox); // {name:'foxmail',age:1,nickname:'knight',interest:'piano'}
```

### 计算属性

可以使用表达式动态的设置属性名

```js
const nick = 'cattle';
function something() {
  return 'habit';
}
let penguin = {
  [`yellow${nick}`]: 'boy',
  [something()]: 'piano',
};
console.log(penguin); //{yellowcattle: 'boy', habit: 'piano'}
```

### 传值操作

对象是引用类型赋值操作，本质上时关联同一个内存地址

```js
let penguin = { name: 'penguin' };
let frog = penguin;
frog.name = 'frog';
// 从penguin的name时frog中可以看出他们时引用的同一个地址，都改变了
console.log(penguin.name); // frog
```

## 遍历对象

### 获取内容

```js
- Object.keys() key值集合
- Object.values() value集合
- Object.entries() [[key=>value]]
const penguin = {
  name:'bingo',
  age:2
}
console.log(Object.keys(penguin)) // ['name','age']
console.log(Object.values(penguin)) // ['bingo',2]
console.log(Object.entries(penguin)) // [['name','bingo'],['age',2]]
```

### for in

遍历对象的属性

```js
const penguin = {
  name: 'bingo',
  age: 2,
};
for (let key in penguin) {
  console.log(key); // name, age
}
```

### for of

用于遍历可迭代的对象*数组就是一种可迭代的对象*，不能直接操作对象，但是可以使用 keys\values\entries 返回可迭代的数组对象来进行遍历

```js
const penguin = {
  name: 'bingo',
  age: 2,
};
// 获取key
for (let key of Object.keys(penguin)) {
  console.log(key); // name, age
}
// 获取value
for (let value of Object.values(penguin)) {
  console.log(value); // bingo, 2
}
// 同时获取key=>value
for (let [key, value] of Object.entries(penguin)) {
  console.log(key, value);
}
```

## 对象拷贝

对象赋值时关联地址的一种操作，一个对象的改变会影响其他对象的值

- 拷贝指的时和原对象值相同，地址不同，可以理解为重新复制了一块内存地址
- 浅拷贝只能对单层的对象进行拷贝隔离，如果时多维的对象只能用深拷贝
- 深拷贝的可以理解为对多维对象里的每一层都对其进行浅拷贝（递归操作）

### 浅拷贝

使用 for in 进行浅拷贝

```js
const penguin = { location: 'penguins live in Antarctica' };
const fox = {};
for (const key in penguin) {
  fox[key] = penguin[key];
}
console.log(fox == penguin); // false
```

使用 assign 进行浅拷贝

```js
let info = { job: 'play piano', money: 200 };
let someone = {};
Object.assign(someone, info);
someone.money = 300;
console.log(info.money); // 200
```

浅拷贝推荐使用方法扩展...语法

```js
let penguin = { location: 'penguins live in Antarctica' };
let fox = { ...penguin };
console.log(fox == penguin); // false
```

### 深拷贝

完全复制一个对象，两个对象是独立的

```js
let human = {
  sex: 'female',
  skills: {
    walk: 'double leg',
    eat: 'cooked food',
  },
  canFly() {
    console.log('human can not fly');
  },
  ageGroup: ['baby', 'young', 'old'],
};
function deepCopy(targetObj) {
  let currentObj = targetObj instanceof Array ? [] : {};
  for (const [key, value] of Object.entries(targetObj)) {
    currentObj[key] = typeof value == 'object' ? deepCopy(value) : value;
  }
  return currentObj;
}
const people = deepCopy(human);
people.sex = 'male';
console.log(JSON.stringify(human, null, 3)); // human中的sex还是female
console.log(JSON.stringify(people, null, 3)); // people中的sex正常改变为male
```

## 构建函数

对象可以通过内置或自定义的构造函数创建

### 工厂函数

在函数中返回对象的函数称为工厂函数

- 减少重复创建相同类型对象的代码
- 修改工厂函数的方法影响所有的同类对象
  定义两个或多个相同的对象，需要不断的复制，很麻烦

```js
const user1 = {
  name: 'penguin',
  saidName() {
    console.log(this.name);
  },
};
const user2 = {
  name: 'fox',
  saidName() {
    console.log(this.name);
  },
};
```

使用工厂函数简化上面相同属性对象的创建

```js
function creatUser(name) {
  return {
    name,
    saidName() {
      console.log(this.name);
    },
  };
}
let user1 = createUser('lion');
let user2 = createUser('elephant');
```

### 构造函数

和工厂函数类似，_不过它的上下文是新的对象实例_

- 构造函数名使用大驼峰命名，这个有点像 class 的命名方式
- this 指的是当前创建的对象
- 不需要返回 this 系统自动会完成，像 class 中的构造函数不写的话会自动加上执行
- 实例需要使用 new 来创建

```js
function CreateUser(name) {
  this.name = name;
  this.saidName = () => {
    console.log(this.name);
  };
  // return this 系统自动返回
}
let user1 = new CreateUser('bear');
let user2 = new CreateUser('bee');
```

当构造函数返回对象了，此时的实例的对象就是返回的构造对象，和普通的函数返回值就一样了，这样的构造函数就和普通的函数没啥区别了

```js
function Animal(name) {
  this.name = name;
  this.saidName = function () {
    console.log(this.name);
  };
  return {};
}
let animal = new Animal('hanhan');
console.log(animal); // {}
```

### 对象函数

可以使用内置的构造函数来创建函数，不推荐这种写法

```js
const User = new Function(
  `name`,
  `
this.name=name;
this.show = function(){
  console.log(this.name)
}
`,
);
```

## 抽象特性

将复杂功能隐藏在内部，只开放少量不会影响对象内部的复杂逻辑的方法，这好比电话只有按钮，内部的很多的电子原件，交互逻辑都不需要用户了解。

### 问题分析

将下列的对象属性封装到构造函数内部

```js
function Penguin(name, age) {
  this.name = name;
  this.age = age;
  this.info = () => {
    return this.age > 70 ? 'old' : 'young';
  };
  this.about = () => `${this.name} is ${this.info()}`;
}
let penguin = new Penguin('bobo', 2);
console.log(penguin.info); // young
```

### 抽象封装

上面的例子有个问题，构造函数的内部的属性了方法都能在外部访问到，无法达到只向外提供指定的方法。_这里我们需要借助闭包的特性对对象进行抽象处理_

```js
function Penguin(name, age) {
  let data = { name, age };
  let info = () => {
    return data.age > 70 ? 'old' : 'yong';
  };
  this.about = () => `${data.name} is ${info()}`;
}
let penguin = new Penguin('bobo', 2);
console.log(penguin.info()); //penguin.info is not a function
```

## 属性特征

属性特征有 4 种

- configurable 能否使用 delete、能否修改属性特征、能否访问属性 默认值 true
- enumerable 对象属性是否可以通过 for in 循环，或者 Object.keys()获取 默认值 true
- writable 对象属性是否可以修改 默认值 true
- value 对象的默认值 undefined

### 查看特征

Object.getOwnPropertyDescriptor 查看对象属性的描述

```js
const penguin = {
  name: 'commit',
  age: 2,
};
let desc = Object.getOwnPropertyDescriptor(penguin, 'age');
console.log(JSON.stringify(desc, null, 2));
// {
//   "value": 2,
//   "writable": true,
//   "enumerable": true,
//   "configurable": true
// }
let desc = Object.getOwnPropertyDescriptors(penguin);
console.log(JSON.stringify(desc, null, 2));
// {
//   "name": {
//     "value": "commit",
//     "writable": true,
//     "enumerable": true,
//     "configurable": true
//   },
//   "age": {
//     "value": 2,
//     "writable": true,
//     "enumerable": true,
//     "configurable": true
//   }
// }
```

### 设置特征

使用 Object.defineProperty 修改属性的特性，通过下面的设置属性 name 将不能被遍历、删除、修改

```js
const jojo = {
  name: 'penguin',
};
Object.defineProperty(jojo, 'name', {
  value: '🐧',
  writable: false,
  enumerable: false,
  configurable: false,
});
// 不允许修改
jojo.name = 'fox';
// 不能遍历
Object.keys(jojo);
// 不允许删除
delete jojo.name;
// 不允许配置
Object.defineProperty(jojo, 'name', {
  value: 'bear',
  writable: true,
  enumerable: false,
  configurable: false,
});
```

使用 Object.defineProperties 可以设置多个属性

```js
let penguin = {};
Object.defineProperties(penguin, {
  name: { value: 'woff', writable: false },
  age: { value: 2 },
});
console.log(penguin); // {name:'woff',age:2}
penguin.name = 'penguin'; // 修改无效不会报错
console.log(penguin.name); // woff
```

### 禁止添加

preventExtensions 禁止扩展

```js
'use strict';
const user = { name: 'penguin' };
Object.preventExtensions(user);
user.age = 2; // Error
```

isExtensible 是否可以扩展

```js
'use strict';
let penguin = { name: 'penguin' };
console.log(Object.isExtensible(penguin)); // true
Object.preventExtensions(user);
console.log(Object.isExtensible(penguin)); // false
```

### 封闭对象

Object.seal() 封闭一个对象，阻止添加新的属性并且将所有的属性设置为 configurable:false

- 不能新增属性
- 不能删除，重新配置属性 改变 configurable 的值
- 可以遍历，读取修改已有的属性
  Object.isSeal() 用来判断对象是否被封闭

```js
'use strict';
let penguin = { name: 'fox', age: 2 };
Object.seal(penguin);
penguin.name = 'extensions';
console.log(Object.isSeal(penguin)); // true
```

### 冻结对象

Object.freeze 冻结对象后不允许添加、删除、修改属性，writable、configurable 都为 false,_enmerable:true_

```js
'use strict';
let penguin = { name: 'fox', age: 2 };
Object.freeze(penguin);
console.log(Object.isFrozen(penguin)); // true
console.log(penguin.age); // 2
penguin.age = 5; // Error
```

## 属性访问器

getter 方法用于获取属性值，setter 方法用于设置属性值

- 用于避免错误的赋值
- 需要动态监测值的改变
- 属性只能在访问器和普通属性选其一，不能同时存在

### getter/setter

对用户的年龄数据使用访问器访问设置

```js
'use strict'
const user = {
  data:{name:'penguin',age:undefined},
  set age(value){
    if(typeof value !='number' || value>100 || value<0){
      throw new Error('年龄格式错误')
    }
    this.data.age = value
  }
  get age(){
    return `年龄是:${this.data.age}`
  }
  }
  user.age = 99
  console.log(user.age)
```

使用 getter 设置只读课程总价

```js
let lesson = {
  lists: [
    { name: 'vue', price: 100 },
    { name: 'mysql', price: 80 },
    { name: 'nodejs', price: 90 },
  ],
  get total() {
    return this.lists.reduce((t, pru) => t + pru.price, 0);
  },
};
console.log(lesson.total); // 270
```

使用 get 和 set 对 token 进行管理

```js
const Request = {
  get token(){
    let currentToken = localStorage.getItem('token')
    if(!currentToken){
      alert('请登录获取token')
    }else{
      return currentToken
    }
  }

  set token(){
    localStorage.setItem('token')
  }
}
```

定义内部私有变量,这种只是约定上的私用变量，无法真正达到私有

```js
let penguin = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 3) {
      throw new Error('username length min 3');
    }
    this._name = value;
  },
};
penguin.name = 'penguin';
console.log(penguin.name);
console.log(penguin); // {_name:'penguin',name:'penguin'}
// 通过改变 peguin._name 还是能改变name 的值
```

### 访问器描述符

使用 defineProperty 可以模拟定义私有属性，从而使用面向对象的抽象特征

```js
function User(name, age) {
  let data = { name, age };
  Object.defineProperties(this, {
    name: {
      get() {
        return data.name;
      },
      set(value) {
        data.name;
      },
    },
    age: {
      get() {
        return data.age;
      },
      set(value) {
        data.age;
      },
    },
  });
}
```

使用 class 语法糖实现

```js
const DATA = Symbol();
class User {
  constructor(name, age) {
    this[DATA] = { name, age };
  }
  get name() {}
  set name(value) {
    this[DATA].name = value;
  }
  get age() {}
  set age(value) {}
}
```

### 闭包访问器

下面结合闭包特性对属性进行访问控制

- 访问器定义在函数中，并接收参数 v
- 在 get()中通过闭包返回 v
- 在 set()中修改 v,这会影响 get()访问的闭包数据 v

```js
let data = { name: 'penguin' };
for (const [key, value] of Object.entries(data)) {
  observer(data, key, value);
}
function observer(data, key, value) {
  Object.defineProperty(data, key, {
    get() {
      return v;
    },
    set(value) {
      v = value;
    },
  });
}
```

## 代理拦截

代理（拦截器）是针对对象的访问控制，setter/getter 是对单个对象属性的控制，而代理是对整个对象的控制

- 读写属性时代码更加简洁
- 对象的多个属性控制统一交给代理完成
- 严格模式下 set 必须返回布尔值

### 使用方法

```js
'use strict'
const penguin = {name:'penguin'}
const proxy = new Proxy(penguin,{
  get(obj,property){
    return obj[property]
  }
  set(obj,property,value){
    obj[property] = value
    return true
  }
})
proxy.age = 10
console.log(penguin) // {name:'penguin',age:10}
```

### 代理函数

如果代理以函数方式执行时，会执行代理中定义的 apply 方法

- 参数（代理函数，上下文对象，形参）
  下面代理函数执行的时间

```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1);
}
let proxy = new Proxy(factorial, {
  apply(fun, obj, args) {
    console.time('run');
    fun.apply(obj, args);
    console.timeEnd('run');
  },
});
proxy.apply(this, [5]);
```

### 截取字符

对数组代理，给数组对象中的某个属性进行截取操作

```js
const lesson = [
  { title: '窗前明月光', category: 'p' },
  { title: '天苍苍野茫茫风吹草地现牛羊', category: 'p' },
];
const stringProxy = new Proxy(lesson, {
  get(target, key) {
    const title = target[key].title;
    const len = 5;
    return title.length > 5 ? `${title.substr(0, len)}...` : title;
  },
});
console.log(stringProxy[0]);
```

## JSON

- json 是一种轻量级的数据交换格式，易于阅读和编写
- 使用 json 数据格式是替换 xml 最佳方式，主流编程语言都很好的支持 json 格式
- json 标准中要求使用双引号包裹属性，虽然有些语言不强制，不过还是要遵循标准避免出错，和 js 中的对象要区分开

### 申明定义

基本结构

```js
let penguin = {
  name: 'penguin',
  father: { name: 'fox' },
  hobby: ['math', 'run'],
};
```

### 序列化

JSON.stringify(a,b,c)

- a 表示要序列化的对象
- b 表示要保留序列化对象中的属性
- c 表示 tab 缩进的

```js
console.log(JSON.stringify(penguin));
// {"name":"penguin","father":{"name":"fox"},"hobby":["math","run"]}
```

根据第二参数来指定保持的属性,如果填入的是 null 表示所有的属性都格式化

```js
console.log(JSON.stringify(penguin, ['name'])); // {"name":"penguin"}
```

第三个参数用来控制缩进的

```js
console.log(JSON.stringify(penguin, null, 4));
```

自定义对象的序列化返回

```js
let penguin = {
  name: 'penguin',
  father: { name: 'fox' },
  hobby: ['math', 'run'],
  toJSON: function () {
    return {
      name: this.name,
      fatherName: this.father.name,
    };
  },
};
console.log(JSON.stringify(penguin));
// {"name":"penguin","fatherName":"fox"}
```

### 反序列化

JSON.parse(a,fun)将字符串 json 解析成对象

- a 代表的是要被解析成对象的 json 字符串
- fun 可用于对数据的自定义处理

```js
let jsonStr = JSON.stringify(penguin);
console.log(JSON.parse(jsonStr));
```

第二个参数的使用

```js
let jsonStr = JSON.stringify(penguin);
// {"name":"penguin","fatherName":"fox"}
console.log(
  JSON.parse(jsonStr, (key, value) => {
    if (key == 'fatherName') {
      return `little${value}`;
    }
    return value;
  }),
);
```
