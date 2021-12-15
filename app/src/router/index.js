// 引入
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

// 配置路由
export default new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/home',
            meta:{footerShow:true}
        },
        {
            path:'/home',
            component:Home,
            meta:{footerShow:true}
        },
        {
            path:'/search/:keyword',
            component:Search,
            meta:{footerShow:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{footerShow:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{footerShow:false}
        },
    ]
})