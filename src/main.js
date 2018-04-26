// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueWeui from 'vue-weui';
import './assets/css/weui.css'
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueWeui)
Vue.use(wcSwiper);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
