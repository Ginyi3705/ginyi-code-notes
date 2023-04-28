## 数组
## 1、数组并集

```js
/**
 * 数组并集,只支持一维数组
 * @param {Array} arrOne 
 * @param {Array} arrTwo
 */
export const arrAndSet = (arrOne, arrTwo) => {
    return arrOne.concat(arrTwo.filter(v => !arrOne.includes(v)))
}
```

## 2、数组交集

```js
/**
 * 数组交集,只支持一维数组
 * @param {Array} arrOne
 * @param {Array} arrTwo
 */
export const arrIntersection = (arrOne, arrTwo) => {
    return arrOne.filter(v => arrTwo.includes(v))
}
```

## 3、数组差集

```js
/**
 * 数组差集,只支持一维数组
 * @param {Array} arrOne
 * @param {Array} arrTwo
 * eg: [1, 2, 3] [2, 4, 5] 差集为[1,3,4,5]
 */
export const arrDifference = (arrOne, arrTwo) => {
    return arrOne.concat(arrTwo).filter(v => !arrOne.includes(v) || !arrTwo.includes(v))
}
```

## 4、数组合并到对象数组

```js
/**
 * 两个数组合并成一个对象数组,考虑到复杂度,所以目前支持两个一维数组
 * @param {Array} arrOne
 * @param {Array} arrTwo
 * @param {oneKey} oneKey 选填,如果两个都未传,直接以 arrOne 的值作为 key,arrTwo 作为 value
 * @param {twoKey} twoKey
 */
export const arrTwoToArrObj = (arrOne, arrTwo, oneKey, twoKey) => {
    if(!oneKey&&!twoKey){
        return arrOne.map((oneKey, i) => ({ [oneKey]:arrTwo[i] }))
    }else{
        return arrOne.map((oneKey, i) => ({ oneKey, twoKey: arrTwo[i] }))
    }
}
```

## 5、数组对象求和

```js
/**
 * 数组对象求和
 * @param {Object} arrObj 数组对象
 * @param {String} key 数组对应的 key 值
 */
export const arrObjSum = (obj, key) => {
    return arrObj.reduce((prev, cur) => prev + cur.key, 0)
}
```

## 6、数组合并成新数组

```js
/**
 * 数组合并,目前合并一维
 * @param {Array} arrOne 数组
 * @param {Array} arrTwo 数组
 */
export const arrConcat = (arrOne, arrTwo) => {
    return [...arrOne, ...arrTwo]
}
```

## 7、数组求和

```js
/**
 * 数组求和
 * @param {Array} arr 数组
 */
export const arrSum = arr => {
    return arr.reduce((prev, cur)=> {
        return prev + cur
    }, 0)
}
```

## 8、数组是否包含某值

```js
/**
 * 数组是否包含某值
 * @param {Array} arr 数组
 * @param {}  value 值,目前只支持 String,Number,Boolean
 */
export const arrIncludeValue = (arr,  value) => {
    return arr.includes( value)
}
```

## 9、数组最大值

```js
/**
 * 数组最大值
 * @param {Array} arr  数组
 */
export const arrMax = arr => {
    return Math.max(...arr)
}
```

## 10、数组去重

```js
/**
 * 数组去重
 * @param {Array} arr  数组
 */
export const arrRemoveRepeat = arr => {
    return Array.from(new Set(arr))
}
```

## 11、数组排序

```js
/**
 * 数组排序
 * @param {Array} arr  数组
 * @param {Boolean} ascendFlag   升序,默认为 true
 */
export const arrSort = (arr, ascendFlag=true) => {
    return arr.sort((a, b) => {
        return ascendFlag ? a - b : b - a
    })
}
```

## 12、判断是否是数组

```js
/**
 * 判断是否是数组
 * @param {Array}} arr 数组
 */
export const isArray = arr => {
    if (Array.isArray(arr)) {
        return true
    }
}
```



## 浏览器

## 1、检查是否为浏览器环境

