// 引入一级路由组件(未使用路由懒加载)
//import Home from "@/pages/Home"
// import Search from "@/pages/Search"
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

/*
路由懒加载【高效】
--当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
--如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/ 
const Home = ()=> import('@/pages/Home')//返回的是一个promise

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
        component: ()=>import('@/pages/Search'),//路由懒加载简化写法
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
       meta: { footerShow:true },
       // 路由独享守卫    
       beforeEnter: (to, from, next) => {
            // 只运行详情页的跳转
            if ((from.path).indexOf('/detail') != -1 ){
                next()
            }else{
                next(false)
            } 
       }
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
        meta: { footerShow:true },
        beforeEnter: (to, from, next) => {
            // 只允许从购物车跳转到订单【正常从详情页也能直接购买也能跳转，这里就不写了】
            if(from.path =="/shopcart"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        name: 'pay',
        meta: { footerShow:true },
        beforeEnter:(to,from,next)=>{
            // 只能从订单页面跳转
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        name: 'paysuccess',
        meta: { footerShow:true }
        // 这里就不写路由独享守卫了，写组件内守卫测试一下
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