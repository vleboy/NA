<template>
  <div class="naLiveGame-report">

    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<span v-if="nowRole != loginId" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData" :loading="loading">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="naLiveNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
          <template scope="scope">
            <span>{{flashNumber.betCount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="left">
          <template scope="scope">
            <span>{{points(flashNumber.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="left">
          <template scope="scope">
            <span :class="[Number(flashNumber.winlose) > 0 ? 'green' : 'red']">{{points(flashNumber.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户占成" prop="rate" align="left">
          <template scope="scope">
            <span>{{(scope.row.rate) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户交公司" prop="submit" align="left">
          <template scope="scope">
            <span :class="[Number(flashNumber.submit) > 0 ? 'green' : 'red']">{{points(flashNumber.submit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="left">
          <template scope="scope">
            <span>{{points(flashNumber.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="left">
          <template scope="scope">
            <span>{{flashNumber.winloseRate}} %</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-if="loginRole != '100'">
      <p class="title">下级列表</p>
      <el-table :data="naLiveNowchild" stripe>
        <el-table-column label="序号" prop="" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="checkUser(scope.row)">{{scope.row.displayName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理员账号" prop="uname" align="left">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="left">
          <template scope="scope">
            <span>{{points(scope.row.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.winlose) > 0 ? 'green' : 'red']">{{points(scope.row.winlose)}}</span>
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
        <el-table-column label="洗码量" prop="mixAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="left">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.naLiveGameData.nowChildList.length" :page-sizes="[10, 20]" :page-size="childSize" @size-change="getChildsize" @current-change="getChildpage"></el-pagination>
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
      <el-table :data="naLiveNowplayer" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="left">
          <template scope="scope">
            <span>{{formatNickname(scope.row.nickname)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="left">
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="left">
          <template scope="scope">
            <span>{{points(scope.row.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.winlose) > 0 ? 'green' : 'red']">{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="left">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.naLiveGameData.nowPlayerlist.length" :page-sizes="[20, 50]" :page-size="playerSize" @size-change="getPlayersize" @current-change="getPlayerpage"></el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import TWEEN from '@tweenjs/tween.js'
import { formatPoints } from '@/behavior/format'
export default {
  beforeCreate () {
    localStorage.removeItem('searchTime')
    this.$store.commit('resetnaLiveNowchild')
    this.$store.commit('resetnaLiveNowplayer')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naLiveGameReport'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordnaLiveID',
      data: ''
    })
    this.$store.commit('startLoading')
    this.$store.dispatch('getnaLiveNowchild')
    this.$store.dispatch('getnaLiveNowplayer')
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naLiveGameReport'
    })
  },
  computed:{
    rollNumber () {
      let data = this.$store.state.variable.naLiveGameData.nowList
      if (!data.rate) {
        data.rate = 0
      }
      data.submit = (data.winlose * (1 - data.rate/100))
      if (isNaN(data.winlose * 100 / data.mixAmount)) {
        data.winloseRate = 0
      } else {
        data.winloseRate = (data.winlose / data.mixAmount) * 100
      }
      return data
    },
    naLiveNowlist () {
      this.nowRole = this.$store.state.variable.naLiveGameData.nowList.userId
      let data = [this.$store.state.variable.naLiveGameData.nowList]
      return data
    },
    naLiveNowchild () {
      var nowchild = this.$store.state.variable.naLiveGameData.nowChildList
      if (this.childPage === 1) {
        nowchild = this.$store.state.variable.naLiveGameData.nowChildList.slice(0, this.childSize)
      } else {
        nowchild = this.$store.state.variable.naLiveGameData.nowChildList.slice(((this.childPage - 1) * this.childSize), this.childSize * this.childPage)
      }
      return nowchild
    },
    naLiveNowplayer () {
      var nowplayer = this.$store.state.variable.naLiveGameData.nowPlayerlist
      if (this.playerPage === 1) {
        nowplayer = this.$store.state.variable.naLiveGameData.nowPlayerlist.slice(0, this.playerSize)
      } else {
        nowplayer = this.$store.state.variable.naLiveGameData.nowPlayerlist.slice(((this.playerPage - 1) * this.playerSize), this.playerSize * this.playerPage)
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
    },
    'rollNumber.bet' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.bet = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
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
    'rollNumber.winlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.winlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.submit' (newValue, oldValue) {
      if (!oldValue || isNaN(oldValue)) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.submit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.mixAmount' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.mixAmount = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.winloseRate' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.winloseRate = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    }
  },
  data () {
    return {
      flashNumber: {
        bet: 0,
        betCount: 0,
        submit: 0,
        winlose: 0,
        winloseRate: 0,
        mixAmount: 0
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
    searchPlayer () {
      if (!this.playerData) {
        this.$message({
          type: 'error',
          message: '请输入玩家用户名'
        })
      } else {
        this.playerLoading = true
        let data = {
          parentId: this.$store.state.variable.naLiveGameData.nowList.userId,
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
              var data = ret.data.payload
              this.$store.commit('getWeek')
              let searchDate = []
              if (localStorage.searchTime) {
                searchDate = JSON.parse(localStorage.searchTime)
              } else {
                searchDate = [this.$store.state.startTime, this.$store.state.endTime]
              }
              this.rollNumber.bet = 0
              this.rollNumber.betCount = 0
              this.rollNumber.submit = 0
              this.rollNumber.winlose = 0
              this.rollNumber.winloseRate = 0
              this.rollNumber.mixAmount = 0
              this.$store.commit('resetnaLiveNowplayer')
              for (let item of data) {
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
                      var data = ret.data.payload[0]
                      if (data) {
                        if (item.userName == data.userName) {
                          item.bet = data.bet
                          item.betCount = data.betCount
                          item.mixAmount = data.mixAmount
                          item.winlose = data.winlose
                          item.winloseRate = data.winlose / data.bet
                          this.$store.commit({
                            type: 'recordnaLiveNowplayer',
                            data: item
                          })
                        }
                      }
                    }
                  }
                )
              }
              this.playerLoading = false
            }
          }
        )
      }
    }, // 搜索玩家数据
    resetPlayerSearch () {
      this.playerData = ''
      this.rollNumber.bet = 0
      this.rollNumber.betCount = 0
      this.rollNumber.submit = 0
      this.rollNumber.winlose = 0
      this.rollNumber.winloseRate = 0
      this.rollNumber.mixAmount = 0
      this.$store.dispatch('getnaLiveNowplayer')
    }, // 重置玩家搜索
    formatWinloseRate (data) {
      return data && !isNaN(data) ? (Number(data) * 100).toFixed(2) + '%' : '0.00' + '%'
    },
    formatNickname (data) {
      return data == 'NULL!'? '-' : data
    },
    userType (data) {
      if (data.role == '1') {
        return '管理员'
      } else if (data.role == '10') {
        return '线路商'
      } else {
        return '商户'
      }
    }, // 格式化用户类型
    points (data) {
      if (data && !isNaN(Number(data).toFixed(2))) {
        return formatPoints(Number(data).toFixed(2))
      } else {
        return '0.00'
      }
    }, // 格式化点数
    searchData () {
      if (this.searchDate[0] == null || this.searchDate[1] == null) {
        this.$message({
          type: 'error',
          message: '请选择搜索时间'
        })
      } else {
        this.loading = true
        localStorage.setItem('searchTime',JSON.stringify(this.searchDate))
        this.$store.dispatch('getnaLiveNowchild')
        this.$store.dispatch('getnaLiveNowplayer')
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
      this.$store.dispatch('getnaLiveNowchild')
      this.$store.dispatch('getnaLiveNowplayer')
    }, // 重置搜索条件
    checkUser (data) {
      this.$store.commit({
        type: 'recordnaLiveID',
        data: data.userId
      })
      this.$store.commit('resetnaLiveNowchild')
      this.$store.commit('resetnaLiveNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaLiveNowchild')
      this.$store.dispatch('getnaLiveNowplayer')
    }, // 查看当前用户信息
    goBack () {
      var data = this.$store.state.variable.naLiveGameData.nowList.parent
      if (data == '01') {
        data = ''
      }
      this.$store.commit({
        type: 'recordnaLiveID',
        data: data
      })
      this.$store.commit('resetnaLiveNowchild')
      this.$store.commit('resetnaLiveNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaLiveNowchild')
      data !== '01' ? this.$store.dispatch('getnaLiveNowplayer') : ''
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
    goPlayDetail (row) {
      localStorage.setItem('playerName', row)
      this.$router.push('playerdetail')
      this.$store.commit({
        type: 'playerUserName',
        data: row
      })
    }
  },
  beforeDestroy () {
    localStorage.removeItem('searchTime')
  }
}
</script>

<style scpoed>
.naLiveGame-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.naLiveGame-report .input{width: 25rem}
.naLiveGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.naLiveGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.naLiveGame-report .nowUserlist,
.naLiveGame-report .childlist,
.naLiveGame-report .playerlist{width: 99%;margin: 2rem auto}
.naLiveGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.naLiveGame-report .fontUrl:hover{text-decoration: underline;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
