import Vue from 'vue'
import Router from 'vue-router'
// 登录界面
const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}
// 仪表板
const dashboard = (resolve) => {
  import('view/dashboard').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录界面',
      component: Login
    },
    {
      path: '/dashboard',
      name: '仪表板',
      component: dashboard
    }
  ]
})