```js
/**
 * 检查是否为浏览器环境
 * @returns {boolean}
 */
const checkIsBrowserEnv = () => {
    return ![typeof window, typeof document].includes('undefined');
}
```

## 2、判断是浏览器内核

```js
/**
 * 判断是浏览器内核
 */
export const checkBrowserKernel = () => {
    const u = navigator.userAgent;
    const obj = {
        trident: u.indexOf("Trident") > -1, 							  // IE内核
        presto: u.indexOf("Presto") > -1, 								  // opera内核
        webKit: u.indexOf("AppleWebKit") > -1, 							  // 苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, 		// 火狐内核
    }
    return Object.keys(obj)[Object.values(obj).indexOf(true)]
};
```

## 3、判断是终端类型

```js
/**
 * 判断是终端类型,值有ios,android,iPad
 */
export const checkTerminalType = () => {
    const u = navigator.userAgent;
    const obj = {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
        iPad: u.indexOf("iPad") > -1, //是否iPad
    }
    return Object.keys(obj)[Object.values(obj).indexOf(true)]
};
```

## 4、判断是否是微信、qq 或 uc

```js
/**
 * 判断是否是微信,qq 或 uc
 */
export const checkIsWeixinQqUc = () => {
    const u = navigator.userAgent;
    const obj = {
        weixin: u.indexOf("MicroMessenger") > -1, //是否微信
        qq: u.match(/QQ/i) == "qq"&&!u.indexOf('MQQBrowser') > -1, //是否QQ
        uc: u.indexOf('UCBrowser') > -1
    }
    return Object.keys(obj)[Object.values(obj).indexOf(true)]
};
```

## 5、检查是否是 IphoneX

```js
/**
 * 检查是否是 IphoneX
 */
export const checkIsIphoneX = () => {
    const u = navigator.userAgent;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS && screen.height >= 812) {
        return true;
    }
};
```

## 6、检测移动/PC设备

```js
/**
 * 检测移动/PC设备
 * @returns {string}
 */
const checkDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop';
}
```

## 7、判断是Windows还是Mac系统

```js
/**
 * 判断是Windows还是Mac系统
 * @returns {string}
 */
export const checkOsType = () => {
    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
    if (isWindows) {
        return "windows";
    }
    if(isMac){
        return "mac";
    }
}
```

## 8、判断是否是微信/QQ内置浏览器

```js
/**
 * 判断是否是微信/QQ内置浏览器
 * @returns {string|boolean}
 */
export const checkIsWeixinOrQQBroswer = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "weixin";
    } else if (ua.match(/QQ/i) == "qq") {
        return "QQ";
    }
    return false;
}
```

## 9、控制页面缩放

```js
/**
 * 控制页面缩放
 * @param val 倍数
 */
setScale(val) {
    val = Number(val)
    if (val < 0.25 || val >= 5) {
        console.log('缩放比为非法参数')
    }else {
        document.body.style.cssText += '; -moz-transform: scale(' + val + ');-moz-transform-origin: 0 0; ';
        document.body.style.zoom = val;
    }
},
```





## 检查 / 校验

## 1、判断是否是数字

```js
/**
 *  判断是否是数字
 * @param {Number} data
 */
export const checkIsNum = data => {
    const reg = /^\d{1,}$/g
    if (reg.test(data)) return true
}
```

## 2、判断是否是字母

```js
/**
 *  判断是否是字母
 * @param {Number} data
 */
export const checkIsLetter = data => {
    const reg = /^[a-zA-Z]+$/g
    if (reg.test(data)) return true
}
```

## 3、判断是否是字母或数字

```js
/**
 * 判断是否是字母或数字
 * @param {Number || String} data  字符或数字
 */
export const checkIsNumOrLetter = data => {
    const reg = /^[0-9a-zA-Z]*$/g
    if (reg.test(data)) return true
}
```

## 4、判断是否全部是小写字母

```js
/**
 *  判断是否全部是小写字母
 * @param {Number} data
 */
export const checkIsLowercaseLetter = data => {
    const reg = /^[a-z]+$/g
    if (reg.test(data)) return true
}
```

