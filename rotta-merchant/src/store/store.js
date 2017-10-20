import Vue from 'vue'
import Vuex from 'vuex'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import variable from '@/variables/variable'
import checkform from '@/variables/checkform'
Vue.use(Vuex) // 全局注册
const state = {
  variable,
  checkform
}
const getters = {
  visitedViews: state => state.variable.visitedViews
}
const actions = {
  getPersonal_info (context) {
    invoke({
      url: api.merchants + '/' + localStorage.loginId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          
          context.commit({
            type: 'recordPersonal_info',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员个人中心基本信息
  getPersonal_property (context) {
    invoke({
      url: api.waterFall + '/' + localStorage.loginId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          
          context.commit({
            type: 'recordPersonal_property',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员个人中心点数操作记录
  getPersonal_bills (context) {
    invoke({
      url: api.bills + '/' + localStorage.loginId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload.balance
          
          context.commit({
            type: 'recordPersonal_bills',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员个人中心余额
  getGamelistData (context) {
    var data = {
      userId: localStorage.loginId
    }
    invoke({
      url: api.allGames,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          // 
          context.commit({
            type: 'recordGamelistData',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取该用户游戏中心的游戏类型
  getManager_LoginList (context) {
    var checklogin = {
      role: '10',
      type: 'login',
      pageSize: '20',
      startKey: null
    }
    invoke({
      url: api.loginList,
      method: api.post,
      data: checklogin
    }).then(
      result => {
        const [res, ret] = result
        if (res) {
        } else {
          var list = ret.data.payload.Items
          // 
          context.commit({
            type: 'recordManager_LoginList',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }, // 获取线路商登录日志
  getMerchant_LoginList (context) {
    var checklogin = {
      role: '100',
      type: 'login',
      pageSize: '20',
      startKey: null
    }
    invoke({
      url: api.loginList,
      method: api.post,
      data: checklogin
    }).then(
      result => {
        const [res, ret] = result
        if (res) {
        } else {
          var list = ret.data.payload.Items
          // 
          context.commit({
            type: 'recordMerchant_LoginList',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }, // 获取商户登录日志
  getAdmin_cooperDate (context) {
    var checklogin = {
      role: '100',
      type: 'operate',
      pageSize: '20',
      startKey: null
    }
    invoke({
      url: api.loginList,
      method: api.post,
      data: checklogin
    }).then(
      result => {
        const [res, ret] = result
        if (res) {
        } else {
          var list = ret.data.payload.Items
          // 
          context.commit({
            type: 'recordAdmin_cooperDate',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }, // 获取管理员操作日志
  getAdminlist (context) {
    invoke({
      url: api.adminList,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var list = ret.data.payload
          // 
          context.commit({
            type: 'recordAdminlist',
            data: list
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员列表
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
  }, // 是否显示层级关系

  startLoading (state, payload) {
    state.variable.isloading = true
  }, // 启动Loading

  closeLoading (state, payload) {
    state.variable.isloading = false
  }, // 关闭Loading

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
    // 
  }, // 记录当前所在页面

  recordOutlist (state, payload) {
    state.variable.outlist = payload.data
    state.variable.copyoutlist = payload.data
  }, // 记录线路商列表

  recordComlist (state, payload) {
    state.variable.comlist = payload.data
    state.variable.copycomlist = payload.data
  }, // 记录一般商户列表

  postSearch_conditon (state, payload) {
    state.variable.condition = payload.data
    
  }, // 记录搜索条件

  searchOutlist () {
    state.variable.outlist = state.variable.copyoutlist
    if (state.variable.condition.condition_one) {
      state.variable.outlist = state.variable.outlist.filter(item => {
        return item.suffix === state.variable.condition.condition_one
      })
    } else if (state.variable.condition.condition_two) {
      state.variable.outlist = state.variable.outlist.filter(item => {
        return item.displayName === state.variable.condition.condition_two
      })
    } else if (state.variable.condition.condition_three) {
      state.variable.outlist = state.variable.outlist.filter(item => {
        return item.managerEmail === state.variable.condition.condition_three
      })
    } else if (state.variable.condition.condition_four) {
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.outlist = state.variable.outlist.filter(item => {
        return a <= item.createdAt && item.createdAt <= b
      })
    }
  }, // 搜索线路商列表数据

  searchComlist () {
    state.variable.comlist = state.variable.copycomlist
    if (state.variable.condition.condition_one) {
      state.variable.comlist = state.variable.comlist.filter(item => {
        return item.suffix === state.variable.condition.condition_one
      })
    } else if (state.variable.condition.condition_two) {
      state.variable.comlist = state.variable.comlist.filter(item => {
        return item.displayName === state.variable.condition.condition_two
      })
    } else if (state.variable.condition.condition_three) {
      state.variable.comlist = state.variable.comlist.filter(item => {
        return item.managerEmail === state.variable.condition.condition_three
      })
    } else if (state.variable.condition.condition_four) {
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.comlist = state.variable.comlist.filter(item => {
        return a <= item.createdAt && item.createdAt <= b
      })
    }
  }, // 搜索商户列表数据

  recordNowlistUser (state, payload) {
    state.variable.nowUser = payload.data
  }, // 记录当前列表页面操作的用户的信息

  recordOutdetailID (state, payload) {
    state.variable.outdetailID = payload.data
    localStorage.setItem('outdetailID', payload.data)
  }, // 记录线路商详情页ID

  recordComdetailID (state, payload) {
    state.variable.comdetailID = payload.data
    localStorage.setItem('comdetailID', payload.data)
  }, // 记录一般商户详情页ID

  changeSteps () {
    state.variable.steps++
    if (state.variable.steps === 2) {
      state.variable.steps = 3
    }
    if (state.variable.steps > 3) {
      state.variable.steps = 3
    }
  }, // 改变步骤条状态

  resetSteps () {
    state.variable.steps = 0
  }, // 重置步骤条

  recordOutcreate (state, payload) {
    state.variable.outcreate = {
      ...state.variable.outcreate,
      ...payload.data
    }
    // 
  }, // 记录线路商注册数据

  recordComcreate (state, payload) {
    state.variable.comcreate = {
      ...state.variable.comcreate,
      ...payload.data
    }
    
  }, // 记录一般商户注册数据

  recordOutsuccess (state, payload) {
    state.variable.outsuccess = payload.data
  }, // 记录线路商注册成功后返回数据

  recordComsuccess (state, payload) {
    state.variable.comsuccess = payload.data
  }, // 记录一般商户注册成功后返回数据

  recordOutdetaildata (state, payload) {
    state.variable.outdetaildata = payload.data
  }, // 记录线路商详情页基本数据

  recordComdetaildata (state, payload) {
    state.variable.comdetaildata = payload.data
  }, // 记录一般商户详情页基本数据

  recordOutdetail_property (state, payload) {
    state.variable.outdetailproperty = payload.data
  }, // 记录线路商详情页财务信息

  recordComdetail_property (state, payload) {
    state.variable.comdetailproperty = payload.data
  }, // 记录商户详情页财务信息

  recordOutdetail_child_managers (state, payload) {
    state.variable.outdetailmanagers = payload.data
  }, // 记录线路商详情页下级线路商列表

  recordOutdetail_child_merchants (state, payload) {
    state.variable.outdetailmerchants = payload.data
  }, // 记录线路商详情页下级商户列表

  recordPersonal_info (state, payload) {
    state.variable.personalinfo = payload.data
  }, // 记录线路商详情页下级商户列表

  recordPersonal_property (state, payload) {
    state.variable.personalproperty = payload.data
  }, // 记录线路商详情页下级商户列表

  resetIsproperty () {
    state.variable.isproperty = false
  }, // 重置操作详情页线路商状态

  resetCheckform () {
    state.checkform = {
      suffix: false,
      displayName: false,
      email: false,
      rate: false,
      hostName: false,
      hostContact: false,
      contractPeriod: false,
      isforever: false,
      points: false,
      limit: false,
      username: false,
      password: false,
      name: false,
      useradmin: false,
      userContact: false,
      msn: false,
      loginWhitelist: false,
      frontURL: false
    }
  }, // 初始化表单验证

  getpointsIndex (state, payload) {
    state.variable.pointsIndex = payload.data
  }, // 存提点发起方式

  getpointsObject (state, payload) {
    state.variable.pointsObject = payload.data
    
  }, // 获取对详情页用户发起存提点操作的下级信息

  startEdit (state, payload) {
    state.variable.isEdit = true
  }, // 开启编辑功能

  closeEdit (state, payload) {
    state.variable.isEdit = false
  }, // 关闭编辑功能

  startStoreDialog (state, payload) {
    state.variable.storeDialog = true
  }, // 开启存点对话框

  closeStoreDialog (state, payload) {
    state.variable.storeDialog = false
  }, // 关闭存点对话框

  startWithdrawDialog (state, payload) {
    state.variable.withdrawDialog = true
  }, // 开启提点对话框

  closeWithdrawDialog (state, payload) {
    state.variable.withdrawDialog = false
  }, // 关闭提点对话框

  finishPoints () {
    state.variable.isfinish = true
  }, // 更新存提点状态

  resetfinish () {
    state.variable.isfinish = false
  }, // 初始化存提点状态

  recordGamelistData (state, payload) {
    state.variable.gameListData = payload.data
  }, // 获取所有游戏列表数据

  recordPersonal_bills (state, payload) {
    state.variable.personalbills = payload.data
  }, // 存储管理员个人中心余额

  recordManager_LoginList (state, payload) {
    state.variable.managerLoginList = payload.data
  }, // 存储线路商登录日志

  recordMerchant_LoginList (state, payload) {
    state.variable.merchantLoginList = payload.data
  }, // 存储商户登录日志

  recordAdmin_cooperDate (state, payload) {
    state.variable.adminCooperdate = payload.data
  }, // 存储管理员操作日志

  recordAdminlist (state, payload) {
    state.variable.adminList = payload.data
  }, // 存储管理员列表

  recordMsnlist (state, payload) {
    state.variable.msnList = payload.data
    state.variable.copymsnList = payload.data
  }, // 存储线路号列表

  recordSearchMsn (state, payload) {
    state.variable.msn = payload.data
  }, // 记录搜索的线路号

  recordOutParent_Bills (state, payload) {
    state.variable.outparentBills = payload.data
  }, // 存储上级线路商余额

  recordComParent_Bills (state, payload) {
    state.variable.comparentBills = payload.data
  }, // 存储上级商户余额

  searchMsnlist () {
    state.variable.msnList = state.variable.copymsnList
    state.variable.msnList = state.variable.msnList.filter(item => {
      return Number(item.msn) === Number(state.variable.msn)
    })
  }, // 搜索线路号

  playerDetail (state, payload) {
    state.variable.playerDetail = payload.data
  }, // 存储玩家详细

  rememberBoothType (state, payload) {
    state.variable.boothType = payload.data
  },

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
