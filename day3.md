## 3. 演示卡顿引出函数防抖
* 正常：事件触发非常频繁,而且每一次的触发，回调函数都要去执行（如果时间很短，而且函数内部有计算，那么可能出现浏览器卡顿）
* 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
* 防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是如果连续快速的触发，只会执行一次

可以使用lodash，一个js的函数库，常用函数里面都有

## 7. 三级联动组件的路由跳转与传递参数
如果使用声明式导航router-link，可以实现，但是会卡顿

因为router-link是一个组件，当服务器的数据返回之后，要实例化+转换为真实DOM。耗内存

通过编程式+事件委派也存在两个问题，所有的子节点都能触发事件，并且需要对应传参
* 通过为a标签添加自定义属性来解决。在调用的跳转函数中使用event.target中的dataset来获取自定义属性
* 【data-xxx】是HTML5中自定义属性的一个约定。使用的时候直接使用后面的xxx，注意会转为小写。