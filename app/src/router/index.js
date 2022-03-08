// 引入
import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"

// 引入 store
import store from "@/store"

Vue.use(VueRouter)



/* 
    重写路由,为啥要重写? 

*/
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
router.beforeEach(async (to,from,next)=>{
    // to：可以获取到你要跳转的路由的信息
    // from：可以获取到你从哪个路由而来的信息
    // next: 放行函数 next()    next('/login')   next(false)
    let token = store.state.user.token // 用户登陆过，并且没有logout才有
    let name = store.state.user.userInfo.name //userInfo至少是一个空对象，name最多为undefined
    // 用户已经登录过的情况
    if (token){
        // 用户已登录过，不能再进入login页面
        if(to.path == '/login'){
            next('/')
        } else {
            // 已登录，去的不是login，判断是否有用户name，可以派发请求获取userInfo
            if(name){
                next()
            } else {
                // 派发请求，获取userInfo
                try{
                    await store.dispatch('user/getUserInfo')
                    next()
                }catch(error){
                    // 走到这儿一定代表token失效
                    await store.dispatch('user/logout') // token失效了logout能返回200么？
                    next('/login')
                    alert("身份过期，请重新登陆")
                } 
            }
        }        
    } else { 
        // 用户未登录过的情况 购物车,支付页面,个人中心等不能访问
        // 对于用户点击了购物车页面跳转到login的,登录后应该在购物车页面,而不应该去home,所以将to.path作为query参数传递给login处理
        let toPath = to.path //先保存to.path,因为后面会被新路由覆盖
        console.log(toPath)
        if(toPath.indexOf('/shop') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/trade') != -1){
            next(`/login?redirect=${toPath}`)
        } else {
            next()
        }
    }
    
})

export default router