import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login' // 登陆页面

import Welcome from '@/view/welcome/welcome' // 欢迎页面

import Board from '@/view/board/board' // 系统看板

import Outlist from '@/view/agent/out-agent/outlist' // 线路商列表
import Outdetail from '@/view/agent/out-agent/outdetail' // 线路商详情页
import Outcreate from '@/view/agent/out-agent/outcreate' // 创建线路商
import Comlist from '@/view/agent/com-agent/comlist' // 一般商户列表
import Comdetail from '@/view/agent/com-agent/comdetail' // 一般商户详情页
import Comcreate from '@/view/agent/com-agent/comcreate' // 创建一般商户
import Bfsetting from '@/view/agent/setting/bf-setting' // 包房代理配置

import PointWarning from '@/view/agent/point-warning/pointWarning' // 接入商点数告警列表

import Gamelist from '@/view/game/gamelist' // 游戏列表

import Personal from '@/view/personal/personal' // 个人中心

import Advertiselist from '@/view/operation/advertise/advertiselist' // 广告列表
import Advertisedetail from '@/view/operation/advertise/advertisedetail' // 广告详情
import Addadvertise from '@/view/operation/advertise/addadvertise' // 广告列表

import Manager from '@/view/property/manager' // 直属线路商报表
import Merchant from '@/view/property/merchant' // 直属商户报表

import Helplist from '@/view/stuff/help/helplist' // 帮助信息列表
import Helpdetail from '@/view/stuff/help/helpdetail' // 帮助信息详情
import Addhelp from '@/view/stuff/help/addhelp' // 新增帮助信息

import Managerloginlist from '@/view/system/loginlist/managerloginlist' // 线路商登录日志
import Merchantloginlist from '@/view/system/loginlist/merchantloginlist' // 商户登录日志

import Admindate from '@/view/system/datelist/admindate' // 管理员操作日志

import Adminlist from '@/view/system/admin-manage/adminlist' // 管理员列表
import Addadmin from '@/view/system/admin-manage/addadmin' // 新增管理员

import Msnlist from '@/view/system/msnlist/msnlist' // 线路号列表

import BoothList from '@/view/booth/boothList' // 展位管理

import AgentPlayerList from '@/view/player/playerlist' // 玩家列表
import AgentPlayerDetail from '@/view/player/playerdetail' // 玩家详情页
import AgentAddPlayer from '@/view/player/addPlayer' // 创建玩家
import AgentPlayerStatistics from '@/view/player/playerStatistics' // 玩家统计
import PlayerBill from '@/view/player/playerbill' // 玩家账单详情页
//import PlayerRunningAccount from '@/view/player/playerRunningAccount' // 玩家流水账详情页

import GameBackstage from '@/view/gameBackstage/gameBackstage' // 游戏后台

import allReport from '@/view/gameReport/allReport' // NA游戏总报表

import naAllGameReport from '@/view/gameReport/na/naAllGame-report' // NA游戏总报表
import naVedioGameReport from '@/view/gameReport/na/naVedioGame-report' // NA电子游戏报表
import naLiveGameReport from '@/view/gameReport/na/naLiveGame-report' // NA真人游戏报表
import naArcadeGameReport from '@/view/gameReport/na/naArcadeGame-report' // NA街机游戏报表
import naMallReport from '@/view/gameReport/na/naMall-report' // NA游戏总报表

import ttgVedioGameReport from '@/view/gameReport/ttg/ttgVedioReport' // TTG电子游戏报表
import saLiveGameReport from '@/view/gameReport/sa/saLiveGame-report' // SA真人游戏报表
import mgVedioGameReport from '@/view/gameReport/mg/mgVedioGame-report' // MG电子游戏报表

