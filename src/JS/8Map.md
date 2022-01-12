# Map && WeakMap

## Map

Map 是一组 key=>value 的数据结构，用于解决对象不能作为 key 的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以做为 key 或 value

### 声明

```js
let map = new Map([
  ['penguin', 'animal'],
  ['lishi', 'human'],
]);
map.set({ name: 'wangwu' }, 'human');
console.log(map.get('lishi')); // human
console.log(map.get({ name: 'wangwu' })); // undefined
```

为啥 map.get({name:'wangwu'}) 获取对象为 key 的 map 值的时候是 undefined?原因是对象值相同，当时内存地址是不同的，就是两个不同的值，所有不能用这种方式来获取值，需要给这个对象定义一个变量来获取

```js
let obj1 = { age: 18 };
let obj2 = { age: 18 };
console.log(obj1 == obj2); // false
// 上面的本质是开辟了两个不同的内存地址，只是值相同
let map = new Map([[obj1, 88]]);
map.get(obj1); // 88
```

### size

获取数量

```js
let map = new Map([['penguin', 18]]);
console.log(map.size); // 1
```

### get

读取元素

```js
let map = new Map([['penguin', 18]]);
console.log(map.get('penguin')); // 18
```

### set

添加元素，支持链式操作

```js
let map = new Map([['penguin', 18]]);
map.set('animal', 50).set('dog', 10);
```

### has

判断元素是否存在

```js
let map = new Map([['penguin', 18]]);
map.set('animal', 50).set('dog', 10);
console.log(map.has('animal')); // true
```

### delete

删除元素

```js
let map = new Map([['penguin', 18]]);
map.set('animal', 50).set('dog', 10);
map.delete('animal');
console.log(map.has('animal')); // false
```

### clear

清空 Map 中的所有元素

### 遍历

先对于 Set 类型，Map 可以使用 keys、values、entries 进行遍历操作

```js
let map = new Map([['penguin', 18]]);
map.set('animal', 50).set('dog', 10);
map.forEach((v, key) => console.log(v, key));
for (const [k, v] of map) {
  console.log(k, v);
}
for (const [k, v] of map.entries()) {
  console.log(k, v);
}
for (const key of map.keys()) {
  console.log(key);
}
for (const values of map.values()) {
  console.log(values);
}
```

### 数组转换

和 Set 一样可以使用...语法或者 Array.from 将 Map 类型转为数组

```js
let map = new Map([
  ['penguin', 18],
  ['giraffe', 28],
]);
console.log([...map]); // [['penguin',18],['giraffe',28]]
console.log(Array.form(map)); // [['penguin',18],['giraffe',28]]
console.log([...map.keys()]); // ['penguin','giraffe']
console.log([...map.values()]); // [18,28]
console.log([...map.entries()]); // [['penguin',18],['giraffe',28]]
```

## WeakMap

- key 必须是对象
- key 是弱引用，value 是正常引用
- 垃圾回收不会考虑 key 的引用
- 不能遍历
- 没有 keys、values、entries、size、clear
- 当 key 值的外部引用删除时，希望自动删除数据时使用 WeakMap
- null 不能作为 key

### 声明

```js
new WeakMap('penguin');
// Invalid value used in weak map
map.set(null, 2);
// TypeError: Invalid value used as weak map key
new WeakMap([[{}, 18]]);
new WeakMap([[[], 18]]);
```

### 基本操作

```js
let weakmap = new WeakMap();
let arr = ['penguin'];
weakmap.set(arr, 'animal');
console.log(weakmap.get(arr)); // animal
weakmap.delete(arr);
console.log(weakmap.has(arr));
```

### 垃圾回收

和 WeakSet 相同

- 使用对象 key 值时为弱引用，不用是的引用计数器加 1
- 当垃圾回收时因为对象被删除了，所以 weakmap 自动清除

```js
let weakmap = new WeakMap();
let k = {};
weakmap.set(k, 'gg');
k = null;
console.log(weakmap);
setTimeout(() => {
  console.log(weakmap);
}, 1000);
```

上边代码没有效果的原因时因为无法确定浏览器的垃圾回收机制的时间
