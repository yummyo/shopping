import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
// import { userInfo } from './api'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false
// const whiteList = [
//   '/home',
//   '/goods',
//   '/login',
//   '/register',
//   '/goodsDetails',
//   '/thanks',
//   '/search',
//   '/cart',
//   '/refreshsearch'
// ] // 不需要登陆的页面
router.beforeEach(function(to, from, next) {
  next()
  // let params = {
  //   params: {
  //     token: getStore('token')
  //   }
  // }
  // userInfo(params).then(res => {
  //   if (res.result.state !== 1) { // 没登录
  //     if (whiteList.indexOf(to.path) !== -1) { // 白名单
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   } else {
  //     store.commit('RECORD_USERINFO', {info: res.result})
  //     if (to.path === '/login') { //  跳转到
  //       next({path: '/'})
  //     }
  //     next()
  //   }
  // })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
