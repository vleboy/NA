import Vue from 'vue'
import Router from 'vue-router'

import LoginAdmin from '@/components/login/login-admin' // 管理员登陆页面
import LoginManager from '@/components/login/login-manager' // 线路商登陆页面
import LoginMerchant from '@/components/login/login-merchant' // 商户登陆页面

import Commingsoon from '@/view/comming/commingSoon' // 功能未开通页面
import Welcome from '@/view/welcome/welcome' // 欢迎页 面

import Board from '@/view/board/board' // 系统看板

import Outlist from '@/view/agent/out-agent/outlist' // 线路商列表
import Outdetail from '@/view/agent/out-agent/outdetail' // 线路商详情页
import Outcreate from '@/view/agent/out-agent/outcreate' // 创建线路商
import Comlist from '@/view/agent/com-agent/comlist' // 一般商户列表
import Comdetail from '@/view/agent/com-agent/comdetail' // 一般商户详情页
import Comcreate from '@/view/agent/com-agent/comcreate' // 创建一般商户

import PointWarning from '@/view/agent/point-warning/pointWarning' // 接入商点数告警列表


import Playerlist from '@/view/player/playerlist' // 玩家列表
import Playerdetail from '@/view/player/playerdetail' // 玩家详情页
import playerBill from '@/view/player/playerbill' // 玩家账单详情页
//import playerRunningAccount from '@/view/player/playerRunningAccount' // 玩家流水账详情页

import Gamelist from '@/view/game/gamelist' // 游戏列表

import Personal from '@/view/personal/personal' // 个人中心

import Advertiselist from '@/view/operation/advertise/advertiselist' // 广告列表
import Advertisedetail from '@/view/operation/advertise/advertisedetail' // 广告详情
import Addadvertise from '@/view/operation/advertise/addadvertise' // 广告列表
import GameMailList from '@/view/operation/mailMgr/gameMailList' // 游戏邮件列表
import HorseRaceLampList from '@/view/operation/horseRaceLampMgr/horseRaceLampList' // 跑马灯列表
import GameNoticeList from '@/view/operation/gameNoticeMgr/gameNoticeList' // 游戏公告列表
import VideoGameConfig from '@/view/operation/gameConfig/videoGameConfig' // NA电子游戏配置
import VideoGameConfigTTG from '@/view/operation/gameConfig/videoGameConfigTTG' // TTG电子游戏配置
import PrizePlayerList from '@/view/operation/mysteriousPrize/prizeList' // 大奖玩家列表
import PrizeConfig from '@/view/operation/mysteriousPrize/prizeConfig' // 神秘大奖奖品配置
import BusinessRecord from '@/view/operation/businessRecord/businessRecordList' // 商户记录
import PropPrize from '@/view/operation/propPrize/propPrizeList' // 道具定价
import MerchantBoothList from '@/view/operation/merchantBooth/merchantBoothList' // 商户的展位列表

import Manager from '@/view/property/manager' // 直属线路商报表
import Merchant from '@/view/property/merchant' // 直属商户报表

import Helplist from '@/view/stuff/help/helplist' // 帮助信息列表
import Helpdetail from '@/view/stuff/help/helpdetail' // 帮助信息详情
import Addhelp from '@/view/stuff/help/addhelp' // 新增帮助信息

import Managerloginlist from '@/view/system/loginlist/managerloginlist' // 线路商登录日志
import Merchantloginlist from '@/view/system/loginlist/merchantloginlist' // 商户登录日志

import Admindate from '@/view/system/datelist/admindate' // 管理员操作日志
import DebugJournal from '@/view/system/debugJournal/debugJournal' // debug操作日志

import Adminlist from '@/view/system/admin-manage/adminlist' // 管理员列表
import Addadmin from '@/view/system/admin-manage/addadmin' // 新增管理员
import Adminright from '@/view/system/admin-manage/adminright' // 管理员权限列表
import Addcharacter from '@/view/system/admin-manage/addcharacter' // 创建新权限角色

import Msnlist from '@/view/system/msnlist/msnlist' // 线路号列表

import BoothList from '@/view/operation/booth/boothList' // 展位管理

import GameBackstage from '@/view/gameBackstage/gameBackstage' // 游戏后台

import allReport from '@/view/gameReport/allReport' // 公司所有游戏总报表
import naAllGameReport from '@/view/gameReport/na/naAllGame-report' // NA游戏总报表
import naVedioGameReport from '@/view/gameReport/na/naVedioGame-report' // NA电子游戏报表
import naLiveGameReport from '@/view/gameReport/na/naLiveGame-report' // NA真人游戏报表
import naArcadeGameReport from '@/view/gameReport/na/naArcadeGame-report' // NA街机游戏报表
import naMallReport from '@/view/gameReport/na/naMall-report' // NA游戏总报表

import ttgVedioGameReport from '@/view/gameReport/ttg/ttgVedioReport' // TTG电子游戏报表
import saLiveGameReport from '@/view/gameReport/sa/saLiveGame-report' // SA真人游戏报表
import mgVedioGameReport from '@/view/gameReport/mg/mgVedioGame-report' // MG电子游戏报表

