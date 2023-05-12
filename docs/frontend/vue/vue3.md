:::tip
Vue3 + TypeScript 基础入门笔记
:::

## 创建项目

```bash
# 安装 yarn
npm i -g yarn

# 创建项目
yarn create vite

# 安装依赖
yarn install

# 运行项目
yarn dev
```


## 数据绑定

:::preview 示例代码 || 待描述...

demo-preview=./components/code-v-model.vue

:::


## Vue3 Proxy

作用： 数据的响应式原理

```js
// 目标对象
const user = {
    name: '张三',
    age: 20,
    wife: {
        name: '小红',
        age: 20
    }
}

// 把目标对象变成代理对象
// 参数1： user --> target 对象
// 参数2：handler --> 处理器对象，用来监视数据，及数据的操作

const proxy = new Proxy(user, {
    set(target, p, value, receiver) {
        console.log('set方法调用了');
        return Reflect.set(target, p, value)
    },
    get(target, p, receiver) {
        console.log('get方法调用了');
        return Reflect.get(target, p)
    },
    // 删除目标对象中的某个属性
    deleteProperty(target, p) {
        console.log('delete方法调用了');
        return Reflect.deleteProperty(target, p)
    }
});

// 通过代理对象获取目标对象中的某个属性
console.log(proxy.name);  // 张三
proxy.name = '王五'
console.log(proxy.name)   // 王五

// 通过代理对象像目标对象添加属性值
proxy.gender = '男'
console.log(proxy.gender);    // 男

// 通过代理对象删除目标对象中的某个属性
delete proxy.gender
console.log(proxy.gender);  // undefined

// 通过代理对象修改目标对象中对象的某个属性（深度监听）
proxy.wife.name = '小晓'
console.log(proxy.wife.name); //小晓
```

##  父子组件通讯

App.vue

```vue
<template>
  <div>
    <div>父级组件的msg: {{ parent_msg }}</div>
    <child :msg="child_msg" @getMsg="getChildMsg"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import child from "./components/Child.vue";

export default defineComponent({
  name: 'app',
  components: {
    child
  },
  setup() {
    const parent_msg = ref<string>('父级组件的msg')
    const child_msg = ref<string>('将这个字符串传递给子组件')

    const getChildMsg = (val: string) => {
      parent_msg.value += val
    }
    return {
      parent_msg,
      child_msg,
      getChildMsg
    }
  }
})

</script>

```

Child.vue

```vue
<template>
  <div>child的msg: {{ msg }}</div>
  <button @click="send">分发事件</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'child',
  props: ['msg'],
  setup(prop, {emit}) {
    const send = () => {
      emit('getMsg', '子组件传递过来的信息')
    }
    return {
      send
    }
  }
})
</script>

<style scoped>

</style>
```

## defineProps、defineExpose 与 defineEmits

defineProps 作用：接受父组件传递过来值

```js
defineProps({
  title: {
    type: String,
    require: false,
    default: () => {
      return '这里是默认值'
    }
  }
})
```

defineEmit 作用：向父组件传递值

```js
const emits = defineEmits(['getMsgFromChild'])  // 可以指定多个方法名
const sendMsg = () => {
  emits('getMsgFromChild', '将这段文字传递给父组件')
}
```





## watch与computed

基础版

```vue
<template>
  <div>
    <h2>计算属性和监听属性</h2>
    <fieldset>
      <legend>姓名操作</legend>
      姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName"><br>
      名字：<input type="text" placeholder="请输入名字" v-model="user.lastName"><br>
    </fieldset>
    <fieldset>
      <legend>计算属性和监听属性的演示</legend>
      姓氏：<input type="text" placeholder="请输入姓氏" v-model="fullName1"><br>
      姓氏：<input type="text" placeholder="请输入姓氏" v-model="fullName2"><br>
      姓氏：<input type="text" placeholder="请输入姓氏" v-model="fullName3"><br>
    </fieldset>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch, watchEffect} from "vue";

export default defineComponent({
  name: 'app',
  setup() {
    const user = reactive({
      firstName: '东方',
      lastName: '不败'
    });

    // 回调-->get 返回的是ref类型的对象
    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName
    })

    // 对象 get set都有
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val: string) {
        const name = val.split('_')
        user.firstName = name[0]
        user.lastName = name[1]
      }
    })

    const fullName3 = ref<string>('')
    // 监视 -- 方法一： 监视指定的数据
    watch(user, ({firstName, lastName}) => {
      fullName3.value = firstName + '_' + lastName
    }, {immediate: true, deep: true})  // immediate: true 代表会自动执行一次   deep: true 深度监听

    // 监视 -- 方法二： watchEffect不需要配置immediate、deep 体验感更好
    watchEffect(() => {
      fullName3.value = user.firstName + '_' + user.lastName
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
})

</script>

```

进阶版

```js
// 监听fullName3的数据， 改变firstName和lastName
watchEffect(() => {
    const name = fullName3.value.split('_')
    user.firstName = name[0]
    user.lastName = name[1]
})

// watch -- 可以监听多个数据, 只监听响应式数据
watch([user.firstName, user.lastName], () => {
    console.log('此时user.firstName, user.lastName这两个不会被监听，这行代码不打印，因为user.firstName, user.lastName不是响应式的数据')
})

// watch -- 可以监听多个数据, 只监听响应式数据
watch([user.firstName, user.lastName, fullName3], () => {
    console.log('此时fullName3会被监听到，因为fullName3是响应式的数据')
})

// watch -- 改成箭头函数即可监听非响应式数据
watch([() => user.firstName, () => user.lastName, fullName3], () => {
    console.log('此时user.firstName, user.lastName两个非响应式的数据会被监听到')
})
```

