import Vue from 'vue'
import Vuex from 'vuex'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import variable from '@/variables/variable'
import checkform from '@/variables/checkform'
Vue.use(Vuex) // 全局注册
const state = {
  variable,
  checkform,
  ajaxCount: 0,
  orignPage: 0,
  startTime: '',
  endTime: ''
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
          context.commit('closeMap')
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = []
          data.push(ret.data.payload)
          context.commit({
            type: 'recordMap',
            data: data
          })
          context.commit('closeMap')
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          localStorage.setItem('parentID', data.parent)
          context.commit({
            type: 'recordOutdetaildata',
            data: data
          })
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordOutdetail_property',
            data: data
          })
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordOutdetail_child_managers',
            data: data
          })
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordOutdetail_child_merchants',
            data: data
          })
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          localStorage.setItem('parentID', data.parent)
          context.commit({
            type: 'recordComdetaildata',
            data: data
          })
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordComdetail_property',
            data: data
          })
        }
      }
    )
  }, // 获取详情页商户财务信息
  getoutParentBills (context) {
    var parentId = ''
    if (!state.variable.outcreate.parent) {
      parentId = localStorage.loginId
    } else {
      parentId = state.variable.outcreate.parent
    }
    // console.log('上级ID', parentId)
    invoke({
      url: api.bills + '/' + parentId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          // console.log(data)
          context.commit({
            type: 'recordOutParent_Bills',
            data: data
          })
        }
      }
    )
  }, // 获取创建线路商上级余额
  getcomParentBills (context) {
    var parentId = ''
    if (!state.variable.comcreate.parent) {
      parentId = localStorage.loginId
    } else {
      parentId = state.variable.comcreate.parent
    }
    // console.log('上级ID', parentId)
    invoke({
      url: api.bills + '/' + parentId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          // console.log(data)
          context.commit({
            type: 'recordComParent_Bills',
            data: data
          })
        }
      }
    )
  }, // 获取创建商户上级余额
  getPersonal_info_admin (context) {
    invoke({
      url: api.adminCenter,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordPersonal_info',
            data: data
          })
        }
      }
    )
  }, // 获取管理员个人中心基本信息
  getPersonal_info_manager (context) {
    invoke({
      url: api.managers + '/' + localStorage.loginId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordPersonal_info',
            data: data
          })
        }
      }
    )
  },
  getPersonal_info_merchant (context) {
    invoke({
      url: api.merchants + '/' + localStorage.loginId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit('countAjax')
          context.commit({
            type: 'recordPersonal_info',
            data: data
          })
        }
      }
    )
  },
  getPersonal_property (context) {
    invoke({
      url: api.waterFall + '/' + localStorage.loginId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
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
          state.variable.partLoading.billLoading = false
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
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload.balance
          context.commit('countAjax')
          context.commit({
            type: 'recordPersonal_bills',
            data: data
          })
        }
      }
    )
  }, // 获取管理员个人中心余额
  async getAllGameList (context) {
    let data = {
      parent: localStorage.loginId
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    }
    // 获取该用户游戏中心的游戏运营商
    let result1 = await invoke({
      url: api.companySelect,
      method: api.post,
      data: data
    })
    let companyList = result1[1].data.payload
    for (let item of companyList) {
      item.client = item.client + '游戏'
    }
    context.commit({
      type: 'recordCompanyList',
      data: companyList
    })
    context.commit('resetAllGameList')
    for (let company of companyList) {
      let _data = {
        companyIden: company.server
      }
      invoke({
        url: api.gameBigType,
        method: api.post,
        data: _data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'warning'
            })
          } else {
            var data = ret.data.payload
            for (let type of data) {
              let gameType = {
                gameType: type.code
              }
              invoke({
                url: api.gameList,
                method: api.post,
                data: gameType
              }).then(
                result => {
                  const [err, ret] = result
                  if (err) {
                  } else {
                    context.commit('closeLoading')
                    var list = ret.data.payload
                    context.commit({
                      type: 'recordAllGameList',
                      data: list
                    })             
                  }
                }
              )
            }
          }
        }
      )
    }
  }, // 获取该用户游戏中心的所有游戏
  getCompanyGame (context) {
    let data = {
      companyIden: localStorage.nowCompany
    }
    invoke({
      url: api.gameBigType,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          this.$message({
            message: err.msg,
            type: 'warning'
          })
        } else {
          var data = ret.data.payload
          context.commit({
            type: 'recordCompanyGame',
            data: data
          })
        }
      }
    )
  }, // 获取该用户游戏中心的游戏运营商游戏
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
        // context.commit('searchManagerloginlist')
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
      role: '1',
      type: 'operate',
      pageSize: 40,
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
          if (state,variable.msn) {
            context.commit('searchMsnlist')
          }
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取线路号列表
  getRightlist (context) {
    invoke({
      url: api.subRoleList,
      method: api.post
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload.Items
          context.commit({
            type: 'recordRightlist',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员权限列表
  getAllright (context) {
    invoke({
      url: api.subRolePermissionList,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          context.commit({
            type: 'recordAllright',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员所有权限
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
  },

  async getnaAllNowchild (context) {
    // 请求当前基本信息
    let require = {
      userId: ''
    }
    if (state.variable.naAllGameData.nowUserID) {
      require.userId = state.variable.naAllGameData.nowUserID
    } else {
      require.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: require
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.naAllGameData.nowUserID || !state.variable.naAllGameData.nowUserID && user.userId == localStorage.loginId) {
      let data = user
      data.betCount = 0
      data.allWinlose = 0
      data.allSubmit = 0
      data.vedioWinlose = 0
      data.vedioSubmit = 0
      data.liveWinlose = 0
      data.liveSubmit = 0
      data.arcadeWinlose = 0
      data.arcadeSubmit = 0
      context.commit({
        type: 'recordnaAllNowlist',
        data: data
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.naAllGameData.nowUserID) {
      data.parent = state.variable.naAllGameData.nowUserID
    }
    // 请求下级信息
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    for (let item of child) {
      item.betCount = 0
      item.allWinlose = 0
      item.allSubmit = 0
      item.vedioWinlose = 0
      item.vedioSubmit = 0
      item.liveWinlose = 0
      item.liveSubmit = 0
      item.arcadeWinlose = 0
      item.arcadeSubmit = 0
    }
    // 请求下级账单信息
    context.commit('resetnaAllchildInfo')
    for (let item of child) {
      let child_live = {
        gameType: 30000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // 真人账单请求参数
      let child_vedio = {
        gameType: 40000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // 棋牌账单请求参数
      let child_arcade = {
        gameType: 50000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // 街机账单请求参数
      
      let p1 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_live
      }) // 真人账单数据

      let p2 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_vedio
      }) // 棋牌账单数据

      let p3 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_arcade
      }) // 街机账单数据

      Promise.all([p1,p2,p3]).then(result=>{
        let result1 = result[0][1].data.payload[0]
        if (result1 && result1.betCount > 0) {
          item.betCount += result1.betCount
          item.allWinlose += result1.winlose
          item.allSubmit += result1.winlose * (1 - item.rate / 100)
          item.liveWinlose = result1.winlose
          item.liveSubmit = result1.winlose * (1 - item.rate / 100)
        }
        let result2 = result[1][1].data.payload[0]
        if (result2 && result2.betCount > 0) {
          item.betCount += result2.betCount
          item.allWinlose += result2.winlose
          item.allSubmit += result2.winlose * (1 - item.rate / 100)
          item.vedioWinlose = result2.winlose
          item.vedioSubmit = result2.winlose * (1 - item.rate / 100)
        }
        let result3 = result[2][1].data.payload[0]
        if (result3 && result3.betCount > 0) {
          item.betCount += result3.betCount
          item.allWinlose += result3.winlose
          item.allSubmit += result3.winlose * (1 - item.rate / 100)
          item.arcadeWinlose = result3.winlose
          item.arcadeSubmit = result3.winlose * (1 - item.rate / 100)
        }
        if (item.betCount > 0) {
          context.commit({
            type: 'recordnaAllchildInfo',
            data: item
          })
        }
      })
      context.commit('closeLoading')
    }
  }, // NA所有游戏下级列表(综合计算上级)
  async getnaAllNowplayer (context) {
    if (state.variable.naAllGameData.nowUserID == '01' || !state.variable.naAllGameData.nowUserID) {
      if (localStorage.loginRole == '100') {
        var data = {
          parentId: localStorage.loginId
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetnaAllNowplayer')
        for (let item of player) {
          let player_live = {
            gameType: 30000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          } // 请求真人游戏玩家
          let player_vedio = {
            gameType: 40000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          } // 请求电子游戏玩家
          let player_arcade = {
            gameType: 50000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          } // 请求街机游戏玩家

          let p1 = invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_live
          }) // 真人游戏玩家账单
          let p2 = invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_vedio
          }) // 电子游戏玩家账单
          let p3 = invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_arcade
          }) // 街机游戏玩家账单
          
          Promise.all([p1,p2,p3]).then(
            result => {
              let result1 = result[0][1].data.payload[0]
              if (result1 && result1.betCount > 0) {
                item.betCount += result1.betCount
                item.allWinlose += result1.winlose
                item.liveWinlose = result1.winlose
              }
              let result2 = result[1][1].data.payload[0]
              if (result2 && result2.betCount > 0) {
                item.betCount += result2.betCount
                item.allWinlose += result2.winlose
                item.vedioWinlose = result2.winlose
              }
              let result3 = result[2][1].data.payload[0]
              if (result3 && result3.betCount > 0) {
                item.betCount += result3.betCount
                item.allWinlose += result3.winlose
                item.arcadeWinlose = result3.winlose
              }
              if (item.betCount > 0) {
                context.commit({
                  type: 'recordnaAllNowplayer',
                  data: item
                })
              }
            }
          )
          context.commit('closeLoading')
        }
      }
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.naAllGameData.nowUserID
      }
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      for (let item of player) {
        item.betCount = 0
        item.allWinlose = 0
        item.vedioWinlose = 0
        item.liveWinlose = 0
        item.arcadeWinlose = 0
      }
      context.commit('resetnaAllNowplayer')
      for (let item of player) {
        let player_live = {
          gameType: 30000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求真人游戏玩家
        let player_vedio = {
          gameType: 40000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求电子游戏玩家
        let player_arcade = {
          gameType: 50000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求街机游戏玩家

        let p1 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_live
        }) // 真人游戏玩家账单
        let p2 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_vedio
        }) // 电子游戏玩家账单
        let p3 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_arcade
        }) // 街机游戏玩家账单

        Promise.all([p1,p2,p3]).then(
          result => {
            let result1 = result[0][1].data.payload[0]
            if (result1 && result1.betCount > 0) {
              item.betCount += result1.betCount
              item.allWinlose += result1.winlose
              item.liveWinlose = result1.winlose
            }
            let result2 = result[1][1].data.payload[0]
            if (result2 && result2.betCount > 0) {
              item.betCount += result2.betCount
              item.allWinlose += result2.winlose
              item.vedioWinlose = result2.winlose
            }
            let result3 = result[2][1].data.payload[0]
            if (result3 && result3.betCount > 0) {
              item.betCount += result3.betCount
              item.allWinlose += result3.winlose
              item.arcadeWinlose = result3.winlose
            }
            if (item.betCount > 0) {
              context.commit({
                type: 'recordnaAllNowplayer',
                data: item
              })
            }
          }
        )
        context.commit('closeLoading')
      }
    }
  }, // NA所有游戏所属玩家列表(综合计算上级)

  async getnaVedioNowchild (context) {
    // 请求当前基本信息
    let require = {
      userId: ''
    }
    if (state.variable.naVedioGameData.nowUserID) {
      require.userId = state.variable.naVedioGameData.nowUserID
    } else {
      require.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: require
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.naVedioGameData.nowUserID || !state.variable.naVedioGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaVedioNowlist',
        data: user
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.naVedioGameData.nowUserID) {
      data.parent = state.variable.naVedioGameData.nowUserID
    }
    // 请求下级信息
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetnaVedioNowchild')
    let count = {
      bet: 0,
      betCount: 0,
      winlose: 0,
      winloseRate: 0
    } // 当前用户下级账单总额
    for (let item of child) {
      let child_data = {
        gameType: 40000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      }
      invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            context.commit('closeLoading')
            var data = ret.data.payload[0]
            if (data) {
              if (item.userId == data.userId) {
                item.bet = data.bet
                item.betCount = data.betCount
                item.winlose = data.winlose
                item.submit = data.winlose * (1 - item.rate/100)
                item.winloseRate = data.winlose / data.bet
                context.commit({
                  type: 'recordnaVedioNowchild',
                  data: item
                })
              }
            }
          }
        }
      )
    }
  }, // NA电子游戏下级列表(综合计算上级)
  async getnaVedioNowplayer (context) {
    if (state.variable.naVedioGameData.nowUserID == '01' || !state.variable.naVedioGameData.nowUserID) {
      if (localStorage.loginRole == '100') {
        var data = {
          parentId: localStorage.loginId
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetnaVedioNowplayer')
        for (let item of player) {
          let player_data = {
            gameType: 40000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          }
          invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
              } else {
                context.commit('closeLoading')
                var data = ret.data.payload[0]
                if (data) {
                  if (item.userName == data.userName) {
                    item.bet = data.bet
                    item.betCount = data.betCount
                    item.winlose = data.winlose
                    item.winloseRate = data.winlose / data.bet
                    context.commit({
                      type: 'recordnaVedioNowplayer',
                      data: item
                    })
                  }
                }
              }
            }
          )
        }
      }
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.naVedioGameData.nowUserID
      }
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetnaVedioNowplayer')
      for (let item of player) {
        let player_data = {
          gameType: 40000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        }
        invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              context.commit('closeLoading')
              var data = ret.data.payload[0]
              if (data) {
                if (item.userName == data.userName) {
                  item.bet = data.bet
                  item.betCount = data.betCount
                  item.winlose = data.winlose
                  item.winloseRate = data.winlose / data.bet
                  context.commit({
                    type: 'recordnaVedioNowplayer',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // NA电子游戏所属玩家列表(综合计算上级)
  async getnaLiveNowchild (context) {
    // 请求当前用户基本信息
    let nowdata = {
      userId: ''
    }
    if (state.variable.naLiveGameData.nowUserID) {
      nowdata.userId = state.variable.naLiveGameData.nowUserID
    } else {
      nowdata.userId = localStorage.loginId
    }
    // 请求基本信息
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: nowdata
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.naLiveGameData.nowUserID || !state.variable.naLiveGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaLiveNowlist',
        data: user
      })
    }
    // 请求下级信息
    var data = {
      parent: ''
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.naLiveGameData.nowUserID) {
      data.parent = state.variable.naLiveGameData.nowUserID
    }
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetnaLiveNowchild')
    for (let item of child) {
      let child_data = {
        gameType: 30000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      }
      invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            context.commit('closeLoading')
            var data = ret.data.payload[0]
            if (data) {
              if (item.userId == data.userId) {
                item.bet = data.bet
                item.betCount = data.betCount
                item.winlose = data.winlose
                item.mixAmount = data.mixAmount
                item.submit = data.winlose * (1 - item.rate/100)
                item.winloseRate = data.winlose / data.mixAmount
                context.commit({
                  type: 'recordnaLiveNowchild',
                  data: item
                })
              }
            }
          }
        }
      )
    }
  }, // NA真人游戏下级列表
  async getnaLiveNowplayer (context) {
    if (state.variable.naLiveGameData.nowUserID == '01' || !state.variable.naLiveGameData.nowUserID) {
      if (localStorage.loginRole == '100') {
        var data = {
          parentId: localStorage.loginId
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetnaLiveNowplayer')
        for (let item of player) {
          let player_data = {
            gameType: 30000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          }
          invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
              } else {
                context.commit('closeLoading')
                var data = ret.data.payload[0]
                if (data) {
                  if (item.userName == data.userName) {
                    item.bet = data.bet
                    item.betCount = data.betCount
                    item.winlose = data.winlose
                    item.mixAmount = data.mixAmount
                    context.commit({
                      type: 'recordnaLiveNowplayer',
                      data: item
                    })
                  }
                }
              }
            }
          )
        }
      }
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.naLiveGameData.nowUserID
      }
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetnaLiveNowplayer')
      for (let item of player) {
        let player_data = {
          gameType: 30000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        }
        invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              context.commit('closeLoading')
              var data = ret.data.payload[0]
              if (data) {
                if (item.userName == data.userName) {
                  item.bet = data.bet
                  item.betCount = data.betCount
                  item.winlose = data.winlose
                  item.mixAmount = data.mixAmount
                  context.commit({
                    type: 'recordnaLiveNowplayer',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // NA真人游戏所属玩家列表
  async getnaArcadeNowchild (context) {
    // 请求当前基本信息
    let require = {
      userId: ''
    }
    if (state.variable.naArcadeGameData.nowUserID) {
      require.userId = state.variable.naArcadeGameData.nowUserID
    } else {
      require.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: require
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.naArcadeGameData.nowUserID || !state.variable.naArcadeGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaArcadeNowlist',
        data: user
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.naArcadeGameData.nowUserID) {
      data.parent = state.variable.naArcadeGameData.nowUserID
    }
    // 请求下级信息
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetnaArcadeNowchild')
    let count = {
      bet: 0,
      betCount: 0,
      winlose: 0,
      winloseRate: 0
    } // 当前用户下级账单总额
    for (let item of child) {
      let child_data = {
        gameType: 50000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      }
      invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            context.commit('closeLoading')
            var data = ret.data.payload[0]
            if (data) {
              if (item.userId == data.userId) {
                item.bet = data.bet
                item.betCount = data.betCount
                item.winlose = data.winlose
                item.submit = data.winlose * (1 - item.rate/100)
                item.winloseRate = data.winlose / data.bet
                context.commit({
                  type: 'recordnaArcadeNowchild',
                  data: item
                })
              }
            }
          }
        }
      )
    }
  }, // NA街机游戏下级列表(综合计算上级)
  async getnaArcadeNowplayer (context) {
    if (state.variable.naArcadeGameData.nowUserID == '01' || !state.variable.naArcadeGameData.nowUserID) {
      if (localStorage.loginRole == '100') {
        var data = {
          parentId: localStorage.loginId
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetnaArcadeNowplayer')
        for (let item of player) {
          let player_data = {
            gameType: 50000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          }
          invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
              } else {
                context.commit('closeLoading')
                var data = ret.data.payload[0]
                if (data) {
                  if (item.userName == data.userName) {
                    item.bet = data.bet
                    item.betCount = data.betCount
                    item.winlose = data.winlose
                    item.winloseRate = data.winlose / data.bet
                    context.commit({
                      type: 'recordnaArcadeNowplayer',
                      data: item
                    })
                  }
                }
              }
            }
          )
        }
      }
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.naArcadeGameData.nowUserID
      }
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetnaArcadeNowplayer')
      for (let item of player) {
        let player_data = {
          gameType: 50000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        }
        invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              context.commit('closeLoading')
              var data = ret.data.payload[0]
              if (data) {
                if (item.userName == data.userName) {
                  item.bet = data.bet
                  item.betCount = data.betCount
                  item.winlose = data.winlose
                  item.winloseRate = data.winlose / data.bet
                  context.commit({
                    type: 'recordnaArcadeNowplayer',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // NA街机游戏所属玩家列表(综合计算上级)

  async getnaMallNowchild (context) {
    // 请求当前基本信息
    let require = {
      userId: ''
    }
    if (state.variable.naMallData.nowUserID) {
      require.userId = state.variable.naMallData.nowUserID
    } else {
      require.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: require
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.naMallData.nowUserID || !state.variable.naMallData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaMallNowlist',
        data: user
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.naMallData.nowUserID) {
      data.parent = state.variable.naMallData.nowUserID
    }
    // 请求下级信息
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetnaMallNowchild')
    for (let item of child) {
      let child_data = {
        gameType: -1,
        kindId:-3,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      }
      invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            context.commit('closeLoading')
            var data = ret.data.payload[0]
            if (data) {
              if (item.userId == data.userId) {
                item.betCount = data.betCount
                item.winlose = data.winlose
                context.commit({
                  type: 'recordnaMallNowchild',
                  data: item
                })
              }
            }
          }
        }
      )
    }
  }, // NA商城下级列表(综合计算上级)
  async getnaMallNowplayer (context) {
    if (state.variable.naMallData.nowUserID == '01' || !state.variable.naMallData.nowUserID) {
      if (localStorage.loginRole == '100') {
        var data = {
          parentId: localStorage.loginId
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetnaMallNowplayer')
        for (let item of player) {
          let player_data = {
            gameType: -1,
            kindId:-3,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          }
          invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
              } else {
                context.commit('closeLoading')
                var data = ret.data.payload[0]
                if (data) {
                  if (item.userName == data.userName) {
                    item.betCount = data.betCount
                    item.winlose = data.winlose
                    context.commit({
                      type: 'recordnaMallNowplayer',
                      data: item
                    })
                  }
                }
              }
            }
          )
        }
      }
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.naMallData.nowUserID
      }
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetnaMallNowplayer')
      for (let item of player) {
        let player_data = {
          gameType: -1,
          kindId:-3,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        }
        invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              context.commit('closeLoading')
              var data = ret.data.payload[0]
              if (data) {
                if (item.userName == data.userName) {
                  item.betCount = data.betCount
                  item.winlose = data.winlose
                  context.commit({
                    type: 'recordnaMallNowplayer',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // NA商城所属玩家列表(综合计算上级)


  async getttgVedioNowchild (context) {
    // 请求当前基本信息
    let require = {
      userId: ''
    }
    if (state.variable.ttgVedioGameData.nowUserID) {
      require.userId = state.variable.ttgVedioGameData.nowUserID
    } else {
      require.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: require
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.ttgVedioGameData.nowUserID || !state.variable.ttgVedioGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordttgVedioNowlist',
        data: user
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginRole == '1') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.ttgVedioGameData.nowUserID) {
      data.parent = state.variable.ttgVedioGameData.nowUserID
    }
    // 请求下级信息
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetttgVedioNowchild')
    let count = {
      bet: 0,
      betCount: 0,
      winlose: 0,
      winloseRate: 0
    } // 当前用户下级账单总额
    for (let item of child) {
      let child_data = {
        gameType: 1010000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      }
      invoke({
        url: api.calcUserStat,
        method: api.post,
        data: child_data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            context.commit('closeLoading')
            var data = ret.data.payload[0]
            if (data) {
              if (item.userId == data.userId) {
                item.bet = data.bet
                item.betCount = data.betCount
                item.winlose = data.winlose
                item.submit = data.winlose * (1 - item.rate/100)
                item.winloseRate = data.winlose / data.bet
                context.commit({
                  type: 'recordttgVedioNowchild',
                  data: item
                })
              }
            }
          }
        }
      )
    }
  }, // TTG电子游戏下级列表(综合计算上级)
  async getttgVedioNowplayer (context) {
    if (state.variable.ttgVedioGameData.nowUserID == '01' || !state.variable.ttgVedioGameData.nowUserID) {
      if (localStorage.loginRole == '100') {
        var data = {
          parentId: localStorage.loginId
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetttgVedioNowplayer')
        for (let item of player) {
          let player_data = {
            gameType: 1010000,
            gameUserNames: [item.userName],
            query: {
              createdAt: searchDate
            }
          }
          invoke({
            url: api.calcPlayerStat,
            method: api.post,
            data: player_data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
              } else {
                context.commit('closeLoading')
                var data = ret.data.payload[0]
                if (data) {
                  if (item.userName == data.userName) {
                    item.bet = data.bet
                    item.betCount = data.betCount
                    item.winlose = data.winlose
                    item.winloseRate = data.winlose / data.bet
                    context.commit({
                      type: 'recordttgVedioNowplayer',
                      data: item
                    })
                  }
                }
              }
            }
          )
        }
      }
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.ttgVedioGameData.nowUserID
      }
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetttgVedioNowplayer')
      for (let item of player) {
        let player_data = {
          gameType: 1010000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        }
        invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              context.commit('closeLoading')
              var data = ret.data.payload[0]
              if (data) {
                if (item.userName == data.userName) {
                  item.bet = data.bet
                  item.betCount = data.betCount
                  item.winlose = data.winlose
                  item.winloseRate = data.winlose / data.bet
                  context.commit({
                    type: 'recordttgVedioNowplayer',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // TTG电子游戏所属玩家列表(综合计算上级)
}

const mutations = {
  getWeek(state, payload) {
    //按周日为一周的最后一天计算
    let date = new Date()
    //今天是这周的第几天
    let today = date.getDay()
    //上周日距离今天的天数（负数表示）
    let stepSunDay = -today + 1
    // 如果今天是周日
    if (today == 0) {
      stepSunDay = -7
    }
    let time = date.getTime()
    state.startTime = new Date(time + stepSunDay * 24 * 3600 * 1000).setHours(0, 0, 0, 0)
    state.endTime = new Date(time + stepSunDay * 24 * 3600 * 1000).setHours(0, 0, 0, 0) + (7 * 24 * 3600 * 1000 - 1)
  }, // 处理周次
  resetPage (state, payload) {
    state.orignPage = 1
  },
  resetPartLoading (state, payload) {
    state.variable.partLoading = {
      infoLoading: true,
      billLoading: true,
      form_one_Loading: true,
      form_two_Loading: true,
    }
  },
  resetAjax (state, payload) {
    state.ajaxCount = 0
  }, // 重置Ajax请求数
  countAjax (state, payload) {
    state.ajaxCount++
  }, // Ajax计数
  closeMap (state, payload) {
    state.variable.mapLoading = false
  }, // 关闭层级关系loading
  openMap (state, payload) {
    state,variable.mapLoading = true
  }, // 打开层级关系loading
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

  selectParent (state, payload) {
    state.variable.nowParent = payload.data
    // console.log('当前所选上级ID', state.variable.nowParent)
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

  recordMap (state, payload) {
    state.variable.map = payload.data
  }, // 记录管理员页面层级关系

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
    // console.log('搜索条件是', Object.values(state.variable.condition))
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
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
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

  recordNowlistUser (state, payload) {
    state.variable.nowUser = payload.data
  }, // 记录当前列表页面操作的用户的信息

  recordOutdetailID (state, payload) {
    state.variable.outdetailID = payload.data
    localStorage.setItem('outdetailID', payload.data)
    localStorage.setItem('nowUser', payload.data)
  }, // 记录线路商详情页ID

  recordComdetailID (state, payload) {
    state.variable.comdetailID = payload.data
    localStorage.setItem('comdetailID', payload.data)
    localStorage.setItem('nowUser', payload.data)
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
    // console.log('线路商注册数据', state.variable.outcreate)
  }, // 记录线路商注册数据

  recordComcreate (state, payload) {
    state.variable.comcreate = {
      ...state.variable.comcreate,
      ...payload.data
    }
    // console.log('商户注册数据', state.variable.comcreate)
  }, // 记录一般商户注册数据

  recordOutsuccess (state, payload) {
    state.variable.outsuccess = payload.data
    state.variable.isloading = false
  }, // 记录线路商注册成功后返回数据

  recordComsuccess (state, payload) {
    state.variable.comsuccess = payload.data
    state.variable.isloading = false
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
  }, // 加减点发起方式

  getpointsObject (state, payload) {
    state.variable.pointsObject = payload.data
    // console.log('加减点下级的信息是', state.variable.pointsObject)
  }, // 获取对详情页用户发起加减点操作的下级信息

  startEdit (state, payload) {
    state.variable.isEdit = false
  }, // 开启编辑功能

  closeEdit (state, payload) {
    state.variable.isEdit = true
  }, // 关闭编辑功能

  startStoreDialog (state, payload) {
    state.variable.storeDialog = true
  }, // 开启加点对话框

  closeStoreDialog (state, payload) {
    state.variable.storeDialog = false
  }, // 关闭加点对话框

  startWithdrawDialog (state, payload) {
    state.variable.withdrawDialog = true
  }, // 开启减点对话框

  closeWithdrawDialog (state, payload) {
    state.variable.withdrawDialog = false
  }, // 关闭减点对话框

  finishPoints () {
    state.variable.isfinish = true
  }, // 更新加减点状态

  resetfinish () {
    state.variable.isfinish = false
  }, // 初始化加减点状态

  resetAllGameList (state, payload) {
    state.variable.allgames = []
  }, // 重置游戏中心所有游戏

  recordAllGameList (state, payload) {
    for (let item of payload.data) {
      state.variable.allgames.push(item)
    }
  }, // 获取游戏中心所有游戏

  recordCompanyList (state, payload) {
    state.variable.companyList = payload.data
  }, // 获取游戏中心游戏运营商数据

  recordCompanyGame (state, payload) {
    state.variable.companyGame = payload.data
  }, // 获取游戏中心游戏运营商游戏

  recordPersonal_bills (state, payload) {
    state.variable.bills = payload.data
  }, // 加储管理员个人中心余额

  recordManager_LoginList (state, payload) {
    state.variable.managerLoginList = payload.data
    state.variable.copyManagerLoginList = payload.data
  }, // 加储线路商登录日志

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
  }, // 加储商户登录日志

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
  }, // 加储管理员操作日志

  recordAdminlist (state, payload) {
    state.variable.adminList = payload.data
    state.variable.copyAdminlist = payload.data
  }, // 加储管理员列表

  searchAdminlist (state, payload) {
    state.variable.adminList = state.variable.copyAdminlist
    if (state.variable.condition.condition_one) {
      var result1 = []
      state.variable.adminList.filter(item => {
        if (item.uname.indexOf(state.variable.condition.condition_one) != -1) {
          result1.push(item)
        }
      })
      state.variable.adminList = result1
    }
    if (state.variable.condition.condition_two) {
      var result2 = []
      state.variable.adminList.filter(item => {
        if (item.adminName.indexOf(state.variable.condition.condition_two) != -1) {
          result2.push(item)
        }
      })
      state.variable.adminList = result2
    }
    if (state.variable.condition.condition_three) {
      var result3 = []
      state.variable.adminList.filter(item => {
        if (item.adminEmail.indexOf(state.variable.condition.condition_three) != -1) {
          result3.push(item)
        }
      })
      state.variable.adminList = result3
    }
    if (state.variable.condition.condition_four && state.variable.condition.condition_four.length > 0 && state.variable.condition.condition_four[0] != null) {
      var result4 = []
      var a = new Date(state.variable.condition.condition_four[0].toString())
      a = a.getTime()
      var b = new Date(state.variable.condition.condition_four[1].toString())
      b = b.getTime()
      state.variable.adminList.filter(item => {
        if (a <= item.createdAt && item.createdAt <= b) {
          result4.push(item)
        }
      })
      state.variable.adminList = result4
    }
    if (!state.variable.condition.condition_one && !state.variable.condition.condition_two && !state.variable.condition.condition_three && !state.variable.condition.condition_four) {
      state.variable.adminList = state.variable.copyAdminlist
    }
  }, // 搜索管理员列表

  recordMsnlist (state, payload) {
    state.variable.msnList = payload.data
    state.variable.copymsnList = payload.data
  }, // 加储线路号列表

  recordSearchMsn (state, payload) {
    state.variable.msn = payload.data
  }, // 记录搜索的线路号

  recordOutParent_Bills (state, payload) {
    state.variable.outparentBills = payload.data
  }, // 加储上级线路商余额

  recordComParent_Bills (state, payload) {
    state.variable.comparentBills = payload.data
  }, // 加储上级商户余额

  searchMsnlist () {
    state.variable.msnList = state.variable.copymsnList
    state.variable.msnList = state.variable.msnList.filter(item => {
      return Number(item.msn) === Number(state.variable.msn)
    })
  }, // 搜索线路号

  playerDetail (state, payload) {
    state.variable.playerDetail = payload.data
  }, // 加储玩家详细

  rememberBoothType (state, payload) {
    state.variable.boothType = payload.data
  },

  resetTab (state) {
    state.variable.visitedViews = []
    state.variable.activeIndex = null
    state.variable.tabIndex = null
  }, // 清空Tab标签

  resetFirstKey (state) {
    state.variable.firstKey = ''
  }, // 清除分页开始键

  resetLastKey (state) {
    state.variable.lastKey = ''
  }, // 清除分页结束键

  recordRightlist (state, payload) {
    state.variable.rightList = payload.data
  }, // 记录管理员权限列表

  recordAllright (state, payload) {
    state.variable.allRight = payload.data
  }, // 记录管理员所有列表

  // NA所有游戏
  recordnaAllID (state, payload){
    state.variable.naAllGameData.nowUserID = payload.data
  }, // 记录NA所有游戏总报表当前用户ID

  recordnaAllNowlist (state, payload){
    state.variable.naAllGameData.allNowlist = payload.data
  }, // 记录NA所有游戏总报表当前列表

  recordnaAllchildInfo (state, payload){
    state.variable.naAllGameData.allNowchild.push(payload.data)
    state.variable.naAllGameData.allNowlist.betCount += payload.data.betCount
    state.variable.naAllGameData.allNowlist.allWinlose += payload.data.allWinlose
    state.variable.naAllGameData.allNowlist.allSubmit += payload.data.allSubmit
    state.variable.naAllGameData.allNowlist.liveWinlose += payload.data.liveWinlose
    state.variable.naAllGameData.allNowlist.liveSubmit += payload.data.liveSubmit
    state.variable.naAllGameData.allNowlist.vedioWinlose += payload.data.vedioWinlose
    state.variable.naAllGameData.allNowlist.vedioSubmit += payload.data.vedioSubmit
    state.variable.naAllGameData.allNowlist.arcadeWinlose += payload.data.arcadeWinlose
    state.variable.naAllGameData.allNowlist.arcadeSubmit += payload.data.arcadeSubmit
  }, // 记录NA所有游戏总报表下级信息

  resetnaAllchildInfo (state, payload) {
    state.variable.naAllGameData.allNowchild = []
  }, // 重置NA所有游戏总报表下级信息

  recordnaAllNowplayer (state, payload) {
    state.variable.naAllGameData.allNowplayer.push(payload.data)
    state.variable.naAllGameData.allNowlist.betCount += payload.data.betCount
    state.variable.naAllGameData.allNowlist.allWinlose += payload.data.allWinlose
    state.variable.naAllGameData.allNowlist.liveWinlose += payload.data.liveWinlose
    state.variable.naAllGameData.allNowlist.vedioWinlose += payload.data.vedioWinlose
    state.variable.naAllGameData.allNowlist.arcadeWinlose += payload.data.arcadeWinlose
    state.variable.naAllGameData.allNowlist.allSubmit = state.variable.naAllGameData.allNowlist.allWinlose * (1 - state.variable.naAllGameData.allNowlist.rate / 100)
    state.variable.naAllGameData.allNowlist.liveSubmit = state.variable.naAllGameData.allNowlist.liveWinlose * (1 - state.variable.naAllGameData.allNowlist.rate / 100)
    state.variable.naAllGameData.allNowlist.vedioSubmit = state.variable.naAllGameData.allNowlist.vedioWinlose * (1 - state.variable.naAllGameData.allNowlist.rate / 100)
    state.variable.naAllGameData.allNowlist.arcadeSubmit = state.variable.naAllGameData.allNowlist.arcadeWinlose * (1 - state.variable.naAllGameData.allNowlist.rate / 100)
  }, // 记录NA所有游戏玩家账单

  resetnaAllNowplayer (state, payload) {
    state.variable.naAllGameData.allNowplayer = []
  }, // 重置NA所有游戏玩家账单

  // NA电子游戏
  recordnaVedioNowlist (state, payload){
    state.variable.naVedioGameData.nowList = payload.data
  }, // 记录NA电子游戏总报表当前列表

  recordnaVedioNowchild (state, payload){
    state.variable.naVedioGameData.nowChildList.push(payload.data)
    state.variable.naVedioGameData.nowList.bet += payload.data.bet
    state.variable.naVedioGameData.nowList.betCount += payload.data.betCount
    state.variable.naVedioGameData.nowList.winlose += payload.data.winlose
  }, // 记录NA电子游戏总报表下级列表

  resetnaVedioNowchild (state, payload){
    state.variable.naVedioGameData.nowChildList = []
  }, // 初始化NA电子游戏总报表下级列表

  recordnaVedioNowplayer (state, payload){
    state.variable.naVedioGameData.nowPlayerlist.push(payload.data)
    state.variable.naVedioGameData.nowList.bet += payload.data.bet
    state.variable.naVedioGameData.nowList.betCount += payload.data.betCount
    state.variable.naVedioGameData.nowList.winlose += payload.data.winlose
  }, // 记录NA电子游戏总报表玩家列表

  resetnaVedioNowplayer (state, payload){
    state.variable.naVedioGameData.nowPlayerlist = []
  }, // 初始化NA电子游戏总报表下级列表

  recordnaVedioID (state, payload) {
    state.variable.naVedioGameData.nowUserID = payload.data
  }, // 记录NA电子游戏总报表用户ID

  // NA真人游戏
  recordnaLiveNowlist (state, payload){
    state.variable.naLiveGameData.nowList = payload.data
  }, // 记录NA真人游戏总报表当前列表

  recordnaLiveNowchild (state, payload){
    state.variable.naLiveGameData.nowChildList.push(payload.data)
    state.variable.naLiveGameData.nowList.bet += payload.data.bet
    state.variable.naLiveGameData.nowList.betCount += payload.data.betCount
    state.variable.naLiveGameData.nowList.winlose += payload.data.winlose
    state.variable.naLiveGameData.nowList.mixAmount += payload.data.mixAmount
  }, // 记录NA真人游戏总报表下级列表

  resetnaLiveNowchild (state, payload){
    state.variable.naLiveGameData.nowChildList = []
  }, // 初始化NA真人游戏总报表下级列表

  recordnaLiveNowplayer (state, payload){
    state.variable.naLiveGameData.nowPlayerlist.push(payload.data)
    state.variable.naLiveGameData.nowList.bet += payload.data.bet
    state.variable.naLiveGameData.nowList.betCount += payload.data.betCount
    state.variable.naLiveGameData.nowList.winlose += payload.data.winlose
    state.variable.naLiveGameData.nowList.mixAmount += payload.data.mixAmount
  }, // 记录NA真人游戏总报表玩家列表

  resetnaLiveNowplayer (state, payload){
    state.variable.naLiveGameData.nowPlayerlist = []
  }, // 初始化NA真人游戏总报表玩家列表

  recordnaLiveID (state, payload) {
    state.variable.naLiveGameData.nowUserID = payload.data
  }, // 记录NA真人游戏总报表用户ID

  // NA街机游戏
  recordnaArcadeNowlist (state, payload){
    state.variable.naArcadeGameData.nowList = payload.data
  }, // 记录NA街机游戏总报表当前列表

  recordnaArcadeNowchild (state, payload){
    state.variable.naArcadeGameData.nowChildList.push(payload.data)
    state.variable.naArcadeGameData.nowList.bet += payload.data.bet
    state.variable.naArcadeGameData.nowList.betCount += payload.data.betCount
    state.variable.naArcadeGameData.nowList.winlose += payload.data.winlose
  }, // 记录NA街机游戏总报表下级列表

  resetnaArcadeNowchild (state, payload){
    state.variable.naArcadeGameData.nowChildList = []
  }, // 初始化NA街机游戏总报表下级列表

  recordnaArcadeNowplayer (state, payload){
    state.variable.naArcadeGameData.nowPlayerlist.push(payload.data)
    state.variable.naArcadeGameData.nowList.bet += payload.data.bet
    state.variable.naArcadeGameData.nowList.betCount += payload.data.betCount
    state.variable.naArcadeGameData.nowList.winlose += payload.data.winlose
  }, // 记录NA街机游戏总报表玩家列表

  resetnaArcadeNowplayer (state, payload){
    state.variable.naArcadeGameData.nowPlayerlist = []
  }, // 初始化NA街机游戏总报表下级列表

  recordnaArcadeID (state, payload) {
    state.variable.naArcadeGameData.nowUserID = payload.data
  }, // 记录NA街机游戏总报表用户ID

  // NA商城
  recordnaMallNowlist (state, payload){
    state.variable.naMallData.mallNowList = payload.data
  }, // 记录NA商城总报表当前列表

  recordnaMallNowchild (state, payload){
    state.variable.naMallData.mallNowChild.push(payload.data)
    state.variable.naMallData.mallNowList.betCount += payload.data.betCount
    state.variable.naMallData.mallNowList.winlose += payload.data.winlose
  }, // 记录NA商城总报表下级列表

  resetnaMallNowchild (state, payload){
    state.variable.naMallData.mallNowChild = []
  }, // 初始化NA商城总报表下级列表

  recordnaMallNowplayer (state, payload){
    state.variable.naMallData.mallNowplayer.push(payload.data)
    state.variable.naMallData.mallNowList.betCount += payload.data.betCount
    state.variable.naMallData.mallNowList.winlose += payload.data.winlose
  }, // 记录NA商城总报表玩家列表

  resetnaMallNowplayer (state, payload){
    state.variable.naMallData.mallNowplayer = []
  }, // 初始化NA商城总报表下级列表

  recordnaMallID (state, payload) {
    state.variable.naMallData.nowUserID = payload.data
  }, // 记录NA商城总报表用户ID

  // TTG游戏
  recordttgVedioNowlist (state, payload){
    state.variable.ttgVedioGameData.nowList = payload.data
  }, // 记录TTG电子游戏总报表当前列表

  recordttgVedioNowchild (state, payload){
    state.variable.ttgVedioGameData.nowChildList.push(payload.data)
    state.variable.ttgVedioGameData.nowList.bet += payload.data.bet
    state.variable.ttgVedioGameData.nowList.betCount += payload.data.betCount
    state.variable.ttgVedioGameData.nowList.winlose += payload.data.winlose
  }, // 记录TTG电子游戏总报表下级列表

  resetttgVedioNowchild (state, payload){
    state.variable.ttgVedioGameData.nowChildList = []
  }, // 初始化TTG电子游戏总报表下级列表

  recordttgVedioNowplayer (state, payload){
    state.variable.ttgVedioGameData.nowPlayerlist.push(payload.data)
    state.variable.ttgVedioGameData.nowList.bet += payload.data.bet
    state.variable.ttgVedioGameData.nowList.betCount += payload.data.betCount
    state.variable.ttgVedioGameData.nowList.winlose += payload.data.winlose
  }, // 记录TTG电子游戏总报表玩家列表

  resetttgVedioNowplayer (state, payload){
    state.variable.ttgVedioGameData.nowPlayerlist = []
  }, // 初始化TTG电子游戏总报表下级列表

  recordttgVedioID (state, payload) {
    state.variable.ttgVedioGameData.nowUserID = payload.data
  }, // 记录TTG电子游戏总报表用户ID

  playerGameType (state, payload) {
    state.variable.playerGameType = payload.data
  } // 记录玩家游戏类别
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
