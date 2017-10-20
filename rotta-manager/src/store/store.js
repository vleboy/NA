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
  getMap (context) {
    var data = {
      type: 'admin'
    }
    invoke({
      url: api.map,
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
          var data = []
          data.push(ret.data.payload)
          // console.log('层级关系数据', data)
          context.commit({
            type: 'recordMap',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员页面层级关系
  getOutlist (context) {
    var data = {
      query: {},
      sortkey: 'createdAt',
      sort: 'desc'
    }
    if (state.variable.condition.condition_one) {
      data.query.suffix = state.variable.condition.condition_one
    }
    if (state.variable.condition.condition_two) {
      data.query.displayName = state.variable.condition.condition_two
    }
    if (state.variable.condition.condition_three) {
      data.query.managerEmail = state.variable.condition.condition_three
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      data.query.createdAt = state.variable.condition.condition_four
    }
    // console.log('data', data)
    invoke({
      url: api.managers,
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
          // console.log('线路商列表数据', data)
          context.commit({
            type: 'recordOutlist',
            data: data
          })
          // context.commit('searchOutlist')
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取线路商列表
  getComlist (context) {
    var data = {
      query: {},
      sortkey: 'createdAt',
      sort: 'desc'
    }
    if (state.variable.condition.condition_one) {
      data.query.suffix = state.variable.condition.condition_one
    }
    if (state.variable.condition.condition_two) {
      data.query.msn = state.variable.condition.condition_two
    }
    if (state.variable.condition.condition_three) {
      data.query.displayName = state.variable.condition.condition_three
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      data.query.createdAt = state.variable.condition.condition_four
    }
    // console.log('data', data)
    invoke({
      url: api.merchants,
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
          // console.log('商户列表数据', data)
          context.commit({
            type: 'recordComlist',
            data: data
          })
          // context.commit('searchComlist')
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取商户列表
  getOutdetail (context) {
    var outdetailID = ''
    if (!state.variable.outdetailID) {
      outdetailID = localStorage.outdetailID
    } else {
      outdetailID = state.variable.outdetailID
    }
    invoke({
      url: api.managers + '/' + outdetailID,
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
          // console.log('线路商详细数据', data)
          context.commit({
            type: 'recordOutdetaildata',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取详情页线路商基本信息
  getOutdetail_property (context) {
    var outdetailID = ''
    if (state.variable.outdetailID) {
      outdetailID = localStorage.outdetailID
    } else {
      outdetailID = state.variable.outdetailID
    }
    invoke({
      url: api.waterFall + '/' + outdetailID,
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
          // console.log('线路商账户流水详情', data)
          context.commit({
            type: 'recordOutdetail_property',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取详情页线路商财务信息
  getOutdetail_child_managers (context) {
    var outdetailID = ''
    if (state.variable.outdetailID) {
      outdetailID = localStorage.outdetailID
    } else {
      outdetailID = state.variable.outdetailID
    }
    return invoke({
      url: api.getchilds + '/' + outdetailID + '/' + '10',
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
          // console.log('详情页所属线路商数据:', data)
          context.commit({
            type: 'recordOutdetail_child_managers',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 线路商详情页所属线路商列表
  getOutdetail_child_merchants (context) {
    var outdetailID = ''
    if (state.variable.outdetailID) {
      outdetailID = localStorage.outdetailID
    } else {
      outdetailID = state.variable.outdetailID
    }
    invoke({
      url: api.getchilds + '/' + outdetailID + '/' + '100',
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
          // console.log('详情页所属商户数据:', data)
          context.commit({
            type: 'recordOutdetail_child_merchants',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 线路商详情页所属商户列表
  getComdetail (context) {
    var comdetailID = ''
    if (!state.variable.comdetailID) {
      comdetailID = localStorage.comdetailID
    } else {
      comdetailID = state.variable.comdetailID
    }
    invoke({
      url: api.merchants + '/' + comdetailID,
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
          // console.log('商户详细数据', data)
          context.commit({
            type: 'recordComdetaildata',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取详情页商户基本信息
  getComdetail_property (context) {
    var comdetailID = ''
    if (state.variable.comdetailID) {
      comdetailID = localStorage.comdetailID
    } else {
      comdetailID = state.variable.comdetailID
    }
    invoke({
      url: api.waterFall + '/' + comdetailID,
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
          // console.log('商户账户流水详情', data)
          context.commit({
            type: 'recordComdetail_property',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取详情页商户财务信息
  getPersonal_info (context) {
    invoke({
      url: api.managers + '/' + localStorage.loginId,
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
          // console.log('管理员基本信息', data)
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
          // console.log('管理员点数操作记录', data)
          context.commit({
            type: 'recordPersonal_property',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员个人中心点数操作记录
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
          // console.log('所有游戏列表数据', data)
          context.commit({
            type: 'recordGamelistData',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取所有游戏列表
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
          // console.log('线路商登录日志是', list)
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
          // console.log('商户登录日志是', list)
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
      role: '10',
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
          // console.log('管理员操作日志是', list)
          context.commit({
            type: 'recordAdmin_cooperDate',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }, // 获取管理员操作日志
  getPersonal_bills (context) {
    var userId = localStorage.loginId
    invoke({
      url: api.bills + '/' + userId,
      method: 'get'
    }).then(
      result => {
        const [res, ret] = result
        if (res) {
        } else {
          var data = ret.data.payload.balance
          // console.log('账户余额', data)
          context.commit({
            type: 'record_personalBills',
            data: data
          })
        }
      }
    )
  }, // 获取登录用户账户余额
  getAdminlist (context) {
    var data = {
      query: {},
      sortkey: 'createdAt',
      sort: 'desc'
    }
    if (state.variable.condition.condition_one) {
      data.query.uname = state.variable.condition.condition_one
    }
    if (state.variable.condition.condition_two) {
      data.query.adminName = state.variable.condition.condition_two
    }
    if (state.variable.condition.condition_three) {
      data.query.adminEmail = state.variable.condition.condition_three
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      data.query.createdAt = state.variable.condition.condition_four
    }
    // console.log('data', data) 
    invoke({
      url: api.adminList,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var list = ret.data.payload
          // console.log('管理员列表是: ', list)
          context.commit({
            type: 'recordAdminlist',
            data: list
          })
          // context.commit('searchAdminlist')
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员列表
  getMsnList (context) {
    invoke({
      url: api.msnList,
      method: api.post
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var sortList = ret.data.payload.Items
          sortList = sortList.sort(function compared (msn1, msn2) {
            var value1 = parseInt(msn1.msn)
            var value2 = parseInt(msn2.msn)
            if (value1 < value2) {
              return -1
            } else if (value1 > value2) {
              return 1
            } else {
              return 0
            }
          })
          context.commit({
            type: 'recordMsnlist',
            data: sortList
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取线路号列表
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

  recordMap (state, payload) {
    state.variable.map = payload.data
  }, // 记录线路商页面层级关系

  selectParent (state, payload) {
    state.variable.nowParent = payload.data
  },

  pushPlayer (state, payload) {
    var player = payload.data
    var list1 = state.variable.map[0].children[0].children
    var list2 = state.variable.map[0].children[1].children
    for (let item1 of list1) {
      if (item1.id == player.parentId) {
        item1.children = player.playerList
        // console.log('非直属', item1.children)
      }
    }
    for (let item2 of list2) {
      if (item2.id == player.parentId) {
        item2.children = player.playerList
        // console.log('直属', item2.children)
      }
    }
    // console.log('现在数组', state.variable.map[0])
  }, // 将玩家数据插入层级关系

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
    // console.log('当前页面是:', state.variable.nowIndex)
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
    // console.log('搜索条件是', state.variable.condition)
  }, // 记录搜索条件

  searchOutlist () {
    state.variable.outlist = state.variable.copyoutlist
    if (state.variable.condition.condition_one) {
      var result1 = []
      state.variable.outlist.filter(item => {
        if (item.suffix.indexOf(state.variable.condition.condition_one) != -1) {
          result1.push(item)
        }
      })
      state.variable.outlist = result1
    }
    if (state.variable.condition.condition_two) {
      var result2 = []
      state.variable.outlist.filter(item => {
        if (item.displayName.indexOf(state.variable.condition.condition_two) != -1) {
          result2.push(item)
        }
      })
      state.variable.outlist = result2
    }
    if (state.variable.condition.condition_three) {
      var result3 = []
      state.variable.outlist.filter(item => {
        if (item.managerEmail.indexOf(state.variable.condition.condition_three) != -1) {
          result3.push(item)
        }
      })
      state.variable.outlist = result3
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0) {
      var result4 = []
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.outlist.filter(item => {
        if (a <= item.createdAt && item.createdAt <= b) {
          result4.push(item)
        }
      })
      state.variable.outlist = result4
    }
    if (!state.variable.condition.condition_one && !state.variable.condition.condition_two && !state.variable.condition.condition_three && !state.variable.condition.condition_four) {
      state.variable.outlist = state.variable.copyoutlist
    }
  }, // 搜索线路商列表数据

  searchComlist () {
    state.variable.comlist = state.variable.copycomlist
    if (state.variable.condition.condition_one) {
      var result1 = []
      state.variable.comlist.filter(item => {
        if (item.suffix.indexOf(state.variable.condition.condition_one) != -1) {
          result1.push(item)
        }
      })
      state.variable.comlist = result1
    }
    if (state.variable.condition.condition_two) {
      var result2 = []
      state.variable.comlist.filter(item => {
        if (Number(item.msn) == Number(state.variable.condition.condition_two)) {
          result2.push(item)
        }
      })
      state.variable.comlist = result2
    }
    if (state.variable.condition.condition_three) {
      var result3 = []
      state.variable.comlist.filter(item => {
        if (item.displayName.indexOf(state.variable.condition.condition_three) != -1) {
          result3.push(item)
        }
      })
      state.variable.comlist = result3
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      var result4 = []
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.comlist.filter(item => {
        if (a <= item.createdAt && item.createdAt <= b) {
          result4.push(item)
        }
      })
      state.variable.comlist = result4
    }
    if (!state.variable.condition.condition_one && !state.variable.condition.condition_two && !state.variable.condition.condition_three && !state.variable.condition.condition_four) {
      state.variable.comlist = state.variable.copycomlist
    }
  }, // 搜索商户列表数据

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
    // console.log(state.variable.outcreate)
  }, // 记录线路商注册数据

  recordComcreate (state, payload) {
    state.variable.comcreate = {
      ...state.variable.comcreate,
      ...payload.data
    }
    // console.log(state.variable.comcreate)
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
    // console.log('存提点下级的信息是', state.variable.pointsObject)
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

  recordManager_LoginList (state, payload) {
    state.variable.managerLoginList = payload.data
    state.variable.copyManagerLoginList = payload.data
  }, // 存储线路商登录日志

  searchManagerloginlist (state, payload) {
    state.variable.managerLoginList = state.variable.copyManagerLoginList
    if (state.variable.condition.condition_one) {
      var result1 = []
      state.variable.managerLoginList.filter(item => {
        if (item.suffix.indexOf(state.variable.condition.condition_one) != -1) {
          result1.push(item)
        }
      })
      state.variable.managerLoginList = result1
    }
    if (state.variable.condition.condition_two) {
      var result2 = []
      state.variable.managerLoginList.filter(item => {
        if (item.displayName && item.displayName.indexOf(state.variable.condition.condition_two) != -1) {
          result2.push(item)
        }
      })
      state.variable.managerLoginList = result2
    }
    if (state.variable.condition.condition_three) {
      var result3 = []
      state.variable.managerLoginList.filter(item => {
        if (item.lastIP.indexOf(state.variable.condition.condition_three) != -1) {
          result3.push(item)
        }
      })
      state.variable.managerLoginList = result3
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      var result4 = []
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.managerLoginList.filter(item => {
        if (a <= item.lastLogin && item.lastLogin <= b) {
          result4.push(item)
        }
      })
      state.variable.managerLoginList = result4
    }
    if (!state.variable.condition.condition_one && !state.variable.condition.condition_two && !state.variable.condition.condition_three && !state.variable.condition.condition_four) {
      state.variable.managerLoginList = state.variable.copyManagerLoginList
    }
  }, // 搜索线路商登录日志

  recordMerchant_LoginList (state, payload) {
    state.variable.merchantLoginList = payload.data
    state.variable.copyMerchantLoginList = payload.data
  }, // 存储商户登录日志

  searchMerchantloginlist (state, payload) {
    state.variable.merchantLoginList = state.variable.copyMerchantLoginList
    if (state.variable.condition.condition_one) {
      var result1 = []
      state.variable.merchantLoginList.filter(item => {
        if (item.suffix.indexOf(state.variable.condition.condition_one) != -1) {
          result1.push(item)
        }
      })
      state.variable.merchantLoginList = result1
    }
    if (state.variable.condition.condition_two) {
      var result2 = []
      state.variable.merchantLoginList.filter(item => {
        if (item.displayName && item.displayName.indexOf(state.variable.condition.condition_two) != -1) {
          result2.push(item)
        }
      })
      state.variable.merchantLoginList = result2
    }
    if (state.variable.condition.condition_three) {
      var result3 = []
      state.variable.merchantLoginList.filter(item => {
        if (item.lastIP.indexOf(state.variable.condition.condition_three) != -1) {
          result3.push(item)
        }
      })
      state.variable.merchantLoginList = result3
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      var result4 = []
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.merchantLoginList.filter(item => {
        if (a <= item.lastLogin && item.lastLogin <= b) {
          result4.push(item)
        }
      })
      state.variable.merchantLoginList = result4
    }
    if (!state.variable.condition.condition_one && !state.variable.condition.condition_two && !state.variable.condition.condition_three && !state.variable.condition.condition_four) {
      state.variable.merchantLoginList = state.variable.copyMerchantLoginList
    }
  }, // 搜索商户登录日志

  recordAdmin_cooperDate (state, payload) {
    state.variable.adminCooperdate = payload.data
  }, // 存储管理员操作日志

  recordAdminlist (state, payload) {
    state.variable.adminList = payload.data
  }, // 存储管理员列表

  record_personalBills (state, payload) {
    state.variable.personalbills = payload.data
  }, // 存储登录用户余额

  recordNowlistUser (state, payload) {
    state.variable.nowUser = payload.data
  }, // 记录当前列表页面操作的用户的信息

  recordMsnlist (state, payload) {
    state.variable.msnList = payload.data
  }, // 存储线路号列表

  playerDetail (state, payload) {
    state.variable.playerDetail = payload.data
  }, // 存储玩家详细
  
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