## 5、判断是否是大写字母

```js
/**
 *  判断是否是大写字母
 * @param {Number} data
 */
export const checkIsCapitalLetter = data => {
    const reg = /^[A-Z]+$/g
    if (reg.test(data)) return true
}
```

## 6、判断是否是中文

```js
/**
 * 判断是否是中文
 * @param {String} data  中文
 */
export const checkIsChinese = data => {
    const reg = /^[\u4E00-\u9FA5]+$/g
    if (reg.test(data)) return true
}
```

## 7、判断是邮政编码(中国)

```js
/**
 * 判断是邮政编码(中国)
 * @param { string } value
 */
export const checkIsPostcode = value => {
    const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);
    if (reg.test(value)) return true
}
```

## 8、判断是否是邮箱地址

```js
/**
 * 判断是否是邮箱地址
 * @param {String} data
 */
export const checkIsEmail = data => {
    const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
    if (reg.test(data)) return true
}
```

## 9、判断是否是手机号（宽松版）

```js
/**
 * 宽松
 * 判断是否是手机号，只要是13,14,15,16,17,18,19开头即可
 * @param {String} data
 */
export const checkIsTelphone = data => {
    const reg = /^((\+|00)86)?1[3-9]\d{9}$/g
    if (reg.test(data)) return true
}
```

## 10、判断是否是手机号（严谨版）

```js
/**
 * 严谨
 * 判断是否是手机号，根据工信部 2019 年最新公布的手机号段
 * @param { string } value
 */
export const checkIsTelphoneStrict = data => {
    const reg =  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g
    if (reg.test(data)) return true
}
```

## 11、验证身份证号

```js
/**
 * 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param { string } value
 */
export const checkIsIDCardNew = data => {
    const reg = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g
    if (reg.test(data)) return true
}
```

## 12、验证统一社会信用代码

```js
/**
 * 验证统一社会信用代码
 *  @param { string } value
 */
export const checkIsCreditCode = data => {
    const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g
    if (reg.test(data)) return true
}
```

## 13、验证车牌号(新能源)

```js
/**
 * 验证车牌号(新能源)
 * @param { string } value
 */
export const checkIsLicensePlateNumberNER = data => {
    const reg = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g
    if (reg.test(data)) return true
}
```

## 14、验证车牌号(非新能源)

```js
/**
 * 验证车牌号(非新能源)
 * @param { string } value
 */
export const checkIsLicensePlateNumberNNER = data => {
    const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g
    if (reg.test(data)) return true
}
```

## 15、判断手机是Andoird还是IOS

```js
/**
 *  判断手机是Andoird还是IOS
 *  0: ios
 *  1: android
 *  2: 其它
 */
export function checkOSType() {
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return 0;
    }
    if (isAndroid) {
        return 1;
    }
    return 2;
}
```

## 16、判断是否是移动设备

```js
/**
 * 判断是否是移动端
 */
export const isMobile = () => {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}
```





## 文件

## 1、格式化文件单位

```js
/**
 * 格式化文件单位
 * @param {String || Number} size  文件大小(kb)
 */
export const fileFormatSize = size => {
    let i
    let unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    for (i = 0; i < unit.length && size >= 1024; i++) {
        size /= 1024
    }
    return (Math.round(size * 100) / 100 || 0) + unit[i]
}
```

## 数字

## 1、生成指定范围随机数

```js
/**
 * 生成指定范围随机数
 * @param { number } min
 * @param { number } max
 */
export const RandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## 2、生成范围内随机整数

```js
/**
 * 生成范围内随机整数
 * @param min
 * @param max
 * @returns {number} 
 */
export const randomNumInteger = (min, max) => {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * min + 1, 10);
        case 2:
            return parseInt(Math.random() * (max - min + 1) + min, 10);
        default:
            return 0
    }
}
```

## 3、数字超过规定大小加上加号 “+”

```js
/**
 * 数字超过规定大小加上加号“+”，如数字超过99显示99+
 * @param { number } val 输入的数字
 * @param { number } maxNum 数字规定界限
 */
