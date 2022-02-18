// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"

export default [
    {
        path: '/',
        redirect: '/home',
        meta: { footerShow: true }
    },
    {
        path: '/home',
        component: Home,
        meta: { footerShow: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name:'search',
        meta: { footerShow: true , typeNavAutoShow: false }
    },
    {
        path: '/login',
        component: Login,
        meta: { footerShow: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { footerShow: false }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { footerShow: false }
    }
]