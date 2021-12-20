import Vue from 'vue'
import App from './App.vue'
// 全局组件
// 三级联动组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
import store from '@/store'

new Vue({
  render: h => h(App),
  // 注册路由：kv一致省略v
  // 注册路由信息，当这里注册了router后，组件上就会有$route和$router属性
  router,
  // 注册仓库，组件上就多了一个$store属性
  store
}).$mount('#app')