export const outOfNum = (val, maxNum) => {
    val = val ? val - 0 : 0;
    if (val > maxNum) {
        return `${maxNum}+`
    } else {
        return val;
    }
};
```

## 4、货币分隔符

```js
/**
 * 货币分隔符
 * @param {string} m 需要转换的字符串
 * @param {number} p 分隔符位数，默认 3
 */
export const moneySeparator = (m, p = 3) => {
    return m.slice(0, m.length % p) + ((m.length % p) ? ',' : '') + m.slice(m.length % p).replace(new RegExp(`\\d\{${p}\}`, 'g'), (n, i) => (i ? ',' : '') + n);
}
```

## 5、字转化为大写金额

```js
/**
 * 数字转化为大写金额
 * @param n 传入的数字
 * @returns {string}
 */
export const digitUppercase = (n) => {
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
```

## 6、数字转化为中文数字

```js
/**
 * 数字转化为中文数字
 * @param value
 * @returns {string}
 */
export const intToChinese = (value) => {
    const str = String(value);
    const len = str.length-1;
    const idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
    const num = ['零','一','二','三','四','五','六','七','八','九'];
    return str.replace(/([1-9]|0+)/g, ( $, $1, idx, full) => {
        let pos = 0;
        if($1[0] !== '0'){
            pos = len-idx;
            if(idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
                return idxs[len-idx];
            }
            return num[$1[0]] + idxs[len-idx];
        } else {
            let left = len - idx;
            let right = len - idx + $1.length;
            if(Math.floor(right / 4) - Math.floor(left / 4) > 0){
                pos = left - left % 4;
            }
            if( pos ){
                return idxs[pos] + num[$1[0]];
            } else if( idx + $1.length >= len ){
                return '';
            }else {
                return num[$1[0]]
            }
        }
    });
}
```

## 对象

## 1、判断是否为空对象

```js
/**
 * @desc 判断是否为空对象
 * @param obj 待判断的对象
 * @return Boolean true/false
 */
export const isEmptyObject = (obj) => {
    if (obj == null || obj == undefined || obj == '' || JSON.stringify(obj) == "{}") {
        return true;
    }
    return false;
}
```

## 2、过滤对象中的值为空的字段

```js
/**
 * @desc 过滤对象中的值为空的字段
 * @param {*待过滤的数据对象} params
 * @return {过滤后的对象}
 */
export const objectFilters = (params = {}) => {
    for (let key in params) {
        if (params[key] === '') {
            delete params[key];
        }
    }
    return params;
}
```

## 3、根据 parent_id 生成树结构

```js
/**
 * 根据 parent_id 生成树结构（阿里一面真题）
 * @param items
 * @param id
 * @param link
 * @returns {*}
 */
export const toTree = (items, id = null, link = 'parent_id') => {
    return items.filter(item => item[link] === id).map(item => ({ ...item, children: toTree(items, item.id) }));
}
```

## 4、判断两个对象是否相等

```js
/**
 * 判断两个对象是否相等,目前只支持对象值为简单数据类型的判断
 * @param {Object} oneObj  对象
 * @param {Object} twoObj 对象
 */
export const objIsEqual = (oneObj, twoObj) => {
    return JSON.stringify(oneObj) === JSON.stringify(twoObj)
}
```

## 5、将树状结构平铺

```js
/**
 * 将树状结构的路由转换为平铺结构的路由
 * @param list
 * @returns {*[]}
 */
treeToflat(list){
    let res = [];
    let newArr = [];
    newArr = newArr.concat(list);
    while(newArr.length){
        let first = newArr.shift();                   // 每一次都取newArr的第一项出来
        if (first.children) {
            newArr = newArr.concat(first.children);     // 如果第一项有children属性，那么就把这个children放到newArr的最后一项取
            delete first.children;                      // 然后再删除children属性
        }
        res.push(first)
    }
    return res
},
```

## 6、根据子节点查找父节点

```js
/**
 * 
 * @param id                子节点id
 * @param list              要查找的list
 * @param result            结果集
 * @returns {boolean|*[]}
 */
findParentIdPath(id, list = [], result = []){
    for (let i = 0; i < list.length; i += 1) {
        const item = list[i]
        if (item.menuId === id) {
            result.push(item.menuId)
            if (result.length === 1) return result    // 因为可能在第一层就找到了结果，直接返回当前结果
            return true
        }
        if (item.children) {
            result.push(item.menuId)
            const find = this.findParentIdPath(id, item.children, result)
            if (find) {
                return result
            }
            result.pop()  // 到这里，意味着本次并不是需要的节点，则在result中移除
        }
    }
    return false
},
```

## 7、深拷贝

```js
/**
 * 深度递归克隆
 * @param data 要克隆的对象
 * @returns {*[]|{}*}
 */
deepCopy(data) {
    if (typeof data === 'object' && data) {
        let newData = typeof data.length === 'number' ? [] : {}
        for(let i in data) {
            newData[i] = this.deepCopy(data[i])
        }
        return newData
    }
    return data
}
```





## 全屏

## 1、开启全屏

```js
/**
 * 开启全屏
 * @param {*} element
 */
export const openFullScreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen()
    }
}
```

## 2、关闭全屏

```js
/**
 * 关闭全屏
 */
