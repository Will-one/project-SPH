## 在DOM更新后再进行一些工作【watch+nextTick】
* watch：监听已有数据的变化
* this.$nextTick(回调)，当DOM更新循环结束后调用

watch + nextTick 经常用在各种三方插件的使用上，当要操作dom时使用

## 组件通信方式
### props：父子组件通信
### 自定义事件：@on @emit 可以实现子给父通信
### 全局事件总线：$bus 都行
### pubsub-js：vue很少用
### 插槽
### vuex

## P86 token
* 通过账户密码登录成功后，后台为了区分用户，服务器下发token【令牌-唯一标识】
* 登录接口返回的报文，一般表现为只返回token，前台持久化存储token。【另外的接口带着token找服务器要用户信息】
* 需要持久化存储token

### 问题1：需要在多个组件中展示用户信息【用路由守卫解决】
### 问题2：用户已经登录就不能再进入登录页面【用路由守卫解决】

## P90+ 订单
* 不要在生命周期函数中使用async 
* elementUI按需引入
* 二维码生成QRcode，

## P106 P107
* 图片懒加载【vue-lazyload】在图片数据范围渲染完成前可以先显示默认的gif
* vee validate表单验证


## P109 打包后处理map文件
前端页面打包后js文件夹会有map文件，体积很大？
* 项目打包后，代码都是通过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪一行代码
* 有了map就可以像未加密代码一样，准确的输出是哪一行有错
* 所以该文件如果项目不需要是可以去掉的
vue.config.js 配置
productionSourceMap：false

## P110-P112
可以购买腾讯云或者阿里云
配置开放22，80等端口
使用xshell xftp等工具登录并将dist文件放到服务器上
使用nginx进行反向代理
* 在服务器的etc目录，会默认有一个nginx目录【里面有一些默认的东西】，在此目录下载安装nginx【yum install nginx】
* 然后去nginx.conf里面或者conf.d里面配置代理【前端和后端接口的地址都要配置】
* service nginx start/restart/stop

## 要再确认的知识
* 为啥要重新VueRouter的push和replace
* 分页器的封装
* 放大镜的操作
* Vue CLI配置参考要看一下
* node编写服务器【这个放到看node的时候再说吧】

