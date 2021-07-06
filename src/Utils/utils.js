
// isObject

const isObject = val => Object.prototype.toString.call(val)==='[object Object]'

// isArray

const isArray = val =>!!val && Array.isArray(val)

// isBoolean

const isBoolean = val =>typeof val === 'boolean'

// isFunction

const isFunction = val =>val && typeof val === 'function'

// isNumber

const isNumber = val => typeof val === 'number'

// isString

const isString = val => typeof val === 'string'

// countDown

const countDown=(n)=>{
  let t = setTimeout(()=>{
    n?countDown(--n): clearTimeout(t) 
  },1000)
}
countDown(10)

// isInArray

const isInArray = (arr,val) => arr.includes(val)
