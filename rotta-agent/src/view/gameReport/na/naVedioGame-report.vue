<template>
  <div class="naVedioGame-report">
    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<span v-if="nowId != loginId" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData" :loading="loading">查询</el-button>
          <el-button @click="resetSearch">清空</el-button>
        </div>
      </div>
      <el-table :data="naVedioNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
          <template scope="scope">
            <span>{{flashNumber.betCount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="投注金额" prop="bet" align="center">
          <template scope="scope">
            <span>{{points(flashNumber.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.winlose) > 0 ? 'green' : 'red']">{{points(flashNumber.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="返水比例" prop="vedioMix" align="center">
          <template scope="scope">
            <span>{{(scope.row.vedioMix) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="佣金" prop="nowBouns" align="center">
          <template scope="scope">
            <span>{{(flashNumber.nowBouns)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理总金额" prop="nowallBet" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.nowallBet) > 0 ? 'green' : 'red']">{{flashNumber.nowallBet}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理占成" prop="rate" align="center">
          <template scope="scope">
            <span>{{(scope.row.rate) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理交公司" prop="nowSubmit" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.nowSubmit) > 0 ? 'green' : 'red']">{{flashNumber.nowSubmit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="center">
          <template scope="scope">
            <span>{{flashNumber.winloseRate}} %</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist">
      <p class="title">下级列表</p>
      <el-table :data="naVedioNowchild" stripe>
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
            <span :class="[Number(scope.row.winlose) > 0 ? 'green' : 'red']">{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="返水比例" prop="vedioMix" align="center">
          <template scope="scope">
            <span>{{(scope.row.vedioMix) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="佣金" prop="nowBouns" align="center">
          <template scope="scope">
            <span>{{formatFix(scope.row.nowBouns)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理总金额" prop="nowallBet" align="center">  
          <template scope="scope">
            <span :class="[Number(scope.row.nowallBet) > 0 ? 'green' : 'red']">{{points(scope.row.nowallBet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理占成" prop="rate" align="center">
          <template scope="scope">
            <span>{{(scope.row.rate) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理交公司" prop="nowSubmit" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.nowSubmit) > 0 ? 'green' : 'red']">{{points(scope.row.nowSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="center">
          <template scope="scope">
            <span>{{formatWinloseRate(scope.row.winloseRate)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.naVedioGameData.nowChildList.length" :page-sizes="[10, 20]" :page-size="childSize" @size-change="getChildsize" @current-change="getChildpage"></el-pagination>
      </div>
    </div>

    <div class="playerlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">所属玩家列表</p>
        <div style="float:right;margin-right:1rem">
          <el-input placeholder="请输入玩家用户名" class="input" v-model="playerData"></el-input>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchPlayer" :loading="playerLoading">查询</el-button>
          <el-button @click="resetPlayerSearch">清空</el-button>
        </div>
      </div>
      <el-table :data="naVedioNowplayer" stripe>
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
        <el-table-column label="投注金额" prop="bet" align="center">
          <template scope="scope">
            <span>{{points(scope.row.bet)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="输赢金额" prop="winlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.winlose) > 0 ? 'green' : 'red']">{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="返水比例" prop="vedioMix" align="center">
          <template scope="scope">
            <span>{{(scope.row.vedioMix) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="佣金" prop="nowBouns" align="center">
          <template scope="scope">
            <span>{{formatFix(scope.row.nowBouns)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员总金额" prop="nowallBet" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.nowallBet) > 0 ? 'green' : 'red']">{{points(scope.row.nowallBet)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.naVedioGameData.nowPlayerlist.length" :page-sizes="[20, 50]" :page-size="playerSize" @size-change="getPlayersize" @current-change="getPlayerpage"></el-pagination>
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
    this.$store.commit('startLoading')
    localStorage.removeItem('searchTime')
    this.$store.commit('resetnaVedioNowchild')
    this.$store.commit('resetnaVedioNowplayer')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naVedioGameReport'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordnaVedioID',
      data: ''
    })
    this.$store.dispatch('getnaVedioNowchild')
    this.$store.dispatch('getnaVedioNowplayer')
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naVedioGameReport'
    })
  },
  computed:{
    rollNumber () {
      let data = this.$store.state.variable.naVedioGameData.nowList
      if (!data.rate) {
        data.rate = 0
      }
      if (!data.vedioMix) {
        data.vedioMix = 0
      }
      if (isNaN(data.vedioMix/100 * data.bet)) {
        data.nowBouns = '0.00'
      } else {
        data.nowBouns = data.vedioMix/100 * data.bet
      } // 洗码佣金
      data.nowallBet = (data.vedioMix/100 * data.bet) + data.winlose // 代理总金额
      data.nowSubmit = data.winlose * (1 - data.rate/100) // 代理交公司
      if (isNaN((data.vedioMix/100 * data.bet) + data.winlose * 100 / data.bet)) {
        data.winloseRate = 0
      } else {
        data.winloseRate = ((data.vedioMix/100 * data.bet) + data.winlose) * 100 / data.bet
      } // 获利比例
      return data
    },
    naVedioNowlist () {
      this.nowId = this.$store.state.variable.naVedioGameData.nowList.userId
      let data = [this.$store.state.variable.naVedioGameData.nowList]
      return data
    },
    naVedioNowchild () {
      var nowchild = this.$store.state.variable.naVedioGameData.nowChildList
      if (this.childPage === 1) {
        nowchild = this.$store.state.variable.naVedioGameData.nowChildList.slice(0, this.childSize)
      } else {
        nowchild = this.$store.state.variable.naVedioGameData.nowChildList.slice(((this.childPage - 1) * this.childSize), this.childSize * this.childPage)
      }
      return nowchild
    },
    naVedioNowplayer () {
      var nowplayer = this.$store.state.variable.naVedioGameData.nowPlayerlist
      if (this.playerPage === 1) {
        nowplayer = this.$store.state.variable.naVedioGameData.nowPlayerlist.slice(0, this.playerSize)
      } else {
        nowplayer = this.$store.state.variable.naVedioGameData.nowPlayerlist.slice(((this.playerPage - 1) * this.playerSize), this.playerSize * this.playerPage)
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
    'rollNumber.nowSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.nowSubmit = this._object.tweeningNumber.toFixed(2)
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
    'rollNumber.nowBouns' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.nowBouns = this._object.tweeningNumber.toFixed(2)
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
    },
    'rollNumber.nowallBet' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.nowallBet = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    }
  },
  data () {
    return {
      flashNumber: {
        bet: 0,
        betCount: 0,
        nowSubmit: 0,
        winlose: 0,
        winloseRate: 0,
        nowallBet: 0,
        nowBouns: 0
      },
      playerData: '',
      loading: false,
      playerLoading: false,
      searchDate: [],
      childSize: 10,
      childPage: 1,
      playerSize: 20,
      playerPage: 1,
      nowId: '',
      loginId: localStorage.loginId
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
          parentId: this.$store.state.variable.naVedioGameData.nowList.userId,
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
              this.rollNumber.nowSubmit = 0
              this.rollNumber.winlose = 0
              this.rollNumber.winloseRate = 0
              this.rollNumber.nowallBet = 0
              this.rollNumber.nowBouns = 0
              this.$store.commit('resetnaVedioNowplayer')
              for (let item of data) {
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
                      var data = ret.data.payload[0]
                      if (data) {
                        if (item.userName == data.userName) {
                          item.bet = data.bet
                          item.betCount = data.betCount
                          item.winlose = data.winlose
                          item.nowBouns = data.bet * item.vedioMix / 100
                          item.nowallBet = data.bet * item.vedioMix/100 + data.winlose
                          item.winloseRate = item.nowallBet / data.bet
                          this.$store.commit({
                            type: 'recordnaVedioNowplayer',
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
      this.rollNumber.nowSubmit = 0
      this.rollNumber.winlose = 0
      this.rollNumber.winloseRate = 0
      this.rollNumber.nowallBet = 0
      this.rollNumber.nowBouns = 0
      this.$store.dispatch('getnaVedioNowplayer')
    }, // 重置玩家搜索
    formatWinloseRate (data) {
      return data && !isNaN(data) ? (data * 100).toFixed(2) + '%' : '0.00%'
    },
    userType (data) {
      return '代理'
    }, // 格式化用户类型
    points (data) {
      return formatPoints('' + data)
    }, // 格式化点数
    formatFix (data) {
      return isNaN(data.toFixed(2)) ? '0.00' : data.toFixed(2)
    }, // 格式化金额
    formatPercent (data) {
      return data ? data * 100 + '%' : '0.00%'
    }, // 格式化百分数
    searchData () {
      if (this.searchDate[0] == null || this.searchDate[1] == null) {
        this.$message({
          type: 'error',
          message: '请选择搜索时间'
        })
      } else {
        this.loading = true
        localStorage.setItem('searchTime',JSON.stringify(this.searchDate))
        this.$store.dispatch('getnaVedioNowchild')
        this.$store.dispatch('getnaVedioNowplayer')
        let _self = this
        setTimeout(function(){
          _self.$message({
            type: 'success',
            message: '查询完毕!'
          })
          _self.loading = false
        },3000)
      }
    }, // 按时间搜索
    resetSearch () {
      this.searchDate = []
      localStorage.removeItem('searchTime')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaVedioNowchild')
      this.$store.dispatch('getnaVedioNowplayer')
    }, // 重置搜索条件
    checkUser (data) {
      this.$store.commit({
        type: 'recordnaVedioID',
        data: data.userId
      })
      this.$store.commit('resetnaVedioNowchild')
      this.$store.commit('resetnaVedioNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaVedioNowchild')
      this.$store.dispatch('getnaVedioNowplayer')
    }, // 查看当前用户信息
    goPlayDetail (row) {
      this.$store.commit('startLoading')
      localStorage.setItem('playerName', row)
      invoke({
        url: api.getPlayerDetail + '?' + 'userName' + '=' + row,
        method: api.get
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            let playerDetail = res.data
            this.$store.commit({
              type: 'playerDetail',
              data: playerDetail
            })
          }
          this.$router.push('agentPlayerDetail')
          this.$store.commit('closeLoading')
        }
      )
    }, // 跳转至玩家详情
    goBack () {
      var data = this.$store.state.variable.naVedioGameData.nowList.parent
      if (data == '01') {
        data = ''
      }
      this.$store.commit({
        type: 'recordnaVedioID',
        data: data
      })
      this.$store.commit('resetnaVedioNowchild')
      this.$store.commit('resetnaVedioNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getnaVedioNowchild')
      data !== '01' ? this.$store.dispatch('getnaVedioNowplayer') : ''
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
    } // 玩家列表分页
  },
  beforeDestroy () {
    localStorage.removeItem('searchTime')
  }
}
</script>

<style scpoed>
.naVedioGame-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.naVedioGame-report .input{width: 25rem}
.naVedioGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.naVedioGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.naVedioGame-report .nowUserlist,
.naVedioGame-report .childlist,
.naVedioGame-report .playerlist{width: 99%;margin: 2rem auto}
.naVedioGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.naVedioGame-report .fontUrl:hover{text-decoration: underline;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
