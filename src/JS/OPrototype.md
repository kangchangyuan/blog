# 原型于继承

## 原型基础

### 原型对象

每个对象都有一个原型 prototype 对象，通过函数创建的对象也将拥有这个原型对象。原型是一个指向对象的指针

- 可以将原型理解为对象的父亲，对象从原型对象中继承属性
- 原型就是对象，除了是某个对象的父亲外，和其他的对象没有区别
- 所有函数的原型默认是 Object 的实例，所以函数可以使用对象中的方法
- 使用原型对象为多个对象共享属性或方法
- 如果对象本身不存在属性或方法可以在原型上查找
- 使用原型可以解决，通过构造函数创建对象时复制多个函数造成的内存占用问题
- 原型包含 construct 属性，指向构造函数
- 对象包含**proto**指向他的原型对象
  下列使用的就是数组原型对象的 concat 方法完成的合并

```js
let penguin = [1];
console.log(penguin.concat('a')); // [1,'a']
console.log(penguin); // [1]
```

js 的根原型是 Object Object.getPrototypeOf() 获取原型

```js
let a = {};
let b = {};
console.log(Object.getPrototypeOf(a) == Object.getPrototypeOf(b)); // true
```

**有没有对象是没有原型的（纯数据字典对象原型为 null）**

```js
const penguin = Object.create(null, {
  name: {
    value: 'penguin',
  },
});
console.log(penguin); // {name:'penguin'}
// 报错，因为此时的penguin就是个纯粹的字面量，没有Object原型上的相关方法
console.log(penguin.hasOwnProperty('name')); // hasOwnProperty is not a function
```