## watchEffect高级监听

```vue
<template>
  <div>
    <h1>watchEffect的使用</h1>
    <input type="text" v-model="message">
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";

const message = ref<string>('123')
/**
 * 将需要监听的对象直接写在里边即可
 */
watchEffect(() => {
  console.log('===监听message===', message.value)
})
</script>
```

## 生命周期

注意：生命周期是一个函数，参数是一个回调函数

```vue
<template>
  <div>
    <h1>生命周期函数</h1>
    <h3>请观察控制台日志</h3>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted} from "vue";

export default defineComponent({
  name: 'app',
  setup() {
    /**
     * 注意
     * beforeCreat、Created 已经集成在 setup 当中
     */

    onBeforeMount(() => {
      console.log('元素挂载之前');
    })
    onMounted(() => {
      console.log('元素挂载完成后');
    })

    /**
     * 注意
     * beforeDestroy、Destroyed 已经改名为 onBeforeUnmount、onUnmounted
     */

    onBeforeUnmount(() => {
      console.log('组件卸载之前');
    })
    onUnmounted(() => {
      console.log('组件卸载完毕');
    })

    return {

    }
  }
})

</script>
```

## 自定义hooks

作用：类似于vue2中的mixin技术，能复用功能代码

案例：收集用户鼠标点击的页面位置

新建hooks目录，useMousePosition.ts文件，写如下代码：

```js
import {onBeforeUnmount, onMounted, ref} from "vue";

export const  useMousePosition = () => {
    const x = ref<number>(-1)
    const y = ref<number>(-1)

    /**
     * 鼠标点击事件，获取页面位置
     * @param event
     */
    const clickHandler = (event: any) => {
        x.value = event.pageX
        y.value = event.pageY
    }
    /**
     * 初始化鼠标点击事件
     */
    onMounted(() => {
        window.addEventListener('click', clickHandler)
    })
    /**
     * 页面卸载时销毁鼠标事件
     */
    onBeforeUnmount(() => {
        window.removeEventListener('click', clickHandler)
    })
    return {
        x, y
    }
}
```

在App.vue中使用

```vue
<template>
  <div>
    <h1>自定义hooks</h1>
    <h1>x: {{ x }}, y: {{ y }}</h1>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMousePosition} from "./hooks/useMousePosition";
    
export default defineComponent({
  name: 'app',
  setup() {
    const { x, y } = useMousePosition()
    return {
      x, y
    }
  }
})

</script>
```

## toRef

作用：可以把响应式对象中的某个属性转换成ref类型，二者内部操作的是同一个数据值，更新世二者是同步

```vue
<template>
  <div>
    <h1>toRaw与markRaw</h1>
    <h1>state: {{ state }}</h1>
    <hr>
    <h1>age: {{ age }}</h1>
    <hr>
    <button @click="update">更新数据</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRef} from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      name: '张三',
      age: 28,
      money: 5000
    })
    // 把响应式对象state中的age属性变成ref对象，与原先state.age共用一个地址
    const age = toRef(state, 'age')
    // 把响应式对象state中的money属性变成ref对象，与原先state.money不共用一个地址
    const money = ref(state.money)
    const update = () => {
      age.value += 1
      money.value += 1
      console.log('请观察页面的数据变化, age变了, money没变')
    }
    return {
      state,
      age,
      update
    }
  }
});

</script>
```









## toRefs

作用：可以把普通对象转换成响应式对象

如：`reactive`对象取出的所有属性值都是非响应式的，但又要要求返回的是响应式的数据

解决：使用`toRefs`可以将一个响应式对象的所有原始属性转换为响应式的ref属性

```vue
<template>
  <div>
    <h1>自定义hooks</h1>
    <!-- 正常写法 -->
    <h1>name: {{ state.name }}</h1>
    <h1>age: {{ state.age }}</h1>

    <!-- 优化写法, 可以在return时使用...state, 但是数据是非响应式的 -->
    <h1>name: {{ name }}</h1>
    <h1>age: {{ age }}</h1>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";

export default defineComponent({
  name: 'app',
  setup() {
    const state = reactive({
      name: '张三',
      age: 20
    })

    setInterval(() => {
      state.name += '1'
      console.log('定时器执行了, 观察state的变化');
    }, 1000)

    // 将 reactive 对象里的属性扩展 return 出去的时候是非响应式的，使用 toRefs 就可以转换成 Ref ，即响应式的
    return {
      ...toRefs(state)
    }
  }
});

</script>
```

## 利用 ref 获取元素

利用ref函数获取组件中的标签元素

功能：让输入框自动获取焦点

```vue
<template>
  <div>
    <h1>ref的另一个作用：可以获取页面中的元素</h1>
    <input type="text" ref="inputRef"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  /**
   * 需求：页面加载完毕，获取文本框焦点
   */
  setup() {
    const inputRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      inputRef.value && inputRef.value.focus() // 获取焦点
    })
    return {
      inputRef
    }
  }
});

</script>
```

## toRaw和markRaw

作用：toRaw可以将代理对象转换成普通对象，markRaw标记一个对象,使其永远不会再成为响应式对象

