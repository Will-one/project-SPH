import Vue from 'vue'
import App from './App.vue'
// 全局组件
// 三级联动组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
// 引入vuex
import store from '@/store'
// 引入mockjs
import '@/mock/mockServe'
// 引入swiper的样式
import 'swiper/css/swiper.css'


new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  // 注册路由：kv一致省略v
  // 注册路由信息，当这里注册了router后，组件上就会有$route和$router属性
  router,
  // 注册仓库，组件上就多了一个$store属性
  store
}).$mount('#app')
