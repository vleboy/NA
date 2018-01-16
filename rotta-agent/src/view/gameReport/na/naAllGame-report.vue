<template>
  <div class="naAllGame-report">
    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<span v-if="nowRole != loginId" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData" :loading="loading">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="naAllNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="抽成比" prop="rate" align="center">
          <template scope="scope">
            <span>{{scope.row.rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
          <template scope="scope">
            <span>{{(flashNumber.betCount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总输赢金额" prop="allWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.allWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.allWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总代理交公司" prop="allSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.allSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="vedioWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.vedioWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.vedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(代理交公司)" prop="vedioSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.vedioSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="liveWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.liveWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.liveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(代理交公司)" prop="liveSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.liveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="arcadeWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.arcadeWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.arcadeWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(代理交公司)" prop="arcadeSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.arcadeSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA商城(输赢金额)" prop="mallWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.mallWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.mallWinlose)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-if="loginRole != '100'">
      <p class="title">下级列表</p>
      <el-table :data="naAllNowchild" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
          <template scope="scope">
            <span class="fontUrl" @click="checkUser(scope.row)">{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column label="抽成比" prop="rate" align="center">
          <template scope="scope">
            <span>{{scope.row.rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="总输赢金额" prop="allWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.allWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.allWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总代理交公司" prop="allSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.allSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="vedioWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.vedioWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.vedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(代理交公司)" prop="vedioSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.vedioSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="liveWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.liveWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.liveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(代理交公司)" prop="liveSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.liveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="arcadeWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.arcadeWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.arcadeWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(代理交公司)" prop="arcadeSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.arcadeSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA商城(输赢金额)" prop="mallWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.mallWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.mallWinlose)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.naAllGameData.allNowchild.length" :page-sizes="[10, 20]" :page-size="childSize" @size-change="getChildsize" @current-change="getChildpage"></el-pagination>
      </div>
    </div>

    <div class="playerlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">所属玩家列表</p>
        <div style="float:right;margin-right:1rem">
          <el-input placeholder="请输入玩家用户名" class="input" v-model="playerData"></el-input>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchPlayer" :loading="playerLoading">搜索</el-button>
          <el-button @click="resetPlayerSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="naAllNowplayer" stripe>
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
        <el-table-column label="总输赢金额" prop="allWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.allWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.allWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="vedioWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.vedioWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.vedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="liveWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.liveWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.liveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="arcadeWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.arcadeWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.arcadeWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA商城(输赢金额)" prop="mallWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.mallWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.mallWinlose)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.naAllGameData.allNowplayer.length" :page-sizes="[20, 50]" :page-size="playerSize" @size-change="getPlayersize" @current-change="getPlayerpage"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    localStorage.removeItem('searchTime')
    this.$store.commit('resetnaAllchildInfo')
    this.$store.commit('resetnaAllNowplayer')
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naAllGameReport'
    })
    this.$store.commit({
      type: 'recordnaAllID',
      data: ''
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getnaAllNowchild')
    this.$store.dispatch('getnaAllNowplayer')
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naAllGameReport'
    })
  },
  computed: {
    rollNumber () {
      let data = this.$store.state.variable.naAllGameData.allNowlist
      return data
    },
    naAllNowlist () {
      this.nowRole = this.$store.state.variable.naAllGameData.allNowlist.userId
      let data = [this.$store.state.variable.naAllGameData.allNowlist]
      return data
    },
    naAllNowchild () {
      var nowchild = this.$store.state.variable.naAllGameData.allNowchild
      if (this.childPage === 1) {
        nowchild = this.$store.state.variable.naAllGameData.allNowchild.slice(0, this.childSize)
      } else {
        nowchild = this.$store.state.variable.naAllGameData.allNowchild.slice(((this.childPage - 1) * this.childSize), this.childSize * this.childPage)
      }
      return nowchild
    },
    naAllNowplayer () {
      var nowplayer = this.$store.state.variable.naAllGameData.allNowplayer
      if (this.playerPage === 1) {
        nowplayer = this.$store.state.variable.naAllGameData.allNowplayer.slice(0, this.playerSize)
      } else {
        nowplayer = this.$store.state.variable.naAllGameData.allNowplayer.slice(((this.playerPage - 1) * this.playerSize), this.playerSize * this.playerPage)
      }
      return nowplayer
    },
  },
  watch: {
    searchDate (val) {
      if (val[0] != null || val[1] != null) {
        for (var i = val.length - 1; i >= 0; i--) {
          this.searchDate[i] = new Date(this.searchDate[i].toString()).getTime()
        }
      }
    },
    'rollNumber.betCount' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.betCount = this._object.tweeningNumber.toFixed(0)
        }).start()
      animate()
    },
    'rollNumber.allWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.allWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.allSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.allSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.vedioWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.vedioWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.vedioSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.vedioSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.liveWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.liveWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.liveSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.liveSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.arcadeWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.arcadeWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.arcadeSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.arcadeSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.mallWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.mallWinlose = this._object.tweeningNumber.toFixed(0)
        }).start()
      animate()
    },
  },
  data () {
    return {
      flashNumber: {
        betCount: 0,
        allWinlose: 0,
        allSubmit: 0,
        vedioWinlose: 0,
        vedioSubmit: 0,
        liveWinlose: 0,
        liveSubmit: 0,
        arcadeWinlose: 0,
        arcadeSubmit: 0,
        mallWinlose: 0,
      },
      playerData: '',
      loading: false,
      playerLoading: false,
      searchDate: [],
      childSize: 10,
      childPage: 1,
      playerSize: 20,
      playerPage: 1,
      nowRole: '',
      loginId: localStorage.loginId,
      loginRole: localStorage.loginRole
    }
  },
  methods: {
    formatToFix (data) {
      if (data && !isNaN(data.toFixed(2))) {
        return data.toFixed(2)
      } else {
        return '0.00'
      }
    },
    formatnickname (data) {
      return data.nickname == 'NULL!' ? '-' : data.nickname
    },
    userType (data) {
      return '代理'
    }, // 格式化用户类型
    searchData () {
      if (this.searchDate[0] == null || this.searchDate[1] == null) {
        this.$message({
          type: 'error',
          message: '请选择搜索时间'
        })
      } else {
        this.loading = true
        localStorage.setItem('searchTime',JSON.stringify(this.searchDate))
        this.$store.dispatch('getnaAllNowchild')
        this.$store.dispatch('getnaAllNowplayer')
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
      localStorage.removeItem('searchTime')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaAllNowchild')
      this.$store.dispatch('getnaAllNowplayer')
    }, // 重置搜索条件
    searchPlayer () {
      if (!this.playerData) {
        this.$message({
          type: 'error',
          message: '请输入玩家用户名'
        })
      } else {
        this.playerLoading = true
        let data = {
          parentId: this.$store.state.variable.naAllGameData.allNowlist.userId,
          query: {
            userName: this.playerData
          },
          sortkey: 'createdAt',
          sort: 'desc'
        }
        invoke({
          url: api.reportPlayer,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              this.rollNumber.betCount = 0
              this.rollNumber.allWinlose = 0
              this.rollNumber.allSubmit = 0
              this.rollNumber.vedioWinlose = 0
              this.rollNumber.vedioSubmit = 0
              this.rollNumber.liveWinlose = 0
              this.rollNumber.liveSubmit = 0
              this.rollNumber.arcadeWinlose = 0
              this.rollNumber.arcadeSubmit = 0
              this.rollNumber.mallWinlose = 0
              this.$store.commit('resetnaAllNowplayer')
              this.$store.commit('getWeek')
              let searchDate = []
              if (localStorage.searchTime) {
                searchDate = JSON.parse(localStorage.searchTime)
              } else {
                searchDate = [this.$store.state.startTime, this.$store.state.endTime]
              }
              var data = ret.data.payload
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
                  userIds: [item.userId],
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
                  url: api.calcUserStat,
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
                      this.$store.commit({
                        type: 'recordnaAllNowplayer',
                        data: item
                      })
                    }
                  }
                )
                this.$store.commit('closeLoading')
              }
              this.playerLoading = false
            }
          }
        )
      }
    }, // 搜索玩家
    resetPlayerSearch () {
      this.playerData = ''
      this.rollNumber.betCount = 0
      this.rollNumber.allWinlose = 0
      this.rollNumber.allSubmit = 0
      this.rollNumber.vedioWinlose = 0
      this.rollNumber.vedioSubmit = 0
      this.rollNumber.liveWinlose = 0
      this.rollNumber.liveSubmit = 0
      this.rollNumber.arcadeWinlose = 0
      this.rollNumber.arcadeSubmit = 0
      this.rollNumber.mallWinlose = 0
      this.$store.dispatch('getnaAllNowplayer')
    }, // 重置玩家搜索
    checkUser (data) {
      this.$store.commit({
        type: 'recordnaAllID',
        data: data.userId
      })
      this.$store.commit('resetnaAllchildInfo')
      this.$store.commit('resetnaAllNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaAllNowchild')
      this.$store.dispatch('getnaAllNowplayer')
    }, // 跳转下级
    goBack () {
      var data = this.$store.state.variable.naAllGameData.allNowlist.parent
      if (data == '01') {
        data = ''
      }
      this.$store.commit({
        type: 'recordnaAllID',
        data: data
      })
      this.$store.commit('resetnaAllchildInfo')
      this.$store.commit('resetnaAllNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaAllNowchild')
      data !== '01' ? this.$store.dispatch('getnaAllNowplayer') : ''
    }, // 退回上一级
    goPlayDetail (row) {
      localStorage.setItem('playerName', row)
      this.$router.push('agentPlayerDetail')
      this.$store.commit({
        type: 'playerUserName',
        data: row
      })
    }, // 跳转至玩家详情
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
  },
  beforeDestroy () {
    localStorage.removeItem('searchTime')
  }
}
</script>

<style scpoed>
.naAllGame-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.naAllGame-report .input{width: 25rem}
.naAllGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.naAllGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.naAllGame-report .nowUserlist,
.naAllGame-report .childlist,
.naAllGame-report .playerlist{width: 99%;margin: 2rem auto}
.naAllGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.naAllGame-report .fontUrl:hover{text-decoration: underline;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