export const exitFullScreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}
```

## 屏幕滚动

## 1、滚动到指定元素区域

```js
/**
 * 滚动到指定元素区域
 * @param element 传入元素的 id 或 class (字符串)
 */
const scrollToElement = (element) =>{
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
}
```

## 2、平滑滚动至顶部

```js
/**
 * 平滑滚动至顶部
 */
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};
```

## 3、滚动到页面底部

```js
/**
 * 滚动到页面底部
 */
export const scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.clientHeight);
}
```

## AES加密

## 1、加密

```js
const CryptoJS = require('crypto-js')                           // 引用AES源码js
const key = CryptoJS.enc.Utf8.parse('1234125432ABCDEF')         // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234125432')          // 十六位十六进制数作为密钥偏移量

/**
 * 加密方法
 * @param word 需要加密的字符串
 * @returns {string}
 */
export const encrypt  = (word) => {
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.ciphertext.toString().toUpperCase()
}
```

## 2、解密

```js
const CryptoJS = require('crypto-js')                           // 引用AES源码js
const key = CryptoJS.enc.Utf8.parse('1234125432ABCDEF')         // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234125432')          // 十六位十六进制数作为密钥偏移量


/**
 * 解密方法
 * @param word 需要解密的字符串
 * @returns {string}
 */
export const decrypt = (word) =>  {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}
```

## 3、对象排序

```js
/**
 * 对象排序，可用于数字签名的生成
 * @param params    参数
 * @param secret    密钥
 * @returns {*}
 */
export const objectSort = (params, secret) => {
    params = {
        ...params,
        secret
    }
    let newkey = Object.keys(params).sort()
    let newObj = {}                                     // 创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {           // 遍历 newkey 数组
        newObj[newkey[i]] = params[newkey[i]]           // 向新创建的对象中按照排好的顺序依次增加键值对
    }
    return JSON.stringify(newObj)
}
```

## 本地缓存

## 1、localStorage 存贮

```js
/**
 * localStorage 存贮某一段时间失效, 单位天, 默认为 1 天
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param {number} expire 过期时间,毫秒数
 */
export const localStorageSet = (key, value, expire = 1) => {
    const data = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 60 * 60 * 24 * 7 * 1000 : null,
    });
    localStorage.setItem(key, data)
}
```

## 2、localStorage 获取

```js
/**
 * localStorage 获取
 * @param {String} key  属性
 */
export const localStorageGet = (key) => {
    const data = JSON.parse(localStorage.getItem(key))
    if (data) {
        const { value, expire } = data;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
            return value;
        }
        localStorage.removeItem(key);
        return null
    }
}
```

## 3、localStorage 移除

```js
/**
 * localStorage 移除
 * @param {String} key  属性
 */
