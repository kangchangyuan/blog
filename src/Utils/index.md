# Utils工具类
## isObject
```js
const isObject = val => Object.prototype.toString.call(val)==='[object Object]'
```
## isArray
```js
const isArray = val =>!!val && Array.isArray(val)
```
## isBoolean
```js
const isBoolean = val =>typeof val === 'boolean'
```
## isFunction
```js
const isFunction = val =>val && typeof val === 'function'
```
## isNumber
```js
const isNumber = val => typeof val === 'number'
```
## isString
```js
const isString = val => typeof val === 'string'
```
## countDown
```js
const countDown=(n)=>{
  let t = setTimeout(()=>{
    n?countDown(--n): clearTimeout(t) 
  },1000)
}
```
## isInArray
```js
// const fileType = ['excel','image','markdown','pdf','ppt','text','word','zip']
// isInArray(fileType,'excel') true
const isInArray = (arr,val) => arr.includes(val)
```
## getFileName
```js
// ppt.js
const getFileName = (str) => str.substring(0,str.lastIndexOf('.'))
```
## getExtension
```js
const getExtension = (str) => str.substring(0,str.lastIndexOf('.')+1)
```
## waitTime
```js
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
```