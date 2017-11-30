<template>
  <div class="liveGame-report">

    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<span v-if="nowRole != 00" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData" :loading="loading">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="liveNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="center">
          <template scope="scope">
            <span>{{points(scope.row.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="center">
          <template scope="scope">
            <span>{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="center" :formatter="formatWinloseRate">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist">
      <p class="title">下级列表</p>
      <el-table :data="liveNowchild" stripe>
        <el-table-column label="序号" prop="" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
           <template scope="scope">
            <span class="fontUrl" @click="checkUser(scope.row)">{{scope.row.displayName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理员账号" prop="uname" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="center">
          <template scope="scope">
            <span>{{points(scope.row.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="center">
          <template scope="scope">
            <span>{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="center">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.liveGameData.nowChildList.length" :page-sizes="[10, 20]" :page-size="childSize" @size-change="getChildsize" @current-change="getChildpage"></el-pagination>
      </div>
    </div>

    <div class="playerlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">所属玩家列表</p>
        <div style="float:right;margin-right:1rem">
          <el-input placeholder="请输入玩家用户名或昵称" class="input" v-model="playerData"></el-input>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchPlayer" :loading="playerLoading">搜索</el-button>
          <el-button @click="resetPlayerSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="liveNowplayer" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="center">
          <template scope="scope">
            <span>{{formatNickname(scope.row.nickname)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="center">
          <template scope="scope">
            <span>{{points(scope.row.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="center">
          <template scope="scope">
            <span>{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.liveGameData.nowPlayerlist.length" :page-sizes="[20, 50]" :page-size="playerSize" @size-change="getPlayersize" @current-change="getPlayerpage"></el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import { formatPoints } from '@/behavior/format'
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordLiveNowplayer',
      data: []
    })
    this.$store.commit({
      type: 'recordNowindex',
      data: 'liveGameReport'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordLiveID',
      data: ''
    })
    this.$store.commit('startLoading')
    this.$store.dispatch('getLiveNowlist')
    this.$store.dispatch('getLiveNowchild')
    this.$store.dispatch('getLiveNowplayer')
  },
  computed:{
    liveNowlist () {
      let arr = []
      this.nowRole = this.$store.state.variable.liveGameData.nowList.parent
      arr.push(this.$store.state.variable.liveGameData.nowList)
      return arr
    },
    liveNowchild () {
      var nowchild = this.$store.state.variable.liveGameData.nowChildList
      if (this.childPage === 1) {
        nowchild = this.$store.state.variable.liveGameData.nowChildList.slice(0, this.childSize)
      } else {
        nowchild = this.$store.state.variable.liveGameData.nowChildList.slice(((this.childPage - 1) * this.childSize), this.childSize * this.childPage)
      }
      return nowchild
    },
    liveNowplayer () {
      var nowplayer = this.$store.state.variable.liveGameData.nowPlayerlist
      if (this.playerPage === 1) {
        nowplayer = this.$store.state.variable.liveGameData.nowPlayerlist.slice(0, this.playerSize)
      } else {
        nowplayer = this.$store.state.variable.liveGameData.nowPlayerlist.slice(((this.playerPage - 1) * this.playerSize), this.playerSize * this.playerPage)
      }
      return nowplayer
    }
  },
  watch: {
    searchDate (val) {
      if (val[0] != null || val[1] != null) {
        for (var i = val.length - 1; i >= 0; i--) {
          this.searchDate[i] = new Date(this.searchDate[i].toString()).getTime()
        }
      }
    }
  },
  data () {
    return {
      playerData: '',
      loading: false,
      playerLoading: false,
      searchDate: [],
      childSize: 10,
      childPage: 1,
      playerSize: 20,
      playerPage: 1,
      nowRole: ''
    }
  },
  methods: {
    searchPlayer () {
      if (!this.playerData) {
        this.$message({
          type: 'error',
          message: '请输入玩家用户名或昵称'
        })
      } else if (this.$store.state.variable.liveGameData.nowPlayerlist.length == 0) {
        this.$message({
          type: 'info',
          message: '暂无玩家数据'
        })
      } else {
        this.playerLoading = true
        let data = {
          parentId: this.$store.state.variable.liveGameData.nowList.userId,
          query: {
            username: this.playerData
          },
          sortkey: 'createdAt',
          sort: 'desc'
        }
        invoke({
          url: api.playerLive,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload
              this.$store.commit({
                type: 'recordLiveNowplayer',
                data: data
              })
              this.playerLoading = false
            }
          }
        )
      }
    }, // 搜索玩家数据
    resetPlayerSearch () {
      this.playerData = ''
      this.$store.dispatch('getLiveNowplayer')
    }, // 重置玩家搜索
    formatWinloseRate (data) {
      return data? (Number(data) * 100).toFixed(2) + '%' : '0.00' + '%'
    },
    formatNickname (data) {
      return data == 'NULL!'? '-' : data
    },
    userType (data) {
      return '代理'
    }, // 格式化用户类型
    points (data) {
      return formatPoints('' + data)
    }, // 格式化点数
    searchData () {
      if (this.searchDate[0] == null || this.searchDate[1] == null) {
        this.$message({
          type: 'error',
          message: '请选择搜索时间'
        })
      } else {
        this.loading = true
        let nowUser = this.$store.state.variable.liveGameData.nowList
        let user_data = {
          gameType: 30000,
          role: nowUser.role,
          userIds: [nowUser.userId],
          query: {
            createdAt: this.searchDate
          }
        }
        invoke({
          url: api.calcUserStatLive,
          method: api.post,
          data: user_data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              let iteval = this.$store.state.variable.liveGameData.nowList
              var data = ret.data.payload[0]
              iteval.bet = data.bet
              iteval.betCount = data.betCount
              iteval.winlose = data.winlose
              iteval.mixAmount = data.mixAmount
              iteval.winloseRate = data.winloseRate
              this.$store.commit({
                type: 'recordLiveNowlist',
                data: iteval
              })
            }
          }
        )
        // 更新当前列表
        if (this.$store.state.variable.liveGameData.nowChildList.length > 0) {
          let child = this.$store.state.variable.liveGameData.nowChildList
          for (let item of child) {
            let child_data = {
              gameType: 30000,
              role: item.role,
              userIds: [item.userId],
              query: {
                createdAt: this.searchDate
              }
            }
            invoke({
              url: api.calcUserStatLive,
              method: api.post,
              data: child_data
            }).then(
              result => {
                const [err, ret] = result
                if (err) {
                } else {
                  var data = ret.data.payload
                  let iteval = this.$store.state.variable.liveGameData.nowChildList
                  for (let outside of iteval) {
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
                  this.$store.commit({
                    type: 'recordLiveNowchild',
                    data: iteval
                  })
                }
              }
            )
          }
        }
        // 更新当前列表下级
        if (this.$store.state.variable.liveGameData.nowPlayerlist.length > 0) {
          let player = this.$store.state.variable.liveGameData.nowPlayerlist
          for (let item of player) {
            let player_data = {
              gameType: 30000,
              gameUserIds: [item.userId],
              query: {
                createdAt: this.searchDate
              }
            }
            invoke({
              url: api.calcPlayerStatLive,
              method: api.post,
              data: player_data
            }).then(
              result => {
                const [err, ret] = result
                if (err) {
                } else {
                  var data = ret.data.payload
                  let iteval = this.$store.state.variable.liveGameData.nowPlayerlist
                  for (let outside of iteval) {
                    for (let inside of data) {
                      if (outside.userId == inside.gameUserId) {
                        outside.bet = inside.bet
                        outside.betCount = inside.betCount
                        outside.winlose = inside.winlose
                      }
                    }
                  }
                  this.$store.commit({
                    type: 'recordLiveNowplayer',
                    data: iteval
                  })
                }
              }
            )
          }
        } // 更新当前列表玩家
        let _self = this
        setTimeout(function(){
          _self.$message({
            type: 'success',
            message: '搜索完毕!'
          })
          _self.loading = false
        },3000)
      }
    }, // 按时间搜索
    resetSearch () {
      this.searchDate = []
      this.$store.commit('startLoading')
      this.$store.dispatch('getLiveNowlist')
      this.$store.dispatch('getLiveNowchild')
      this.$store.dispatch('getLiveNowplayer')
    }, // 重置搜索条件
    checkUser (data) {
      this.$store.commit({
        type: 'recordLiveID',
        data: data.userId
      })
      this.$store.commit('startLoading')
      this.$store.dispatch('getLiveNowlist')
      this.$store.dispatch('getLiveNowchild')
      this.$store.dispatch('getLiveNowplayer')
    }, // 查看当前用户信息
    goBack () {
      var data = this.$store.state.variable.liveGameData.nowList.parent
      this.$store.commit({
        type: 'recordLiveID',
        data: data
      })
      this.$store.commit({
        type: 'recordLiveNowplayer',
        data: []
      })
      this.$store.commit('startLoading')
      this.$store.dispatch('getLiveNowlist')
      this.$store.dispatch('getLiveNowchild')
      data !== '01' ? this.$store.dispatch('getLiveNowplayer') : ''
    }, // 退回上一级
    getChildsize (size) {
      this.childSize = size
    }, // 下级列表分页
    getChildpage (page) {
      this.childPage = page
    }, // 下级列表分页
    getPlayersize (size) {
      this.playerSize = size
    }, // 玩家列表分页
    getPlayerpage (page) {
      this.playerPage = page
    }, // 玩家列表分页
  }
}
</script>

<style scpoed>
.liveGame-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.liveGame-report .input{width: 25rem}
.liveGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.liveGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.liveGame-report .nowUserlist,
.liveGame-report .childlist,
.liveGame-report .playerlist{width: 99%;margin: 2rem auto}
.liveGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.liveGame-report .fontUrl:hover{text-decoration: underline;}
</style>
