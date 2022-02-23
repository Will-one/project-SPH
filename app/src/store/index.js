import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入不同页面模块
import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'

// 创建并暴露
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cart
    }
})