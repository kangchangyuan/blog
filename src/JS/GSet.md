# Set & WeakSet

## Set

Set 可以理解为一种严格的数组类型

- 值不能重复
- 自动去重
- 严格匹配 1，和'1' 是两个变量
- 有序的
- 值可以为任意值 null undefined NaN 都可以

### 声明

```js
let set = new Set();
console.log(set); // Set(0) {size: 0}
```

### add

不许添加重复的值,不会报错，添加无效只有一个值，支持链式操作

```js
let set = new Set();
set.add('penguin').add('elephant');
set.add('penguin');
console.log(set); // Set(1) {'penguin','elephant'}
```

### size

用于获取 set 长度类似于数组的 length

```js
let set = new Set([1, 2, 3, '1', true]);
console.log(set.size); // 5
```

### delete

删除成功 true 失败 false

```js
let set = new Set([1, 2, 3, '1', true]);
console.log(set.delete('1'));
```

### has

含有 true 没有 false

```js
let set = new Set([1, 2, 3, '1', true]);
console.log(set.has(1)); // true
```

### clear

清空集合里的所有项

```js
let set = new Set([1, 2, 3, '1', true]);
set.clear();
console.log(set.size); // 0
```

### 数组转换

可以使用展开语法... 或者 Array.from 转换成数组

```js
let animal = new Set(['penguin', 'panda']);
let arr1 = [...animal];
let arr2 = Array.from(animal);
console.log(arr1); // ['penguin','panda']
console.log(arr2); // ['penguin','panda']
// 修改set中的值，通过该改变数组的值，然后转化会set
arr1[1] = 'dog';
animal = new Set([...arr1]);
console.log(animal); // Set(2) {'penguin', 'dog'}
```

### 去除重复

字符串去重

```js
let str = '天苍苍野茫茫，风吹草地见牛羊';
console.log([...new Set(str)].join('')); // 天苍野茫，风吹草地见牛羊
```

数组去重

```js
let arr = [1, 5, 3, 7, 1, 3, 5, 9];
arr = [...new Set(arr)];
console.log(arr);
```

### 遍历数据

Set 类型只有值，所以 keys 和 values 方法的返回值是相同的，entries 返回的是 value=>value,key 和 value 都是值

```js
let animal = new Set(['penguin', 'cat']);
console.log(animal.values()); // SetIterator {'penguin', 'cat'}
console.log(animal.keys()); // SetIterator {'penguin', 'cat'}
console.log(animal.entries()); // SetIterator {'penguin' => 'penguin', 'cat' => 'cat'}
animal.forEach((item, key) => console.log(item, key)); // penguin penguin cat cat
for (const item of animal) {
  console.log(item); // penguin cat
}
```

### 交差并集

```js
let luckNum = new Set([1, 2, 3, 4, 5, 6]);
let gameNum = new Set([1, 2, 7, 8, 9, 4]);
// 交集 相同项
let intersection = [...luckNum].filter((v) => gameNum.has(v));
// [1,2,4]

// 并集 去重
let unionSet = [...new Set([...luckNum, ...gameNum])];
//[1, 2, 3, 4, 5, 6, 7, 8, 9]

// 差集 不同项
let differenceSet = [...luckNum].filter((v) => !gameNum.has(v));
// [3,5,6]
```

## WeakSet

- 成员必须是对象类型的值
- 垃圾回收不考虑 WeakSet，就是说对象被 WeakSet 引用，对象还是能正常删除回收
- WeakSet 是弱引用，所有不能使用遍历方法，因为有可能被引用的对象被删除了
- 同样不能使用 keys,entries,values,size 的方法
- 因为是弱引用所有当外部引用删除时，希望自动删除数据时可以使用 WeakSet

### 声明

```js
new WeakSet([1, 2]);
new WeakSet('penguin');
// Invalid value used in weak set
// 正确的方式
new WeakSet([['penguin'], { name: 'penguin' }]);
```

### 基本操作

```js
let weakSet = new WeakSet();
// 添加
weakSet.add(['penguin']);
// 获取
console.log(weakSet.get('penguin'));
// 判断是否存在
console.log(weakSet.has('penguin'));
// 删除对象
weakSet.delete('penguin');
```

### 垃圾回收

WeakSet 保存对象不会增加引用计数器，如果一个对象不被引用了会触发垃圾回收机制

```js
let arr = [1, 2, 3];
// 数组被arr 引用，计数器 +1
let weakSet = new WeakSet([arr]);
// 数组被添加到weakset中并不会增加引用数，计数器还是1
arr = null;
// arr 设置成null 计数器-1，为0 会触发垃圾回收
console.log(weakSet);
// WeakSet{Array(1)} 为啥还有值，垃圾回收不是立即进行的
setTimeout(() => {
  console.log(weakSet); //  WeakSet{Array(1)} 为啥还有值???
}, 1000);
// 最大的原因就是v8垃圾回收的机制是一种惰性回收
// 同时最重要的一条是，假如当前的可用内存足以让我们快速的执行代码，
// 其实我们是没必要立即清理内存的
```
