// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import global_ from './components/common/Global'

import VueWeui from 'vue-weui';
import './assets/css/weui.css'
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueWeui)
Vue.use(wcSwiper);

Vue.prototype.GLOBAL = global_

Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
/******************拦截器设置(开始)******************/
Vue.http.interceptors.push((request, next)  =>{
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN=sessionStorage.getItem('STORAGE_TOKEN')||global_.token;
  if(TOKEN){
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('TOKEN',TOKEN);
  }
  next((response) => {
    return response;
  });
});
/******************拦截器设置(结束)******************/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
