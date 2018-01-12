import Vue from 'vue'
import Router from 'vue-router'
import progress from 'nprogress'

import Home from '@/views/home'
import Ascendant from '@/views/Ascendant'
import Contact from '@/views/contact'
import Download from '@/views/Download'
import Innovation from '@/views/innovation'
import Game from '@/views/Game'
import Pro from '@/views/pro'

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
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/Download',
      name: 'Download',
      component: Download
    },
    {
      path: '/Innovation',
      name: 'Innovation',
      component: Innovation
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game
    },
    {
      path: '/Pro',
      name: '/Pro',
      component: Pro
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
