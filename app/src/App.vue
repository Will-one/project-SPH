<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- Login 和 Register 页面Footer不显示 -->
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 为了全局组件数据【考虑性能，放在App中，只需执行一次】，可以通知vuex发请求，存储于仓库中
    this.$store.dispatch("home/getCategoryList");
  },
}
</script>

<style>

</style>