```vue
<template>
  <div>
    <h1>toRaw与markRaw</h1>
    <h1>state: {{ state }}</h1>
    <button @click="updateToRaw">toRaw更新数据</button>
    <button @click="updateMarkRaw">markRaw更新数据</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, markRaw, reactive, toRaw} from "vue";

interface Userinfo {
  name: string,
  age: number,
  likes?: string[]
}

export default defineComponent({
  setup() {
    const state = reactive<Userinfo>({
      name: '张三',
      age: 28
    })
    const updateToRaw = () => {
      // 把代理对象变成普通对象
      const user = toRaw(state)
      // 测试数据变化，页面不会变化
      user.name += "你好阿"
      console.log('user对象：', user);
      console.log('更新的方法已执行完毕，页面没有任何变化')
    }
    const updateMarkRaw = () => {
      const likes = ['吃', '喝']
      // 通过markRaw标记的对象数据，此后都不能成为代理对象
      state.likes = markRaw(likes)
      setInterval(() => {
        if (state.likes) {
          state.likes[0] += '啥呢？'
          console.log('定时器已执行')
        }
      }, 1000)

    }
    return {
      state,
      updateToRaw,
      updateMarkRaw
    }
  }
});

</script>
```

## 依赖注入 provide 与 inject

新建子组件`Child.vue`与孙子组件`Child of Child.vue`

Child.vue

```vue
<template>
  <div style="background-color: bisque; padding: 20px">
    <h2>这是子级组件Child的文本内容</h2>
    <ChildOfChild/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ChildOfChild from "./Child of child.vue";

export default defineComponent({
  components: {
    ChildOfChild
  },
  setup() {
    return {}
  }
});

</script>

```

Child of child.vue

```vue
<template>
  <div style="background-color: aquamarine; padding: 20px">
    <h3>这是孙子组件Child of child的文本内容</h3>
    <span>当前顶级组件传递过来的时间戳是： {{ time }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";

export default defineComponent({
  setup() {
    const time = inject('time')
    return {
      time
    }
  }
});

</script>
```

App.vue

```vue
<template>
  <div style="background-color: cadetblue; padding: 20px">
    <h1>provide 与 inject</h1>
    <button style="margin-bottom: 10px" @click="time = new Date().valueOf()">向孙子组件传递当前时间戳</button>
    <Child />
  </div>
</template>

<script lang="ts">
import {defineComponent, provide, ref} from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  components: {
    Child
  },
  setup() {
    const time = ref<number>(new Date().valueOf())
    provide('time', time)
    return {
      time
    }
  }
});

</script>
```

## Teleport

作用：可以让组件的html在父组件界面外的特定标签（很可能是body）下插入显示，如设计一个`对话框`

新建组件model.vue

```vue
<template>
  <button @click="modelOpen = true">打开对话框</button>
  <Teleport to="body">
    <transition name="model-fade">
      <div class="model" v-show="modelOpen">
        <span>这是对话框</span>
        <button @click="modelOpen = false">关闭</button>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const modelOpen = ref<boolean>(false)
    return {
      modelOpen
    }
  }
});

</script>

<style scoped>
.model {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: red;
  min-width: 400px;
  min-height: 300px;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 10px;
}

.model-fade-enter-active {
  transition: all 0.3s ease-out;
}

.model-fade-leave-active {
  transition: all 0.8s;
}

.model-fade-enter-from, .model-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
```

App.vue

```vue
<template>
  <div style="background-color: cadetblue; padding: 20px">
    <h1>Teleprot的使用</h1>
    <Model/>
  </div>
</template>

<script lang="ts">
import {defineComponent, provide, ref} from "vue";
import Model from "./components/Model.vue";

export default defineComponent({
  components: {
    Model
  },
  setup() {
    const time = ref<number>(new Date().valueOf())
    provide('time', time)
    return {
      time
    }
  }
});

</script>
```

## 可选链运算符

用于解决访问当前属性不存在报错的问题

```js
type menu = {
  name: string,
  icon?: string,
  children?: menu[] | []
}

const data = reactive<menu[]>([
    {
        name: 'No.1',
        children :[{
            name: 'No.1-1',
            children: [{
                name: 'No.1-1-1'
            }]
        }]
    },
])

// 因为data[1]不存在，直接访问其属性会报错，使用可选运算符则不会报错，会输出undefined
console.log('4、不存在children,输出children,不会报错,输出undefined', data[1]?.children)
// 因为data[1]不存在，获取其属性的长度，报错，使用可选运算符则不会报错，会输出undefined
console.log('5、不存在children,输出children的长度,报错', data[1]?.children?.length)

```

## 空值合并运算符

只处理undefined和null，才会返回后面指定的默认值

```js
type menu = {
  name: string,
  icon?: string,
  children?: menu[] | []
}

const data = reactive<menu[]>([
    {
        name: 'No.1',
        children :[{
            name: 'No.1-1',
            children: [{
                name: 'No.1-1-1'
            }]
        }]
    },
])

// 因为data[1].children不存在，获取其长度会报错，使用可选运算符则不会报错，会输出undefined
// 使用??可以输出默认值，因为长度不存在，使用可选运算符会输出undefined，？？则输出0
console.log('4、不存在children,输出children,不会报错,输出undefined', data[1]?.children?.length??0)
```

## 递归组件

递归组件：即组件调用组件本身

MenuTree.vue

