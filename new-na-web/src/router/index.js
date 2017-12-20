import Vue from 'vue'
import Router from 'vue-router'
import progress from 'nprogress'

import Home from '@/views/home'
import Ascendant from '@/views/Ascendant'

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
      path: '/Ascendant',
      name: 'Ascendant',
      component: Ascendant
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
