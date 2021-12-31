复习：
1. 商品分类的三级列表由静态变为动态形式【获取服务器数据，解决跨域问题】
2. 函数防抖与节流
3. 路由跳转，声明式导航【router-link】、编程式导航【事件委派后区分节点和传递参数的问题，用自定义属性解决data-】

## search中TypeNav的商品分类菜单（过渡动画）
* 过渡动画：前提是组件且要有v-if/v-show等指令

## 三级分类优化
* 减少请求次数，【如果请求放在组件的mounted中，每次挂载组件都会发送一次请求。如果放到跟组件App.vue中，就只会发一次】
* 鼠标快速移动的时候会频繁触发时间，造成页面渲染不及时。可以引入lodash里面的节流函数进行处理

## 合并参数
三级联动的query参数和search的params参数进行合并，然后去调用查询接口【实际中应该是大分类下小分类合并参数】

## 没有接口的，用mockjs模拟
npm install mockjs
```js
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```

1. 首先在src创建mock文件夹
2. 数据写成JSON的格式
3. 把mock数据中需要的图片放到public文件夹中
4. 创建mockServe.js
5. 在main.js中引入mockServe.js