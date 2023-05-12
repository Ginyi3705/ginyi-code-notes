:::tip
这是关于`Vue`的面试题汇总，先思考，再看答案呀！希望对你有帮助！
:::

## 简单题

> 1、Vue有什么特点？

:::details 查看答案
Vue的核心思想是“响应式编程”，它具有以下几个特点：
- `渐进式框架`： 说白了可以按需引入模块，需要路由？加！需要Vuex？加！😁
- `响应式数据绑定`：通过双向数据绑定的实现数据和视图的自动更新。
- `组件化开发`：组件化开发，可以将一个页面拆分为多个组件。
- `虚拟DOM`：使用虚拟DOM技术可以最小化DOM操作，提高性能和渲染速度。
- `插件化扩展`：使用过npm吧？就它。有空逛一逛技术社区！😁
:::



> 2、Vue2和Vue3的生命周期钩子？

:::details 查看答案
| Vue2            | Vue3              | 作用                                  |
| --------------- | ----------------- |-------------------------------------|
| `beforeCreate`  | `setup`           | 创建组件实例之前，无法访**data**和**method**等 |
| `created`       | `setup`           | 组件实例创建完毕，可以访问**data**和**method**等   |
| `beforeMount`   | `onBeforeMount`   | 组件挂载到节点上之前执行的函数                     |
| `mounted`       | `onMounted`       | 组件挂载完成后执行的函数                        |
| `beforeUpdate`  | `onBeforeUpdate`  | 组件更新之前执行的函数                         |
| `updated`       | `onUpdated`       | 组件更新完成之后执行的函数                       |
| `beforeDestroy` | `onBeforeUnmount` | 组件卸载之前执行的函数                         |
| `destroyed`     | `onUnmounted`     | 组件卸载完成后执行的函数                        |
| `activated`     | `onActivated`     | 被包含在 `<keep-alive>` 中的组件，**激活**时执行  |
| `deactivated`   | `onDeactivated`   | 被包含在 `<keep-alive>` 中的组件，**消失**时执行   |
:::


> 3、Vue中v-bind和v-model的区别是什么？

:::details 查看答案
- `v-bind`：指令是单向数据绑定，把vue实例中的数据绑定到DOM元素的属性中
- `v-model`：指令是双向数据绑定的，可以实现数据的同步更新。
:::



> 4、Vue中常用的指令有哪些？请举例说明。

:::details 查看答案
- `v-if`：控制元素显示隐藏，条件为true时才会渲染DOM，为false时删除DOM
- `v-show`：控制元素显示隐藏，条件为true时显示DOM，为false时，设置的display: none属性实现隐藏
- `v-bind`：单向数据绑定，把vue实例中的数据绑定到DOM元素的属性中，可简写为`:`
- `v-model`：双向数据绑定的，可以实现数据的同步更新
- `v-for`：用来遍历数组或对象
- `v-on`：来绑定DOM事件和Vue实例中的方法，可简写为`@`
:::

> 5、Vue中的computed和watch有什么区别？

:::details 查看答案
`computed`和`watch`都是用来`监听数据变化`的，但还是一些区别，具体如下： 
 - `computed`：计算属性，它会根据它所依赖的数据进行缓存，只有当计算属性的依赖数据发生改变时，才会重新计算它的值。
```js
/**
 * 例如
 * fullName计算属性依赖了firstName和lastName两个数据，只有当这两个数据改变时，
 * 才会重新计算fullName的值：
 */
export default {
    data() {
        return {
            firstName: 'John',
            lastName: 'Doe'
        }
    },
    computed: {
        fullName() {
            console.log('computed fullName')
            return `${this.firstName} ${this.lastName}`
        }
    }
}
```
 - `watch`：监听属性，它可以在数据发生改变时执行一些自定义的操作
```js
/**
 * 例如
 * 监听firstName数据的变化，在firstName改变时输出一条日志
 */
export default {
    data() {
        return {
            firstName: 'John'
        }
    },
    watch: {
        firstName(newVal, oldVal) {
            console.log(`firstName changed from ${oldVal} to ${newVal}`)
        }
    }
}
```
:::

> **6、Vue如何实现组件间的通信？**

:::details 查看答案
Vue实现组件间通信的一般方式有以下几种：
- `Props/$emit`：父组件通过 props 属性将数据传递给子组件，在子组件中通过 $emit 方法触发一个事件向父组件传递数据
- `$ref`：获取实例化的子组件并直接调用其方法或访问其数据,只适用于父组件与子组件之间的通信
- `provide/inject`：祖先组件通过 provide 提供数据，然后让后代组件通过 inject 来注入这些数据
- `事件总线`：可以创建一个空的Vue实例，并将其作为事件总线在所有组件之间传递事件
```js
/**
 * 事件总线例子
 */
// event-bus.js
import Vue from 'vue';
export const EventBus = new Vue();

// componentA.vue
import { EventBus } from './event-bus.js';
export default {
    methods: {
        handleClick() {
            EventBus.$emit('eventName', data);
        }
    }
}
```
:::

> 7、如何在Vue中处理表单数据？

:::details 查看答案
Vue提供了双向绑定输入框，使用 `v-model` 将选中或输入的输入框、单选和多选框、下拉框的值绑定到数据属性上和使用  `@submit` 提交表单数据。
:::


