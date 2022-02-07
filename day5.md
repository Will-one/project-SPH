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