import LineUp from '@/view/lineup/lineup' // 排队设置

import ComputerGame from '@/view/riskManagement/computerGame' // 电子游戏风控

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
          if (location.href.indexOf('admin') != -1 || location.href.indexOf('4801')!= -1 || location.href.indexOf('admin') != -1) {
            return { path: '/login-admin', query: null }
          } else if (location.href.indexOf('xl') != -1 || location.href.indexOf('4802')!= -1 || location.href.indexOf('manager') != -1) {
            return { path: '/login-manager', query: null }
          } else if (location.href.indexOf('sh') != -1 || location.href.indexOf('4803')!= -1 || location.href.indexOf('merchant') != -1) {
            return { path: '/login-merchant', query: null }
          }
        }
      }
    },
    {
      path: '/login-admin',
      name: '管理员登陆',
      component: LoginAdmin
    },
    {
      path: '/login-manager',
      name: '线路商登录',
      component: LoginManager
    },
    {
      path: '/login-merchant',
      name: '商户登录',
      component: LoginMerchant
    },
    {
      path: '/commingSoon',
      name: '跳转页面',
      component: Commingsoon
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
      name: '线路商列表',
      component: Outlist
    },
    {
      path: '/outdetail',
      name: '线路商详情页',
      component: Outdetail
    },
    {
      path: '/outcreate',
      name: '创建线路商',
      component: Outcreate
    },
    {
      path: '/comlist',
      name: '商户列表',
      component: Comlist
    },
    {
      path: '/comdetail',
      name: '商户详情页',
      component: Comdetail
    },
    {
      path: '/comcreate',
      name: '创建商户',
      component: Comcreate
    },
    {
      path: '/point-warning',
      name: '接入商点数告警列表',
      component: PointWarning
    },
    {
      path: '/playerlist',
      name: '玩家列表',
      component: Playerlist,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/playerdetail',
      name: '玩家详情',
      component: Playerdetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/playerBill',
      name: '玩家账单详情',
      component: playerBill,
      meta: {
        keepAlive: true
      }
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
      name: '直属线路商报表',
      component: Manager
    },
    {
      path: '/merchant',
      name: '直属商户报表',
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
      name: '添加信息',
      component: Addhelp
    },
    {
      path: '/managerloginlist',
      name: '线路商登录日志',
      component: Managerloginlist
    },
    {
      path: '/merchantloginlist',
      name: '商户登录日志',
      component: Merchantloginlist
    },
    {
      path: '/admindate',
      name: '管理员操作日志',
      component: Admindate
    },
    {
      path: '/debugJournal',
      name: 'Debug操作日志',
      component: DebugJournal
    },
    {
      path: '/adminlist',
      name: '管理员列表',
      component: Adminlist
    },
    {
      path: '/addadmin',
      name: '新增管理员',
      component: Addadmin
    },
    {
      path: '/adminright',
      name: '管理员角色列表',
      component: Adminright
    },
    {
      path: '/addcharacter',
      name: '新增管理员角色',
      component: Addcharacter
    },
    {
      path: '/msnlist',
      name: '线路号列表',
      component: Msnlist
    },
    {
      path: '/boothList',
      name: '展位列表',
      component: BoothList
    },
    {
      path: '/gameMailList',
      name: '游戏邮件列表',
      component: GameMailList
    },
    {
      path: '/horseRaceLampList',
      name: '跑马灯列表',
      component: HorseRaceLampList
    },
    {
      path: '/gameNoticeList',
      name: '游戏公告列表',
      component: GameNoticeList
    },
    {
      path: '/gameBackstage',
      name: '游戏后台',
      component: GameBackstage
    },
    {
      path: '/allReport',
      name: '公司输赢总报表',
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
      path: '/lineup',
      name: '排队设置',
      component: LineUp
    },
    {
      path: '/computerGame',
      name: '电子游戏风控',
      component: ComputerGame
    },
    {
      path: '/videoGameConfig',
      name: 'NA电子游戏配置',
      component: VideoGameConfig
    },
    {
      path: '/videoGameConfigTTG',
      name: 'TTG电子游戏配置',
      component: VideoGameConfigTTG
    },
    {
      path: '/prizePlayerList',
      name: '玩家中奖列表',
      component: PrizePlayerList
    },
    {
      path: '/prizeConfig',
      name: '奖品配置',
      component: PrizeConfig
    },
    {
      path: '/businessRecord',
      name: '商户运营记录',
      component: BusinessRecord
    },
    {
      path: '/propPrice',
      name: '道具定价',
      component: PropPrize
    },
    {
      path: '/merchantBoothList',
      name: '商户展位列表',
      component: MerchantBoothList
    }// 针对商户的展位
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
      let path = ''
      if (localStorage.loginRole == '1') {
        path = '/login-admin'
      } else if (localStorage.loginRole == '10') {
        path = '/login-manager'
      } else {
        path = '/login-merchant'
      }
      localStorage.clear()
      next(path)
    }
  }
  next()
})

export default router

