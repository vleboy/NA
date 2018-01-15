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
  startTime: '',
  endTime: '',
  ajaxCount: 0
}

const getters = {
  visitedViews: state => state.variable.visitedViews
}
const actions = {
  getMap (context) {
    var data = {
      type: 'agent'
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
          context.commit({
            type: 'recordMap',
            data: data
          })
          // context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员页面组织架构
  getAgentdetail_child_managers (context) {
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
          context.commit({
            type: 'recordOutdetail_child_managers',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 线路商详情页所属线路商列表
  getAgentdetail_child_merchants (context) {
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
          context.commit({
            type: 'recordOutdetail_child_merchants',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 线路商详情页所属商户列表
  getPersonal_info (context) {
    invoke({
      url: api.agentdetail + '/' + localStorage.loginId,
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
  getComlist (context) {
    var userId = ''
    if (localStorage.loginSuffix == 'Agent') {
      userId = state.variable.listId || '01'
    } else {
      userId = state.variable.listId || localStorage.loginId
    }
    var data = {
      parent: userId,
      query: {},
      sortkey: 'createdAt',
      sort: 'desc'
    }
    invoke({
      url: api.agentList,
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
            type: 'recordComlist',
            data: data
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取所有代理列表
  getSelfData (context) {
    var nowId = ''
    if (localStorage.loginSuffix == 'Agent' && state.variable.listId == '01' || localStorage.loginSuffix == 'Agent' && !state.variable.listId) {
      var arr = []
      context.commit({
        type: 'recordSelfData',
        data: arr
      })
    } else {
      nowId = state.variable.listId || localStorage.loginId
      invoke({
        url: api.agentdetail + '/' + nowId,
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
              type: 'recordSelfData',
              data: data
            })
          }
        }
      )
    }
  }, // 代理列表获取自己的数据
  getAgentPlayer (context) {
    var data = {
      fromUserId: ''
    }
    if (localStorage.loginSuffix == 'Agent' && state.variable.listId == '01' || localStorage.loginSuffix == 'Agent' && !state.variable.listId) {
      var arr = []
      context.commit({
        type: 'recordAgentPlayer',
        data: arr
      })
    } else {
      data.fromUserId = state.variable.listId || localStorage.loginId
      invoke({
        url: api.getPlayerList,
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
            var data = ret.data.list
            context.commit({
              type: 'recordAgentPlayer',
              data: data
            })
          }
        }
      )
    }
  }, // 获取详情页代理玩家列表
  getDetailPlayer (context) {
    var data = {
      fromUserId: ''
    }
    if (!state.variable.comdetailID) {
      data.fromUserId = localStorage.comdetailID
    } else {
      data.fromUserId = state.variable.comdetailID
    }
    invoke({
      url: api.getPlayerList,
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
          var data = ret.data.list
          context.commit('countAjax')
          context.commit({
            type: 'recordDetailPlayer',
            data: data
          })
        }
      }
    )
  }, // 获取详情页代理玩家列表
  getComdetail_child (context) {
    var comdetailID = ''
    if (!state.variable.comdetailID) {
      comdetailID = localStorage.comdetailID
    } else {
      comdetailID = state.variable.comdetailID
    }
    var data = {
      parent: comdetailID,
      query: {},
      sortkey: 'createdAt',
      sort: 'desc'
    }
    invoke({
      url: api.agentList,
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
          context.commit('countAjax')
          context.commit({
            type: 'recordComdetail_child',
            data: data
          })
        }
      }
    )
  }, // 获取详情页代理下级代理(仅抓取一级)
  getComdetail (context) {
    var comdetailID = ''
    if (!state.variable.comdetailID) {
      comdetailID = localStorage.comdetailID
    } else {
      comdetailID = state.variable.comdetailID
    }
    invoke({
      url: api.agentdetail + '/' + comdetailID,
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
          if (!data.launchImg || data.launchImg == 'NULL!') {
            data.launchImg = {
              logo:['https://s3-ap-southeast-1.amazonaws.com/image-na-dev/NAlogo.png','http://assetdownload.oss-cn-hangzhou.aliyuncs.com/image/NAlogo.png'],
              name:['https://s3-ap-southeast-1.amazonaws.com/image-na-dev/dating-nagaming.png','http://assetdownload.oss-cn-hangzhou.aliyuncs.com/image/dating-nagaming.png']
            }
          }
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
          context.commit('closeLoading')
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
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取详情页商户财务信息
  getPersonal_bills (context) {
    var id = localStorage.loginId
    invoke({
      url: api.bills + '/' + id,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload.balance
          context.commit({
            type: 'recordPersonal_Bills',
            data: data
          })
        }
      }
    )
  }, // 个人中心余额
  getcomParentBills (context) {
    var parentId = ''
    if (state.variable.comcreate.parent === '01') {
      parentId = localStorage.loginId
    } else {
      parentId = state.variable.comcreate.parent
    }
    invoke({
      url: api.bills + '/' + parentId,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          context.commit({
            type: 'recordComParent_Bills',
            data: data
          })
        }
      }
    )
  }, // 获取创建商户上级余额
  getAdmin_cooperDate (context) {
    var checklogin = {
      role: '1000',
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
          context.commit({
            type: 'recordAdminlist',
            data: list
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取管理员列表
  getManager_LoginList (context) {
    var checklogin = {
      role: '1000',
      type: 'login',
      pageSize: '20',
      startKey: null,
      level: 0
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
            type: 'recordManager_LoginList',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }, // 获取代理登录日志
  getMerchant_LoginList (context) {
    var checklogin = {
      role: '1000',
      type: 'login',
      pageSize: '20',
      startKey: null,
      level: -1
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
            type: 'recordMerchant_LoginList',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }, // 获取代理登录日志
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

  async getallNowchild (context) {
    // 请求当前基本信息
    let require = {
      userId: ''
    }
    if (state.variable.allGameData.nowUserID) {
      require.userId = state.variable.allGameData.nowUserID
    } else {
      require.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: require
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.allGameData.nowUserID || !state.variable.allGameData.nowUserID && user.userId == localStorage.loginId) {
      let data = user
      data.allbetCount = 0
      data.allWinlose = 0
      data.allSubmit = 0
      data.naWinlose = 0
      data.naSubmit = 0
      data.ttgWinlose = 0
      data.ttgSubmit = 0
      data.saWinlose = 0
      data.saSubmit = 0
      context.commit({
        type: 'recordallNowlist',
        data: data
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.allGameData.nowUserID) {
      data.parent = state.variable.allGameData.nowUserID
    }
    // 请求下级信息
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    if (child.length == 0) {
      context.commit('closeLoading')
    }
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    // 请求下级账单信息
    context.commit('resetallchildInfo')
    if (child.length == 0) {
      context.commit('closeLoading')
    }
    for (let item of child) {
      item.allbetCount = 0
      item.allWinlose = 0
      item.allSubmit = 0
      item.naWinlose = 0
      item.naSubmit = 0
      item.ttgWinlose = 0
      item.ttgSubmit = 0
      item.saWinlose = 0
      item.saSubmit = 0
      let na_live = {
        gameType: 30000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // NA真人账单请求参数
      let na_vedio = {
        gameType: 40000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // NA棋牌账单请求参数
      let na_arcade = {
        gameType: 50000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // NA街机账单请求参数

      let na_mall = {
        gameType: -1,
        kindId:-3,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // NA商城账单请求参数

      let ttg_vedio = {
        gameType: 1010000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // TTG电子游戏请求参数
      let sa_live = {
        gameType: 1060000,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // SA真人账单请求参数

      let p1 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: na_live
      }) // NA真人账单数据

      let p2 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: na_vedio
      }) // NA棋牌账单数据

      let p3 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: na_arcade
      }) // NA街机账单数据

      let p4 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: ttg_vedio
      }) // TTG电子账单数据

      let p5 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: sa_live
      }) // SA电子账单数据

      let p6 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: na_mall
      }) // NA商城账单数据

      Promise.all([p1,p2,p3,p4,p5,p6]).then(result=>{
        let result1 = result[0][1].data.payload[0]
        if (result1 && result1.betCount > 0) {
          item.allbetCount += result1.betCount
          item.allWinlose += result1.winlose
          item.naWinlose += result1.winlose
          item.naSubmit += result1.winlose * (1 - item.rate / 100)
          item.allSubmit += item.naSubmit
        } // NA真人账单数据

        let result2 = result[1][1].data.payload[0]
        if (result2 && result2.betCount > 0) {
          item.allbetCount += result2.betCount
          item.allWinlose += result2.winlose
          item.naWinlose += result2.winlose
          item.naSubmit += result2.winlose * (1 - item.rate / 100)
          item.allSubmit += item.naSubmit
        } // NA棋牌账单数据

        let result3 = result[2][1].data.payload[0]
        if (result3 && result3.betCount > 0) {
          item.allbetCount += result3.betCount
          item.allWinlose += result3.winlose
          item.naWinlose += result3.winlose
          item.naSubmit += result3.winlose * (1 - item.rate / 100)
          item.allSubmit += item.naSubmit
        } // NA街机账单数据

        let result4 = result[3][1].data.payload[0]
        if (result4 && result4.betCount > 0) {
          item.allbetCount += result4.betCount
          item.allWinlose += result4.winlose
          item.ttgWinlose += result4.winlose
          item.ttgSubmit += result4.winlose * (1 - item.rate / 100)
          item.allSubmit += item.ttgSubmit
        } // TTG电子账单数据

        let result5 = result[4][1].data.payload[0]
        if (result5 && result5.betCount > 0) {
          item.allbetCount += result5.betCount
          item.allWinlose += result5.winlose
          item.saWinlose += result5.winlose
          item.saSubmit += result5.winlose * (1 - item.rate / 100)
          item.allSubmit += item.saSubmit
        } // SA真人账单数据

        let result6 = result[5][1].data.payload[0]
        if (result6 && result6.betCount > 0) {
          item.allbetCount += result6.betCount
          item.naWinlose += result6.winlose
          item.allWinlose += result6.winlose
        } // NA商城账单数据

        if (item.allbetCount > 0) {
          context.commit({
            type: 'recordallchildInfo',
            data: item
          })
        }
      }) // 计算所有返回结果
      context.commit('closeLoading')
    }
  }, // 公司所有游戏下级列表(综合计算上级)
  async getallNowplayer (context) {
    if (state.variable.allGameData.nowUserID == '01' || !state.variable.allGameData.nowUserID) {
    } else {
      // 请求所属玩家基本信息
      var data = {
        parentId: state.variable.allGameData.nowUserID
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
      context.commit('resetallNowplayer')
      if (player.length == 0) {
        context.commit('closeLoading')
      }
      for (let item of player) {
        item.allbetCount = 0
        item.allWinlose = 0
        item.naWinlose = 0
        item.ttgWinlose = 0
        item.saWinlose = 0
        let na_live = {
          gameType: 30000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求NA真人游戏玩家
        let na_vedio = {
          gameType: 40000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求NA电子游戏玩家
        let na_arcade = {
          gameType: 50000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求NA街机游戏玩家
        let ttg_vedio = {
          gameType: 1010000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        }
        let sa_live = {
          gameType: 1060000,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求SA真人游戏玩家

        let p1 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: na_live
        }) // NA真人游戏玩家账单
        let p2 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: na_vedio
        }) // NA电子游戏玩家账单
        let p3 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: na_arcade
        }) // NA街机游戏玩家账单
        let p4 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: ttg_vedio
        }) // TTG电子游戏玩家账单
        let p5 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: sa_live
        }) // SA真人游戏玩家账单

        Promise.all([p1,p2,p3,p4,p5]).then(
          result => {
            let result1 = result[0][1].data.payload[0]
            if (result1 && result1.betCount > 0) {
              item.allbetCount += result1.betCount
              item.allWinlose += result1.winlose
              item.naWinlose += result1.winlose
            } // NA真人游戏玩家账单
            let result2 = result[1][1].data.payload[0]
            if (result2 && result2.betCount > 0) {
              item.allbetCount += result2.betCount
              item.allWinlose += result2.winlose
              item.naWinlose += result2.winlose
            } // NA电子游戏玩家账单
            let result3 = result[2][1].data.payload[0]
            if (result3 && result3.betCount > 0) {
              item.allbetCount += result3.betCount
              item.allWinlose += result3.winlose
              item.naWinlose += result3.winlose
            } // NA街机游戏玩家账单
            let result4 = result[3][1].data.payload[0]
            if (result4 && result4.betCount > 0) {
              item.allbetCount += result4.betCount
              item.allWinlose += result4.winlose
              item.ttgWinlose += result4.winlose
            } // TTG电子游戏玩家账单
            let result5 = result[4][1].data.payload[0]
            if (result5 && result5.betCount > 0) {
              item.allbetCount += result5.betCount
              item.allWinlose += result5.winlose
              item.saWinlose += result5.winlose
            } // SA真人游戏玩家账单

            if (item.allbetCount > 0) {
              context.commit({
                type: 'recordallNowplayer',
                data: item
              })
            }
          }
        )
        context.commit('closeLoading')
      }
    }
  }, // 公司所有游戏所属玩家列表(综合计算上级)

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
      data.mallWinlose = 0
      context.commit({
        type: 'recordnaAllNowlist',
        data: data
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
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
    if (child.length == 0) {
      context.commit('closeLoading')
    }
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    // 请求下级账单信息
    context.commit('resetnaAllchildInfo')
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
      item.mallWinlose = 0
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
      let mall_data = {
        gameType: -1,
        kindId:-3,
        role: item.role,
        userIds: [item.userId],
        query: {
          createdAt: searchDate
        }
      } // NA商城账单请求参数

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

      let p4 = invoke({
        url: api.calcUserStat,
        method: api.post,
        data: mall_data
      }) // NA商城账单数据

      Promise.all([p1,p2,p3,p4]).then(result=>{
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
        let result4 = result[3][1].data.payload[0]
        if (result4 && result4.betCount > 0) {
          item.betCount += result4.betCount
          item.allWinlose += result4.winlose
          item.mallWinlose = result4.winlose
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
      context.commit('resetnaAllNowplayer')
      for (let item of player) {
        item.betCount = 0
        item.allWinlose = 0
        item.vedioWinlose = 0
        item.liveWinlose = 0
        item.arcadeWinlose = 0
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
        let naMall_data = {
          gameType: -1,
          kindId:-3,
          role: item.role,
          gameUserNames: [item.userName],
          query: {
            createdAt: searchDate
          }
        } // 请求NA玩家商城

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
        let p4 = invoke({
          url: api.calcPlayerStat,
          method: api.post,
          data: player_arcade
        }) // NA玩家商城账单


        Promise.all([p1,p2,p3,p4]).then(
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
            let result4 = result[3][1].data.payload[0]
            if (result4 && result4.betCount > 0) {
              item.betCount += result4.betCount
              item.allWinlose += result4.winlose
              item.mallWinlose = result4.winlose
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
    // 请求基本信息
    let naVedioNow = {
      userId: ''
    }
    if (state.variable.naVedioGameData.nowUserID) {
      naVedioNow.userId = state.variable.naVedioGameData.nowUserID
    } else {
      naVedioNow.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: naVedioNow
    })
    let user = result1[1].data.payload
    user.nowBouns = 0
    user.nowallBet = 0
    user.nowSubmit = 0
    user.winloseRate = 0
    if (user.userId == state.variable.naVedioGameData.nowUserID || !state.variable.naVedioGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaVedioNowlist',
        data: user
      })
    }
    // 请求下级信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      data.parent = '01'
    } else {
      data.parent = localStorage.loginId
    }
    if (state.variable.naVedioGameData.nowUserID) {
      data.parent = state.variable.naVedioGameData.nowUserID
    }
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    if (child.length == 0) {
      context.commit('closeLoading')
    }
    for (let item of child) {
      item.nowBouns = 0
      item.nowallBet = 0
      item.nowSubmit = 0
      item.winloseRate = 0
    }
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetnaVedioNowchild')
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
                if (item.gameList && item.gameList.length > 0){
                  let obj = item.gameList.filter(item => {
                    return item.code == 40000
                  })
                  obj.length > 0 ? item.vedioMix = obj[0].mix : ''
                }
                item.nowBouns = data.bet * item.vedioMix / 100
                item.nowallBet = data.bet * item.vedioMix / 100 + data.winlose
                item.nowSubmit = (data.bet * item.vedioMix / 100 + data.winlose) * (1 - item.rate/100)
                item.winloseRate = item.nowallBet / data.bet
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
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.naVedioGameData.nowUserID) {
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
        for (let item of player) {
          item.nowBouns = 0
          item.nowallBet = 0
        }
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
                    if (item.gameList && item.gameList.length > 0){
                      let obj = item.gameList.filter(item => {
                        return item.code == 40000
                      })
                      obj.length > 0 ? item.vedioMix = obj[0].mix : ''
                    }
                    item.nowBouns = data.bet * item.vedioMix / 100
                    item.nowallBet = data.bet * item.vedioMix/100 + data.winlose
                    item.winloseRate = item.nowallBet / data.bet
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
      // 普通代理登录
      var data = {
        parentId: ''
      }
      if (!state.variable.naVedioGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.naVedioGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      for (let item of player) {
        item.nowBouns = 0
        item.nowallBet = 0
      }
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 40000
                    })
                    obj.length > 0 ? item.vedioMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.bet * item.vedioMix / 100
                  item.nowallBet = data.bet * item.vedioMix / 100 + data.winlose
                  item.winloseRate = item.nowallBet / (data.bet)
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
    // 请求基本信息
    let nownaLive = {
      userId: ''
    }
    if (state.variable.naLiveGameData.nowUserID) {
      nownaLive.userId = state.variable.naLiveGameData.nowUserID
    } else {
      nownaLive.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: nownaLive
    })
    let user = result1[1].data.payload
    user.nowBouns = 0
    user.nowallBet = 0
    user.nowSubmit = 0
    user.winloseRate = 0
    if (user.userId == state.variable.naLiveGameData.nowUserID || !state.variable.naLiveGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaLiveNowlist',
        data: user
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (state.variable.naLiveGameData.nowUserID) {
        data.parent = state.variable.naLiveGameData.nowUserID
      } else {
        data.parent = '01'
      }
      let result2 = await invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      })
      let child = result2[1].data.payload
      if (child.length == 0) {
        context.commit('closeLoading')
      }
      for (let item of child) {
        item.nowBouns = 0
        item.nowallBet = 0
        item.nowSubmit = 0
        item.winloseRate = 0
      }
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 30000
                    })
                    obj.length > 0 ? item.liveMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.mixAmount * item.liveMix / 100
                  item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                  item.nowSubmit = (data.mixAmount * item.liveMix / 100 + data.winlose) * (1 - item.rate/100)
                  item.winloseRate = item.nowallBet / data.mixAmount
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
    } else {
      // 普通代理登录
      if (state.variable.naLiveGameData.nowUserID) {
        data.parent = state.variable.naLiveGameData.nowUserID
      } else {
        data.parent = localStorage.loginId
      }
      // 请求下级信息
      let result3 = await invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      })
      let child = result3[1].data.payload
      if (child.length == 0) {
        context.commit('closeLoading')
      }
      for (let item of child) {
        item.nowBouns = 0
        item.nowallBet = 0
        item.nowSubmit = 0
        item.winloseRate = 0
      }
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 30000
                    })
                    obj.length > 0 ? item.liveMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.mixAmount * item.liveMix / 100
                  item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                  item.nowSubmit = (data.mixAmount * item.liveMix/100 + data.winlose) * (1 - item.rate/100)
                  item.winloseRate = item.nowallBet / data.mixAmount
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
    }
  }, // NA真人游戏下级列表
  async getnaLiveNowplayer (context) {
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.naLiveGameData.nowUserID) {
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
        for (let item of player) {
          item.nowBouns = 0
          item.nowallBet = 0
        }
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
                    if (item.gameList && item.gameList.length > 0){
                      let obj = item.gameList.filter(item => {
                        return item.code == 30000
                      })
                      obj.length > 0 ? item.liveMix = obj[0].mix : ''
                    }
                    item.nowBouns = data.mixAmount * item.liveMix / 100
                    item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                    item.winloseRate = item.nowallBet / data.mixAmount
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
      // 普通代理登录
      var data = {
        parentId: ''
      }
      if (!state.variable.naLiveGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.naLiveGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result4 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result4[1].data.payload
      for (let item of player) {
        item.nowBouns = 0
        item.nowallBet = 0
      }
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 30000
                    })
                    obj.length > 0 ? item.liveMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.mixAmount * item.liveMix / 100
                  item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                  item.winloseRate = item.nowallBet / data.mixAmount
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
    // 请求基本信息
    let naArcadeNow = {
      userId: ''
    }
    if (state.variable.naArcadeGameData.nowUserID) {
      naArcadeNow.userId = state.variable.naArcadeGameData.nowUserID
    } else {
      naArcadeNow.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: naArcadeNow
    })
    let user = result1[1].data.payload
    user.arcadeMix = 1
    user.nowBouns = 0
    user.nowallBet = 0
    user.nowSubmit = 0
    user.winloseRate = 0
    if (user.userId == state.variable.naArcadeGameData.nowUserID || !state.variable.naArcadeGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordnaArcadeNowlist',
        data: user
      })
    }
    // 请求下级信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (state.variable.naArcadeGameData.nowUserID) {
        data.parent = state.variable.naArcadeGameData.nowUserID
      } else {
        data.parent = '01'
      }
    } else {
      // 普通代理登录
      if (state.variable.naArcadeGameData.nowUserID) {
        data.parent = state.variable.naArcadeGameData.nowUserID
      } else {
        data.parent = localStorage.loginId
      }
    }
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    if (child.length == 0) {
      context.commit('closeLoading')
    }
    for (let item of child) {
      item.arcadeMix = 1
      item.nowBouns = 0
      item.nowallBet = 0
      item.nowSubmit = 0
      item.winloseRate = 0
    }
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetnaArcadeNowchild')
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
                if (item.gameList && item.gameList.length > 0){
                  let obj = item.gameList.filter(item => {
                    return item.code == 50000
                  })
                  obj.length > 0 ? item.arcadeMix = obj[0].mix : ''
                }
                item.nowBouns = data.bet * item.arcadeMix / 100
                item.nowallBet = data.bet * item.arcadeMix / 100 + data.winlose
                item.nowSubmit = (data.bet * item.arcadeMix / 100 + data.winlose) * (1 - item.rate/100)
                item.winloseRate = item.nowallBet / data.bet
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
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.naArcadeGameData.nowUserID) {
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
        for (let item of player) {
          item.arcadeMix = 1
          item.nowBouns = 0
          item.nowallBet = 0
        }
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
                    if (item.gameList && item.gameList.length > 0){
                      let obj = item.gameList.filter(item => {
                        return item.code == 50000
                      })
                      obj.length > 0 ? item.arcadeMix = obj[0].mix : ''
                    }
                    item.nowBouns = data.bet * item.arcadeMix / 100
                    item.nowallBet = data.bet * item.arcadeMix / 100 + data.winlose
                    item.winloseRate = item.nowallBet / data.bet
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
      // 普通代理登录
      var data = {
        parentId: ''
      }
      if (!state.variable.naArcadeGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.naArcadeGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      for (let item of player) {
        item.arcadeMix = 1
        item.nowBouns = 0
        item.nowallBet = 0
      }
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 50000
                    })
                    obj.length > 0 ? item.arcadeMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.bet * item.arcadeMix / 100
                  item.nowallBet = data.bet * item.arcadeMix / 100 + data.winlose
                  item.winloseRate = item.nowallBet / data.bet
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
      parent: '01'
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
    if (child.length == 0) {
      context.commit('closeLoading')
    }
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
    // 请求基本信息
    let ttgVedioNow = {
      userId: ''
    }
    if (state.variable.ttgVedioGameData.nowUserID) {
      ttgVedioNow.userId = state.variable.ttgVedioGameData.nowUserID
    } else {
      ttgVedioNow.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: ttgVedioNow
    })
    let user = result1[1].data.payload
    user.nowBouns = 0
    user.nowallBet = 0
    user.nowSubmit = 0
    user.winloseRate = 0
    if (user.userId == state.variable.ttgVedioGameData.nowUserID || !state.variable.ttgVedioGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordttgVedioNowlist',
        data: user
      })
    }
    // 请求下级信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (state.variable.ttgVedioGameData.nowUserID) {
        data.parent = state.variable.ttgVedioGameData.nowUserID
      } else {
        data.parent = '01'
      }
    } else {
      // 普通代理登录
      if (state.variable.ttgVedioGameData.nowUserID) {
        data.parent = state.variable.ttgVedioGameData.nowUserID
      } else {
        data.parent = localStorage.loginId
      }
    }
    let result2 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result2[1].data.payload
    if (child.length == 0) {
      context.commit('closeLoading')
    }
    for (let item of child) {
      item.nowBouns = 0
      item.nowallBet = 0
      item.nowSubmit = 0
      item.winloseRate = 0
    }
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    context.commit('resetttgVedioNowchild')
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
                if (item.gameList && item.gameList.length > 0){
                  let obj = item.gameList.filter(item => {
                    return item.code == 1010000
                  })
                  obj.length > 0 ? item.vedioMix = obj[0].mix : ''
                }
                item.nowBouns = data.bet * item.vedioMix / 100
                item.nowallBet = data.bet * item.vedioMix / 100 + data.winlose
                item.nowSubmit = (data.bet * item.vedioMix / 100 + data.winlose) * (1 - item.rate/100)
                item.winloseRate = item.nowallBet / data.bet
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
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.ttgVedioGameData.nowUserID) {
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
        for (let item of player) {
          item.nowBouns = 0
          item.nowallBet = 0
        }
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
                    if (item.gameList && item.gameList.length > 0){
                      let obj = item.gameList.filter(item => {
                        return item.code == 1010000
                      })
                      obj.length > 0 ? item.vedioMix = obj[0].mix : ''
                    }
                    item.nowBouns = data.bet * item.vedioMix / 100
                    item.nowallBet = data.bet * item.vedioMix/100 + data.winlose
                    item.winloseRate = item.nowallBet / data.bet
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
      // 普通代理登录
      var data = {
        parentId: ''
      }
      if (!state.variable.ttgVedioGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.ttgVedioGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      for (let item of player) {
        item.nowBouns = 0
        item.nowallBet = 0
      }
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 1010000
                    })
                    obj.length > 0 ? item.vedioMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.bet * item.vedioMix / 100
                  item.nowallBet = data.bet * item.vedioMix / 100 + data.winlose
                  item.winloseRate = item.nowallBet / (data.bet)
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

  async getsaLiveNowchild (context) {
    // 请求基本信息
    let nowsaLive = {
      userId: ''
    }
    if (state.variable.saLiveGameData.nowUserID) {
      nowsaLive.userId = state.variable.saLiveGameData.nowUserID
    } else {
      nowsaLive.userId = localStorage.loginId
    }
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: nowsaLive
    })
    let user = result1[1].data.payload
    user.nowBouns = 0
    user.nowallBet = 0
    user.nowSubmit = 0
    user.winloseRate = 0
    if (user.userId == state.variable.saLiveGameData.nowUserID || !state.variable.saLiveGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordsaLiveNowlist',
        data: user
      })
    }
    // 请求下级基本信息
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (state.variable.saLiveGameData.nowUserID) {
        data.parent = state.variable.saLiveGameData.nowUserID
      } else {
        data.parent = '01'
      }
      let result2 = await invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      })
      let child = result2[1].data.payload
      if (child.length == 0) {
        context.commit('closeLoading')
      }
      for (let item of child) {
        item.nowBouns = 0
        item.nowallBet = 0
        item.nowSubmit = 0
        item.winloseRate = 0
      }
      // 请求下级账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetsaLiveNowchild')
      for (let item of child) {
        let child_data = {
          gameType: 1060000,
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 1060000
                    })
                    obj.length > 0 ? item.liveMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.mixAmount * item.liveMix / 100
                  item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                  item.nowSubmit = (data.mixAmount * item.liveMix / 100 + data.winlose) * (1 - item.rate/100)
                  item.winloseRate = item.nowallBet / data.mixAmount
                  context.commit({
                    type: 'recordsaLiveNowchild',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    } else {
      // 普通代理登录
      if (state.variable.saLiveGameData.nowUserID) {
        data.parent = state.variable.saLiveGameData.nowUserID
      } else {
        data.parent = localStorage.loginId
      }
      // 请求下级信息
      let result3 = await invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      })
      let child = result3[1].data.payload
      if (child.length == 0) {
        context.commit('closeLoading')
      }
      for (let item of child) {
        item.nowBouns = 0
        item.nowallBet = 0
        item.nowSubmit = 0
        item.winloseRate = 0
      }
      // 请求下级账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetsaLiveNowchild')
      for (let item of child) {
        let child_data = {
          gameType: 1060000,
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 1060000
                    })
                    obj.length > 0 ? item.liveMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.mixAmount * item.liveMix / 100
                  item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                  item.nowSubmit = (data.mixAmount * item.liveMix / 100 + data.winlose) * (1 - item.rate / 100)
                  item.winloseRate = item.nowallBet / data.mixAmount
                  context.commit({
                    type: 'recordsaLiveNowchild',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // SA真人游戏下级列表
  async getsaLiveNowplayer (context) {
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.saLiveGameData.nowUserID) {
      } else {
        // 请求所属玩家基本信息
        var data = {
          parentId: state.variable.saLiveGameData.nowUserID
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        for (let item of player) {
          item.nowBouns = 0
          item.nowallBet = 0
        }
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        context.commit('resetsaLiveNowplayer')
        for (let item of player) {
          let player_data = {
            gameType: 1060000,
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
                    if (item.gameList && item.gameList.length > 0){
                      let obj = item.gameList.filter(item => {
                        return item.code == 1060000
                      })
                      obj.length > 0 ? item.liveMix = obj[0].mix : ''
                    }
                    item.nowBouns = data.mixAmount * item.liveMix / 100
                    item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                    item.winloseRate = item.nowallBet / data.mixAmount
                    context.commit({
                      type: 'recordsaLiveNowplayer',
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
      // 普通代理登录
      var data = {
        parentId: ''
      }
      if (!state.variable.saLiveGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.saLiveGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result4 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result4[1].data.payload
      for (let item of player) {
        item.nowBouns = 0
        item.nowallBet = 0
      }
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      context.commit('resetsaLiveNowplayer')
      for (let item of player) {
        let player_data = {
          gameType: 1060000,
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
                  if (item.gameList && item.gameList.length > 0){
                    let obj = item.gameList.filter(item => {
                      return item.code == 1060000
                    })
                    obj.length > 0 ? item.liveMix = obj[0].mix : ''
                  }
                  item.nowBouns = data.mixAmount * item.liveMix / 100
                  item.nowallBet = data.mixAmount * item.liveMix / 100 + data.winlose
                  item.winloseRate = item.nowallBet / data.mixAmount
                  context.commit({
                    type: 'recordsaLiveNowplayer',
                    data: item
                  })
                }
              }
            }
          }
        )
      }
    }
  }, // SA真人游戏所属玩家列表

}

const mutations = {
  resetAjax (state, payload) {
    state.ajaxCount = 0
  }, // 重置Ajax请求数
  countAjax (state, payload) {
    state.ajaxCount++
  }, // Ajax计数
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
  agentCondition(state, payload) {
    state.variable.agentSearchData = payload.data
    state.variable.comlist = []
    var newArr = []
    state.variable.copycomlist.filter((item, index, arr) => {
      Object.keys(item, index, arr).forEach((key) => {
        if (key == 'username' || key == 'displayName' || key == 'parentName') {
          if (item[key].toString().indexOf(state.variable.agentSearchData) != -1) {
            newArr.push(item)
            state.variable.comlist = Array.from(new Set(newArr))
          }
        }
      })
    })
  }, // 代理中心代理列表搜索

  playerCondition(state, payload) {
    state.variable.playerSearchData = payload.data
    state.variable.agentPlayer = []
    var newArr = []
    state.variable.copyagentPlayer.filter((item, index, arr) => {
      Object.keys(item, index, arr).forEach((key) => {
        if (key == 'nickname' || key == 'parentName' || key == 'userName') {
          if (item[key].toString().indexOf(state.variable.playerSearchData) != -1) {
            newArr.push(item)
            state.variable.agentPlayer = Array.from(new Set(newArr))
          }
        }
      })
    })
  }, // 代理中心玩家列表搜索

  recordAgentId (state, payload) {
    state.variable.listId = payload.data
  }, // 记录代理列表Id

  recordAgentPlayer (state, payload) {
    if (payload.data && payload.data.length == 0) {
      state.variable.agentPlayer = []
    } else {
      state.variable.agentPlayer = payload.data
      state.variable.copyagentPlayer = payload.data
    }
  }, // 记录代理所属玩家

  recordMap (state, payload) {
    state.variable.map = payload.data
  }, // 记录代理页面组织架构

  recordMapUser (state, payload) {
    state.variable.mapUser = payload.data
  }, // 组织架构当前选中项

  selectParent (state, payload) {
    state.variable.nowParent = payload.data
  }, // 记录代理组织架构上级Id

  isMap (state, payload) {
    state.variable.isSlider = !state.variable.isSlider
  }, // 是否显示组织架构

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
        return item.uname === state.variable.condition.condition_three
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

  recordOutdetailID (state, payload) {
    state.variable.outdetailID = payload.data
    localStorage.setItem('outdetailID', payload.data)
  }, // 记录线路商详情页ID

  recordComdetailID (state, payload) {
    state.variable.comdetailID = payload.data
    localStorage.setItem('comdetailID', payload.data)
  }, // 记录一般商户详情页ID

  parentGame (state, payload) {
    state.variable.parentGame = payload.data
    localStorage.setItem('parentGame', payload.data)
  }, // 获取上级游戏
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

  recordSelfData (state, payload) {
    if (payload.data && payload.data.length == 0) {
      state.variable.selfData = []
    } else {
      var arr = []
      arr.push(payload.data)
      state.variable.selfData = arr
    }
  }, // 记录代理列表自己的数据

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
  }, // 存提点发起方式 详情/列表

  getpointsObject (state, payload) {
    state.variable.dialogObj = payload.data
  }, // 获取存提点对象数据

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

  recordComdetail_child (state, payload) {
    state.variable.detailChild = payload.data
  }, // 详情页下级代理数据

  recordDetailPlayer (state, payload) {
    state.variable.detailPlayer = payload.data
  }, // 详情页直属玩家

  recordPersonal_Bills (state, payload) {
    state.variable.personalBills = payload.data
  }, // 个人中心余额

  playerDetail (state, payload) {
    state.variable.playerDetail = payload.data
  }, // 存储玩家详细

  rememberBoothType (state, payload) {
    state.variable.boothType = payload.data
  },

  localPlayerInfoAgent (state, payload) {
    state.variable.agentPlayerName = payload.data
  },

  resetTab (state) {
    state.variable.visitedViews = []
    state.variable.activeIndex = null
    state.variable.tabIndex = null
  }, // 清空Tab标签

// 公司所有游戏
  recordallID (state, payload){
    state.variable.allGameData.nowUserID = payload.data
  }, // 记录公司所有游戏总报表当前用户ID

  recordallNowlist (state, payload){
    state.variable.allGameData.allNowlist = payload.data
  }, // 记录公司所有游戏总报表当前列表

  recordallchildInfo (state, payload){
    state.variable.allGameData.allNowchild.push(payload.data)

    state.variable.allGameData.allNowlist.naWinlose += payload.data.naWinlose
    state.variable.allGameData.allNowlist.naSubmit += payload.data.naSubmit

    state.variable.allGameData.allNowlist.ttgWinlose += payload.data.ttgWinlose
    state.variable.allGameData.allNowlist.ttgSubmit += payload.data.ttgSubmit

    state.variable.allGameData.allNowlist.saWinlose += payload.data.saWinlose
    state.variable.allGameData.allNowlist.saSubmit += payload.data.saSubmit

    state.variable.allGameData.allNowlist.allbetCount += payload.data.allbetCount
    state.variable.allGameData.allNowlist.allWinlose += payload.data.allWinlose
    state.variable.allGameData.allNowlist.allSubmit += payload.data.allSubmit
  }, // 记录公司所有游戏总报表下级信息

  resetallchildInfo (state, payload) {
    state.variable.allGameData.allNowchild = []
  }, // 重置公司所有游戏总报表下级信息

  recordallNowplayer (state, payload) {
    state.variable.allGameData.allNowplayer.push(payload.data)
    state.variable.allGameData.allNowlist.allbetCount += payload.data.allbetCount
    state.variable.allGameData.allNowlist.allWinlose += payload.data.allWinlose
    
    state.variable.allGameData.allNowlist.naWinlose += payload.data.naWinlose

    state.variable.allGameData.allNowlist.ttgWinlose += payload.data.ttgWinlose

    state.variable.allGameData.allNowlist.saWinlose += payload.data.saWinlose
  }, // 记录公司所有游戏玩家账单

  resetallNowplayer (state, payload) {
    state.variable.allGameData.allNowplayer = []
  }, // 重置公司所有游戏玩家账单

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
    state.variable.naAllGameData.allNowlist.mallWinlose += payload.data.mallWinlose
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
    state.variable.naAllGameData.allNowlist.mallWinlose += payload.data.mallWinlose
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


// NA真人
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
  },// 记录NA真人游戏总报表用户ID


// NA街机
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

// SA真人
  recordsaLiveNowlist (state, payload){
    state.variable.saLiveGameData.nowList = payload.data
  }, // 记录SA真人游戏总报表当前列表

  recordsaLiveNowchild (state, payload){
    state.variable.saLiveGameData.nowChildList.push(payload.data)
    state.variable.saLiveGameData.nowList.bet += payload.data.bet
    state.variable.saLiveGameData.nowList.betCount += payload.data.betCount
    state.variable.saLiveGameData.nowList.winlose += payload.data.winlose
    state.variable.saLiveGameData.nowList.mixAmount += payload.data.mixAmount
  }, // 记录SA真人游戏总报表下级列表

  resetsaLiveNowchild (state, payload){
    state.variable.saLiveGameData.nowChildList = []
  }, // 初始化SA真人游戏总报表下级列表

  recordsaLiveNowplayer (state, payload){
    state.variable.saLiveGameData.nowPlayerlist.push(payload.data)
    state.variable.saLiveGameData.nowList.bet += payload.data.bet
    state.variable.saLiveGameData.nowList.betCount += payload.data.betCount
    state.variable.saLiveGameData.nowList.winlose += payload.data.winlose
    state.variable.saLiveGameData.nowList.mixAmount += payload.data.mixAmount
  }, // 记录SA真人游戏总报表玩家列表

  resetsaLiveNowplayer (state, payload){
    state.variable.saLiveGameData.nowPlayerlist = []
  }, // 初始化SA真人游戏总报表玩家列表

  recordsaLiveID (state, payload) {
    state.variable.saLiveGameData.nowUserID = payload.data
  },// 记录SA真人游戏总报表用户ID


//
  playerGameType (state, payload) {
    state.variable.playerGameType = payload.data
  }, // 记录玩家游戏类别

  playerUserName (state, payload) {
    state.variable.playerUserName = payload.data
  } // 玩家用户名
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
