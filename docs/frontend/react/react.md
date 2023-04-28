# React

### 一、学前先知

#### 1 React 特点

> - **1.声明式设计** −React采用声明范式，可以轻松描述应用。
> - **2.高效** −React通过对DOM的模拟，最大限度地减少与DOM的交互。
> - **3.灵活** −React可以与已知的库或框架很好地配合。
> - **4.JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
> - **5.组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
> - **6.单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。



### 二、reacr的基本使用

#### 2.1 元素渲染

1. 创建元素节点
2. 将元素渲染到`id="root"`的`div`上

```html
<div id="root"></div>
```

```jsx
const element =<h1>Hello, world!</h1>;
ReactDOM.render(
    element,
    document.getElementById('root')
);
```

### 三、JSX

我们先看下以下代码：

```jsx
const element = <h1>Hello, world!</h1>;
```

这种看起来可能有些奇怪的标签语法既不是字符串也不是 HTML，它被称为 JSX，一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面，把它们都传递给 `ReactDOM.render()` 的方法来将其渲染到页面上，如`上述基本使用的【元素渲染】`所示



#### 3.1 注意事项

1. React元素的属性名`使用驼峰`命名法

2. 特殊命名：`class` -> `classNmae`

3. 没有子节点可以用` /> `结束

4. 推荐：`使用小括号包囊JSX`，从而避免Js中的自动插入分号陷阱

   ```jsx
   const = (
   	<div>Hello JSX</div>
   )
   ```

#### 3.2 嵌入JS表达式

使用花括号`{}`，例如：

```jsx
const name = '张三'
const mydiv = (
	<div>Hello, { name }</div>
)
```

#### 3.3 条件渲染

可以使用`if-else`、`三元运算`

```jsx
// if-else
const isLoading = true
const LoadData = () => {
    if(isLoading) return <div>数据加载中...</div>
    return <div>数据加载完毕...</div>
}
const title = (
	<div>条件渲染的结果：{LoadData()}</div>
)
```

```jsx
// 三元运算
const isLoading = true
const LoadData = () => {
    return isLoading? (<div>数据加载中...</div>) : (<div>数据加载完毕...</div>)
}
const title = (
	<div>条件渲染的结果：{LoadData()}</div>
)
```

#### 3.4 列表渲染

在`jsx`中，如果要`渲染一组数组`，应该`使用`数组中的`map()方法`，

渲染列表时应该`添加key属性`，`key要保证唯一`，

例如：

```jsx
import reactDom from "react-dom";

const arr = [
  {id: 1, name: '123'},
  {id: 2, name: '456'},
  {id: 3, name: '789'},
]

const list = (
  <ul>
    {arr.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)
reactDom.render(list, document.getElementById('root'))
```

#### 3.5 添加样式

`行内样式`，第一个`{}`表示表达式，具体要写在第二个`{}`中，表示对象内多个样式值， 例如：

```jsx
import reactDom from "react-dom";

const list = (
  <h1 style={ {color: 'red', backgroundColor: '#ccc'} }>jsx样式处理</h1>
)

reactDom.render(list, document.getElementById('root'))
```

`类名样式`， className，**注意**不要写成class！！例如：

```css
.myStyle{
    text-align: center;
}
```

```jsx
const list = (
  <h1 className="myStyle">jsx样式处理</h1>
)
reactDom.render(list, document.getElementById('root'))

```

### 四、组件

#### 4.1 函数组件

##### 4.1.1 组件定义

1. 使用JS的函数或箭头函数创建组件
2. 规则：
   1. 函数名必须使用`大写字母开头`
   2. 函数组件`必须有返回值`，表示该组件的结构`(如果没有结构，可以返回null)`

##### 4.1.2 使用组件

1. 渲染组件：用`函数名`作为组件标签名
2. 组件标签可以是`单标签`，可以是`双标签`

```jsx
import reactDom from "react-dom";

function Hello(){
  return (
    <div>这是函数组件</div>
  )
}
reactDom.render(<Hello/>, document.getElementById('root'))

```

#### 4.2 类组件

##### 4.2.1 组件定义

1. 使用`ES6`的`class`创建组件
2. 类名称必须`大写字母开头`
3. 类组件应该`继承React.Component父类`
4. `render()`必须`有返回值`，表示该组件的结构