```vue
<template>
  <div style="margin-left: 10px">
    <span v-for="(item, index) in data" :key="index">
      {{item.name}}
      <MenuTree :data="item.children" v-if="item?.children?.length"></MenuTree>
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * 递归组件：即组件调用组件本身
 * 本知识点还是运用到可选运算符，要了解的话顺便把合并运算符也了解一下吧
 */
import MenuTree from "./MenuTree.vue";
defineProps(['data'])
</script>
```

Menu.vue

```vue
<template>
  <div>
    <MenuTree :data="data" />
  </div>
</template>

<script setup lang="ts">
import MenuTree from '../../components/MenuTree.vue'
import {reactive} from "vue";

type menu = {
  name: string,
  icon?: string,
  children?: menu[]
}
const data = reactive<menu[]>([
  {
    name: 'No.1',
    children: [
      {
        name: 'No.1-1',
        children: [
          {
            name: 'No.1-1-1'
          }
        ]
      }
    ]
  },
  {
    name: 'No.2',
    children: [
      {
        name: 'No.2-1'
      }
    ]
  },
  {
    name: 'No.3'
  },
  {
    name: 'No.4',
    children: [
      {
        name: 'No.4-1'
      }
    ]
  }
])
</script>
```

## Less & 写法

& : 代表父层级的class，注意不需要 ` . `, 直接 &-xxx即可

```vue
<div class="maincontent">
    <Header class="maincontent-header"/>
    <Content class="maincontent-content"/>
</div>
<style lang="less" scoped>
.maincontent {
    width: 70%;
    background-color: bisque;
    display: flex;
    flex-direction: column;

    &-header {
        height: 20%;
        background-color: aqua;
    }

    &-content {
        height: 80%;
        background-color: azure;
    }
}
</style>
```

## keep-alive

作用：缓存组件，组件隐藏或者切换时，组件不会销毁并且数据依旧保留

```vue
<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <keep-alive>
      <Login v-if="flag"></Login>
      <Register v-else></Register>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import Login from '../../components/Login.vue'
import Register from '../../components/Register.vue'

import {ref} from "vue";
const flag = ref<boolean>(true)
</script>
```

### include 与 exclude

include：将指定的`name`组件进行缓存，其他不缓存，如仅缓存`Login`

exclude：与`include相反`，对指定`name`的组件不进行缓存，如仅不缓存`Login`

```vue
<keep-alive :include="['Login']" :exclude="['Login']">
    <Login v-if="flag"></Login>
    <Register v-else></Register>
</keep-alive>
```

Ligin.vue

```vue
<template>
  <table>
    <tr>
      <td>用户名</td>
      <td><input type="text"></td>
    </tr>
    <tr>
      <td>密码</td>
      <td><input type="password"></td>
    </tr>
  </table>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'Login'
}
</script>
```

### 生命周期的变化

组件切换或者隐藏时，销毁函数不执行，且渲染钩子函数`onMounted`只在组件实例时执行且只执行一遍。

当组件出现时，执行`onActivated`钩子函数，当组件切换或隐藏时，执行`onDeactivated`钩子函数

```vue
<template>
  <table>
    <tr>
      <td>用户名</td>
      <td><input type="text"></td>
    </tr>
    <tr>
      <td>密码</td>
      <td><input type="password"></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import {onActivated, onDeactivated, onMounted, onUnmounted} from 'vue'
onActivated(() => {
  console.log('Login组件显示了')
})
onDeactivated(() => {
  console.log('Login组件隐藏了')
})
onMounted(() => {
  console.log('mounted执行了，只执行一遍')
})
onUnmounted(() => {
  console.log('销毁钩子函数不执行，被onDeactivated替代')
})
</script>
<script lang="ts">
export default {
  name: 'Login'
}
</script>
```

## 插槽

创建子组件`Card.vue`，

```vue
<div>
    <header class="header"></header>
    <main class="main">
        <slot></slot>
    </main>
    <footer class="footer">444</footer>
</div>
```



### 匿名插槽

子组件直接使用`slot`即可，如

```vue
<main class="main">
    <slot></slot>
</main>
```

父组件用`v-slot`插入内容，如：

```vue
<Card>
    <template v-slot>
		<span>这是匿名插槽的写法</span>
    </template>
</Card>
<!--简写-->
<Card>
    <template #default>
		<span>这是匿名插槽的写法</span>
    </template>
</Card>
```

### 具名插槽

指定名字，子组件指定`name`，如：

```vue
<header class="header">
    <slot name="header"></slot>
</header>
```

父组件，使用`v-slot:header`即可将内容插入对应`name`的位置

```vue
<template v-slot:header>
	<span>这是具名插槽的写法</span>
</template>
<!--简写-->
<template #header>
	<span>这是具名插槽的写法</span>
</template>
```





## transition 

### 基础写法

首先使用`transition`标签包裹住要内容标签，其次位`transition`指定`name`，如：



```vue
<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition name="fade">
      <Dialog v-if="flag"/>
    </transition>
  </div>
</template>
```

最后编写过渡效果css代码

```vue
<style lang="less" scoped>
// 进入过渡的开始状态
.fade-enter-from {
  width: 0;
  height: 0;
}
// 进入过渡生效时的状态
.fade-enter-active {
  transition: all 1s ease;
}
// 进入过渡的结束状态
.fade-enter-to {
  width: 200px;
  height: 200px;
}
// 结束过渡的开始状态
.fade-leave-from {
  width: 200px;
  height: 200px;

}
// 结束过渡生效时的状态
.fade-leave-active {
  transition: all 1s ease;
}
// 结束过渡的结束状态
.fade-leave-to{
  width: 0;
  height: 0;
}
</style>
```

