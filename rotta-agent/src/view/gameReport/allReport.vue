<template>
  <div class="allReport">
    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<span v-if="nowRole != loginId" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData" :loading="loading">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="allNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="代理占成" prop="rate" align="center">
          <template scope="scope">
            <span>{{(scope.row.rate)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="allbetCount" align="center">
          <template scope="scope">
            <span>{{(flashNumber.allbetCount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="allWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.allWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.allWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="allSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.allSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA游戏(输赢金额)" prop="naWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.naWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.naWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA游戏(代理交公司)" prop="naSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.naSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="TTG游戏(输赢金额)" prop="ttgWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.ttgWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.ttgWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="TTG游戏(代理交公司)" prop="ttgSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.ttgSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA游戏(输赢金额)" prop="saWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(flashNumber.saWinlose) > 0 ? 'green' : 'red']">{{(flashNumber.saWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA游戏(代理交公司)" prop="saSubmit" align="center">
          <template scope="scope">
            <span>{{(flashNumber.saSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-if="loginRole != '100'">
      <p class="title">下级列表</p>
      <el-table :data="allNowchild" stripe>
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
        <el-table-column label="代理占成" prop="rate" align="center">
          <template scope="scope">
            <span>{{(scope.row.rate)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="allbetCount" align="center">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="allWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.allWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.allWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="allSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.allSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA游戏(输赢金额)" prop="naWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.allWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.naWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA游戏(代理交公司)" prop="naSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.naSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="TTG游戏(输赢金额)" prop="ttgWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.allWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.ttgWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="TTG游戏(代理交公司)" prop="ttgSubmit" align="center">
          <template scope="scope">
            <span>{{formatToFix(scope.row.ttgSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA游戏(输赢金额)" prop="saWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.saWinlose) > 0 ? 'green' : 'red']">{{(scope.row.saWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA游戏(代理交公司)" prop="saSubmit" align="center">
          <template scope="scope">
            <span>{{(scope.row.saSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.allGameData.allNowchild.length" :page-sizes="[10, 20]" :page-size="childSize" @size-change="getChildsize" @current-change="getChildpage"></el-pagination>
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
      <el-table :data="allNowplayer" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="center">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="allbetCount" align="center">
        </el-table-column>
        <el-table-column label="总输赢金额" prop="allWinlose" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.allWinlose) > 0 ? 'green' : 'red']">{{formatToFix(scope.row.allWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA游戏(输赢金额)" prop="naWinlose" align="center">
        </el-table-column>
        <el-table-column label="TTG游戏(输赢金额)" prop="ttgWinlose" align="center">
        </el-table-column>
        <el-table-column label="SA游戏(输赢金额)" prop="saWinlose" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.allGameData.allNowplayer.length" :page-sizes="[20, 50]" :page-size="playerSize" @size-change="getPlayersize" @current-change="getPlayerpage"></el-pagination>
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
    this.$store.commit({
      type: 'recordNowindex',
      data: 'allReport'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit('startLoading')
    this.$store.dispatch('getallNowchild')
    this.$store.dispatch('getallNowplayer')
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'allReport'
    })
  },
  computed: {
    rollNumber () {
      let data = this.$store.state.variable.allGameData.allNowlist
      return data
    },
    allNowlist () {
      this.nowRole = this.$store.state.variable.allGameData.allNowlist.userId
      let data = [this.$store.state.variable.allGameData.allNowlist]
      return data
    },
    allNowchild () {
      var nowchild = this.$store.state.variable.allGameData.allNowchild
      if (this.childPage === 1) {
        nowchild = this.$store.state.variable.allGameData.allNowchild.slice(0, this.childSize)
      } else {
        nowchild = this.$store.state.variable.allGameData.allNowchild.slice(((this.childPage - 1) * this.childSize), this.childSize * this.childPage)
      }
      return nowchild
    },
    allNowplayer () {
      var nowplayer = this.$store.state.variable.allGameData.allNowplayer
      if (this.playerPage === 1) {
        nowplayer = this.$store.state.variable.allGameData.allNowplayer.slice(0, this.playerSize)
      } else {
        nowplayer = this.$store.state.variable.allGameData.allNowplayer.slice(((this.playerPage - 1) * this.playerSize), this.playerSize * this.playerPage)
      }
      return nowplayer
    }
  },
  data () {
    return {
      flashNumber: {
        allbetCount: 0,
        allWinlose: 0,
        allSubmit: 0,
        naWinlose: 0,
        naSubmit: 0,
        ttgWinlose: 0,
        ttgSubmit: 0,
        saWinlose: 0,
        saSubmit: 0
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
  watch: {
    searchDate (val) {
      if (val[0] != null || val[1] != null) {
        for (var i = val.length - 1; i >= 0; i--) {
          this.searchDate[i] = new Date(this.searchDate[i].toString()).getTime()
        }
      }
    },
    'rollNumber.allbetCount' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.allbetCount = this._object.tweeningNumber.toFixed(0)
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
    'rollNumber.naWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.naWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.naSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.naSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.ttgWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.ttgWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.ttgSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.ttgSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.saWinlose' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.saWinlose = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
    },
    'rollNumber.saSubmit' (newValue, oldValue) {
      if (!oldValue) {
        oldValue = 0
      }
      let vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue }).easing(TWEEN.Easing.Quadratic.Out).to({ tweeningNumber: newValue }, 500).onUpdate(function () {
          vm.flashNumber.saSubmit = this._object.tweeningNumber.toFixed(2)
        }).start()
      animate()
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
        this.$store.dispatch('getallNowchild')
        this.$store.dispatch('getallNowplayer')
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
      this.$store.dispatch('getallNowchild')
      this.$store.dispatch('getallNowplayer')
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
          parentId: this.$store.state.variable.allGameData.allNowlist.userId,
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
              this.rollNumber.allbetCount = 0
              this.rollNumber.allWinlose = 0
              this.rollNumber.allSubmit = 0
              this.rollNumber.naWinlose = 0
              this.rollNumber.naSubmit = 0
              this.rollNumber.ttgWinlose = 0
              this.rollNumber.ttgSubmi = 0
              this.rollNumber.saWinlose = 0
              this.rollNumber.saSubmi = 0
              this.$store.commit('resetallNowplayer')
              this.$store.commit('getWeek')
              let searchDate = []
              if (localStorage.searchTime) {
                searchDate = JSON.parse(localStorage.searchTime)
              } else {
                searchDate = [this.$store.state.startTime, this.$store.state.endTime]
              }
              var data = ret.data.payload
              for (let item of data) {
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
                      this.$store.commit({
                        type: 'recordallNowplayer',
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
      this.rollNumber.allbetCount = 0
      this.rollNumber.allWinlose = 0
      this.rollNumber.allSubmit = 0
      this.rollNumber.naWinlose = 0
      this.rollNumber.naSubmit = 0
      this.rollNumber.ttgWinlose = 0
      this.rollNumber.ttgSubmi = 0
      this.rollNumber.saWinlose = 0
      this.rollNumber.saSubmi = 0
      this.$store.dispatch('getallNowplayer')
    }, // 重置玩家搜索
    checkUser (data) {
      this.$store.commit({
        type: 'recordallID',
        data: data.userId
      })
      this.$store.commit('resetallchildInfo')
      this.$store.commit('resetallNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getallNowchild')
      this.$store.dispatch('getallNowplayer')
    }, // 跳转下级
    goBack () {
      var data = this.$store.state.variable.allGameData.allNowlist.parent
      if (data == '01') {
        data = ''
      }
      this.$store.commit({
        type: 'recordallID',
        data: data
      })
      this.$store.commit('resetallchildInfo')
      this.$store.commit('resetallNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getallNowchild')
      data !== '01' ? this.$store.dispatch('getallNowplayer') : ''
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
  .allReport .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
  .allReport .input{width: 25rem}
  .allReport .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
  .allReport .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
  .allReport .nowUserlist,
  .allReport .childlist,
  .allReport .playerlist{width: 99%;margin: 2rem auto}
  .allReport .fontUrl{cursor: pointer;color: #20a0ff}
  .allReport .fontUrl:hover{text-decoration: underline;}

  .green{color: #00CC00}
  .red{color: #FF3300}
</style>
