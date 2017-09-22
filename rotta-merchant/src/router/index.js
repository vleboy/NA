import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/view/board/board' // 系统看板

import Outlist from '@/view/agent/out-agent/outlist' // 线路商列表
import Outdetail from '@/view/agent/out-agent/outdetail' // 线路商详情页
import Outcreate from '@/view/agent/out-agent/outcreate' // 创建线路商
import Comlist from '@/view/agent/com-agent/comlist' // 一般商户列表
import Comdetail from '@/view/agent/com-agent/comdetail' // 一般商户详情页
import Comcreate from '@/view/agent/com-agent/comcreate' // 创建一般商户

import Playerlist from '@/view/player/playerlist' // 玩家列表
import Playerdetail from '@/view/player/playerdetail' // 玩家详情页

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

import GameBackstage from 'view/gameBackstage/gameBackstage' // 游戏后台
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/board'
    },
    {
      path: '/',
      redirect: '/board'
    },
    {
      path: '/board',
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
      component: Comlist
    },
    {
      path: '/comdetail',
      component: Comdetail
    },
    {
      path: '/comcreate',
      component: Comcreate
    },
    {
      path: '/playerlist',
      component: Playerlist
    },
    {
      path: '/playerdetail',
      component: Playerdetail
    },
    {
      path: '/gamelist',
      component: Gamelist
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/advertiselist',
      component: Advertiselist
    },
    {
      path: '/advertisedetail',
      component: Advertisedetail
    },
    {
      path: '/Addadvertise',
      component: Addadvertise
    },
    {
      path: '/manager',
      component: Manager
    },
    {
      path: '/merchant',
      component: Merchant
    },
    {
      path: '/helplist',
      component: Helplist
    },
    {
      path: '/helpdetail',
      component: Helpdetail
    },
    {
      path: '/addhelp',
      component: Addhelp
    },
    {
      path: '/managerloginlist',
      component: Managerloginlist
    },
    {
      path: '/merchantloginlist',
      component: Merchantloginlist
    },
    {
      path: '/admindate',
      component: Admindate
    },
    {
      path: '/adminlist',
      component: Adminlist
    },
    {
      path: '/addadmin',
      component: Addadmin
    },
    {
      path: '/msnlist',
      component: Msnlist
    },
    {
      path: '/gameBackstage',
      component: GameBackstage
    }
  ]
})
