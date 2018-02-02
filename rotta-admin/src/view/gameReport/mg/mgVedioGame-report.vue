<template>
  <div class="mgVedioGame-report">
    <div class="nowUserlist">

      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表</p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>

      <el-table :data="mgVedioNowlist" stripe>
        <el-table-column label="序号" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="refreshList(scope.row)">{{formatSuffix(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
        </el-table-column>
        <el-table-column label="投注金额" prop="betAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winloseAmount" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.winloseAmount) > 0 ? 'green' : 'red']">{{points(scope.row.winloseAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户占成" prop="rate" align="left">
          <template scope="scope">
            <span>{{(scope.row.rate)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="商户交公司" prop="submit" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.submit) > 0 ? 'green' : 'red']">{{points(scope.row.submit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="left">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="childlist" v-if="loginRole != '100'">
      <p class="title">直属下级列表</p>
      <el-table :data="mgVedioNowchild" stripe>
        <el-table-column label="序号" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="getChild(scope.row)" v-if="scope.row.role == '10'">{{scope.row.displayName}}</span>
            <span class="fontUrl" @click="getPlayer(scope.row, true)" v-if="scope.row.role == '100'">{{scope.row.displayName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
        </el-table-column>
        <el-table-column label="投注金额" prop="betAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winloseAmount" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.winloseAmount) > 0 ? 'green' : 'red']">{{points(scope.row.winloseAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户占成" prop="rate" align="left">
          <template scope="scope">
            <span>{{(scope.row.rate)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="商户交公司" prop="submit" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.submit) > 0 ? 'green' : 'red']">{{points(scope.row.submit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="left">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-for="item of mgRenderChild">
      <p class="title">({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 下级列表</p>
      <el-table :data="item" stripe>
        <el-table-column label="序号" prop="" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
           <template scope="scope">
            <span class="fontUrl" @click="getChild(scope.row)" v-if="scope.row.role == '10'">{{scope.row.displayName}}</span>
            <span class="fontUrl" @click="getPlayer(scope.row, false)" v-if="scope.row.role == '100'">{{scope.row.displayName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理员账号" prop="uname" align="left">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
        </el-table-column>
        <el-table-column label="投注金额" prop="betAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winloseAmount" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.winloseAmount) > 0 ? 'green' : 'red']">{{points(scope.row.winloseAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户占成" prop="rate" align="left">
          <template scope="scope">
            <span>{{(scope.row.rate) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户交公司" align="left" prop="submit">
          <template scope="scope">
            <span :class="[Number(scope.row.submit) > 0 ? 'green' : 'red']">{{points(scope.row.submit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="left">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="playerlist">

      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left"><span v-if="playerParent">({{playerParent}})</span>所属玩家列表</p>
      </div>
      <el-table :data="mgVedioPlayer" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="left">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
        </el-table-column>
        <el-table-column label="投注金额" prop="betAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.betAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winloseAmount" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.winloseAmount) > 0 ? 'green' : 'red']">{{points(scope.row.winloseAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
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
      data: 'mgVedioGameReport'
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

      nowPlayer: [], // 当前登录或点击渲染的商户玩家
      playerParent: '', // 当前玩家所属商户昵称

      loginRole: localStorage.loginRole, // 登录角色role
    }
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'mgVedioGameReport'
    })
  },
  computed:{
    mgVedioNowlist () {
      let data = [this.nowList]
      return data
    },
    mgVedioNowchild () {
      let nowChild = this.nowChild
      return nowChild
    },
    mgRenderChild () {
      let child = this.clickChild
      return child
    },
    mgVedioPlayer () {
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
      localStorage.loginRole != '100' ? this.getLoginChild(localStorage.loginId) : ''
      localStorage.loginRole == '100' ? this.getPlayer({
        displayName: localStorage.loginDislayName,
        userId: localStorage.loginId,
        parent: localStorage.parentID
      }, true) : ''
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
          user.winAmount = 0
          user.winloseAmount = 0
          user.mixAmount = 0
          user.submit = 0
          user.winloseRate = 0
          this.nowList = user
        }
      })
    }, // 获取登陆用户报表基本信息
    getLoginChild (id) {
      let data = {}
      localStorage.loginRole == '1' ? data.parent = '01' : data.parent = id
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
            var result_manager = []
            var result_merchant = []
            var result = []
            var cut_count = 10 // 数组切割长度
            child.map(item => {
              item.role == '10' ? result_manager.push(item) : result_merchant.push(item)
            })
            for (var i = 0;i < Math.ceil(result_manager.length / cut_count);i++) {
              i == 0 ? result.push(result_manager.slice(i, cut_count)) : result.push(result_manager.slice(i * cut_count, cut_count * (i + 1)))
            }
            for (var j = 0;j < Math.ceil(result_merchant.length / cut_count);j++) {
              j == 0 ? result.push(result_merchant.slice(j, cut_count)) : result.push(result_merchant.slice(j * cut_count, cut_count * (j + 1)))
            }
            let time = this.isSelect_time ? this.searchDate : getWeek()
            for (let item of result) {
              let child_data = {
                gameType: gameType('mgVedio'),
                role: item[0].role,
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
                            item.winloseAmount = side.winloseAmount
                            item.submit = side.winloseAmount * (1 - item.rate / 100)
                            item.winloseRate = side.winloseAmount / side.betAmount
                          }
                        })
                      })
                      this.nowChild.push(...item.filter(item=>{
                        return item.betCount > 0
                      }))
                      this.nowList.betCount = this.nowChild.map( child => child.betCount ).reduce( (a , b)=>{return a + b} , 0 )
                      this.nowList.betAmount = this.nowChild.map( child => child.betAmount ).reduce( (a , b)=>{return a + b} , 0 )
                      this.nowList.winloseAmount = this.nowChild.map( child => child.winloseAmount ).reduce( (a , b)=>{return a + b} , 0 )
                      this.nowList.submit = this.nowList.winloseAmount * (1 - this.nowList.rate / 100)
                      this.nowList.winloseRate = this.nowList.winloseAmount / this.nowList.betAmount
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
    getChild (parent) {
      let will_render = {
        parent: parent.parent,
        userId: parent.userId
      }
      this.$store.commit('startLoading')
      if (this.rendered.length == 0) {
        this.rendered.push(will_render)
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
            this.nowPlayer = []
            this.playerParent = ''
            this.clickChild = []
            this.clickChild.push([])
            var data = ret.data.payload
            var result_manager = data.filter(item => {return item.role == '10'})
            var result_merchant = data.filter(item => {return item.role == '100'})
            var result = []
            result_manager.length == 0 ? '' : result.push(result_manager)
            result_merchant.length == 0 ? '' : result.push(result_merchant)
            let time = this.isSelect_time ? this.searchDate : getWeek()
            for (let item of result) {
              let child_data = {
                gameType: gameType('mgVedio'),
                role: item[0].role,
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
                            outside.winloseAmount = inside.winloseAmount
                            outside.submit = inside.winloseAmount * (1 - outside.rate / 100)
                            outside.winloseRate = inside.winloseAmount / inside.betAmount
                            this.clickChild[this.clickChild.length-1].push(outside)
                            this.$store.commit('closeLoading')
                          }
                        })
                      })
                    }
                  }
                }
              )
            }
          }
        })
      } else {
        if (this.rendered.filter(item => {return (item.userId == parent.parent)}).length > 0) {
          if (this.rendered.filter(item => {return item.userId == parent.userId}).length > 0) {
            this.$store.commit('closeLoading')
          } else {
            this.nowPlayer = []
            this.playerParent = ''
            this.rendered.push(will_render)
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
                var data = ret.data.payload
                var result_manager = data.filter(item => {return item.role == '10'})
                var result_merchant = data.filter(item => {return item.role == '100'})
                var result = []
                result_manager.length == 0 ? '' : result.push(result_manager)
                result_merchant.length == 0 ? '' : result.push(result_merchant)
                let time = this.isSelect_time ? this.searchDate : getWeek()
                this.clickChild.push([])
                for (let item of result) {
                  let child_data = {
                    gameType: gameType('mgVedio'),
                    role: item[0].role,
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
                                outside.winloseAmount = inside.winloseAmount
                                outside.submit = inside.winloseAmount * (1 - outside.rate / 100)
                                outside.winloseRate = inside.winloseAmount / inside.betAmount
                                this.clickChild[this.clickChild.length-1].push(outside)
                                this.$store.commit('closeLoading')
                              }
                            })
                          })
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
          this.rendered.push(will_render)
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
              var data = ret.data.payload
              var result_manager = data.filter(item => {return item.role == '10'})
              var result_merchant = data.filter(item => {return item.role == '100'})
              var result = []
              result_manager.length == 0 ? '' : result.push(result_manager)
              result_merchant.length == 0 ? '' : result.push(result_merchant)
              let time = this.isSelect_time ? this.searchDate : getWeek()
              for (let item of result) {
                let child_data = {
                  gameType: gameType('mgVedio'),
                  role: item[0].role,
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
                              outside.winloseAmount = inside.winloseAmount
                              outside.submit = inside.winloseAmount * (1 - outside.rate / 100)
                              outside.winloseRate = inside.winloseAmount / inside.betAmount
                              this.clickChild[this.clickChild.length-1].push(outside)
                              this.$store.commit('closeLoading')
                            }
                          })
                        })
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
    getPlayer (parent, isClear) {
      if (isClear) {
        this.playerParent = ''
        this.clickChild = []
      }
      this.$store.commit('startLoading')
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
              gameType: gameType('mgVedio'),
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
                        item.winloseAmount = side.winloseAmount
                        item.mixAmount = side.mixAmount
                        if (localStorage.loginRole == '100') {
                          this.nowList.betCount += item.betCount
                          this.nowList.betAmount += item.betAmount
                          this.nowList.winloseAmount += item.winloseAmount
                          this.nowList.submit = this.nowList.winloseAmount * (1 - this.nowList.rate / 100)
                          this.nowList.winloseRate = this.nowList.winloseAmount / this.nowList.betAmount
                        }
                      }
                    })
                  })
                  this.$store.commit('closeLoading')
                  this.nowPlayer.push(...item.filter(item=>{
                    let isRepeat = false
                    for (let side of this.nowPlayer) {
                      side.userName == item.userName ? isRepeat = true : '' 
                    }
                    return item.betCount > 0 && !isRepeat
                  }))
                }
              }
            })
          }
        }
      })
    }, // 点击查询商户玩家
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
      if (data.role == '1') {
        return '管理员'
      } else if (data.role == '10') {
        return '线路商'
      } else {
        return '商户'
      }
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
.mgVedioGame-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.mgVedioGame-report .input{width: 25rem}
.mgVedioGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.mgVedioGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.mgVedioGame-report .nowUserlist,
.mgVedioGame-report .childlist,
.mgVedioGame-report .playerlist{width: 99%;margin: 2rem auto}
.mgVedioGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.mgVedioGame-report .fontUrl:hover{text-decoration: underline;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
