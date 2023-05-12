:::tip
这是关于`JavaScript`的面试题汇总，先思考，再看答案呀！希望对你有帮助！
:::

## 简单题

> 1、JavaScript的数据类型有哪些？

:::details 查看答案
JavaScript中有七种基本数据类型和一种复杂数据类型，具体如下：
- `Number`：整数或小数。
- `String`：一串字符，用单引号或双引号括起来。
- `Boolean`：true 或 false。
- `null`：表示一个空对象指针。
- `undefined`：表示一个未定义的值。
- `Symbol`：表示唯一的、不可变的值，在ES6中新增。
- `BigInt`：表示任意长度的整数，在ES2020中新增。
- 复杂数据类型：对象（`Object`），包括普通对象、数组、函数等。
:::


> 2、什么是NaN？如何检查一个值是否是NaN？

:::details 查看答案
它是 JavaScript 中的一种特殊值，用来表示数值无效的情况。例如，当尝试将一个非数字的字符串转换成数字时，就会得到 NaN。
- NaN 表示`不是一个数字`，
- 检查一个值是否是 NaN，可以使用全局方法 isNaN()
```js
console.log(isNaN(NaN));     // true
console.log(isNaN("hello")); // true
console.log(isNaN({}));      // true
console.log(isNaN(""));      // false   ps：""做弱类型比较时，可以银时转换为 0，因为长度为 0
console.log(isNaN([]));      // false   ps：[]做弱类型比较时，可以银时转换为 0，因为长度为 0
console.log(isNaN(123));     // false
```
:::

> 3、什么是闭包？如何创建一个闭包？

:::details 查看答案
当一个函数返回另一个函数时，返回的函数可以访问包含该函数的父级作用域的变量，这个返回的函数就是闭包。例如
```js
function createCounter (){
    // 状态变量
    let count = 0;
    
    // 返回内部函数
    return function (){
        return count++
    }
}

const counter = createCounter(); // 创建闭包
console.log(counter());; // 1
console.log(counter());; // 2
console.log(counter());; // 3
```
:::warning
需要注意的是，闭包可能会导致内存泄漏问题，因为当一个函数返回另一个函数时，该函数的作用域链会保留所有变量的引用，这可能会导致一些变量一直存在于内存中，无法被垃圾回收机制收回。因此，在使用闭包时需要特别小心，避免出现内存泄漏问题。
:::tip
内存泄露，是指程序运行时产生的内存无法被垃圾回收机制回收，一直占据着一定的内存空间，称为内存泄漏。

:::

> 4、JavaScript中的 null 和 undefined 有什么区别？

:::details 查看答案
`null`表示有一个值，但它的值是空的，而`undefined`则表示一个变量定义了但没有被赋值。
:::

> 5、如何在JavaScript中遍历数组？

:::details 查看答案
在 JavaScript 中，
- 可以使用`for`、`while`语句遍历
- 可以使用`for of`、`for in`遍历
- 可以使用高阶函数`forEach`、`map`、`filter`、`some`、`every`遍历
:::

> 6、for...of 和 for...in 的区别

:::details 查看答案
for in 和 for of 都是用来遍历对象和数组的循环语句，但它们的用途不同
- for in
  - 是`es5`标准，`无序遍历`
  - 对数组的`索引`进行遍历，对对象的`key`进行遍历
  - 会把数组或对象的原型上的属性或方法也遍历出来
- for of
  - 是`es6`标准，`有序遍历`
  - 对数组的`元素`进行遍历，对对象的`value`进行遍历
  - 只会遍历当前对象，不涉及原型
:::

> 7、forEach、map、filter、some、every、reduce的区别

:::details 查看答案
- `forEach`：遍历数组中的每个元素，对每个元素执行回调函数。
- `map`：将数组中的每个元素传入回调函数中，生成一个新的数组。
- `filter`：使用指定的条件过滤数组中的元素，返回一个新的数组，不会修改原数组。
- `some`：判断数组中是否存在满足指定条件的元素，只要有一个元素满足条件则返回 true，否则返回 false，不会修改原数组。
- `every`：判断数组中所有元素是否都满足指定条件，只有所有元素都满足条件才返回 true，否则返回 false，不会修改原数组。
- `reduce`：对数组进行迭代处理，逐个处理数组的每个元素，并将多个元素处理后返回一个结果，例如
```js
/**
 * reduce 的参数说明
 * 
 * accumulator（累加器）：初始值或者上一次迭代的结果
 * currentValue（当前值）：当前正在处理的元素
 * index（索引）：当前元素在数组中的索引
 * array（当前数组）：被迭代的数组本身
 */
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((accumulator, currentValue, index, array) => {
  return accumulator + currentValue;
}, 0); // 初始值设置为 0
console.log(sum); // 15
```
:::


