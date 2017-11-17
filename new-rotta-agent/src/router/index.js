import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'
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
// 看板
const board = (resolve) => {
  import('view/board/board').then((module) => {
    resolve(module)
  })
}
// 个人中心
const personal = (resolve) => {
  import('view/personal/personal').then((module) => {
    resolve(module)
  })
}
// 代理列表
const comlist = (resolve) => {
  import('view/merchant/comlist').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录界面',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: dashboard,
      children: [
        {
          path: '/board',
          name: '看板',
          component: board
        },
        {
          path: '/personal',
          name: '个人中心',
          component: personal
        },
        {
          path: '/merchant',
          name: '代理中心',
          component: comlist,
          children: [
            {
              path: '/merchant/comlist',
              name: '代理列表',
              component: comlist
            }
          ]
        },
        {
          path: '/player',
          name: '玩家中心',
          children: [
            {
              path: '/player/agentPlayerList',
              name: '玩家列表',
              component: dashboard
            }
          ]
        },
        {
          path: '/game',
          name: '游戏中心',
          children: [
            {
              path: '/game/gameBackstage',
              name: '游戏后台',
              component: dashboard
            }
          ]
        },
        {
          path: '/setting',
          name: '系统设置',
          children: [
            {
              path: '/setting/loginLog',
              name: '登录日志',
              children: [
                {
                  path: '/setting/loginLog/loginLogmanagerloginlist',
                  name: '管理员登录日志',
                  component: dashboard
                },
                {
                  path: '/setting/loginLog/merchantloginlist',
                  name: '代理登录日志',
                  component: dashboard
                }
              ]
            },
            {
              path: '/setting/operatingLog',
              name: '操作日志',
              children: [
                {
                  path: '/setting/operatingLog/admindate',
                  name: '管理员操作日志',
                  component: dashboard
                }
              ]
            },
            {
              path: '/setting/adminManager',
              name: '管理员管理',
              children: [
                {
                  path: '/setting/adminManager/adminlist',
                  name: '管理员列表',
                  component: dashboard
                },
                {
                  path: '/setting/adminManager/addadmin',
                  name: '添加管理员',
                  component: dashboard
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(store.state.mutations.variable.token)
  let token = store.state.mutations.variable.token
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // 如果无需token,那么随它去吧
  }
})

export default router
