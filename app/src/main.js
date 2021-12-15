import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from '@/router'

new Vue({
  render: h => h(App),
  // 注册路由：kv一致省略v
  // 注册路由信息，当这里注册了router后，组件上就会有$route和$router属性
  router
}).$mount('#app')
