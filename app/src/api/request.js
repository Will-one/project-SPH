//对axios进行二次封装
import axios from 'axios'

// 引入进度条【start方法，done方法】
import nprogress from 'nprogress'
// 还要引入进度条的样式，不然没有效果
import 'nprogress/nprogress.css'

// 在api模块中引入store【为了使用持久化的游客uuid,在detail页面使用过，为了看购物车】
import store from '@/store'

// 1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    // 基础路径
    baseURL: '/api',
    // 超时时间
    timeout: 5000,
})

// 2.请求拦截器：在发请求之前，可以做一些事情
requests.interceptors.request.use((config) => {
    // 有UUID的话，给请求头添加字段（字段名称前后端商定）
    if (store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 有token的话，给请求头添加字段（字段名称前后端商定）
    if (store.state.user.token){
        config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start()
    // config是配置对象，里面有一个属性header请求头比较重要 
    return config
})

// 3.响应拦截器：在收到响应后，做一些事情
requests.interceptors.response.use(
    (res) => {
        // 进度条结束
        nprogress.done()
        // 成功的回调函数
        return res.data
    },
    (error) => {
        // 失败的回调函数
        return Promise.reject(new Error('fail'))//终止promise链，当然也可以做其他的事
    })

// 对外暴露
export default requests