export const localStorageRemove = (key) => {
    localStorage.removeItem(key)
}
```

## 4、sessionStorage 存贮

```js
/**
 * sessionStorage 存贮某一段时间失效, 单位天, 默认为 1 天
 * @param {String} key  属性
 * @param {*} value 值
 */
export const sessionStorageSet = (key, value, expire = 1) => {
    const data = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 60 * 60 * 24 * 7 * 1000 : null,
    });
    sessionStorage.setItem(key, data)
}
```

## 5、sessionStorage 获取

```js
/**
 * sessionStorage 获取
 * @param {String} key  属性
 */
export const sessionStorageGet = (key) => {
    const data = JSON.parse(sessionStorage.getItem(key))
    if (data) {
        const { value, expire } = data;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
            return value;
        }
        sessionStorage.removeItem(key);
        return null
    }
}

```

## 6、sessionStorage 移除

```js
/**
 * sessionStorage 删除
 * @param {String} key  属性
 */
export const sessionStorageRemove = (key) => {
    sessionStorage.removeItem(key)
}
```

## 7、cookie 存贮 时间限制

```js
/**
 * cookie 存贮
 * @param {String} key  属性
 * @param {*} value  值
 * @param String expire  过期时间,单位天
 */
export const cookieSet = (key, value, expire) => {
    const d = new Date()
    d.setDate(d.getDate() + expire)
    document.cookie = `${key}=${value};expires=${d.toGMTString()}`
}
```

## 8、cookie 获取

```js
/**
 * cookie 获取
 * @param {String} key  属性
 */
export const cookieGet = (key) => {
    const cookieStr = unescape(document.cookie)
    const arr = cookieStr.split('; ')
    let cookieValue = ''
    for (var i = 0; i < arr.length; i++) {
        const temp = arr[i].split('=')
        if (temp[0] === key) {
            cookieValue = temp[1]
            break
        }
    }
    return cookieValue
}
```

## 9、cookie 移除

```js
/**
 * cookie 删除
 * @param {String} key  属性
 */
export const cookieRemove = (key) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
}
```

## 本地缓存（TS）

## localStorage

```ts
/**
 * localStorage     存值
 * @param key       键名
 * @param value     值
 * @param expire    存储的时间，单位天，默认为 1 天
 */
export const useLocalStorageSet = (key: string, value: any, expire: number | null = 1) => {
    const data = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 60 * 60 * 24 * 7 * 1000 : null,
    });
    localStorage.setItem(key, data)
}


/**
 * localStorage     取值
 * @param key       键名
 */
export const useLocalStorageGet = (key: string) => {
    const data = JSON.parse(localStorage.getItem(key) as string)
    if (data) {
        const {value, expire} = data;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
            return value;
        }
        localStorage.removeItem(key);
        return null
    }
}


/**
 * localStorage     移除
 * @param key       属性
 */
export const useLocalStorageRemove = (key: string) => {
    localStorage.removeItem(key)
}
```

## sessionStorage

````ts
/**
 * sessionStorage   存值
 * @param key       键名
 * @param value     值
 * @param expire    存储的时间，单位天，默认为 1 天
 */
export const useSessionStorageSet = (key: string, value: any, expire: number | null = 1) => {
    const data = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 60 * 60 * 24 * 7 * 1000 : null,
    });
    sessionStorage.setItem(key, data)
}


/**
 * sessionStorage   取值
 * @param key       键名
 */
export const useSessionStorageGet = (key: string) => {
    const data = JSON.parse(sessionStorage.getItem(key) as string)
    if (data) {
        const {value, expire} = data;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
            return value;
        }
        sessionStorage.removeItem(key);
        return null
    }
}


/**
 * sessionStorage   移除
 * @param key       键名
 */
export const useSessionStorageRemove = (key: string) => {
    sessionStorage.removeItem(key)
}
````

## cookie

```ts
/**
 * CookieStorage    存值
 * @param key
 * @param value
 * @param expire    过期时间，单位天，默认为 1 天
 */