### 自定义class类名

好处：自定义类名可以结合`第三方动画库`，如：`Animate.css`

因为`.[name]-enter-from`等等是固定写法，但是也可以改成指定类名的写法，如：

```vue
<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition
        enter-from-class="e-from"
        enter-active-class="e-active"
        enter-to-class="e-to"
        leave-from-class="l-from"
        leave-active-class="l-active"
        leave-to-class="l-to">
      <Dialog v-if="flag"/>
    </transition>
  </div>
</template>
```

编写过度效果css代码，如上述`基础写法`一致，只不过需要将类名换成指定好的class类名

#### 引入第三方动画库，官网：https://animate.style

```bash
yarn add animate.css -d  或者 cnpm install animate.css --save
```

使用，注意：`v.4`以上版本，需要加前缀`animate__animated`

```vue
<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition
        enter-active-class="animate__animated animate__bounce"
        leave-active-class="animate__animated animate__flash">
      <Dialog v-if="flag"/>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Dialog from '../../components/Dialog.vue'
import {ref} from "vue";
import 'animate.css'

const flag = ref<boolean>(true)
</script>
```

### 生命周期

```vue
<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition
        @before-enter="enterFrom"
        @enter="enterActiove"
        @after-enter="enterTo"
        @enter-cancelled="enterCancel"
        @before-leave="leaveFrom"
        @leave="leaveActive"
        @after-leave="leaveTo"
        @leave-cancelled="leaveCancel">
      <Dialog v-if="flag"/>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Dialog from '../../components/Dialog.vue'
import {ref} from "vue";

const flag = ref<boolean>(true)
const enterFrom = (el: Element) => {
  console.log('动画进入之前')
}
const enterActiove = (el: Element, done: Function) => {
  console.log('动画过渡时')
  setTimeout(() => {
    done()
  }, 3000)
}
const enterTo = (el: Element) => {
  console.log('动画过渡完成')
}
const enterCancel = () => {
  console.log('动画过渡期间被打断')
}

const leaveFrom = (el: Element) => {
  console.log('结束过渡的开始状态')
}
const leaveActive = (el: Element, done: Function) => {
  console.log('结束过渡生效时的状态')
  setTimeout(() => {
    done()
  }, 3000)
}
const leaveTo = (el: Element) => {
  console.log('结束过渡的结束状态')
}
const leaveCancel = () => {
  console.log('结束过渡的执行期间被打断')
}
</script>
```

## appear

作用：首次渲染，需要指定先`appear`

```vue
<transition
    appear
    appear-from-class="a-from"
    appear-active-class="a-active"
    appear-to-class="a-to">
  <Dialog v-if="flag"/>
</transition>
```

```vue
<style lang="less" scoped>
.a-from {
  width: 0;
  height: 0;
}

.a-active {
  transition: all 5s ease;
}

.a-to {
  width: 200px;
  height: 200px;
}
</style>
```

也可以配合`animate.css`动画库，如：

```vue
<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition
        appear
        appear-active-class="animate__animated animate__rubberBand">
      <Dialog v-if="flag"/>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Dialog from '../../components/Dialog.vue'
import {ref} from "vue";
import 'animate.css'

const flag = ref<boolean>(true)
</script>
```

## transition-group

作用：`transition-group`是表示的一组动画,一般常配合v-for动态渲染使用

由于`transition`中只能是单个的元素，因此如果需要多个元素添加动画效果需要加入`transition-group`使用

```vue
<template>
  <div>
    <button @click="add">增加</button>
    <button @click="del">删除</button>
    <div class="wrap">
      <transition-group
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOutBottomRight">
        <div class="item" v-for="item in list" :key="item">{{ item }}</div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import 'animate.css'

const list = reactive<number[]>([1, 2, 3, 4, 5])
const add = () => {
  list.push(list.length + 1)
}
const del = () => {
  list.pop()
}
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
  border: solid 1px #e59090;
  margin-top: 10px;

  .item {
    margin: 10px;
  }
}
</style>
```

## v-model

### props

作用： 类似于vue2双向绑定数据`:content`，使用`v-model`而不使用`:`时，只能用一次，跟上`:`则可以绑定多个

```vue
<Dialog v-model="title" v-model:content="content"/>
```

当使用`v-model="title"`传值时，子组件接收时，需要用`modelValue`来接收，否则接收不到，

当使用`v-model:content="content"`传值时，子组件就按正常写法接收，

如：

```vue
<script setup lang="ts">
defineProps({
  // v-model --> 只能绑定一次，且子组件当中只能用 modelValue 接受(类似默认值)
  modelValue: {
    type: String,
    require: false,
    default: () => {
      return null
    }
  }
  // v-model:content --> 在子组件中正常定义props接受content，写法同vue2中的:content一样
  content: {
    type: String,
    require: false,
    default: () => {
      return null
    }
  }
</script>
```

### emits事件

不同vue2的是，vue3`update:modelValue`、`update:content`给父组件传值，可以直接修改父组件对应的值，当然vue2也可以做到，不过需要添加`.sync`，这里不做概述，如：

子组件，传递值(也可以直接修改父组件的值)