> 8、如何判断一个对象是否是数组？

:::details 查看答案
可以使用 JavaScript 的`Array.isArray()`方法来判断一个对象是否是数组。这个方法接收一个参数，如果该参数是一个数组，则返回`true`，否则返回`false`。
:::


> 9、什么是函数柯里化？如何实现函数柯里化？

:::details 查看答案
函数柯里化指的是将一个接受多个参数的函数转化为一系列接收单一参数的函数的过程。这些接收单一参数的函数每次都将部分参数作为闭包保存下来，并返回一个新的函数，直到所有参数都被收集完毕，最后执行函数并返回结果。
- `简单例子`
```js
/**
 * 实现一个将两个数相乘的函数进行柯里化：
 */
function multiply(a) {
    return function(b) {
        return a * b;
    }
}
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(3)); // 输出 6
```

- `经典面试题`
```js
/**
 * 实现一个 add 方法，使计算结果能够满足如下预期：
 * 
 * add(1)(2)(3) = 6;
 * add(1, 2, 3)(4) = 10;
 * add(1)(2)(3)(4)(5) = 15;
 */
function add (){
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    let args = [...arguments]

    // 在内部声明一个函数，利用闭包的特性保存 args 并收集所有的参数值
    let innerFunc = function (){
        args.push(...arguments)
        return innerFunc
    }

    // 重写 valueOf 函数，计算并返回最终值
    innerFunc.valueOf = () => {
        return args.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
    }
    
    return innerFunc
}

console.log(add(1)(2).valueOf())          // 3
console.log(add(1)(2)(3).valueOf())       // 6
console.log(add(1, 2, 3)(4).valueOf())    // 10
```
:::

> 10、什么是节流防抖？如何实现？

:::details 查看答案
- `节流（Throttle）`：指的是在单位时间内，连续触发事件时，函数只执行一次
```js
/**
 * 节流函数
 * @param func 需要调用节流的函数
 * @param delay 延迟时间，单位为毫秒，默认为0
 * @returns {(function())|*} 返回一个经过节流处理后的函数
 */
function throttle (func, delay = 0){
    return function (){
        // 先判断 timer 是否存在，如果存在则无需执行 func 函数
        if (!timer){
            timer = setTimeout(() => {
                func.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}
```
- `防抖（Debounce）`：指的是在单位时间内，连续触发事件时，函数只执行最后一次
```js
/**
 * 防抖函数
 * @param func 需要调用防抖的函数
 * @param delay 延迟时间，单位为毫秒，默认为0
 * @returns {(function(): void)|*} 返回一个经过防抖处理后的函数
 */
function debounce (func, delay = 0){
    let timer = null;
    return function (){
        // 每次执行这个函数时，先清除之前的定时器
        clearInterval(timer)
        timer = setTimeout(() => {
            func.apply(this, arguments);
            timer = null;
        }, delay)
    }
} 
```
:::

> 11、什么是原型和原型链？有什么作用？

:::details 查看答案
作用：原型链可以`实现继承`和`共享属性及方法`
- `原型`：每个`函数`都具有一个`prototype`属性，称为`原型`。而这个原型（prototype）的值是一个`对象`，称为`原型对象`。
```js
/**
 * 例如 Array，它的原型上挂载着许多属性和方法，比如，splice()、sort()等，表示为
 */
Array.prototype.reverse = splice()
Array.prototype.reverse = sort()
```
- `原型链`：每个函数`实例化`出来的对象，如`new Array()`，都具有一个`__proto__`属性，而它指向了函数的原型，即`prototype`，而函数的原型本身也是一个对象，即它也有__proto__属性指向了它的原型，如此循环下去，构成了一条链，称之为原型链。
```js
/**
 * arr 本身没有 splice、sort 方法，之所以可以使用这两个方法，是因为它的原型链有挂载这样的方法！
 */
const arr = new Array(1, 2, 3, 4, 5)
arr.splice(1, 1)
arr.sort()
```
- `图片解释`

<img alt="图片解释" style="border-radius: 10px" height="100%" src="https://img0.baidu.com/it/u=1564045444,121577099&amp;amp;fm=253&amp;amp;fmt=auto&amp;amp;app=138&amp;amp;f=PNG?w=806&amp;amp;h=436" width="100%"/>
:::

> 12、JavaScript的事件循环是怎么一回事？