例如：(vacode，可以使用快捷键：rcc生成模板代码)

```jsx
import React from 'react';

class Hello extends React.Component {
  render() {
    return (
      <div>这是类组件</div>
    );
  }
}

reactDom.render(<Hello/>, document.getElementById('root'))
```



### 五、状态组件

1. `函数组件`又叫`无状态`组件，`类组件`又叫`有状态`组件
2. 状态（`state`）即数据
3. 函数组件没有的自己的状态，只负责数据的展示`（静）`
4. 类组件有自己的状态，负责更新UI `（动）`

#### 5.1 state的基本使用

1. 状态（state）即数据，是组件内部的`私有数据`，`只能在组件内部使用`
2. `state`的值`是对象`，表示一个组件中可以有多个数据
3. 访问：`this.state.xxx`

```jsx
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 10
  }
  render() {
    return (
      <div>
        <span>计数器： {this.state.count}</span>
      </div>
    );
  }
}

reactDom.render(<App/>, document.getElementById('root'))
```

#### 5.2 setState

1. 状态是可变的
2. 语法：`this.setState({要修改的数据})`
3. 注意：`不要直接修改state中的值`，这是错误的！

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 10
  }
  render() {
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>+1</button>
      </div>
    );
  }
}


reactDom.render(<App/>, document.getElementById('root'))
```

优化上述代码

**注意：**`要用箭头函数`！不然访问不到`this`

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 10
  }
  // 抽离出来的 +1 的方法
  addOne = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={this.addOne}>+1</button>
      </div>
    );
  }
}

reactDom.render(<App/>, document.getElementById('root'))
```



### 六、事件绑定中的`this`指向

1. `箭头函数`
2. `Function.prototype.bind()`
3. `class`的实例方法

#### 6.1 箭头函数

特点：自身不绑定`this`，使用外部环境的`this`

如：`onClick={() => { this.addOne() }}`，箭头函数中的`this`，`指向render`，而render所在的当前实例就`是App`，所以可以访问得到`addOne`

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 10
  }
  addOne() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={() => { this.addOne() }}>+1</button>
      </div>
    );
  }
}

reactDom.render(<App/>, document.getElementById('root'))

```

#### 6.2 Function.prototype.bind()

利用`ES5`中的`bind`方法，将事件处理程序中的this，与组件实例绑定在一起

如：`this.addOne = this.addOne.bind(this)`

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 10
  }
  constructor(){
    super()
    this.addOne = this.addOne.bind(this)
  }
  addOne() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={ this.addOne }>+1</button>
      </div>
    );
  }
}

reactDom.render(<App/>, document.getElementById('root'))
```

#### 6.3 class实例方法

利用`箭头函数`形式的`class`实例方法

如：`addOne = () =>{}`， 只需把原来的方法改成箭头函数即可

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 10
  }
  addOne = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={ this.addOne }>+1</button>
      </div>
    );
  }
}

reactDom.render(<App/>, document.getElementById('root'))
```

### 七、表单处理

表单中的组件，分`受控组件`和`非受控组件`

受控：可以理解为将组件交由`react`进行管理，可以实现数据的`双向绑定`

非受控：不交由react管理，`单向`

#### 7.1 受控组件

步骤如下：

1. 在state中添加一个状态，作为表单元素的value值（控制表单元素值得来源）
2. 给表单元素绑定`change事件`，将表单元素的值设置为`state`的值（控制表单元素值得变化）

可以发现：每次`多定义一个状态值`，就要`多一个处理事件`，代码量太大

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    inputValue: '',
    textareaValue: '',
    optionValue: 'bj',
    checkeboxValue: true
  }
  /* 处理输入框的value */
  handleChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  /* 处理富文本框的value */
  handleChangeTextareaValue = (e) => {
    this.setState({
      textareaValue: e.target.value
    })
  }
  /* 处理下拉框的value */
  handleChangeOptionValue = (e) => {
    this.setState({
      optionValue: e.target.value
    })
  }
  /* 处理单选框的value */
  handleChangeBoxValue = (e) => {
    this.setState({
      checkeboxValue: e.target.checked
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.inputValue} onChange={this.handleChangeInputValue}/>
        <br/>
        <textarea cols="30" rows="10" 
            value={this.state.textareaValue} onChange={this.handleChangeTextareaValue}></textarea>
        <br/>
        <select value={this.state.optionValue} onChange={this.handleChangeOptionValue}>
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="gz">广州</option>
        </select>
        <br/>
        <input type="checkbox" checked={this.state.checkeboxValue} onChange={this.handleChangeBoxValue}/>
        <br/>
        <span> 输入框:{this.state.inputValue}</span><br/>
        <span>富文本框:{this.state.textareaValue}</span><br/>
        <span>单选框:{this.state.optionValue}</span><br/>
        <span>单选框:{this.state.checkeboxValue? '选中' : '未选中'}</span>
      </div>
    )
  }
}

reactDom.render(<App/>, document.getElementById('root'))

```