import { Message } from 'element-ui'
import store from '@/store/store'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '*',
      redirect: to => {
        const { hash, params, query } = to
        if (localStorage.loginId) {
          return { path: '/welcome', query: null }
        } else {
          return { path: '/login', query: null }
        }
      }
    },
    {
      path: '/login',
      name: '登陆页面',
      component: Login
    },
    {
      path: '/welcome',
      name: '欢迎',
      component: Welcome
    },
    {
      path: '/board',
      name: '看板',
      component: Board
    },
    {
      path: '/outlist',
      component: Outlist
    },
    {
      path: '/outdetail',
      component: Outdetail
    },
    {
      path: '/outcreate',
      component: Outcreate
    },
    {
      path: '/comlist',
      name: '代理列表',
      component: Comlist
    },
    {
      path: '/point-warning',
      name: '接入商点数告警列表',
      component: PointWarning
    },
    {
      path: '/bfsetting',
      name: '包房代理游戏配置',
      component: Bfsetting
    },
    {
      path: '/comdetail',
      name: '查看代理',
      component: Comdetail
    },
    {
      path: '/comcreate',
      name: '创建代理',
      component: Comcreate
    },
    {
      path: '/gamelist',
      name: '游戏列表',
      component: Gamelist
    },
    {
      path: '/personal',
      name: '个人中心',
      component: Personal
    },
    {
      path: '/advertiselist',
      name: '广告列表',
      component: Advertiselist
    },
    {
      path: '/advertisedetail',
      name: '广告详情',
      component: Advertisedetail
    },
    {
      path: '/Addadvertise',
      name: '添加广告',
      component: Addadvertise
    },
    {
      path: '/manager',
      name: ' 直属线路商报表',
      component: Manager
    },
    {
      path: '/merchant',
      name: '商户登录日志',
      component: Merchant
    },
    {
      path: '/helplist',
      name: '帮助列表',
      component: Helplist
    },
    {
      path: '/helpdetail',
      name: '帮助详情',
      component: Helpdetail
    },
    {
      path: '/addhelp',
      name: '新增帮助',
      component: Addhelp
    },
    {
      path: '/managerloginlist',
      name: '管理员登录日志',
      component: Managerloginlist
    },
    {
      path: '/merchantloginlist',
      name: '代理登录日志',
      component: Merchantloginlist
    },
    {
      path: '/admindate',
      name: '管理员操作日志',
      component: Admindate
    },
    {
      path: '/adminlist',
      name: '管理员列表',
      component: Adminlist
    },
    {
      path: '/addadmin',
      name: '添加管理员',
      component: Addadmin
    },
    {
      path: '/msnlist',
      name: '线路号列表',
      component: Msnlist
    },
    {
      path: '/boothList',
      name: '展位管理',
      component: BoothList
    },
    {
      path: '/agentPlayerList',
      name: '玩家列表',
      component: AgentPlayerList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/agentPlayerDetail',
      name: '玩家详情',
      component: AgentPlayerDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/addPlayer',
      name: '创建玩家',
      component: AgentAddPlayer
    },
    {
      path: '/agentPlayerStatistics',
      name: '玩家统计',
      component: AgentPlayerStatistics
    },
    {
      path: '/gameBackstage',
      name: '游戏后台',
      component: GameBackstage
    },
    {
      path: '/allReport',
      name: '公司输赢报表',
      component: allReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/naAllGameReport',
      name: 'NA游戏总报表',
      component: naAllGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/naVedioGameReport',
      name: 'NA电子游戏报表',
      component: naVedioGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/naLiveGameReport',
      name: 'NA真人游戏报表',
      component: naLiveGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/naArcadeGameReport',
      name: 'NA街机游戏报表',
      component: naArcadeGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/naMallReport',
      name: 'NA商城总报表',
      component: naMallReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ttgVedioGameReport',
      name: 'TTG电子游戏报表',
      component: ttgVedioGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/saLiveGameReport',
      name: 'SA真人游戏报表',
      component: saLiveGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mgVedioGameReport',
      name: 'MG电子游戏报表',
      component: mgVedioGameReport,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/playerBill',
      name: '玩家账单详情',
      component: PlayerBill,
      meta: {
        keepAlive: true
      }
    },
    // {
    //   path: '/tagWindow',
    //   component: tagWindow,
    //   children: [
    //     {
    //       path: '/tagWindow/board',
    //       name: '看板',
    //       component: Board
    //     },
    //     {
    //       path: '/tagWindow/comlist',
    //       name: '代理列表',
    //       component: Comlist
    //     },
    //     {
    //       path: '/tagWindow/comdetail',
    //       name: '编辑代理',
    //       component: Comdetail
    //     },
    //     {
    //       path: '/tagWindow/comcreate',
    //       name: '创建代理',
    //       component: Comcreate
    //     },
    //     {
    //       path: '/tagWindow/gamelist',
    //       name: '游戏列表',
    //       component: Gamelist
    //     },
    //     {
    //       path: '/tagWindow/personal',
    //       name: '个人中心',
    //       component: Personal
    //     },
    //     {
    //       path: '/tagWindow/advertiselist',
    //       name: '广告列表',
    //       component: Advertiselist
    //     },
    //     {
    //       path: '/tagWindow/advertisedetail',
    //       name: '广告详情',
    //       component: Advertisedetail
    //     },
    //     {
    //       path: '/tagWindow/Addadvertise',
    //       name: '添加广告',
    //       component: Addadvertise
    //     },
    //     {
    //       path: '/tagWindow/manager',
    //       name: ' 直属线路商报表',
    //       component: Manager
    //     },
    //     {
    //       path: '/tagWindow/merchant',
    //       name: '商户登录日志',
    //       component: Merchant
    //     },
    //     {
    //       path: '/tagWindow/helplist',
    //       name: '帮助信息列表',
    //       component: Helplist
    //     },
    //     {
    //       path: '/tagWindow/helpdetail',
    //       name: '帮助信息详情',
    //       component: Helpdetail
    //     },
    //     {
    //       path: '/tagWindow/addhelp',
    //       name: '新增帮助信息',
    //       component: Addhelp
    //     },
    //     {
    //       path: '/tagWindow/managerloginlist',
    //       name: '线路商登录日志',
    //       component: Managerloginlist
    //     },
    //     {
    //       path: '/tagWindow/merchantloginlist',
    //       name: '商户登录日志',
    //       component: Merchantloginlist
    //     },
    //     {
    //       path: '/tagWindow/admindate',
    //       name: '管理员操作日志',
    //       component: Admindate
    //     },
    //     {
    //       path: '/tagWindow/adminlist',
    //       name: '管理员列表',
    //       component: Adminlist
    //     },
    //     {
    //       path: '/tagWindow/addadmin',
    //       name: '新增管理员',
    //       component: Addadmin
    //     },
    //     {
    //       path: '/tagWindow/msnlist',
    //       name: '线路号列表',
    //       component: Msnlist
    //     },
    //     {
    //       path: '/tagWindow/boothList',
    //       name: '展位管理',
    //       component: BoothList
    //     },
    //     {
    //       path: '/tagWindow/agentPlayerList',
    //       name: '玩家列表',
    //       component: AgentPlayerList
    //     },
    //     {
    //       path: '/tagWindow/agentPlayerDetail',
    //       name: '玩家详情',
    //       component: AgentPlayerDetail
    //     },
    //     {
    //       path: '/tagWindow/addPlayer',
    //       name: '创建玩家',
    //       component: AgentAddPlayer
    //     },
    //     {
    //       path: '/tagWindow/agentPlayerStatistics',
    //       name: '玩家统计',
    //       component: AgentPlayerStatistics
    //     },
    //     {
    //       path: '/tagWindow/gameBackstage',
    //       name: '游戏后台',
    //       component: GameBackstage
    //     }
    //   ]
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.loginTime) {
    let loginTime = Number(localStorage.loginTime)
    let nowTime = new Date().getTime()
    if (nowTime - loginTime >= 43200000) {
      store.state.variable.islogin = false
      store.state.variable.isloading = false
      store.state.variable.visitedViews = []
      store.state.variable.activeIndex = null
      store.state.variable.tabIndex = null
      Message.warning('您的Token已过期,请重新登录')
      localStorage.clear()
      next('/login')
    }
  }
  next()
})

export default router
