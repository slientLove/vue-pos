<template>
  <div>
    <leftNav></leftNav>   <!--  这是侧边栏组件 -->
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import leftNav from './components/common/left-nav.vue'
export default {
  name: 'app',
  components: {
   leftNav
  }
}
</script>
<style>
</style>
