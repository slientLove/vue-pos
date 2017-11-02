import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pos from '../components/pos/pos.vue'
import leftNav from '../components/common/left-nav.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',    // 更改项目入口文件
      component: pos
    }
  ]
})
