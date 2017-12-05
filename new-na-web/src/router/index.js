import Vue from 'vue'
import Router from 'vue-router'
import progress from 'nprogress'

import Home from '@/views/home'
import About from '@/views/about'

Vue.use(Router)

progress.configure({
  showSpinner: false
})

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
router.beforeEach((to, from, next) => {
  progress.start()
  next()
})

router.afterEach(to => {
  progress.done()
  Vue.nextTick(() => {
    window.scrollTo(0, 0)
  })
})

export default router