export const useCookieStorageSet = (key: string, value: any, expire: number = 1) => {
    const date = new Date();
    date.setDate(date.getDate() + expire);
    document.cookie = key + "=" + JSON.stringify(value) + ";expires=" + date;
}

/**
 * CookieStorage    取值
 * @param key       键名
 */
export const useCookieStorageGet = (key: string) => {
    let data = document.cookie.split("; ");
    for (let i = 0; i < data.length; i++) {
        let temp = data[i].split("=");
        if (temp[0] == key) {
            return JSON.parse(temp[1]);
        }
    }
    return null
}
```

## 字符串

## 1、去除空格

```js
/**
 * 去除空格
 * @param { string } str 待处理字符串
 * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 */
export const strTrim = (str, type = 1) => {
    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
    switch (type) {
        case 1:
            return str.replace(/\s/g, "");
        case 2:
            return str.replace(/(^\s)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s)/g, "");
        case 4:
            return str.replace(/(\s$)/g, "");
        default:
            return str;
    }
}
```

## 2、判断字符是否包含某值

```js
/**
 * 判断字符是否包含某值
 * @param {String} str 字符
 * @param {String} value 字符
 */
export const strInclude = (str, value) => {
    return str.includes(value)
}
```

## 3、判断字符是否以某个字符开头

```js
/**
 * 判断字符是否以某个字符开头
 * @param {String} str 字符
 * @param {String} value 字符
 */
export const strBeginWith = (str, value) => {
    return str.indexOf(value) === 0
}
```

## 4、全局替换某个字符为另一个字符

```js
/**
 * 全局替换某个字符为另一个字符
 * @param {String} str 字符
 * @param {String} valueOne 包含的字符
 * @param {String} valueTwo 要替换的字符,选填
 */
export const strReplace = (str, valueOne, valueTwo) => {
    return str.replace(new RegExp(valueOne,'g'), valueTwo)
}
```

## 5、大小写转换

```js
/**
 * 大小写转换
 * @param { string } str 待转换的字符串
 * @param { number } type 1-全大写 2-全小写 3-首字母大写 其他-不转换
 */

export const turnCase = (str, type) => {
    switch (type) {
        case 1:
            return str.toUpperCase();
        case 2:
            return str.toLowerCase();
        case 3:
            return str[0].toUpperCase() + str.substr(1).toLowerCase();
        default:
            return str;
    }
}
```

## 6、将字母全部转化成以大写开头

```js
/**
 * 将字母全部转化成以大写开头
 * @param {String} str 字符
 */
export const strToCapitalLetter = (str) => {
    const strOne = str.toLowerCase()
    return strOne.charAt(0).toUpperCase() + strOne.slice(1)
}
```

## 节流 / 防抖

## 1、节流

```js
/**
 * 节流, 定时器版
 * @param {*} func 执行函数
 * @param {*} delay 节流时间,毫秒
 */
export const throttle = function (func, delay) {
    let timer = null
    return function() {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, arguments)
                timer = null
            }, delay)
        }else {
            console.log('不满足条件')
        }
    }
}


/**
 * 节流, 时间戳版本
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */
export const throttle = function (func, delay) {
    let last = 0;
    return function () {
        let now = Date.now();
        if (now >= delay + last) {
            func.apply(this, arguments);
            last = now;
        } else {
            console.log("距离上次调用的时间差不满足要求哦");
        }
    }
}
```

## 2、防抖

```js
/**
 * 防抖
 * @param {*} fn 执行函数
 * @param {*} wait 防抖时间,毫秒
 */
export const debounce = function(fn, wait = 0) {
    let timeout = null
    return function() {
        if (timeout !== null) clearTimeout(timeout) // 如果多次触发将上次记录延迟清除掉
        timeout = setTimeout(() => {
            fn.apply(this, arguments)
            // 或者直接 fn()
            timeout = null
        }, wait)
    }
}
```

## 时间处理

## 1、获取当前日

```js
/**
 * 获取当前日
 * @param {Boolean} fillFlag 布尔值,是否补 0
 */