如何优化？

1. 给表单元素`添加name属性`，名称`与state相同`
2. 根据表单元素类型获取对应值
3. 在`change事件`处理程序中通过`[name]`来修改对应的state

优化后的代码

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  state = {
    inputValue: '',
    textareaValue: '',
    optionValue: 'bj',
    checkeboxValue: true
  }
  /* 处理对应组件的state */
  handleChange = (e) => {
    const value = e.target.type === 'checkbox'? e.target.checked : e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div>
        <input type="text" name="inputValue" value={this.state.inputValue} onChange={this.handleChange}/>
        <br/>
        <textarea name="textareaValue" 
            cols="30" rows="10" value={this.state.textareaValue} onChange={this.handleChange}></textarea>
        <br/>
        <select name="optionValue" value={this.state.optionValue} onChange={this.handleChange}>
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="gz">广州</option>
        </select>
        <br/>
        <input name="checkeboxValue" 
            type="checkbox" checked={this.state.checkeboxValue} onChange={this.handleChange}/>
        <br/>
        <span> 输入框:{this.state.inputValue}</span><br/>
        <span>富文本框:{this.state.textareaValue}</span><br/>
        <span>单选框:{this.state.optionValue}</span><br/>
        <span>单选框:{this.state.checkeboxValue? '选中' : '未选中'}</span>
      </div>
    )
  }
}

reactDom.render(<App/>, document.getElementById('root'))

```

#### 7.2 非受控组件

`借助ref`，使用`原生DOM`方式来获取表单元素值

获取值的方式：`this.txtRef.current.value`

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.txtRef = React.createRef()
  }
  getTxt = () => {
    console.log('文本框的值: ', this.txtRef.current.value);
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef}/>
        <br/>
        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}

reactDom.render(<App/>, document.getElementById('root'))
```



### 八、组件通讯

1. 组件是`封闭`的，要接收外部数据应该`通过props`来实现

2. `props`的作用：接收传递给组件的数据

3. 传递数据：给组件标签`添加属性`

4. 接收数据：`函数组件`通过`参数props`接收数据，`类组件`通过`this.props`接收数据

   传递数据，如：

```jsx
reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

> 解析：将`name="jack"`，`age=18`传递给`App`组件

​		接收数据，如：

​		函数组件

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

function App (props){
  return (
    <div>
      <h1>name: {props.name}</h1>
      <h1>age: {props.age}</h1>
    </div>
  )
}
reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

​		类组件

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>name: {this.props.name}</h1>
      <h1>age: {this.props.age}</h1>
      </div>
    )
  }
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```



### 九、组件的props

特点：

1. 可以给组件传递`任意类型`的数据
2. `props`是`只读`的，只能读取数据，无法修改
3. **注意：**使用类组件时`如果写了构造方法`，应该将`props`传递给`super()`，否则，`无法在构造函数中获取到props`

如：

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

export default class App extends Component {
  /* 正确操作 */
  constructor(props) {
    super(props)
    console.log('----', props);             // 正确输出对象
  }

  /* 错误操作 */
  constructor() {
    super()
    console.log('----', this.props);        // undefined
  }

