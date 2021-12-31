## 在DOM更新后再进行一些工作【watch+nextTick】
* watch：监听已有数据的变化
* this.$nextTick(回调)，当DOM更新循环结束后调用

watch + nextTick 经常用在各种三方插件的使用上，当要操作dom时使用