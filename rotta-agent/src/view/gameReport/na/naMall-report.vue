<template>
  <div class="naMall-report">
    <div class="nowUserlist">

      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表</p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>

      <el-table :data="naMallNowlist" stripe>
        <el-table-column label="序号" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
          <template scope="scope">
            <span class="fontUrl" @click="refreshList(scope.row)">{{formatSuffix(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="交易金额" prop="betAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="childlist">
      <p class="title">直属下级列表</p>
      <el-table :data="naMallNowchild" stripe>
        <el-table-column label="序号" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
          <template scope="scope">
            <span class="fontUrl" @click="getChild_player(scope.row)">{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="交易金额" prop="betAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-for="item of naRenderChild">
      <p class="title">({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 下级列表</p>
      <el-table :data="item" stripe>
        <el-table-column label="序号" prop="" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
           <template scope="scope">
            <span class="fontUrl" @click="getChild_player(scope.row)">{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理员账号" prop="uname" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="交易金额" prop="betAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="playerlist">

      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left"><span v-if="playerParent">({{playerParent}})</span>所属玩家列表</p>
      </div>
      <el-table :data="naMallPlayer" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="center">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="交易金额" prop="betAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import { formatPoints } from '@/behavior/format'
import { gameType } from '@/behavior/gameType'
import { getWeek } from '@/behavior/getWeek'
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naMallReport'
    })
    this.$store.commit('returnLocalStorage')
  },
  created () {
    this.refreshList()
  },
  data () {
    return {
      isSelect_time: false, // 是否自定义搜索时间
      searchDate: getWeek(), // 搜索时间戳

      nowList: '', // 登录角色报表信息
      nowChild: [], // 登陆角色直属下级

      clickChild: [], // 点击渲染的下级
      rendered: [], // 已经渲染的下级

      nowPlayer: [], // 当前登录或点击渲染的代理玩家
      playerParent: '', // 当前玩家所属代理昵称
    }
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naMallReport'
    })
  },
  computed:{
    naMallNowlist () {
      let data = [this.nowList]
      return data
    },
    naMallNowchild () {
      let nowChild = this.nowChild
      return nowChild
    },
    naRenderChild () {
      let child = this.clickChild
      return child
    },
    naMallPlayer () {
      let player = this.nowPlayer
      return player
    }
  },
  watch: {
    searchDate (val) {
      if (!val) {
        this.isSelect_time = false
        this.searchDate = getWeek()
      } else {
        if (typeof val[0] == 'object' || typeof val[1] == 'object') {
          for (var i = val.length - 1; i >= 0; i--) {
            this.searchDate[i] = new Date(this.searchDate[i].toString()).getTime()
          }
          if (this.searchDate[1] >= new Date().getTime() - 180000) {
            if (this.searchDate[1] - this.searchDate[0] <= 180000) {
              this.searchDate[0] = this.searchDate[0] - 180000
              this.searchDate[1] = new Date().getTime() - 180000
            } else {
              this.searchDate[1] = new Date().getTime() - 180000
            }
          }
          this.isSelect_time = true
        }
      }
    },
  },
  methods: {
    refreshList (data) {
      this.$store.commit('startLoading')
      this.playerParent = ''
      this.nowPlayer = []
      this.nowChild = []
      this.clickChild = []
      this.nowList = ''
      this.getLoginSelf()
      this.getLoginSelf()
      this.getLoginChild(localStorage.loginId)
      if (localStorage.loginSuffix != 'Agent') {
        this.getLoginPlayer({
          displayName: localStorage.loginDislayName,
          userId: localStorage.loginId
        })
      }
    }, // 初始化列表
    getLoginSelf () {
      let require = {
        userId: localStorage.loginId
      }
      let result1 = invoke({
        url: api.reportInfo,
        method: api.post,
        data: require
      }).then(result => {
        const [err, ret] = result
        if (err) {
        } else {
          var user = ret.data.payload
          user.betCount = 0
          user.betAmount = 0
          this.nowList = user
        }
      })
    }, // 获取登陆用户报表基本信息
    getLoginChild (id) {
      let data = {}
      localStorage.loginSuffix == 'Agent' ? data.parent = '01' : data.parent = id
      invoke({
        url: api.reportInfo,
        method: api.post,
        data: data
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var child = ret.data.payload
            child.length == 0 ? this.$store.commit('closeLoading') : ''
            var result = []
            var cut_count = 10 // 数组切割长度
            for (var i = 0;i < Math.ceil(child.length / cut_count);i++) {
              i == 0 ? result.push(child.slice(i, cut_count)) : result.push(child.slice(i * cut_count, cut_count * (i + 1)))
            }
            let time = this.isSelect_time ? this.searchDate : getWeek()
            for (let item of result) {
              let child_data = {
                gameType: gameType('naMall'),
                role: '1000',
                userIds: item.map(item=>{return item.userId}),
                query: {
                  createdAt: time
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
                    data.length == 0 ? this.$store.commit('closeLoading') : ''
                    if (data.length > 0) {
                      item.map(item=> {
                        data.map(side =>{
                          if (item.userId == side.userId) {
                            item.betCount = side.betCount
                            item.betAmount = side.betAmount
                          }
                        })
                      })
                      this.nowChild.push(...item.filter(item=>{
                        return item.betCount > 0
                      }))
                      this.nowList.betCount = this.nowChild.map( child => child.betCount ).reduce( (a , b)=>{return a + b} , 0 )
                      this.nowList.betAmount = this.nowChild.map( child => child.betAmount ).reduce( (a , b)=>{return a + b} , 0 )
                      this.$store.commit('closeLoading')
                    }
                  }
                }
              )
            }
          }
        }
      )
    }, // 获取登录用户直属下级
    getLoginPlayer (parent) {
      this.playerParent = parent.displayName
      this.nowPlayer = []
      this.$store.commit('startLoading')
      var data = {
        parentId: parent.userId
      }
      invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      }).then(result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          data.length == 0 ? this.$store.commit('closeLoading') : ''
          var result = []
          var cut_count = 10 // 数组切割长度
          for (var i = 0;i < Math.ceil(data.length / cut_count);i++) {
            i == 0 ? result.push(data.slice(i, cut_count)) : result.push(data.slice(i * cut_count, cut_count * (i + 1)))
          }
          let time = this.isSelect_time ? this.searchDate : getWeek()
          for (let item of result) {
            let player_data = {
              gameType: gameType('naMall'),
              gameUserNames: item.map(item=>{return item.userName}),
              query: {
                createdAt: time
              }
            }
            invoke({
              url: api.calcPlayerStat,
              method: api.post,
              data: player_data
            }).then(result => {
              const [err, ret] = result
              if (err) {
              } else {
                var data = ret.data.payload
                data.length == 0 ? this.$store.commit('closeLoading') : ''
                if (data.length > 0) {
                  item.map(item=> {
                    data.map(side =>{
                      if (item.userName == side.userName) {
                        item.betCount = side.betCount
                        item.betAmount = side.betAmount
                        if (!this.nowChild) {
                          this.nowList.betCount += item.betCount
                          this.nowList.betAmount += item.betAmount
                        }
                      }
                    })
                  })
                  this.$store.commit('closeLoading')
                  this.nowPlayer.push(...item.filter(item=>{
                    return item.betCount > 0
                  }))
                }
              }
            })
          }
        }
      })
    }, // 获取登陆用户直属玩家
    getChild_player (parent) {
      this.getChild(parent)
      this.getPlayer(parent)
    }, // 获取下级代理及自己的玩家
    getChild (parent) {
      this.$store.commit('startLoading')
      if (this.rendered.length == 0) {
        this.rendered.push(parent)
        invoke({
          url: api.reportInfo,
          method: api.post,
          data: {
            parent: parent.userId
          }
        }).then(result => {
          const [err, ret] = result
          if (err) {
          } else {
            this.clickChild = []
            this.clickChild.push([])
            var data = [ret.data.payload]
            let time = this.isSelect_time ? this.searchDate : getWeek()
            for (let item of data) {
              let child_data = {
                gameType: gameType('naMall'),
                role: '1000',
                userIds: item.map(item=>{return item.userId}),
                query: {
                  createdAt: time
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
                    if (data.length > 0) {
                      item.map(outside=> {
                        data.map(inside =>{
                          if (outside.userId == inside.userId) {
                            outside.betCount = inside.betCount
                            outside.betAmount = inside.betAmount
                            this.clickChild[this.clickChild.length-1].push(outside)
                            this.$store.commit('closeLoading')
                          }
                        })
                      })
                    } else {
                      this.clickChild.pop()
                      this.$store.commit('closeLoading')
                    }
                  }
                }
              )
            }
          }
        })
      } else {
        if (this.rendered[this.rendered.length - 1].userId == parent.parent) {
          if (this.rendered[this.rendered.length - 1].userId == parent.userId) {
            this.$store.commit('closeLoading')
          } else {
            this.rendered.push(parent)
            invoke({
              url: api.reportInfo,
              method: api.post,
              data: {
                parent: parent.userId
              }
            }).then(result => {
              const [err, ret] = result
              if (err) {
              } else {
                var data = [ret.data.payload]
                let time = this.isSelect_time ? this.searchDate : getWeek()
                this.clickChild.push([])
                for (let item of data) {
                  let child_data = {
                    gameType: gameType('naMall'),
                    role: '1000',
                    userIds: item.map(item=>{return item.userId}),
                    query: {
                      createdAt: time
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
                        if (data.length > 0) {
                          item.map(outside => {
                            data.map(inside => {
                              if (outside.userId == inside.userId) {
                                outside.betCount = inside.betCount
                                outside.betAmount = inside.betAmount
                                this.clickChild[this.clickChild.length-1].push(outside)
                                this.$store.commit('closeLoading')
                              }
                            })
                          })
                        } else {
                          this.clickChild.pop()
                          this.$store.commit('closeLoading')
                        }
                      }
                    }
                  )
                }
              }
            })
          }
        } else {
          this.rendered = []
          this.playerParent = ''
          this.nowPlayer = []
          this.clickChild = []
          this.rendered.push(parent)
          invoke({
            url: api.reportInfo,
            method: api.post,
            data: {
              parent: parent.userId
            }
          }).then(result => {
            const [err, ret] = result
            if (err) {
            } else {
              this.clickChild.push([])
              var data = [ret.data.payload]
              let time = this.isSelect_time ? this.searchDate : getWeek()
              for (let item of data) {
                let child_data = {
                  gameType: gameType('naMall'),
                  role: '1000',
                  userIds: item.map(item=>{return item.userId}),
                  query: {
                    createdAt: time
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
                      if (data.length > 0) {
                        item.map(outside=> {
                          data.map(inside =>{
                            if (outside.userId == inside.userId) {
                              outside.betCount = inside.betCount
                              outside.betAmount = inside.betAmount
                              this.clickChild[this.clickChild.length-1].push(outside)
                              this.$store.commit('closeLoading')
                            }
                          })
                        })
                      } else {
                        this.clickChild.pop()
                        this.$store.commit('closeLoading')
                      }
                    }
                  }
                )
              }
            }
          })
        }
      }
    }, // 点击查询下级
    getPlayer (parent) {
      this.playerParent = ''
      var isSame = false
      for (let item of this.rendered) {
        item.parent == parent.parent
        isSame = true
      }
      isSame ? '' : this.clickChild = []
      this.playerParent = parent.displayName
      this.nowPlayer = []
      var data = {
        parentId: parent.userId
      }
      invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      }).then(result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          data.length == 0 ? this.$store.commit('closeLoading') : ''
          var result = []
          var cut_count = 10 // 数组切割长度
          for (var i = 0;i < Math.ceil(data.length / cut_count);i++) {
            i == 0 ? result.push(data.slice(i, cut_count)) : result.push(data.slice(i * cut_count, cut_count * (i + 1)))
          }
          let time = this.isSelect_time ? this.searchDate : getWeek()
          for (let item of result) {
            let player_data = {
              gameType: gameType('naMall'),
              gameUserNames: item.map(item=>{return item.userName}),
              query: {
                createdAt: time
              }
            }
            invoke({
              url: api.calcPlayerStat,
              method: api.post,
              data: player_data
            }).then(result => {
              const [err, ret] = result
              if (err) {
              } else {
                var data = ret.data.payload
                data.length == 0 ? this.$store.commit('closeLoading') : ''
                if (data.length > 0) {
                  item.map(item=> {
                    data.map(side =>{
                      if (item.userName == side.userName) {
                        item.betCount = side.betCount
                        item.betAmount = side.betAmount
                        if (!this.nowChild) {
                          this.nowList.betCount += item.betCount
                          this.nowList.betAmount += item.betAmount
                        }
                      }
                    })
                  })
                  this.nowPlayer.push(...item.filter(item=>{
                    let isRepeat = false
                    for (let side of this.nowPlayer) {
                      side.userName == item.userName ? isRepeat = true : '' 
                    }
                    return item.betCount > 0 && !isRepeat
                  }))
                  this.$store.commit('closeLoading')
                }
              }
            })
          }
        }
      })
    }, // 点击查询代理玩家
    formatSuffix (suffix) {
      return suffix ? suffix.substring(suffix.indexOf('_') + 1, suffix.length) : suffix
    }, // 格式化前缀
    points (data) {
      if (data && !isNaN(Number(data).toFixed(2))) {
        return formatPoints(Number(data).toFixed(2))
      } else {
        return '0.00'
      }
    }, // 格式化金额
    formatWinloseRate (rate) {
      return rate ? (rate * 100).toFixed(2) + '%' : 0
    }, // 格式化百分率
    searchData () {
      this.$store.commit('startLoading')
      this.refreshList()
    }, // 自定义时间搜索
    resetSearch () {
      this.$store.commit('startLoading')
      this.isSelect_time = false
      this.searchDate = ''
      this.refreshList()
    }, // 按默认时间搜索
    userType (data) {
      return '代理'
    }, // 格式化用户类型
    goPlayDetail (row) {
      localStorage.setItem('playerName', row)
      this.$router.push('playerdetail')
      this.$store.commit({
        type: 'playerUserName',
        data: row
      })
    }, // 跳转至玩家详情
  }
}
</script>

<style scpoed>
.naMall-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.naMall-report .input{width: 25rem}
.naMall-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.naMall-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.naMall-report .nowUserlist,
.naMall-report .childlist,
.naMall-report .playerlist{width: 99%;margin: 2rem auto}
.naMall-report .fontUrl{cursor: pointer;color: #20a0ff}
.naMall-report .fontUrl:hover{text-decoration: underline;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