> 8、Vue中的路由是什么？如何实现路由跳转？

:::details 查看答案
在 Vue 中，路由可以用于实现单页应用（SPA），即在同一个页面中动态加载不同的组件。
实现路由跳转，一般需要以下步骤：
- 安装 Vue Router。
- 在 main.js 文件中导入 Vue Router 并注册。
- 添加路由出口和路由链接或使用 $router.push()
:::


> 9、Vue中的事件修饰符有哪些？

:::details 查看答案
Vue 中的事件修饰符可以用来控制事件的行为或特性，以下是常用的事件修饰符：
- `stop` ：阻止事件冒泡
- `prevent` ：阻止事件的默认行为
- `capture` ：使用事件捕获模式
- `self` ：只有在事件当前元素是触发元素时才触发事件
- `once` ：事件只会触发一次
- `passive` ：告诉浏览器不必等待处理函数完成，可以立即滚动页面或执行其他用户操作
:::



> 10、Vue的MVVM模式是什么？

:::details 查看答案
Vue 的 MVVM 模式是指 Model-View-ViewModel 模式，其中
- `Model`：是指数据模型（View）是分离的，而中间层被称为
- `View`：是指页面视图
- `ViewModel`：是数据模型和页面视图的中转站，实现数据的自动渲染和视图的同步更新
:::


## 中等题

> 11、Vue2 和 Vue3的不同之处？

:::details 查看答案
vue2 和跟 vue3 是存在区别的，总体而言，vue3 要优于 vue2，具体如下
- `性能方面`：数据劫持，Vue2使用`Object.defineProperty`，而Vue3使用`Proxy`。性能更优，可以监听更多种类型的数据，可以捕获更多类型的操作，如读取、设置、删除等。
- `组合式API`：Vue3 提供了全新的组合式API，取代了Vue2中的Options API。
- `支持TypeScript`，Vue3 支持 TypeScript，并提高了代码的可读性和可维护性。
- `包体积小`：Vue3的核心库体积比Vue2更小，而且更容易进行按需加载，意味着在Vue3项目中，页面加载速度更快。
- `Tree-shaking`：Vue3支持更好的Tree-shaking，这使得只有实际使用的代码才会被打包，可以减少打包后的文件大小。

:::

> 12、Vue的Virtual DOM是什么？有什么优点？

:::details 查看答案
`Virtual DOM` 是 Vue 中的一个核心概念，它是一个轻量级的 JavaScript 对象，表示 DOM 树的结构。当数据发生变化时，Vue 会比较新旧虚拟DOM树的差异，并只更新需要更新的部分，从而避免了不必要的 DOM 操作，提高了性能。
:::

> 13、说一下Vue中的单向数据流和双向数据流？

:::details 查看答案
`单向数据流`，指的是数据只能从父组件流向子组件，子组件不能直接修改父组件的数据。
`双向数据流`，指的是数据可以在父子组件之间进行双向传递，即子组件可以修改父组件传递的数据。
:::

> 14、如何在Vue中实现自定义指令？

:::details 查看答案
在 Vue 中，可以通过 `Vue.directive()` 方法来注册全局指令，该方法接收两个参数
- `第一个参数`：是指令的名称
- `第二个参数`：是指令的配置项，它是一个对象，对象中包含了指令的生命周期钩子函数等相关配置
:::

> 15、Vue中的Mixins是什么？它们有什么用处？

:::details 查看答案
`Mixins`是 Vue 中一种用于扩展组件功能的特殊方式。通过使用 Mixins，我们可以将一些常用的功能抽象成一个可复用的 Mixin 对象，然后在多个组件中使用该 Mixin 对象来实现相同的功能，并减少代码冗余和重复。
:::

> 16、Vue中怎么实现组件的动态加载？

:::details 查看答案
使用vue提供的component组件，可以实现组件的动态加载。根据不同的条件，传入对应的组件即可。
```vue
<template>
  <component :is="'传入对应的组件，可以动态切换不同的组件'"/>
</template>

<script>
import componentA from './componentA.vue' 
import componentB from './componentB.vue' 
</script>
```
:::

> 17、Vue中的keep-alive有什么作用？

:::details 查看答案
- `简要概述`：Vue 中的`<keep-alive>`组件可以缓存不活动的组件实例，当页面切换时，不销毁组件。以便下次使用时可以直接从缓存中获取，从而提高组件的渲染效率和性能。
- `原理简述`：在内部维护一个缓存队列，并对需要缓存的组件进行标记和缓存操作，在后续需要使用时尝试从缓存中取出已经存在的组件，以避免多次创建和销毁组件
:::

> 18、Vue.use() 的作用

:::details 查看答案
`Vue.use`是一个用于注册 Vue 插件的方法。例如全局注册 vue-router、vuex、axios 等。
:::warning 
注意，如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。
:::



## 高难度
> 22、Vue中的作用域插槽是什么？它们有哪些用处？

> 23、Vue中的watcher是什么？它们有什么作用？

> 25、Vue中怎么实现组件的动态注册？

> 26、Vue中的diff算法是什么？它有什么优点？

> 27、如何在Vue中实现异步更新DOM？

> 28、Vue中的SSR是什么？它有什么作用？

> 29、Vue中的mixin和extend的区别是什么？

> 30、Vue中怎么实现高阶组件？

> 31、如何在Vue中实现可复用的组件？
