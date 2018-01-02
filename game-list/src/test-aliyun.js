// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './test-aliyun-App'

import 'amfe-flexible'
import VueLazyload from 'vue-lazyload'
import Fastclick from 'fastclick'

Fastclick.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/static/loading.gif',
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