  render() {
    return (
      <div>
        <h1>name: {this.props.name}</h1>
      <h1>age: {this.props.age}</h1>
      </div>
    )
  }
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

### 十、组件传递数据的三种方式

#### 10.1 父传子

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

/* 父组件 */
export default class App extends Component {
  state = {
    name: 'tom'
  }
  render() {
    return (
      <div>
        <ChildApp name={this.state.name}/>
      </div>
    )
  }
}

/* 子组件 */
const ChildApp = (props) => {
    return (
      <div>
        <h1>父组件传递过来的值：{props.name}</h1>
      </div>
    )
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

#### 10.2 子传父

> 思路：利用回调函数，父组件提供回调函数，子组件调用，将要传递的数据作为回调函数的参数

1. 父组件提供回调函数，用于接收数据
2. 将该函数作为属性的值，传递给子组件
3. 子组件通过props来调用回调函数
4. 将子组件的数据作为参数传递回给回调函数

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

/* 父组件 */
export default class App extends Component {
  
  /* 提供回调函数，用于接收数据 */
  getChildMessage = (data) =>{
    console.log('子组件传递过来的值：', data);
  }

  render() {
    return (
      <div>
        <ChildApp getMessage={this.getChildMessage}/>
      </div>
    )
  }
}

/* 子组件 */
export class ChildApp extends Component {
  state = {
    message: '我是子组件的的message~~'
  }
  /* 子组件调用父组件的回调函数 */
  handleClick = () => {
    this.props.getMessage(this.state.message)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>我是子组件，点击我发送数据给父组件</button>
      </div>
    )
  }
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

#### 10.3 兄弟组件

1. 将`共享状态`提升到最近的`公共父组件`中去，由公共父组件管理状态
2. 要通讯的`子组件`只需要通过`props`接收或操作状态的`方法`

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

/* 父组件 */
export default class App extends Component {
  /* 提供共享状态 */
  state = {
    count: 0
  }
  /* 提供回调方法 */
  handleAddOne = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <Child1 count = {this.state.count}/>
        <Child2 addOne = {this.handleAddOne} />
      </div>
    )
  }
}

/* 子组件1 */
const Child1 = (props) => {
  return <h1>计数器：{props.count}</h1>
}

/* 子组件2 */
const Child2 = (props) => {
  return <button onClick={() => props.addOne()}>+1</button>
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

### 十一、Context的基本使用

> 模拟场景：App组件中使用Node组件，而Node组件中使用Child组件，并且Child组件又使用了Minichild组件...
>
> 那，App如何传递数据给最后一层的组件呢？

解决思路有二

1. 一层一层往下传递，太繁琐 
2. 使用context，跨组件传递，一步到位

Context使用步骤：

1. 调用`React.creatContext()`创建`Provider(提供数据)`和`Consumer(消耗数据)`两个组件
2. 设置`value属性`，表示要传递的数据
3. 通过回调接收到数据

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

/* 创建context的两个组件 */
const { Provider, Consumer } = React.createContext()

/* 父组件 */
export default class App extends Component {
  render() {
    return (
      <Provider value={"pink"}>
        <div>
          <Node />
        </div>
      </Provider>
      
    )
  }
}

/* 子组件1 */
const Node = (props) => {
  return <Child />
}

/* 子组件2 */
const Child = (props) => {
  return <Minichild />
}

/* 子组件3 */
const Minichild = (props) => {
  return (
    <Consumer>
      {data => <h1>拿到最顶层父级组件的值：{data}</h1>}
    </Consumer>
  )
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```



### 十二、props深入理解

#### 12.1 children属性

> children属性：表示组件标签的子节点，当组件标签有子节点时，props就会有该属性，类似`vue`的`slot`

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>组件标签的子节点：{this.props.children}</h1>
      </div>
    )
  }
}

reactDom.render(
<App>
  <span>我是子节点，也可以是文本、标签，也可以是函数等等</span>
</App>, document.getElementById('root'))
```

#### 12.2 props校验

使用步骤

1. 安装依赖包：`cnpm install prop-types --save`
2. 导入包：`prop-types`包
3. 使用`组件名.propTypes = {}`（**注意：**此处的`propTypes`--- `prop`---是小写）
4. 校验规则通过PropTypes对象来指定

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* 组件 */
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>name: {this.props.name}</h1>
        <h1>name: {this.props.age}</h1>
      </div>
    )
  }
}
/* 组件约束 */
App.propTypes = {
  name: PropTypes.string.isRequired,      // 必传项
  age: PropTypes.number,                  // 非必传
  // 也可以约束对象
  myObject: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number
  })
}

