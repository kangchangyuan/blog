# Symbol

Symbol 的值是唯一值，不重复，类似于个人的身份 ID

## 变量声明

```js
let sy = Symbol();
let kg = Symbol();

// Symbol 不可以添加属性，不会报错添加无效
sy.name = 'penguin';
console.log(sy); // Symbol()
console.log(sy.name); // undefined
console.log(sy == kg); // false
```

## 传值标记 Symbol

方便辨认 Symbol

```js
let penguin = Symbol('企鹅');
console.log(penguin); // Symbol('企鹅')
console.log(penguin.description); // 企鹅
```

## Symbol.for

使用 Symbol.for 创建的变量会定义在全局中，在使用当前方法定义相同描述的变量会在全局中查找引用

```js
let animal = Symbol.for('penguin');
let little = Symbol.for('penguin');
console.log(animal == little); // true
```

## Symbol.keyFor

用来获取 Symbol.for 定义的描述值

```js
let animal = Symbol.for('penguin');
let little = Symbol.for('penguin');
console.log(Symbol.keyFor(animal)); // penguin
```

## 对象属性

用于定义对象属性，防止重复，也可以用于定义类中的受保护的属性值

```js
const NAME = Symbol();
let userInfo = {
  [NAME]: 'PENGUIN',
  age: 18,
};
console.log(userInfo[NAME]); // PENGUIN
```

## 综合例子

使用 Symbol 解决缓存 key 值同名覆盖的情况

```js
class Cache {
  static data = {};
  static set(key, value) {
    this.data[key] = value;
  }
  static get(key) {
    return this.data[key];
  }
}
let user = {
  name: 'PENGUIN',
  // key:'info',
  // key:'user-info', 不使用Symbol的办法定义不同名称的key
  key: Symbol('user'),
};
let penguin = {
  name: 'little',
  // key:'info',
  key: Symbol('penguin'),
};
Cache.set(user.key, user);
Cache.set(penguin.key, penguin);
console.log(Cache.get(user.key));
```

## Symbol 不可以遍历

不能使用 for in for of

```js
let symbol = Symbol('money');
let userInfo = {
  age: 18,
  name: 'penguin',
  [symbol]: 1000,
};
for (const key in userInfo) {
  console.log(key);
}
for (const key of Object.keys(userInfo)) {
  console.log(key);
}
// 只能打印出 age,name
```

使用 Object.getOwnPropertySymbols() 获取所有的 symbol 值

```js
let money = Symbol('money');
let address = Symbol('address');
let userInfo = {
  age: 18,
  name: 'penguin',
  [money]: 1000,
  [address]: 'china shenzhen',
};
console.log(Object.getOwnPropertySymbols(userInfo));
// [Symbol('money'),Symbol('address')]
```

使用 Reflect.ownKeys 可以获取包含 Symbol 定义的 key

```js
let symbol = Symbol('money');
let userInfo = {
  age: 18,
  name: 'penguin',
  [symbol]: 1000,
};
for (const key of Reflect.ownKeys(userInfo)) {
  console.log(key);
}
//  age, name, Symbol(money)
```