:::details 查看答案
事件循环是一种机制，用于协调 JavaScript 运行时处理事件和执行代码的顺序，从而实现了非阻塞 I/O 和异步执行。
- `具体的逻辑顺序是`：主线程首先执行完同步任务， 然后会去任务队列中执行宏任务，如果在执行宏任务的过程中发现有微任务，这时候微任务比宏任务先执行。全部执行完成之后等待主线程调用，调用完成之后再去任务队列中查看是否还有异步任务有待执行，循环往复。
- `图片解释`

<img alt="图片解释" style="border-radius: 10px" height="100%" src="/eventloop.png" width="100%"/>

- `经典面试题`
:::warning
- `setTimeout` 是异步任务中的`宏任务`，`Promise` 是异步任务中的`微任务`，执行顺序`微任务优于宏任务`！
```js
// 同步任务
console.log("同步任务开始")
// 异步任务（宏任务）
setTimeout(() => {
    console.log("setTimeout 1")
    new Promise((resolve) => {     
        console.log("Promise 1")    // 优于 .then .catch 等先执行，因为它们才是异步回调
        resolve()
    }).then(() => {
        console.log("Promise then 1")
    })
}, 1000)
// 同步任务
console.log("同步任务结束")
new Promise((resolve) => {
    console.log("Promise 2")    // 优于 .then .catch 等先执行，因为它们才是异步回调
    resolve()
}).then(() => {
    console.log("Promise then 2")
})

/**
 * 输出顺序
 * 1、同步任务开始
 * 2、同步任务结束
 * 3、Promise 2
 * 4、Promise then 2
 * 5、setTimeout 1
 * 6、Promise 1
 * 7、Promise then 1
 */
```
:::

> 13、JavaScript中的变量提升？

:::details 查看答案
- `变量提升`，是 JavaScript 的一个重要特性，它允许我们在变量声明之前就使用变量，而不会报错。例如
```js
console.log(a);
var a = 1;
/**
 * 在声明变量 a 之前使用了 a 变量
 * 结果输出 undefined，而不是 ReferenceError: a is not defined
 */
```
- 上述代码实际上，在执行时，JavaScript 会将变量提升，并且是未赋值状态，所以会输出`undefined`，例如
```js
var a;
console.log(a);
a = 1;
```
- `函数`也存在提升现象，JavaScript 会将整个函数声明提升到当前作用域顶部，它的值是`函数体本身`，例如
```js
console.log(f());
function f (){
    return 'f函数被调用了'
}
/**
 * 定义函数之前调用函数，不会报错，因为存在函数提升
 */
```
- `函数表达式`，与 function 不同，函数表达式遵循的是，变量提升规则，例如
```js
/**
 * 以下是函数表达式，区别于上述！！！
 */
console.log(f2)
var f2 = function (){
    return 'f2函数被调用了'
}
console.log(f2())
/**
 * 结果输出 undefined 和 f2函数被调用了
 */
```
- 上述代码实际上，在执行时，JavaScript 会将变量提升，并且是未赋值状态，所以会输出`undefined`，例如
```js
var f2;
console.log(f2);
f2 = function (){
    return 'f2函数被调用了'
}
console.log(f2());
```
:::warning
在同一作用域内，如果同时存在函数名和变量名相同，提升的时候，变量声明会被函数声明覆盖！
```js
console.log(f3);
var f3 = 1;
console.log(f3);
function f3 (){
    return 'f3函数被调用了'
}
console.log(f3);
/**
 * 结果输出 f f3(){...} 和 1 和 1
 */
```
- 上述代码实际上，在执行时，被提升了，且函数声明覆盖掉了变量声明，等同于下述代码
```js
function f3 (){
    return 'f3函数被调用了'
}
console.log(f3); // f f3(){...}
f3 = 1;
console.log(f3); // 1
console.log(f3)  // 1
```

:::

> 14、浅拷贝与深拷贝的区别？如何实现深拷贝？

:::details 查看答案
- `浅拷贝`，是指创建一个新对象或数组时，只复制原始对象的引用，而不会创建新的引用。原始对象的属性或通过浅拷贝出来的对象属性发生变化时，另一方也会同步发生相同的变化。
- `深拷贝`，则是会创建新的引用，原始对象属性或通过深拷贝出来的对象属性发生变化时，不会影响另一方！
- 实现深拷贝的方法有很多种，以下是其中的一种`递归`实现方式：
```js
function deepClone(obj) {
    // 如果是基本数据类型，直接返回
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    // 根据类型创建新对象或数组
    const newObj = Array.isArray(obj) ? [] : {};
    // 递归复制属性或元素
    for (const key in obj) {
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
}
```
:::
