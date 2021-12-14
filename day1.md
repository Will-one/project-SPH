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