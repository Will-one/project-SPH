// 引入
import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"

// 引入 store
import store from "@/store"

Vue.use(VueRouter)



/* 重写路由 */
// 1.先保存一份VueRouter原型的push
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 2.重写push/replace
VueRouter.prototype.push = function(location, resolve, reject){
    if (resolve && reject) {
        // call和apply的区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call传递参数用逗号隔开，apply要用数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        // 始终滚动到顶部
        if (savedPosition){
            return savedPosition
        }else{
            return {y:0}
        } 
    }
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
    // to：可以获取到你要跳转的路由的信息
    // from：可以获取到你从哪个路由而来的信息
    // next: 放行函数 next()    next('/login')   next(false)
    next()
})

export default router