```vue
<script setup lang="ts">

const emits = defineEmits(['update:modelValue', 'update:content'])

// 通过 update:content 派发事件，可以同时改变父组件的值，可以理解为修改同一地址的值
const OnClose = () => {
  emits('update:modelValue', '子组件title--' + new Date().valueOf() )
  emits('update:content', '子组件contnet--' + new Date().valueOf() )
}

</script>
```

父组件，获取值

```vue
<template>
	<div class="main" style="margin-top: 10px">
    	<Dialog v-model="title" v-model:content="content" @update:modelValue="getModelValue" @update:content="getContent"/>
    </div>
</template>

<script setup lang="ts">
import Dialog from '../../components/Dialog.vue'

const getModelValue = (val:string) => {
  console.log('这里可以获取到子组件传递过来的值-->', val)
}
const getContent = (val:string) => {
  console.log('这里可以获取到子组件传递过来的值-->', val)
}
</script>
```

完整代码

子组件

```vue
<template>
  <div class="dialog">
    <header class="dialog-header">
      <div>
        <span>标题：{{ modelValue }}</span>
        <span @click="OnClose">x</span>
      </div>
    </header>
    <main class="dialog-content">内容：{{content}}</main>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // v-model --> 只能绑定一次，且子组件当中只能用 modelValue 接受(类似默认值)
  modelValue: {
    type: String,
    require: false,
    default: () => {
      return undefined
    }
  },
  // v-model:content --> 在子组件中正常定义props接受content，写法同vue2中的:content一样
  content: {
    type: String,
    require: false,
    default: () => {
      return undefined
    }
  }
})

const emits = defineEmits(['update:modelValue', 'update:content'])

// 通过 update:content 派发事件，可以同时改变父组件的值，可以理解为修改同一地址的值
const OnClose = () => {
  emits('update:modelValue', '子组件title--' + new Date().valueOf() )
  emits('update:content', '子组件contnet--' + new Date().valueOf() )
}


</script>

<style lang="less" scoped="">
.dialog {
  width: 400px;
  height: 400px;
  background-color: #e59090;

  &-header {
    height: 12%;
    background-color: #f8cb35;

    div {
      height: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span:nth-child(2) {
        font-size: 28px;
        cursor: pointer;
      }
    }
  }

  &-content {
    height: 88%;
    padding: 10px;
  }
}
</style>
```

父组件

```vue
<template>
  <div>
    <button @click="reload">重新给子组件赋值</button>
    <h3 style="font-size: 22px">父组件的title： {{title}}</h3>
    <h3 style="font-size: 22px">父组件的content： {{content}}</h3>
    <div class="main" style="margin-top: 10px">
      <Dialog v-model="title" v-model:content="content" @update:modelValue="getModelValue" @update:content="getContent"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dialog from '../../components/Dialog.vue'
import {ref} from "vue";

const title = ref<string>('这是传给dialog的title字符串')
const content = ref<string>('这是传给dialog的contnet字符串')

const reload = () => {
  title.value = new Date().valueOf().toString()
  content.value = new Date().valueOf().toString()
}

const getModelValue = (val:string) => {
  console.log('这里可以获取到子组件传递过来的值-->', val)
}
const getContent = (val:string) => {
  console.log('这里可以获取到子组件传递过来的值-->', val)
}
</script>

<style lang="less" scoped>
.main{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## 自定义vue插件

封装插件，如messageBox，loading...

新建`loading`文件夹，新建`index.vue`，`index.ts`，

index.ts

```ts
/**
 * 将组件封装成插件
 */
import {App, createVNode, render, VNode} from "vue";
import Loading from './index.vue'

export default {
    /**
     * 第一步, install自定义插件
     * @param app App类型
     */
    install(app: App){
        // 1、生成虚拟dom, 此时component为null
        const vnode: VNode = createVNode(Loading)
        // 2、转换成真实dom, 挂载到body上, 此时component具备一定属性值
        render(vnode, document.body)
        // 3、挂载全局, 注册完毕(相应的属性值或方法需要在vue中exposed导出)
        app.config.globalProperties.$loading = {
            show: vnode.component?.exposed?.show,
            hide: vnode.component?.exposed?.hide
        }
    }
    /**
     * 第二步，在main主入口文件注册一下
     * import Loading from "./components/loading/index";
     * app.use(Loading)
     */
}
```

index.vue

```vue
<template>
  <div v-if="isShow" class="loading">
      <div class="loading-content">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const isShow = ref<boolean>(false)
const show = () => {
  isShow.value = true
}
const hide = () => {
  isShow.value = false
}
/**
 * defineExpose很关键
 */
defineExpose({
  isShow,
  show,
  hide
})


</script>

<style lang="less" scoped>
.loading{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  &-content{
    font-size: 30px;
    color: white;
  }
}
</style>
```

如何使用？

App.vue

```vue
<template>
  <button @click="showLoading">切换</button>
</template>

<script setup lang="ts">
import {ComponentInternalInstance, getCurrentInstance} from "vue";

const {appContext} = getCurrentInstance() as ComponentInternalInstance
const showLoading = () => {
  appContext.config.globalProperties.$loading.show()
  setTimeout(() => {
    appContext.config.globalProperties.$loading.hide()
  }, 2000)
}

</script>
```

再度封装，因为`const { appContext } = getCurrentInstance() as ComponentInternalInstance`写起来比较繁琐

在loading目录下，新建`useCurrentInstance.ts`

```ts
import {ComponentInternalInstance, getCurrentInstance} from "vue";

