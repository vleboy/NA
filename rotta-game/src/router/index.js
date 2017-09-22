import Vue from 'vue'
import Router from 'vue-router'
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

import operatorList from 'view/operator/operatorList' // 游戏运营商列表
import addOperator from 'view/operator/addOperator' // 创建游戏运营商
import operatorDetail from 'view/operator/operatorDetail' // 游戏运营商详细

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/board'
    },
    {
      path: '/board',
      component: Board
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
      path: '/gameBackstage',
      component: GameBackstage
    },
    {
      path: '/packageList',
      component: packageList
    },
    {
      path: '/propList',
      component: propList
    },
    {
      path: '/addGame',
      component: addGame
    },
    {
      path: '/gameList',
      component: gameList
    },
    {
      path: '/gamedetail',
      component: gameDetail
    },
    {
      path: '/operatorList',
      component: operatorList
    },
    {
      path: '/addOperator',
      component: addOperator
    },
    {
      path: '/operatordetail',
      component: operatorDetail
    }
  ]
})
