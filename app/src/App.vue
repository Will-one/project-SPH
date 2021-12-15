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
  }
}
</script>

<style>

</style>