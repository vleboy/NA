import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/view/welcome/welcome' // 欢迎页面

import Board from '@/view/board/board' // 系统看板

import Helplist from '@/view/stuff/help/helplist' // 帮助信息列表
import Helpdetail from '@/view/stuff/help/helpdetail' // 帮助信息详情
import Addhelp from '@/view/stuff/help/addhelp' // 新增帮助信息

import GameBackstage from 'view/gameBackstage/gameBackstage' // 游戏后台

import packageList from 'view/prop/packageList' // 礼包列表
import propList from 'view/prop/propList' // 道具中心

import gameList from 'view/game/gameList' // 游戏列表
import addGame from 'view/game/addGame' // 创建游戏
import gameDetail from 'view/game/gameDetailed' // 游戏详细

import operatorList from 'view/operator/operatorList' // 游戏供应商列表
import addOperator from 'view/operator/addOperator' // 创建游戏供应商
import operatorDetail from 'view/operator/operatorDetail' // 游戏供应商详细

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/welcome'
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
      path: '/helplist',
      name: '帮助信息列表',
      component: Helplist
    },
    {
      path: '/helpdetail',
      name: '帮助信息详情',
      component: Helpdetail
    },
    {
      path: '/addhelp',
      name: '新增帮助信息',
      component: Addhelp
    },
    {
      path: '/gameBackstage',
      name: '游戏后台',
      component: GameBackstage
    },
    {
      path: '/packageList',
      name: '礼包列表',
      component: packageList
    },
    {
      path: '/propList',
      name: '道具列表',
      component: propList
    },
    {
      path: '/addGame',
      name: '创建游戏',
      component: addGame
    },
    {
      path: '/gameList',
      name: '游戏列表',
      component: gameList
    },
    {
      path: '/gamedetail',
      name: '游戏详细',
      component: gameDetail
    },
    {
      path: '/operatorList',
      name: '游戏供应商列表',
      component: operatorList
    },
    {
      path: '/addOperator',
      name: '创建游戏供应商',
      component: addOperator
    },
    {
      path: '/operatordetail',
      name: '游戏供应商详细',
      component: operatorDetail
    }
  ]
})
