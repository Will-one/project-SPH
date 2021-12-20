## 1. vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

项目目录分析

* node_modules文件夹：项目依赖文件夹
* public文件夹：一般放置静态资源（图片）。注意，放在public文件夹的静态资源，webpack进行打包的时候，会原封不动放到dist文件夹。
* src文件夹：（源代码文件夹）
  * assets文件夹：一般也是放置静态资源（一般放置多个组件公用的静态资源）。注意，放置在assets文件夹中的静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包js文件里面。
  * components文件夹：一般放置的是非路由组件（全局组件）。
  * App.vue：唯一的根组件，Vue当中的组件（.vue）
  * main.js：程序入口文件，也是整个程序当中最先执行的文件
* babel.config.js：配置文件（babel相关）
* package.json：记录项目依赖，如何运行。
* package-lock.json：依赖的缓存行文件
* README.md：项目说明文件

## 2. 项目的其他配置
   
2.1 项目运行后自动打开浏览器

---package.json
```js
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},
```

2.2 eslint效验功能关闭

---在根目录下创建一个vue.config.js文件

比如：声明未使用变量都会报错，所以先禁用了
```js
module.exports = {
    // 关闭eslint
    lintOnSave:false
}
```

2.3 src文件夹简写方式，配置别名为 @

--- 在更目录下创建 jsconfig.json 文件

配置别名@提示【@代表的是src文件夹，文件多的时候写路径方便】

```
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [ "src/*" ]
        }
    },
    "exclude": [ "node_modules", "dist" ]
}
```

## 3. 项目路由的分析
项目为购物网站，总体上中下结构

路由组件：
Home首页路由组件、Search路由组件、Login登录路由、Register注册组件

非路由组件：
Header、Footer【在首页、搜索页有】

## 4. 完成非路由组件Header与Footer业务
这个项目不以 HTML + CSS为主，主要搞业务和逻辑

开发项目的时候：
1. 书写静态页面（HTML + CSS）
2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成响应的动态业务逻辑

注意1：创建组价的时候，组件结构 + 组件的样式 + 图片资源

注意2：项目采用less样式，浏览器不识别less样式，需要安装less、less-loader【安装5版本】。
```js
npm install less less-loader@5
```

注意3：组件要识别less样式，需要在style标签上加上lang=less

4.1 使用组件的步骤（非路由组件）
1. 创建或定义
2. 引入
3. 注册
4. 使用

## 5. 路由组件的搭建
经过上面的分析，路由组件应该有四个：Home、Search、Login、Register
* components文件夹：经常放置非路由组件（共用全局组件）
* pages/views文件夹：放路由组件

5.1 配置路由
* 项目中配置的路由一般放置在router文件夹中
  
5.2 总结
* 路由组件与非路由组件的区别
    1. 路由组件一般放置在pages/view文件夹，非路由组件一般放置在components文件夹
    2. 路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用
    3. 注册完路由，路由组件或者非路由组件都有 $route 和 $router 属性

* $route：一般获取路由信息【路径、query、params等等】
* $router：一般进行编程式导航的时候使用路由跳转【push/replace】


5.3 路由的跳转
* 路由的跳转有两种形式
    * 声明式导航【router-link】
    * 编程式导航【push/replace】

使用注意：声明式导航能做的，编程式导航都能。

编程式导航除了能进行路由跳转，还可以做一些其他的业务逻辑【验完账户密码再调，异步等等】。

## 6. Footer组件的显示与隐藏
* Footer组件在Login和Register中不显示
* 显示或者是隐藏组件v-if或者v-show
* 可以为路由添加meta路由元信息进行判断【$route.meta.footerShow】

## 7. 路由传参，参数有几种写法
* params参数：属于路径中的一部分，需要注意，在配置路由的时候，需要占位
* query参数：不属于路径中的一部分，类似于ajax中的queryString /home?k=v&
```js
// 路由传递参数【params要在path里面占位】
// 第一种：字符串形式(params和query参数一起演示)
this.$router.push("/search/" + this.keyword+"?k="+this.this.keyword)
// 第二种：模板字符串(params和query参数一起演示)
this.$router.push(`/search/${this.keyword}?k=${this.keyword}`)
// 第三种（常用）：对象【params对象形式的时候，必须用name】
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k=this.keyword}})
```

问题：如何指定params参数可传可不传？
* 如果路由要求传递params参数，但是你就不传递params参数，URL会有问题。
* 如果像让params参数可传可不传，可以在router路径写占位的后面加上一个？

问题：如果params传入空串 URL也会出问题，怎么解决
* 短路或 一个undefined
```js
this.$router.push({name:"search",params:{keyword:'' || undefined},query:{k=this.keyword}})
```

传递props参数【在router的js文件中配置】
* props为true，路由组件会将params参数以props的形式传递，在目标组件需要对应引入props参数
* props为对象，对象中的k-v都会以props的形式传递，在目标组件需要对应引入props参数
* props为函数，传入的参数是页面的路由【$route】
```js
props:($route)=>{
    return { keyword:$route.params.params.keyword, k:$route.query }
}
```