export default function useCurrentInstance(){
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const globalProperties = appContext.config.globalProperties
    return {
        globalProperties
    }
}
```

App.vue中使用

```vue
<template>
  <button @click="showLoading">切换</button>
</template>


<script setup lang="ts">
import useCurrentInstance from './components/loading/useCurrentInstance'

const { globalProperties } = useCurrentInstance();
const showLoading = () => {
  globalProperties.$loading.show()
  setTimeout(() => {
    globalProperties.$loading.hide()
  })
}

</script>
```

## Pinia

### 安装

cnpm

```bash
cnpm install pinia --save
```

yarn

```bash
yarn add pinia
```

### 使用

安装完毕后需要注册，才能使用，在`main.ts中`注册

```ts
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";

const store = createPinia()
const app = createApp(App)

app.use(store)
app.mount('#app')
```





创建`store`文件夹，新建`index.ts`文件

因为每个store都需要一个`唯一`的`name`，所以可以创建个`举类来`存放`name`，如`storeName.ts`



`storeName.ts`

```ts
export const enum Names {
    TEST = 'Test'
}
```

`index.ts`，一般习惯用`use`开头命名，表示这是一个`hooks`

```ts
import {defineStore} from "pinia";
import {Names} from "./storeName";

export const useTestStore = defineStore(Names.TEST, {
    state: () => {
        return {
            name: 'zhang san',
            age: 28
        }
    },
    actions: {
        setName(name: string): void {
            this.name = name
        }
    }
})
```

### 修改state

`App.vue`

```vue
<template>
  <div>
    <button @click="change5">改变state</button>
    <h1>
      pinia: name: {{Test.name}} --- age: {{Test.age}}
    </h1>
  </div>
</template>

<script setup lang="ts">
import {useTestStore} from "./store";
const Test = useTestStore()

/**
 * 第1种: 不建议
 */
const change1 = () => {
  Test.age++
}

/**
 * 第2种: 批量修改
 */
const change2 = () => {
  Test.$patch({
    name: '张三',
    age: 30
  })
}

/**
 * 第3种: 批量修改 + 可逻辑判断
 */
const change3 = () => {
  Test.$patch((state) => {
    state.age < 20 ? state.age = 50 : state.age = 40
    state.name = '钢铁侠'
  })
}

/**
 * 第4种: 必须修改所有属性，不然会报错
 */
const change4 = () => {
  Test.$state = {
    name: '小王八蛋',
    age: 30
  }
}

/**
 * 第5种: 通过 action 修改 state (推荐)
 */
const change5 = () => {
  Test.setName('是张三啦')
}

</script>

```

### 解构state

解构出的属性值，`不具备响应式`，可以用`storeToRefs`解决

不具备响应式👇

```vue
<template>
  <div>
    <button @click="change5">改变state</button>
    <h1>pinia: name: {{ name }} --- age: {{ age }}</h1>
  </div>
</template>

<script setup lang="ts">
import {useTestStore} from "./store";
const Test = useTestStore()
const {name, age} = Test
</script>
```

具备响应式👇

```vue
<template>
  <div>
    <button @click="change">改变state</button>
    <h1>pinia: name: {{ name }} --- age: {{ age }}</h1>
  </div>
</template>

<script setup lang="ts">
import {useTestStore} from "./store";
import {storeToRefs} from "pinia";

const Test = useTestStore()
const {name, age} = storeToRefs(Test)
const change = () => {
  name.value = '是张三啦'
  age.value++
}
</script>
```

### action / getter

action：可以处理同步，可以处理异步

`indext.ts`

```ts
import {defineStore} from "pinia";
import {Names} from "./storeName";

type User = {
    name: string,
    age: number
}

/**
 * 返回值 Promise 类型是 User
 */
const Login = (): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                name: '是张三啦',
                age: 100
            })
        }, 1500)
    })
}

export const useTestStore = defineStore(Names.TEST, {
    state: () => {
        return {
            user: <User>{},
            name: ''
        }
    },
    actions: {
        async setUser() {
            const result = await Login()
            this.user = result
        }
    }

})
```

`App.vue`

```vue
<template>
  <div>
    <h1>
      pinia: -- {{ user }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import {useTestStore} from "./store";
import {storeToRefs} from "pinia";

const Test = useTestStore()
const {user} = storeToRefs(Test)
Test.setUser()

</script>
```

getters：计算state

`index.ts`

```ts
export const useTestStore = defineStore(Names.TEST, {
    state: () => {
        return {
            user: <User>{},
            name: 'zhangsan'
        }
    },
    /**
     * 可以相互调用
     */
    getters: {
        newName(): string {
            return `$-${this.name} -- ${this.getUserAge}`
        },
        getUserAge(): number {
            return this.user.age

        }
    },
})
```

`App.vue`

```vue
<template>
  <div>
    <h1>pinia: -getters- {{ newName }}</h1>
  </div>
</template>

<script setup lang="ts">
import {useTestStore} from "./store";
import {storeToRefs} from "pinia";

const Test = useTestStore()
const {newName} = storeToRefs(Test)
Test.setUser()

</script>
```

### pinia持久化

利用`pinia`状态`每次更新时`都会调用`$subscribe()`方法

- 第一步：定义`存/取`数据的两个`工具类函数`
- 第二步：创建持久化对象
- 第三步：注册持久化对象

**第一步**

```ts
/**
 * 存储在sessionStorage当中
 * @param key
 * @param value
 */
const setStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}
/**
 * 取出 sessionStorage 的值
 * @param key
 */