export const getDay = (fillFlag = true) => {
    const day = new Date().getDate()
    const dayRe = day
    if (fillFlag) day < 10 ? `0${day}` : day
    return dayRe
}
```

## 2、获取当前月份

```js
/**
 * 获取当前月份
 * @param {Boolean} fillFlag 布尔值,是否补 0,默认为 true
 */
export const getMonth = (fillFlag = true) => {
    const mon = new Date().getMonth() + 1
    const monRe = mon
    if (fillFlag) mon < 10 ? `0${mon}` : mon
    return monRe
}
```

## 3、获取当前年份

```js
/**
 * 获取当前年份
 */
export const getYear = () => {
    return new Date().getFullYear()
}
```

## 4、获取当前星期几

```js
/**
 * 获取当前星期几
 */
export const getWhatDay = () => {
    return new Date().getDay() ? new Date().getDay() : 7
}
```

## 5、获取当前月天数

```js
/**
 * 获取当前月天数
 * @param {String} year 年份
 * @param {String} month 月份
 */
export const getMonthNum = (year, month) => {
    var d = new Date(year, month, 0)
    return d.getDate()
}
```

## 6、获取当前时间

```js
/**
 * 获取当前时间 yyyy-mm-dd hh:mm:ss
 */
export const getYYMMDDHHMMSS = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minu = date.getMinutes()
    const second = date.getSeconds()
    const arr = [month, day, hours, minu, second]
    arr.forEach(item => {
        item < 10 ? '0' + item : item
    })
    return `${year}-${arr[0]}-${arr[1]} ${arr[2]}:${arr[3]}:${arr[4]}`
}
```

## 7、时间戳转化为年月日

```js
/**
 * 时间戳转换
 * @param times   时间戳
 * @param showTime  是否显示 时分秒
 * @returns {string}
 */
export const formateTime = (times, showTime = false) => {
    try {
        const time = new Date(times)
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        const NewDate = year + "-" + (month < 10 ? '0' + month: month) + "-" + date
        const NewTime = hour + ":" + minute + ":" + (second < 10 ? '0' + second : second);
        if(showTime) return NewDate + ' ' + NewTime
        return  NewDate
    }catch (e) {
        console.log('时间戳不合法')
    }
}
```

## 8、将年月日转化成时间戳

```js
/**
 * 将年月日转化成时间戳
 * @param {String} time yyyy/mm/dd 或 yyyy-mm-dd 或 yyyy-mm-dd hh:mm 或 yyyy-mm-dd hh:mm:ss
 */
export const YYMMDDToTimes = (time) => {
    return new Date(time.replace(/-/g, '/')).getTime()
}
```

## 9、时间比较

```js
/**
 *  比较时间 1 小于时间 2
 * @param {String} timeOne  时间 1
 * @param {String} timeTwo  时间 2
 */
export const compareTimeOneLessTwo = (timeOne, timeTwo) => {
    // 判断 timeOne 和 timeTwo 是否
    return new Date(timeOne.replace(/-/g, '/')).getTime() < new Date(timeTwo.replace(/-/g, '/')).getTime()
}
```

## 地址栏

## 1、返回当前浏览器的url

```js
/**
 * @returns {string} 返回当前浏览器的url
 */
const currentURL = () => {
    return window.location.href;
}
```

## 2、获取 url 后面通过?传参的参数

```js
/**
 *  获取 url 后面通过?传参的参数
 * @param {String} name
 */
export function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const url = window.location.href
    const search = url.substring(url.lastIndexOf('?') + 1)
    const r = search.match(reg)
    if (r != null) return unescape(r[2])
    return null
}
```

## 3、判断是否是正确的网址

```js
/**
 * 判断是否是正确的网址
 * @param {String} url 网址
 */
export const checkUrl = url => {
    const a = document.createElement('a')
    a.href = url
    return [
        /^(http|https):$/.test(a.protocol),
        a.host,
        a.pathname !== url,
        a.pathname !== `/${url}`
    ].find(x => !x) === undefined
}
```