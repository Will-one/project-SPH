// 引入一级路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center" 
// 引入二级路由组件
import MyOrder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"

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
    },
    {
       path: '/addcartsuccess',
       component: AddCartSuccess,
       name: 'addcartsuccess',
       meta: { footerShow:true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        name:'shopcart',
        meta:{ footerShow:true }
    },
    {
        path: '/trade',
        component: Trade,
        name: 'trade',
        meta: { footerShow:true }
    },
    {
        path: '/pay',
        component: Pay,
        name: 'pay',
        meta: { footerShow:true }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        name: 'paysuccess',
        meta: { footerShow:true }
    },
    {
        path: '/center',
        component: Center,
        name: 'center',
        meta: { footerShow:true },
        children:[
            {
                path:'/center',
                redirect:'myorder'
            },
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            }
        ]
    },
]