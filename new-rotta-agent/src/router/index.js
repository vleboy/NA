import Vue from 'vue'
import Router from 'vue-router'
const Login = (resolve) => {
  import('components/login/login').then((module) => {
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
    }
  ]
})