const getStorage = (key: string) => {
    return sessionStorage.getItem(key)? JSON.parse(sessionStorage.getItem(key) as string) : {}
}
```

**第二步**

注意： 高亮问题是``引起的，代码本身没有问题

```ts
/**
 * @param key
 */
const piniaPlugin = (key?: string) => {
    const piniaKey: string = 'PiniaKey'
    return (context: PiniaPluginContext) => {
        const {store} = context
        const data = getStorage(`${key ?? piniaKey}-${store.$id}`)
        // 每次 pinia 中的状态发生改变时，都会执行 $subscribe
        store.$subscribe(() => {
            // store.$state 需要转换成普通对象，可以console.log看看
            setStorage(`${key ?? piniaKey}-${store.$id}`, toRaw(store.$state))
        })
        // 即将 data 解构，后重新赋值给 pinia 的 state，实现持久化
        return {
            ...data
        }
    }
}
```

**第三步**

```ts
import {createApp, toRaw} from 'vue'
import App from './App.vue'
import {createPinia, PiniaPluginContext} from "pinia";

const store = createPinia()
store.use(piniaPlugin())

const app = createApp(App)
app.use(store)
app.mount('#app')
```

## Router

### 安装

**注意：**vue3的话，需要v4以上版本

yarn命令

```bash
yarn add vue-router
```

npm命令

```bash
cnpm install vue-router --save
```

### 使用

创建`router目录`，新建`index.ts文件`

基础代码

```ts
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

/**
 * 定义一个路由数组
 * path         必传
 * component    必传
 */
const routes:Array<RouteRecordRaw> = [{
    path: '/',
    component: () => import('../components/Login.vue'),
}]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

注册

在`main.ts`注册即可

```ts
import {createApp} from 'vue'
import App from './App.vue'
import router from "./router"

const app = createApp(App)
app.use(router)
app.mount('#app')
```

在模板template中使用，`<router-view></router-view>`

以`App.vue`为例 

```vue
<template>
  <div>
    <h1>Router-view的使用</h1>
    <router-view></router-view>
  </div>
</template>
```

### 路由模式

1、hash模式：`createWebHashHistory()`地址栏带有`#`号

```js
import {createRouter,createWebHashHistory, RouteRecordRaw} from "vue-router";

/**
 * 定义一个路由数组
 * path         必传
 * component    必传
 */
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/regitser',
        component: () => import('../components/Register.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
```

2、history模式：`createWebHistory()`地址栏`不会带#号`

```js
import {createRouter,createWebHistory, RouteRecordRaw} from "vue-router";

/**
 * 定义一个路由数组
 * path         必传
 * component    必传
 */
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/regitser',
        component: () => import('../components/Register.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
```

### 编程式导航

使用`useRouter(`)即可完成编程式导航跳转

核心代码，**注意**`Router`带有`r`

```ts
import {useRouter} from "vue-router"; 
const router = useRouter();
router.push(url);
```

`App.vue`，3种用法

```vue
<template>
  <div>
    <h1>Router-view</h1>
    <button @click="change('/')">login</button>
    <button @click="change('/register')">register</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const change = (url: string): void => {
      /**
       * 用法 1: 字符串
       */
      router.push(url);

      /**
       * 用法 2: 对象
       */
      router.push({
        path: url
      });

      /**
       * 用法 3: 命名式   注意这里传的 url 是路由数组对象中的 name 不是 path 哦！
       */
      router.push({
        name: url
      });
    }
    return {
      change
    }
  }
})
</script>

```

### 历史记录

`replace`作用：不会保留浏览器`url`的历史记录

用法：可以在`template`中使用，也可以在`js`中使用



`template`

```html
<router-link replace to="/login" />
```

`js`

```js
import {useRouter} from "vue-router";
const router = useRouter();
router.replace(url);
```

前进后退`url`

```js
import {useRouter} from "vue-router";
const router = useRouter();
/**
 * 前进 1 个 url 单位
 */
router.go(1)
/**
 * 后退 1 个 url 单位
 * 以下两个都可行，选其一即可
 */
router.go(-1)
router.back()
```

### 路由传参

- params：如果path没有配置的话，直接传参，刷新后参数会丢失。如果有配置则不会丢失
- query：刷新参数不会丢失，但是会将参数暴露在地址栏

**params，`无`配置直接传参**，刷新数据会丢失

```js
import {useRouter} from "vue-router";
const router = useRouter();
router.push({
    path: url,
    params: {
        name: "name",
    }
});
```

**params，`有`配置直接传参**，刷新数据不会丢失，注意看`path: '/user/:id'`

配置

```js
const routes: Array<RouteRecordRaw> = [
    {
        name: 'User',
        path: '/user/:id',
        component: () => import('../components/User.vue')
    }
]
```

使用

```js
import {useRouter} from "vue-router";
const router = useRouter();
router.push({
    // 假设 id 为 200202
    path: `/user/${id}`,
});
```

User.vue取值

核心代码，**注意**`Route`不带有`r`

```js
import {useRoute} from "vue-router";
import {onMounted} from "vue";

const route = useRoute();
onMounted(() => {
  console.log(route.params)  // 输出 {id: 2}  如果是 query 则 route.query 获取参数
})
```

