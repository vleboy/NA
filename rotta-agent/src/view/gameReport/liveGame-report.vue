<template>
  <div class="liveGame-report">

    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<span v-if="nowId != loginId" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span></p>
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
            <span :class="[Number(scope.row.winlose) > 0 ? 'green' : 'red']">{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码比" prop="liveMix" align="center">
          <template scope="scope">
            <span>{{(scope.row.liveMix) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码佣金" prop="nowBouns" align="center">
        </el-table-column>
        <el-table-column label="代理总金额" prop="nowallBet" align="center">  
          <template scope="scope">
            <span :class="[Number(scope.row.nowallBet) > 0 ? 'green' : 'red']">{{scope.row.nowallBet}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理占成" prop="rate" align="center">
          <template scope="scope">
            <span>{{(scope.row.rate) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理交公司" prop="nowSubmit" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.nowSubmit) > 0 ? 'green' : 'red']">{{scope.row.nowSubmit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="获利比例" prop="winloseRate" align="center">
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
            <span :class="[Number(scope.row.winlose) > 0 ? 'green' : 'red']">{{points(scope.row.winlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码比" prop="liveMix" align="center">
          <template scope="scope">
            <span>{{(scope.row.liveMix) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码佣金" prop="nowBouns" align="center">
        </el-table-column>
        <el-table-column label="代理总金额" prop="nowallBet" align="center">  
          <template scope="scope">
            <span :class="[Number(scope.row.nowallBet) > 0 ? 'green' : 'red']">{{scope.row.nowallBet}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理占成" prop="rate" align="center">
          <template scope="scope">
            <span>{{(scope.row.rate) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理交公司" prop="nowSubmit" align="center">
          <template scope="scope">
            <span :class="[Number(scope.row.nowSubmit) > 0 ? 'green' : 'red']">{{scope.row.nowSubmit}}</span>
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
          <el-input placeholder="请输入玩家用户名" class="input" v-model="playerData"></el-input>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchPlayer" :loading="playerLoading">搜索</el-button>
          <el-button @click="resetPlayerSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="liveNowplayer" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="center">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
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
        <el-table-column label="洗码比" prop="liveMix" align="center">
          <template scope="scope">
            <span>{{(scope.row.liveMix) + '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码量" prop="mixAmount" align="center">
          <template scope="scope">
            <span>{{points(scope.row.mixAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="洗码佣金" prop="nowBouns" align="center">
        </el-table-column>
        <el-table-column label="会员总金额" prop="nowallBet" align="center">  
          <template scope="scope">
            <span :class="[Number(scope.row.nowallBet) > 0 ? 'green' : 'red']">{{scope.row.nowallBet}}</span>
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
    localStorage.removeItem('searchTime')
    this.$store.commit('resetLiveNowchild')
    this.$store.commit('resetLiveNowplayer')
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
    this.$store.dispatch('getLiveNowchild')
    this.$store.dispatch('getLiveNowplayer')
  },
  computed:{
    liveNowlist () {
      let arr = []
      this.nowId = this.$store.state.variable.liveGameData.nowList.userId
      let data = this.$store.state.variable.liveGameData.nowList
      data.nowBouns = (data.liveMix/100 * data.mixAmount).toFixed(2) // 洗码佣金
      data.nowallBet = (data.liveMix/100 * data.mixAmount + data.winlose).toFixed(2) // 代理总金额
      data.nowSubmit = ((data.liveMix/100 * data.mixAmount + data.winlose) * (1 - data.liveMix/100)).toFixed(2) // 代理交公司
      data.winloseRate = (data.nowSubmit / data.mixAmount) // 获利比例
      arr.push(data)
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
      return data? (data * 100).toFixed(2) + '%' : '0.00%'
    },
    formatNickname (data) {
      return data == 'NULL!'? '-' : data
    },
    points (data) {
      return formatPoints('' + data)
    }, // 格式化点数
    formatPercent (data) {
      return data? data * 100 + '%' : '0.00%'
    }, // 格式化百分数
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
        localStorage.setItem('searchTime',JSON.stringify(this.searchDate))
        this.$store.dispatch('getLiveNowchild')
        this.$store.dispatch('getLiveNowplayer')
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
      this.$store.dispatch('getLiveNowchild')
      this.$store.dispatch('getLiveNowplayer')
    }, // 重置搜索条件
    checkUser (data) {
      this.$store.commit({
        type: 'recordLiveID',
        data: data.userId
      })
      this.$store.commit('resetLiveNowchild')
      this.$store.commit('resetLiveNowplayer')
      this.$store.commit('startLoading')
      this.$store.dispatch('getLiveNowchild')
      this.$store.dispatch('getLiveNowplayer')
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
      var data = this.$store.state.variable.liveGameData.nowList.parent
      if (data == '01') {
        data = ''
      }
      this.$store.commit({
        type: 'recordLiveID',
        data: data
      })
      this.$store.commit('resetLiveNowchild')
      this.$store.commit('resetLiveNowplayer')
      this.$store.commit('startLoading')
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
    } // 玩家列表分页
  },
  beforeDestroy () {
    localStorage.removeItem('searchTime')
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

.green{color: #00CC00}
.red{color: #FF3300}
</style>