reactDom.render(<App name="jack" age={18} />, document.getElementById('root'))
```

> 常见的类型有：
>
> 1. 数组：array
> 2. 布尔：bool
> 3. 函数：func
> 4. 整型：number
> 5. 对象：object
> 6. 字符串：string
>
> 



#### 12.3 props默认值

结合props校验，组件健壮性会更强(此处不演示)

```jsx
/* 组件默认值约束 */
App.defaultProps = {
  pageParams: {
    page: 1,
    pageSize: 10
  }
}
```

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* 组件 */
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>page默认值: {this.props.pageParams.page}</h1>
        <h1>pageSize默认值: {this.props.pageParams.pageSize}</h1>
      </div>
    )
  }
}
/* 组件默认值约束 */
App.defaultProps = {
  pageParams: {
    page: 1,
    pageSize: 10
  }
}
/* 不传值，使用默认值 */
reactDom.render(<App />, document.getElementById('root'))
/* 传值，使用指定的值 */
reactDom.render(<App pageParams={{page: 10, pageSize: 100}}/>, document.getElementById('root'))
```

### 十三、生命周期

> 1. 创建时
> 2. 更新时
> 3. 卸载时

![ogimage](https://gitee.com/my-images/typora-imgs/raw/master/ogimage.png)



#### 13.1 创建时

> 执行顺序：`construct()构造函数` --->  `render()渲染函数` ---> `componentDidMount()元素挂载`
>
> 创建时各个钩子函数的作用是：
>
> 1. `constructor构造函数`：可以初始化state，可以为事件处理程序绑定this
> 2. `render渲染函数`：渲染UI，**注意不能调用setState()**，会造成递归栈溢出
> 3. c`omponentDidMount元素挂载(完成DOM渲染)`：可以发送网络请求，可以进行DOM操作

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* 组件 */
export default class App extends Component {
  constructor(props) {
    super(props)
    console.log('---- 构造函数最先执行，时间：', new Date().valueOf(), '----');
  }
  componentDidMount(){
    console.log('---- 挂载元素钩子函数函数第三执行，时间：', new Date().valueOf(), '----');
  }
  render() {
    console.log('---- render函数第二执行，时间：', new Date().valueOf(), '----');
    return (
      <div>
        <h1>组件的生命周期---创建时---请在控制台查看打印的信息</h1>
      </div>
    )
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

#### 13.2 更新时

> 执行顺序：`render()构造函数` --->  `render()渲染函数` ---> `componentDidUpdate()组件更新`
>
> 创建时各个钩子函数的作用是：
>
> 1. `render渲染函数`：渲染UI，其中涉及到`setState(更新状态)`、`forceUpdate(强制渲染)`、`new Props(接收新状态)`
> 2. `componentDidUpdate组件更新(完成DOM渲染)`：可以发送网络请求，可以进行DOM操作，注意如果要stState()必须要放在一个if条件中，否则会递归，栈溢出

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* 组件 */
export default class App extends Component {
  /* 注意，如果要setState()，需要一个if条件 */
  componentDidUpdate(prevProps){
    console.log('---- 组件更新钩子函数函数第二执行，时间：', new Date().valueOf(), '----');
    if(prevProps.xxx !== this.props.xxx){
      this.setState({
        /* 此处再更新状态 */
      })
    }
  }
  render() {
    console.log('---- render函数最先执行，时间：', new Date().valueOf(), '----');
    return (
      <div>
        <h1>组件的生命周期---更新时---请在控制台查看打印的信息</h1>
      </div>
    )
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

#### 13.3 卸载时

> 执行时机：`componentDidMount()`，组件从页面消失
>
> 作用：一般用于`清除定时器`等等

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* 组件 */
export default class App extends Component {
  state = {
    stop: false
  }
  /* 提供回调 */
  getCount = (data) => {
    return data > 3? this.setState({stop: true}) : null
  }

  render() {
    return (
      <div>
        {
          this.state.stop? <h1>count已累计到3, 停止增加</h1> : <Child getParentCount={this.getCount} />
        }
      </div>
    );
  }
}

export class Child extends Component {
  state = {
    count: 0
  }
  /* 元素挂载完毕后执行定时器 count + 1*/
  componentDidMount() {
    this.timerID = setInterval(
      () =>{
        this.setState({ count: this.state.count + 1 })
        this.props.getParentCount(this.state.count)
        console.log('---如果不清除定时器，即使组件消失，也无法停止---');
      },1000);
  }
  /* 元素卸载时，清除定时器 */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return <h2>当前 Count 值：{this.state.count}</h2>
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

### 十四、Render-props

实现组件的封装

> 思路：将要复用的state和操作state的方法封装到一个组件中
>
> 1. 问题1：`如何拿到`该组件中复用的`state`？
>
>    答案1：在使用组件时，添加一个值为函数的prop，通过函数参数来获取(需要组件内部实现)
>
> 2. 如何`渲染任意UI`？
>
>    答案2：使用该函数的返回值作为要渲染UI的内容(需要组件内部实现)

> 使用步骤:
>
> 1. 创建组件，以Mouse为例(`获取鼠标的位置状态`)，在组件中提供复用的逻辑代码（`1.state、2.操作state的方法`）
> 2. 将要复用的状态作为`prop.render(state)`方法的参数，暴露到外部
> 3. 使用`prop.render()`的`返回值`作为要渲染的内容



```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import img from './logo192.png';


/* 创建Mouse组件 */
export class Mouse extends Component {
  /* 鼠标位置state */
  state = {
    x: 0,
    y: 0
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  /* 监听鼠标移动事件 */
  componentDidMount(){
    window.addEventListener('mousemove', this.handleMouseMove)
  }
  render() {
    return this.props.render(this.state)
  }
}



export default class App extends Component {
  render() {
    return (
      <div>
        <Mouse render={(data) => {
          return <h1>鼠标位置：{data.x}, {data.y}</h1>
        }}/>
        <Mouse render={(data) => {
          return <img src={img} alt="图片跟着鼠标移动" style={{
            position: 'absolute',
            top: data.y - 91,
            left: data.x - 91
          }}/>
        }}/>
      </div>
      
    );
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

**注意：**`this.props.render(this.state)`中的`render`可以换成任意名称，它只是表示`render-props`这种模式而已，建议换成`children`，如下

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import img from './logo192.png';


/* 创建Mouse组件 */
export class Mouse extends Component {
  /* 鼠标位置state */
  state = {
    x: 0,
    y: 0
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  /* 监听鼠标移动事件 */
  componentDidMount(){
    window.addEventListener('mousemove', this.handleMouseMove)
  }
  render() {
    return this.props.children(this.state)
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Mouse children={(data) => {
          return <h1>鼠标位置：{data.x}, {data.y}</h1>
        }}/>
      </div>
    );
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

代码优化

> 1. 添加一个`props`校验
> 2. 卸载组件时，移除相应事件

```jsx
/* 创建Mouse组件 */
export class Mouse extends Component {
  ...（省略其他代码）

  /* 移除鼠标移动事件 */
  componentWillUnmount(){
    window.removeEventListener('mousemove', this.handleMouseMove)
  }
  render() {
    return this.props.children(this.state)
  }
}

/* props校验 */
Mouse.propTypes = {
  children: PropTypes.func.isRequired
}
```



### 十五、高阶组件

> 思路分析：`高阶组件`(High-Oder Component)`是一个函数`，返回`增强后的组件`
>
> 高阶组件内部创建一个类，在这个类组件中`提供复用的状态逻辑代码`，通过`prop`将复用的状态传递给`被包装组件`

```jsx
const 增强后组件 = withHOC(基础组件)
```

#### 15.1 基础使用

> 使用步骤：
>
> 1. 创建一个函数，名称约定以`with`开头
> 2. 指定函数参数，参数应该以`大写字母开头`（作为要渲染的组件）
> 3. 在函数内部创建一个类组件，`提供复用的状态逻辑代码`，并返回
> 4. 在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件
> 5. 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面中去

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import img from './logo192.png';

/* 高阶组件函数 */
function withMouse(WrappedComponent){
  class Mouse extends Component {
    /* 鼠标位置state */
    state = {
      x: 0,
      y: 0
    }

    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY,
      })
    }

    /* 监听鼠标移动事件 */
    componentDidMount(){
      window.addEventListener('mousemove', this.handleMouseMove)
    }
    /* 移除鼠标移动事件 */
    componentWillUnmount(){
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
    render() {
      return <WrappedComponent {...this.state}/>
    }
  }
  return Mouse
}

/* 基础组件 */
const Position = (props) => {
  return <h1>鼠标位置：{props.x}, {props.y}</h1>
}

/* 增强后的组件 */
const MousePosition = withMouse(Position)


export default class App extends Component {
  render() {
    return (
      <div>
        <MousePosition />
      </div>
      
    );
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

#### 15.2 displayName



> 使用高阶组件存在的问题：多次实例后会得到多个`组件名称相同`的组件(控制台可查)，如：

```html
<App>
    <div>
        <Mouse></Mouse>
        <Mouse></Mouse>
        ...
    </div>
</App>
```

> 原因：默认情况下，React使用组件名称作为displayName，
>
> 解决方式： 为高阶组件设置`displayName`便于调试时区分不同的组件

```jsx
/* 高阶组件函数 */
function withMouse(WrappedComponent){
  class Mouse extends Component {
    ...省略代码
  }
  /* 设置displayName（此处的WithMouse时该高阶函数的函数名，要大写开头） */
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
  return Mouse
}

/* 返回新的displayName */
function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
```

#### 15.3 传递props

> 问题：会造成props丢失
>
> 原因：高阶组件没有往下传递props

```jsx
// 假设MousePosition是增强后的组件
export default class App extends Component {
  render() {
    return (
      <div>
        // age 将会丢失
        <MousePosition age={20}/>
      </div>
    );
  }
}
```

> 解决：将props传递给基础组件就可以了，如下`return`

```jsx
/* 高阶组件函数 */
function withMouse(WrappedComponent){
  class Mouse extends Component {
    /* 鼠标位置state */
    state = {
      x: 0,
      y: 0
    }
	...（省略其他代码）
    
    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
  return Mouse
}
```



### 十六、深入理解setState()

> 1. setState()更新数据，是`异步更新`的
> 2. **注意：**使用该语法时，后面的setState()不要依赖前面的setState()
> 3. 可以调用多次setState()，但是最后render只会渲染一次

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    count: 0
  }
  handleAddOne = () => {
    this.setState({
      count: this.state.count + 1
    });
    console.log('--打印count，发现还是0--', this.state.count);
    this.setState({
      count: this.state.count + 1
    });
    console.log('--打印count，发现还是0--', this.state.count);
  }

  render() {
    console.log('--render渲染了一次--');
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleAddOne}>加1</button>
      </div>
    );
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

#### 16.1 推荐使用

```jsx
参数1：(state, props) => { return {} }
参数2：() => {}   //  是一个回调方法，表示状态更新（页面完成重新渲染）后立即执行某个操作
```

##### 参数1

> 1. `参数state`表示是`最新的state`
> 2. `参数props`表示`最新的props`
> 3. **注意：**该操作`也是异步`操作，不过当要多次使用`setState()`时，可以拿到最新的state、props

```jsx
this.setState((state, props) => {
    return { 
    	// 处理state，如
        count: state.count + 1
    };
});
```

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    count: 0
  }
  handleAddOne = () => {
    this.setState((state, props) => {
      return {
        count: state.count + 1
      };
    });
    console.log('--依旧是异步，打印count，发现还是0--', this.state.count);
    this.setState((state, props) => {
      return {
        count: state.count + 1
      };
    });
    console.log('--依旧是异步，打印count，发现还是0，但是渲染出来是2--', this.state.count);
  }

  render() {
    console.log('--render渲染了一次--');
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleAddOne}>加1</button>
      </div>
    );
  }
}

reactDom.render(<App />, document.getElementById('root'))
```

##### 参数2

```jsx
this.setState((state, props) => {
    return {
        count: state.count + 1
    };
}, () => {
    console.log('----count加1了----', this.state.count);
});
```

```jsx
import reactDom from "react-dom";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    count: 0
  }
  handleAddOne = () => {
    this.setState((state, props) => {
      return {
        count: state.count + 1
      };
    }, () => {
      console.log('----count加1了----', this.state.count);
    });
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleAddOne}>加1</button>
      </div>
    );
  }
}

reactDom.render(<App />, document.getElementById('root'))
```



### 十七、React路由

> 使用步骤：
>
> 1. 安装依赖
> 2. 导入3个核心组件 
> 3. 使用`Router`组件`包裹整个应用`（重要）
> 4. 使用`Link`作为`路由入口`（可以不写）
> 5. 使用`Route`作为`路由出口`（必写）

安装路由依赖包

```bash
cnpm install react-router-dom --save
```

导入3个核心组件

```jsx
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
```

使用Router包裹整个应用

```jsx
const App = () => {
  return (
    <Router>
      <h1>路由组件测试</h1>
    </Router>
  )
}
```

使用Link作为路由入口、Route作为路由出口

```jsx
const Content = () => {
  return (
    <h1>路由跳转后显示的内容</h1>
  )
}

const App = () => {
  return (
    <Router>
      <h1>路由跳转</h1>

      {/* 指定路由入口，类似a标签 */}
      <Link to="/first">跳转页面一</Link>
      {/* 指定路由出口 */}
      <Routes>
        <Route path="/first" element={<Content />} />
      </Routes>
    </Router>
  )
}
```





# React-router-dom

### 初始化react项目

本项目主要用来学习`react-router-dom-v6`、`vite`、`ts`

使用yarn进行项目的创建

```bash
# 安装yarn
cnpm install -g yarn
# 配置镜像源
yarn config set registry https://registry.npm.taobao.org
# 初始化项目
yarn create vite 项目名称 --template react-ts
```

安装react-router-dom

```bash
yarn add react-router-dom@6
```

安装antd组件库

```bash
yarn add antd
```

引入`antd`样式

```css
/*  引入antd样式，在App.css下 */ 
@import 'antd/dist/antd.css';
```

在`main.tsx`配置`BrowserRouter`

```tsx
import React from 'docs/frontend/react/react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
        <BrowserRouter>
           <App/>
        </BrowserRouter>, document.getElementById('root')
)
```

在`App.tsx`下配置路由

```tsx
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
    </Routes>
  )
}

export default App
```



启动项目，即可访问`/login`、`/home`

```bash
yarn run dev
```

### src下新建pages

作用：存放组件页面



新建两个组件

pages --> `Login.tsx`

```tsx
import React from 'docs/frontend/react/react';

function Login() {
   return (
           <h1>
              登录页面
           </h1>
   )
}

export default Login;
```

pages --> `Home.tsx`

```tsx
import React from 'docs/frontend/react/react';

function Home() {
   return (
           <h1>主页</h1>
   )
}

export default Home;
```

### 嵌套路由

所有的路由必须`被包裹`在`Router`下，而`Route`下可以`再嵌套路由`，作为该路由下的`子路由`，如下代码所示

其中第11行，`为Content的内容`，但是在`AppLayout`下需要在对应位置使用`<Outlet />`，可结合下部分代码看看

其中第12行，为默认显示的组件，即`localhost:3000`第13行为父级路由拼接子路由才能显示，即`localhost:3000/user`

```jsx
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';
import User from './pages/User';
import AppLayout from './AppLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />}></Route>
        <Route path='/user' element={<User />}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  )
}

export default App
```

`AppLayout.tsx`，观察一下第24行的`<Outlet />`

```jsx
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function AppLayout() {
    return (
        <Layout>
            <Header className="header">
                省略其他代码
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
					省略其他代码                    
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        省略其他代码
                    </Breadcrumb>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default AppLayout;
```





### 路由跳转方式

#### 逻辑跳转

> 使用`useNavigate()`进行路由的逻辑跳转，如下第6、8行所示：

```jsx
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const doLogin = () => {
        navigate('/')
    }
    return (
        <div>
            <h1>登录页面，点击下方按钮进行跳转</h1>
            <Button type="primary" onClick={doLogin}>登录</Button>
        </div>
    )
}

export default Login;
```

**注意：**使用`useNavigate()`只有在`函数组件`时才可用，`类组件`不可使用。



#### Link跳转

> 使用`Link`跳转，类似`a标签`，如下第3、6行所示：

```jsx
<SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
    <Menu.Item key="1">
        <Link to="/">首页</Link>
    </Menu.Item>
    <Menu.Item key="2">
        <Link to="/user">用户</Link>
    </Menu.Item>
</SubMenu>
```

#### 携带参数

路由写法

```JSX
<Route path='/user/details/:id' element={<User />}></Route>
```

获取参数

```jsx
import { useParams } from 'react-router-dom';
const params = useParams()
params.id
```

