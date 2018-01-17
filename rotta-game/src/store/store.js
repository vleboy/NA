import Vue from 'vue'
import Vuex from 'vuex'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import variable from '@/variables/variable'
import checkform from '@/variables/checkform'
import dateformat from 'dateformat'
Vue.use(Vuex) // 全局注册
const state = {
  variable,
  checkform
}
const getters = {
  visitedViews: state => state.variable.visitedViews
}
const actions = {
  getGamelist (context) {
    if(state.variable.getSearchGame.gameName == ''){
      delete state.variable.getSearchGame.gameName
    }
    if (!state.variable.getSearchGame.createdDate || state.variable.getSearchGame.createdDate == null) {
      delete state.variable.getSearchGame.createdDate
    }
    if(state.variable.getSearchGame.companyIden == '' || state.variable.getSearchGame.companyIden == '全部'){
      delete state.variable.getSearchGame.companyIden
    }
    context.commit('startLoading')
    invoke({
      url: api.gameList,
      method: api.post,
      data: {
        gameType: null,
        query: state.variable.getSearchGame
      }
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
        } else {
          var gameList = ret.data.payload
          //console.log('游戏列表数据是:', gameList)
          context.commit({
            type: 'getallGamelist',
            data: gameList
          })
          context.commit({
            type: 'searchOld',
            data: gameList
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取游戏列表
  getOperatorList (context) {
    context.commit('startLoading')
    invoke({
      url: api.companyList,
      method: api.post
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
        } else {
          context.commit({
            type: 'searchOld',
            data: ret.data.payload.Items
          })
          context.commit({
            type: 'getOperatorData',
            data: ret.data.payload.Items
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取游戏商列表
  addVisitedViews({ commit }, view) {
    commit('ADD_VISITED_VIEWS', view)
  },
  delVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEWS', view)
      resolve([...state.variable.visitedViews])
    })
  },
  onTabClick({ commit }, view) {
    commit('ON_TAB_CLICK', view)
  }
}

const mutations = {
  ADD_VISITED_VIEWS: (state, view) => {
    let newTabName = ++state.variable.tabIndex + ''
    if (state.variable.visitedViews.some(v => v.path === view.path)) {
      state.variable.activeIndex = view.name
      state.variable.visitedViews.filter((items, index) => {
        Object.keys(items, index).forEach((k) => {
          if (items[k] === view.path) {
            state.variable.activeIndex = state.variable.visitedViews[index].name
          }
        })
      })
      return
    }
    state.variable.visitedViews.push({ title: view.name, path: view.path, name: newTabName })
    state.variable.activeIndex = newTabName
  },
  DEL_VISITED_VIEWS: (state, targetName) => {
    let tabs = state.variable.visitedViews
    let activeName = state.variable.activeIndex
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    state.variable.activeIndex = activeName
    state.variable.visitedViews = tabs.filter(tab => tab.name !== targetName)
  },
  ON_TAB_CLICK: (state, data) => {
    state.variable.activeIndex = data
  },
  isMap (state, payload) {
    state.variable.isSlider = !state.variable.isSlider
  }, // 是否显示组织架构

  startLoading (state, payload) {
    state.variable.isloading = true
  }, // 启动Loading

  closeLoading (state, payload) {
    state.variable.isloading = false
  }, // 关闭Loading

  isOpenEdit (state, payload) {
    state.variable.isEdit = true
  }, // 是否是编辑状态

  isCloseEdit (state, payload) {
    state.variable.isEdit = false
  }, // 是否是编辑状态

  changeIslogin (state, payload) {
    if (localStorage.loginToken) {
      state.variable.islogin = true
    } else {
      state.variable.islogin = false
    }
  }, // 改变登录状态

  logout () {
    state.variable.islogin = false
  }, // 退出登录

  recordToken (state, payload) {
    state.variable.token = payload.data
  }, // 记录登录令牌token

  recordUserinfo (state, payload) {
    state.variable.userInfo = payload.data
  }, // 记录登录信息

  returnLocalStorage () {
    state.variable.token = localStorage.loginToken
    state.variable.outdetailID = localStorage.outdetailID
    state.variable.comdetailID = localStorage.comdetailID
  }, // 刷新页面保留状态

  recordNowindex (state, payload) {
    state.variable.nowIndex = payload.data
    // console.log('当前页面是:', state.variable.nowIndex)
  }, // 记录当前所在页面

  gerSearchOperator (state, payload) {
    state.variable.getSearchOperator = payload.data
  }, // 记录游戏商搜索条件

  getOperatorSearch () {
    state.variable.operatorList = state.variable.searchOld
    if (state.variable.getSearchOperator.companyContactWay) {
      state.variable.operatorList = state.variable.operatorList.filter(item => {
        return item.companyContactWay === state.variable.getSearchOperator.companyContactWay
      })
    } else if (state.variable.getSearchOperator.companyName) {
      state.variable.operatorList = state.variable.operatorList.filter(item => {
        return item.companyName === state.variable.getSearchOperator.companyName
      })
    } else if (state.variable.getSearchOperator.companyEmail) {
      state.variable.operatorList = state.variable.operatorList.filter(item => {
        return item.companyEmail === state.variable.getSearchOperator.companyEmail
      })
    } else if (state.variable.getSearchOperator.createAt) {
      state.variable.operatorList = state.variable.operatorList.filter(item => {
        var now = dateformat(new Date(parseFloat(item.createdAt)), 'isoDate')
        return now === dateformat(new Date(parseFloat(state.variable.getSearchOperator.createAt)), 'isoDate')
      })
    }
  }, // 搜索线路商列表数据

  gerSearchcondition (state, payload) {
    state.variable.getSearchGame = payload.data
  }, // 获取游戏搜索条件

  changeSteps () {
    state.variable.steps = 2
  }, // 改变步骤条状态

  resetSteps () {
    state.variable.steps = 0
  }, // 重置步骤条

  playerDetail (state, payload) {
    state.variable.playerDetail = payload.data
  }, // 存储玩家详细

  rememberBoothType (state, payload) {
    state.variable.boothType = payload.data
  },

  getallGamelist (state, payload) {
    state.variable.gameList = payload.data
  }, // 游戏列表

  searchOld (state, payload) {
    state.variable.searchOld = payload.data
  }, // 存储原始搜索信息

  getOperatorData (state, payload) {
    state.variable.operatorList = payload.data
  }, // 初始化游戏商数据

  gameReadyDetailInfo (state, payload) {
    state.variable.gameReadyDetailInfo = payload.data
  }, // 游戏详细信息

  getSuccessOperator (state, payload) {
    state.variable.getSuccessOperator = payload.data
    // console.log(state, payload, '成功注册后的数据')
  }, // 游戏运营成功后商详细数据

  getSuccessGame (state, payload) {
    state.variable.getSuccessGame = payload.data
    // console.log(state, payload, '成功注册后的数据')
  }, // 游戏成功后商详细数据

  gameDetailInfo (state, payload) {
    state.variable.gameDetailInfo = payload.data
  }, // 游戏供应商详细数据

  searchOld (state, payload) {
    state.variable.searchOld = payload.data
  },

  storageOperatorItem (state, payload) {
    state.variable.operatorItem = payload.data
  }, // 单个游戏供应商数据存储

  storageGameOneItem (state, payload) {
    state.variable.gameOneItem = payload.data
  }, // 单个游戏列表存储

  resetTab (state) {
    state.variable.visitedViews = []
    state.variable.activeIndex = null
    state.variable.tabIndex = null
  } // 清空Tab标签
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
