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
import GameMailList from '@/view/operation/mailMgr/gameMailList' // 游戏邮件列表
import HorseRaceLampList from '@/view/operation/horseRaceLampMgr/horseRaceLampList' // 跑马灯列表
import GameNoticeList from '@/view/operation/gameNoticeMgr/gameNoticeList' // 游戏公告列表

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
import Adminright from '@/view/system/admin-manage/adminright' // 管理员权限列表

import Msnlist from '@/view/system/msnlist/msnlist' // 线路号列表

import BoothList from '@/view/operation/booth/boothList' // 展位管理

import GameBackstage from '@/view/gameBackstage/gameBackstage' // 游戏后台

import LineUp from '@/view/lineup/lineup' // 排队设置

import ComputerGame from '@/view/riskManagement/computerGame' // 电子游戏风控

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/board'
    },
    {
      path: '/',
      name: '看板',
      redirect: '/board'
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
      path: '/playerlist',
      name: '玩家列表',
      component: Playerlist
    },
    {
      path: '/playerdetail',
      name: '玩家详情',
      component: Playerdetail
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
      name: '管理员权限',
      component: Adminright
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
      path: '/lineup',
      name: '排队设置',
      component: LineUp
    },
    {
      path: '/computerGame',
      name: '电子游戏风控',
      component: ComputerGame
    }
  ]
})
