# 运算符

## 算术运算符

| 加  | 减  | 乘  | 除  | 取余 |
| :-: | :-: | :-: | :-: | :--: |
|  +  |  -  | \*  |  /  |  %   |

## 复合运算符

\*=、/=、+=、-=、%=

```js
let n = 2;
n *= 2; //相当于 n = n*2
n += 3; //相当于 n = n+3
```

## 一元运算符

前置操作，会先执行运算操作

```js
let n = 1;
++n;
console.log(n); //n = 2
--n;
console.log(n); //n = 1
```

看下面一个例子，age 中的值是 21，n 要先自身+1，然后再和 18 相加

```js
let n = 2;
let age = 18 + ++n;
console.log(age); //age = 21
```

后置操作，在表达式之后执行

```js
let n = 2;
let age = 18 + n++;
console.log(age); //age = 20
```

## 比价运算符

返回值为布尔类型，true、false，==值相同就相等，===需要值和类型都相同

| 大于 | 小于 | 大于或等于 | 小于或等于 | 强制类型转换比较 | 不转换类型比较 |
| :--: | :--: | :--------: | :--------: | :--------------: | :------------: |
|  >   |  <   |     >=     |     <=     |        ==        |      ===       |

```js
let a = 1;
const b = '1';
let c = 3;

console.log(a > b); // b会强制转换成数值类型1和a比较  结果为false
console.log(a == b); // true
console.log(a === b); // false ===不会转换类型比较，数值1和字符串1比较不相等，类型不同
// 需要注意下NaN
console.log(NaN == false); // false
console.log(!NaN == true); // true
```

## 逻辑运算符

类似于物理电路中的串行和并行，0 会转换成 false，1 会转换成 true

| 与  |  或  | 非  |
| :-: | :--: | :-: |
| &&  | \|\| |  !  |

```js
// false  '' null undefined
let a = true;
let b = 0;
console.log(a && b); // false
console.log(a || b); // true
console.log(a && !b); // true
```
