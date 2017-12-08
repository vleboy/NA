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
          // console.log('代理列表数据', data)
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
            // console.log('代理玩家数据', data)
            context.commit({
              type: 'recordAgentPlayer',
              data: data
            })
            // context.commit('closeLoading')
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
    // console.log('查看的用户id:', comdetailID)
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
    // console.log('查看的用户id:', comdetailID)
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
          // console.log(data)
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
          // console.log(data)
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
          // console.log('管理员列表是: ', list)
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
          // console.log('线路商登录日志是', list)
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
          // console.log('线路商登录日志是', list)
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
  async getVedioNowlist (context) {
    let data = {
      userId: ''
    }
    if (state.variable.vedioGameData.nowUserID) {
      data.userId = state.variable.vedioGameData.nowUserID
    } else {
      data.userId = localStorage.loginId
    }
    // 请求基本信息
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let user = result1[1].data.payload
    user.nowBouns = '0.00'
    user.nowallBet = '0.00'
    user.nowSubmit = '0.00'
    if (user.userId == state.variable.vedioGameData.nowUserID || !state.variable.vedioGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordVedioNowlist',
        data: user
      })
    }
    context.commit('closeLoading')
    // 请求账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    let searchData = {
      gameType: 40000,
      role: user.suffix == 'Agent'? '-1000': user.role,
      userIds: [user.userId],
      query: {
        createdAt: searchDate
      }
    }
    let result2 = await invoke({
      url: api.calcUserStat,
      method: api.post,
      data: searchData
    })
    let count = result2[1].data.payload[0]
    if (count.userId == state.variable.vedioGameData.nowUserID || !state.variable.vedioGameData.nowUserID && count.userId == localStorage.loginId) {
      // 更新账单至基本信息
      user.bet = count.bet
      user.betCount = count.betCount
      user.winlose = count.winlose
      user.winloseRate = count.winloseRate
      user.nowBouns = (Number(count.bet) * user.vedioMix).toFixed(2)
      user.nowallBet = (Number(count.bet) * user.vedioMix + Number(count.winlose)).toFixed(2)
      user.nowSubmit = ((Number(count.bet) * user.vedioMix + Number(count.winlose)) * (1 - user.rate/100)).toFixed(2)
      console.log('user',user)
      context.commit({
        type: 'recordVedioNowlist',
        data: user
      })
    }
  }, // 电子游戏当前列表
  async getVedioNowchild (context) {
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (state.variable.vedioGameData.nowUserID) {
        data.parent = state.variable.vedioGameData.nowUserID
      } else {
        data.parent = '01'
      }
    } else {
      // 普通代理登录
      if (state.variable.vedioGameData.nowUserID) {
        data.parent = state.variable.vedioGameData.nowUserID
      } else {
        data.parent = localStorage.loginId
      }
    }
    // 请求下级信息
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let child = result1[1].data.payload
    console.log('下级',child)
    for (let item of child) {
      item.nowBouns = '0.00'
      item.nowallBet = '0.00'
      item.nowSubmit = '0.00'
    }
    context.commit({
      type: 'copyVedioNowchild',
      data: child
    }) // 备份数据
    // 请求下级账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
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
            var data = ret.data.payload
            let match_data = state.variable.vedioGameData.copyNowChildList
            for (let outside of match_data) {
              for (let inside of data) {
                if (outside.userId == inside.userId) {
                  outside.bet = inside.bet
                  outside.betCount = inside.betCount
                  outside.winlose = inside.winlose
                  outside.winloseRate = inside.winloseRate
                  outside.nowBouns = (Number(inside.bet) * outside.vedioMix).toFixed(2)
                  outside.nowallBet = (Number(inside.bet) * outside.vedioMix + Number(inside.winlose)).toFixed(2)
                  outside.nowSubmit = ((Number(inside.bet) * outside.vedioMix + Number(inside.winlose)) * (1 - outside.rate/100)).toFixed(2)
                }
              }
            }
            match_data = match_data.filter(item => {
              return item.betCount > 0
            })
            console.log('match_data',match_data)
            context.commit({
              type: 'recordVedioNowchild',
              data: match_data
            })
          }
        }
      )
    }
  }, // 电子游戏下级列表
  async getVedioNowplayer (context) {
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.vedioGameData.nowUserID) {
      } else {
        // 请求所属玩家基本信息
        var data = {
          parentId: state.variable.vedioGameData.nowUserID
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        context.commit({
          type: 'copyVedioNowplayer',
          data: player
        })
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        for (let item of player) {
          let player_data = {
            gameType: 40000,
            gameUserIds: [item.userId],
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
                var data = ret.data.payload
                let match_data = state.variable.vedioGameData.copyNowPlayerlist
                for (let outside of match_data) {
                  for (let inside of data) {
                    if (outside.userId == inside.gameUserId) {
                      outside.bet = inside.bet
                      outside.betCount = inside.betCount
                      outside.winlose = inside.winlose
                    }
                  }
                }
                match_data = match_data.filter(item => {
                  return item.betCount > 0
                })
                context.commit({
                  type: 'recordVedioNowplayer',
                  data: match_data
                })
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
      if (!state.variable.vedioGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.vedioGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      context.commit({
        type: 'copyVedioNowplayer',
        data: player
      })
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      for (let item of player) {
        let player_data = {
          gameType: 40000,
          gameUserIds: [item.userId],
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
              var data = ret.data.payload
              let match_data = state.variable.vedioGameData.copyNowPlayerlist
              for (let outside of match_data) {
                for (let inside of data) {
                  if (outside.userId == inside.gameUserId) {
                    outside.bet = inside.bet
                    outside.betCount = inside.betCount
                    outside.winlose = inside.winlose
                  }
                }
              }
              match_data = match_data.filter(item => {
                return item.betCount > 0
              })
              context.commit({
                type: 'recordVedioNowplayer',
                data: match_data
              })
            }
          }
        )
      }
    }
  }, // 电子游戏所属玩家列表
  async getLiveNowlist (context) {
    let data = {
      userId: ''
    }
    if (state.variable.liveGameData.nowUserID) {
      data.userId = state.variable.liveGameData.nowUserID
    } else {
      data.userId = localStorage.loginId
    }
    // 请求基本信息
    let result1 = await invoke({
      url: api.reportInfo,
      method: api.post,
      data: data
    })
    let user = result1[1].data.payload
    if (user.userId == state.variable.liveGameData.nowUserID || !state.variable.liveGameData.nowUserID && user.userId == localStorage.loginId) {
      context.commit({
        type: 'recordLiveNowlist',
        data: user
      })
    }
    context.commit('closeLoading')
    // 请求账单信息
    context.commit('getWeek')
    let searchDate = []
    if (localStorage.searchTime) {
      searchDate = JSON.parse(localStorage.searchTime)
    } else {
      searchDate = [state.startTime, state.endTime]
    }
    let searchData = {
      gameType: 30000,
      role: user.suffix == 'Agent'? '-1000': user.role,
      userIds: [user.userId],
      query: {
        createdAt: searchDate
      }
    }
    let result2 = await invoke({
      url: api.calcUserStat,
      method: api.post,
      data: searchData
    })
    let count = result2[1].data.payload[0]
    if (count.userId == state.variable.liveGameData.nowUserID || !state.variable.liveGameData.nowUserID && count.userId == localStorage.loginId) {
      // 更新账单至基本信息
      user.bet = count.bet
      user.betCount = count.betCount
      user.winlose = count.winlose
      user.mixAmount = count.mixAmount
      user.winloseRate = count.winloseRate
      context.commit({
        type: 'recordLiveNowlist',
        data: user
      })
    }
  }, // 真人游戏当前列表
  async getLiveNowchild (context) {
    var data = {
      parent: ''
    }
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (state.variable.liveGameData.nowUserID) {
        data.parent = state.variable.liveGameData.nowUserID
      } else {
        data.parent = '01'
      }
      let result1 = await invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      })
      let child = result1[1].data.payload
      context.commit({
        type: 'copyLiveNowchild',
        data: child
      }) // 数据备份
      // 请求下级账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
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
              var data = ret.data.payload
              let match_data = state.variable.liveGameData.copyNowChildList
              for (let outside of match_data) {
                for (let inside of data) {
                  if (outside.userId == inside.userId) {
                    outside.bet = inside.bet
                    outside.betCount = inside.betCount
                    outside.winlose = inside.winlose
                    outside.mixAmount = inside.mixAmount
                    outside.winloseRate = inside.winloseRate
                  }
                }
              }
              match_data = match_data.filter(item => {
                return item.betCount > 0
              })
              context.commit({
                type: 'recordLiveNowchild',
                data: match_data
              })
            }
          }
        )
      }
    } else {
      // 普通代理登录
      if (state.variable.liveGameData.nowUserID) {
        data.parent = state.variable.liveGameData.nowUserID
      } else {
        data.parent = localStorage.loginId
      }
      // 请求下级信息
      let result1 = await invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      })
      let child = result1[1].data.payload
      context.commit({
        type: 'copyLiveNowchild',
        data: child
      }) // 数据备份
      // 请求下级账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
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
              var data = ret.data.payload
              let match_data = state.variable.liveGameData.copyNowChildList
              for (let outside of match_data) {
                for (let inside of data) {
                  if (outside.userId == inside.userId) {
                    outside.bet = inside.bet
                    outside.betCount = inside.betCount
                    outside.winlose = inside.winlose
                    outside.mixAmount = inside.mixAmount
                    outside.winloseRate = inside.winloseRate
                  }
                }
              }
              match_data = match_data.filter(item => {
                return item.betCount > 0
              })
              context.commit({
                type: 'recordLiveNowchild',
                data: match_data
              })
            }
          }
        )
      }
    }
  }, // 真人游戏下级列表
  async getLiveNowplayer (context) {
    if (localStorage.loginSuffix == 'Agent') {
      // 代理管理员登录
      if (!state.variable.liveGameData.nowUserID) {
      } else {
        // 请求所属玩家基本信息
        var data = {
          parentId: state.variable.liveGameData.nowUserID
        }
        let result1 = await invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        })
        let player = result1[1].data.payload
        context.commit({
          type: 'copyLiveNowplayer',
          data: player
        }) // 数据备份
        // 请求所属玩家账单信息
        context.commit('getWeek')
        let searchDate = []
        if (localStorage.searchTime) {
          searchDate = JSON.parse(localStorage.searchTime)
        } else {
          searchDate = [state.startTime, state.endTime]
        }
        for (let item of player) {
          let player_data = {
            gameType: 30000,
            gameUserIds: [item.userId],
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
                var data = ret.data.payload
                let match_data = state.variable.liveGameData.copyNowPlayerlist
                for (let outside of match_data) {
                  for (let inside of data) {
                    if (outside.userId == inside.gameUserId) {
                      outside.bet = inside.bet
                      outside.betCount = inside.betCount
                      outside.winlose = inside.winlose
                    }
                  }
                }
                match_data = match_data.filter(item => {
                  return item.betCount > 0
                })
                context.commit({
                  type: 'recordLiveNowplayer',
                  data: match_data
                })
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
      if (!state.variable.liveGameData.nowUserID) {
        data.parentId = localStorage.loginId
      } else {
        data.parentId = state.variable.liveGameData.nowUserID
      }
      // 请求所属玩家基本信息
      let result1 = await invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      })
      let player = result1[1].data.payload
      context.commit({
        type: 'copyLiveNowplayer',
        data: player
      }) // 数据备份
      // 请求所属玩家账单信息
      context.commit('getWeek')
      let searchDate = []
      if (localStorage.searchTime) {
        searchDate = JSON.parse(localStorage.searchTime)
      } else {
        searchDate = [state.startTime, state.endTime]
      }
      for (let item of player) {
        let player_data = {
          gameType: 30000,
          gameUserIds: [item.userId],
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
              var data = ret.data.payload
              let match_data = state.variable.liveGameData.copyNowPlayerlist
              for (let outside of match_data) {
                for (let inside of data) {
                  if (outside.userId == inside.gameUserId) {
                    outside.bet = inside.bet
                    outside.betCount = inside.betCount
                    outside.winlose = inside.winlose
                  }
                }
              }
              match_data = match_data.filter(item => {
                return item.betCount > 0
              })
              context.commit({
                type: 'recordLiveNowplayer',
                data: match_data
              })
            }
          }
        )
      }
    }
  } // 真人游戏所属玩家列表
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
    // console.log('agent', state.variable.agentSearchData)
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
    // console.log('player', state.variable.playerSearchData)
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
    // console.log('存提点下级的信息是', state.variable.dialogObj)
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

  recordVedioNowlist (state, payload){
    state.variable.vedioGameData.nowList = payload.data
  }, // 记录电子游戏总报表当前列表

  recordVedioNowchild (state, payload){
    state.variable.vedioGameData.nowChildList = payload.data
  }, // 记录电子游戏总报表下级列表

  copyVedioNowchild (state, payload){
    state.variable.vedioGameData.copyNowChildList = payload.data
  }, // 备份电子游戏总报表下级列表

  recordVedioNowplayer (state, payload){
    state.variable.vedioGameData.nowPlayerlist = payload.data
  }, // 记录电子游戏总报表玩家列表

  copyVedioNowplayer (state, payload){
    state.variable.vedioGameData.copyNowPlayerlist = payload.data
  }, // 备份电子游戏总报表玩家列表

  recordVedioID (state, payload) {
    state.variable.vedioGameData.nowUserID = payload.data
  }, // 记录电子游戏总报表用户ID

  recordLiveNowlist (state, payload){
    state.variable.liveGameData.nowList = payload.data
  }, // 记录真人游戏总报表当前列表

  recordLiveNowchild (state, payload){
    state.variable.liveGameData.nowChildList = payload.data
  }, // 记录真人游戏总报表下级列表

  copyLiveNowchild (state, payload){
    state.variable.liveGameData.copyNowChildList = payload.data
  }, // 备份真人游戏总报表下级列表

  recordLiveNowplayer (state, payload){
    state.variable.liveGameData.nowPlayerlist = payload.data
  }, // 记录真人游戏总报表玩家列表

  copyLiveNowplayer (state, payload){
    state.variable.liveGameData.copyNowPlayerlist = payload.data
  }, // 备份真人游戏总报表玩家列表

  recordLiveID (state, payload) {
    state.variable.liveGameData.nowUserID = payload.data
  } // 记录真人游戏总报表用户ID

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
