<template>
  <div class="naAllReport" @click="getTimer">
    <div class="nowUserlist">

      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表</p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false" align="right" :clearable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>

      <el-table :data="naAllNowlist" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="refreshList()">{{formatSuffix(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="naAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="naAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="naAllSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naAllSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="naLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏( 代理交公司)" prop="naLiveSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naLiveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="naVedioWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naVedioWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naVedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏( 代理交公司)" prop="naVedioSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naVedioSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="naArcadeWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naArcadeWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naArcadeWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏( 代理交公司)(收)" prop="naArcadeSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naArcadeSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist">
      <p class="title">直属下级列表</p>
      <el-table :data="naAllNowchild" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="getChild_player(scope.row, true)">{{(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="naAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="naAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="naAllSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naAllSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="naLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏( 代理交公司)" prop="naLiveSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naLiveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="naVedioWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naVedioWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naVedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏( 代理交公司)" prop="naVedioSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naVedioSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="naArcadeWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naArcadeWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naArcadeWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏( 代理交公司)" prop="naArcadeSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naArcadeSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-for="(item, index) of naAllRenderChild">
      <p class="title">({{item.length > 0 && item[0].parentDisplayName ? item[0].parentDisplayName : ''}}) 下级列表</p>
      <el-table :data="item" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="left" :formatter="userType">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="left">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="getChild_player(scope.row, false)">{{(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易次数" prop="naAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="naAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="naAllSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naAllSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="naLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏( 代理交公司)" prop="naLiveSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naLiveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="naVedioWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naVedioWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naVedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏( 代理交公司)" prop="naVedioSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naVedioSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="naArcadeWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naArcadeWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naArcadeWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏( 代理交公司)" prop="naArcadeSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.naArcadeSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="playerlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left"><span v-if="playerParent">({{playerParent}})</span>所属玩家列表</p>
      </div>
      <el-table :data="naAllPlayer" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="left">
        </el-table-column>
        <el-table-column label="交易次数" prop="naAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="naAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="naLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="naVedioWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naVedioWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naVedioWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="naArcadeWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.naArcadeWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.naArcadeWinlose)}}</span>
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
      data: 'naAllGameReport'
    })
    this.$store.commit('returnLocalStorage')
  },
  created () {
    this.refreshList()
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naAllGameReport'
    })
  },
  computed: {
    naAllNowlist () {
      let data = [this.nowList]
      return data
    },
    naAllNowchild () {
      return this.nowChild
    },
    naAllRenderChild () {
      let child = this.clickChild
      return child
    },
    naAllPlayer () {
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
          if (val[0] < 1514736000000 || (val[0] < 1517796000000 && val[1] > 1517796000000)) {
            this.$message({
              type: 'error',
              message: '该时间范围暂不支持查询',
              duration: 0,
              showClose: true,
            })
            this.isSelect_time = true
          } else {
            if (val[1] < 1517796000000) {
              this.$message({
                type: 'warning',
                message: '当前时间范围查询数据为旧版报表',
                duration: 5000
              })
            }
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
      }
    },
  },
  data () {
    return {
      loginRole: localStorage.loginRole, // 登陆角色类型

      isSelect_time: false, // 是否自定义搜索时间
      searchDate: getWeek(), // 搜索时间戳

      nowList: '', // 登录角色报表信息
      nowChild: [], // 登陆角色直属下级

      clickChild: [], // 点击渲染的下级
      rendered: [], // 已经渲染的下级

      nowPlayer: [], // 当前登录或点击渲染的商户玩家
      playerParent: '', // 当前玩家所属商户昵称
    }
  },
  methods: {
    getTimer () {
      let timer = document.getElementsByTagName('input')
      for (let item of timer) {
        item.readOnly = true
      }
      let clear = document.getElementsByClassName('el-picker-panel__link-btn')
      for (let btn of clear) {
        btn.style.display = 'none'
      }
    }, // 原生操作时间日期控件
    refreshList (data) {
      this.$store.commit('startLoading')
      this.playerParent = ''
      this.nowPlayer = []
      this.nowChild = []
      this.clickChild = []
      this.nowList = ''
      this.getLoginSelf()
      this.getLoginChild(localStorage.loginId)
      localStorage.loginSuffix != 'Agent' ? this.getPlayer({
        displayName: localStorage.loginDisplayName,
        userId: localStorage.loginId,
        parent: localStorage.parentID
      }, true) : ''
    }, // 初始化列表
    getLoginSelf () {
      let require = {
        userId: localStorage.loginId
      }
      invoke({
        url: api.reportInfo,
        method: api.post,
        data: require
      }).then(result => {
        const [err, ret] = result
        if (err) {
        } else {
          var user = ret.data.payload
          user.naVedioBetAmount = 0;
          user.naArcadeBetAmount = 0;
          user.naLiveBetAmount = 0;
          user.naLiveMix = 0;
          user.naAllbetCount = 0
          user.naAllWinlose = 0
          user.naAllSubmit = 0
          user.naLiveWinlose = 0
          user.naLiveSubmit = 0
          user.naVedioWinlose = 0
          user.naVedioSubmit = 0
          user.naArcadeWinlose = 0
          user.naArcadeSubmit = 0
          this.nowList = user
          if (localStorage.loginSuffix != 'Agent') {
            let time = this.isSelect_time ? this.searchDate : getWeek()
            let naAllGameTyle = [
              {code: gameType('naVedio'), company: 'na'},
              {code: gameType('naArcade'), company: 'na'},
              {code: gameType('naLive'), company: 'na'}
            ] // 所有游戏类型
            let naAllCode = {
              naLive: 30000,
              naVedio: 40000,
              naArcade: 50000
            }
            let data = {
              gameType: naAllGameTyle.map(game => {return game.code}),
              role: '1000',
              userIds: [localStorage.loginId],
              query: {createdAt: time}
            }
            invoke({
              url: api.calcUserStat,
              method: api.post,
              data: data
            }).then(result => {
              const [err,ret] = result
              var data = ret.data.payload
              if (data) {
                this.calcSubmitAmount(naAllCode,data[0],user)
              }
            })
          }
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
            let time = this.isSelect_time ? this.searchDate : getWeek()
            let naAllGameTyle = [
              {code: gameType('naLive'), company: 'na'},
              {code: gameType('naVedio'), company: 'na'},
              {code: gameType('naArcade'), company: 'na'}
            ] // 所有游戏类型
            let naAllReady = [] // promise所有结果返回
            let naAllCode = {
              naLive: 30000,
              naVedio: 40000,
              naArcade: 50000
            }
            for (let item of child) {
              let data = {
                gameType: naAllGameTyle.map(game => {return game.code}),
                role: item.role,
                userIds: [item.userId],
                query: {createdAt: time}
              }
              item.naAllbetCount = 0//总下注数
              item.naAllWinlose = 0 //总输赢
              item.naAllSubmit = 0  //总交公司
              item.naLiveWinlose = 0//真人输赢
              item.naLiveSubmit = 0//真人交公司
              item.naVedioWinlose = 0//电子输赢
              item.naVedioSubmit = 0//电子交公司
              item.naArcadeWinlose = 0//街机输赢
              item.naArcadeSubmit = 0//街机交公司
              item.naAllBetAmount = 0//总投注
              item.naLiveBetAmount =0//真人投注
              item.naVedioBetAmount = 0 //电子投注
              item.naArcadeBetAmount = 0//街机投注
              item.naLiveMix =0;//真人洗码比
              item.naVedioMix = 0;//电子洗码比
              item.naArcadeMix = 0;//街机洗码比
              let pro = new Promise((resolve, reject) => {
                invoke({
                  url: api.calcUserStat,
                  method: api.post,
                  data: data
                }).then(result => {
                  const [err,ret] = result
                  if (err) {
                    reject('error')
                  } else {
                    var data = ret.data.payload
                    if (data[0]) {
                      this.calcSubmitAmount(naAllCode,data[0],item)
                      this.nowChild.push(item)
                    }
                    resolve(item)
                  }
                })
              })
              naAllReady.push(pro)
            }
            let _this = this
            Promise.all(naAllReady).then(result => {
              if(localStorage.loginSuffix == 'Agent'){
                result.forEach(add => {
                  this.nowList.naAllbetCount += add.naAllbetCount
                  this.nowList.naAllWinlose += add.naAllWinlose 
                  this.nowList.naLiveWinlose += add.naLiveWinlose
                  this.nowList.naVedioWinlose += add.naVedioWinlose
                  this.nowList.naArcadeWinlose += add.naArcadeWinlose
                  // localStorage.loginSuffix != 'Agent' ? this.nowList.naAllSubmit += add.naAllSubmit : ''
                  // localStorage.loginSuffix != 'Agent' ? this.nowList.naLiveSubmit += add.naLiveSubmit : ''
                  // localStorage.loginSuffix != 'Agent' ? this.nowList.naVedioSubmit += add.naVedioSubmit : ''
                  // localStorage.loginSuffix != 'Agent' ? this.nowList.naArcadeSubmit += add.naArcadeSubmit : ''
                })
              }
              _this.$store.commit('closeLoading')
            }).catch(err => {
              _this.$message({
                type: 'error',
                message: err.message
              })
              _this.$store.commit('closeLoading')
            })
          }
        }
      )
    }, // 获取登录用户直属下级
    getChild_player(parent, isClear) {
      this.getChild(parent)
      this.getPlayer(parent, isClear)
    }, // 请求下级玩家与代理
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
            var child = ret.data.payload
            let time = this.isSelect_time ? this.searchDate : getWeek()
            let naAllGameTyle = [
              {code: gameType('naLive'), company: 'na'},
              {code: gameType('naVedio'), company: 'na'},
              {code: gameType('naArcade'), company: 'na'}
            ] // 所有游戏类型
            let naAllReady = [] // promise所有结果返回
            let naAllCode = {
              naLive: 30000,
              naVedio: 40000,
              naArcade: 50000
            }
            for (let item of child) {
              let data = {
                gameType: naAllGameTyle.map(game => {return game.code}),
                role: item.role,
                userIds: [item.userId],
                query: {createdAt: time}
              }
              item.naAllbetCount = 0
              item.naAllWinlose = 0
              item.naAllSubmit = 0
              item.naLiveWinlose = 0
              item.naLiveSubmit = 0
              item.naVedioWinlose = 0
              item.naVedioSubmit = 0
              item.naArcadeWinlose = 0
              item.naArcadeSubmit = 0
              item.naAllBetAmount = 0//总投注
              item.naLiveBetAmount =0//真人投注
              item.naVedioBetAmount = 0 //电子投注
              item.naArcadeBetAmount = 0//街
              item.naLiveMix =0;//真人洗码比
              item.naVedioMix = 0;//电子洗码比
              item.naArcadeMix = 0;//街机洗码比
              let pro = new Promise((resolve, reject) => {
                invoke({
                  url: api.calcUserStat,
                  method: api.post,
                  data: data
                }).then(result => {
                  const [err,ret] = result
                  if (err) {
                    reject('error')
                  } else {
                    var data = ret.data.payload
                    if (data[0]) {
                      this.calcSubmitAmount(naAllCode,data[0],item)
                    }
                    resolve(item)
                  }
                })
              })
              naAllReady.push(pro)
            }
            let _this = this
            Promise.all(naAllReady).then(result => {
              result.filter(element => {return element.naAllbetCount > 0}).length > 0 ? this.clickChild.push(result.filter(element => {return element.naAllbetCount > 0})) : ''
              _this.$store.commit('closeLoading')
            }).catch(err => {
              _this.$message({
                type: 'error',
                message: err.message
              })
              _this.$store.commit('closeLoading')
            })
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
                var child = ret.data.payload
                let time = this.isSelect_time ? this.searchDate : getWeek()
                let naAllGameTyle = [
                  {code: gameType('naLive'), company: 'na'},
                  {code: gameType('naVedio'), company: 'na'},
                  {code: gameType('naArcade'), company: 'na'}
                ] // 所有游戏类型
                let naAllReady = [] // promise所有结果返回
                let naAllCode = {
                  naLive: 30000,
                  naVedio: 40000,
                  naArcade: 50000
                }
                for (let item of child) {
                  let data = {
                    gameType: naAllGameTyle.map(game => {return game.code}),
                    role: item.role,
                    userIds: [item.userId],
                    query: {createdAt: time}
                  }
                  item.naAllbetCount = 0
                  item.naAllWinlose = 0
                  item.naAllSubmit = 0
                  item.naLiveWinlose = 0
                  item.naLiveSubmit = 0
                  item.naVedioWinlose = 0
                  item.naVedioSubmit = 0
                  item.naArcadeWinlose = 0
                  item.naArcadeSubmit = 0
                  item.naAllBetAmount = 0//总投注
                  item.naLiveBetAmount =0//真人投注
                  item.naVedioBetAmount = 0 //电子投注
                  item.naArcadeBetAmount = 0//街
                  item.naLiveMix =0;//真人洗码比
                  item.naVedioMix = 0;//电子洗码比
                  item.naArcadeMix = 0;//街机洗码比
                  let pro = new Promise((resolve, reject) => {
                    invoke({
                      url: api.calcUserStat,
                      method: api.post,
                      data: data
                    }).then(result => {
                      const [err,ret] = result
                      if (err) {
                        reject('error')
                      } else {
                        var data = ret.data.payload
                        if (data[0]) {
                          this.calcSubmitAmount(naAllCode,data[0],item)
                        }
                        resolve(item)
                      }
                    })
                  })
                  naAllReady.push(pro)
                }
                let _this = this
                Promise.all(naAllReady).then(result => {
                   result.filter(element => {return element.naAllbetCount > 0}).length > 0 ? this.clickChild.push(result.filter(element => {return element.naAllbetCount > 0})) : ''
                  _this.$store.commit('closeLoading')
                }).catch(err => {
                  _this.$message({
                    type: 'error',
                    message: err.message
                  })
                  _this.$store.commit('closeLoading')
                })
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
              var child = ret.data.payload
              let time = this.isSelect_time ? this.searchDate : getWeek()

              let naAllGameTyle = [
                {code: gameType('naLive'), company: 'na'},
                {code: gameType('naVedio'), company: 'na'},
                {code: gameType('naArcade'), company: 'na'},
              ] // 所有游戏类型

              let naAllReady = [] // promise所有结果返回
              let naAllCode = {
                naLive: 30000,
                naVedio: 40000,
                naArcade: 50000
              }
              for (let item of child) {
                let data = {
                  gameType: naAllGameTyle.map(game => {return game.code}),
                  role: item.role,
                  userIds: [item.userId],
                  query: {createdAt: time}
                }
                item.naAllbetCount = 0
                item.naAllWinlose = 0
                item.naAllSubmit = 0
                item.naLiveWinlose = 0
                item.naLiveSubmit = 0
                item.naVedioWinlose = 0
                item.naVedioSubmit = 0
                item.naArcadeWinlose = 0
                item.naArcadeSubmit = 0
                item.naAllBetAmount = 0//总投注
                item.naLiveBetAmount =0//真人投注
                item.naVedioBetAmount = 0 //电子投注
                item.naArcadeBetAmount = 0//街
                item.naLiveMix =0;//真人洗码比
                item.naVedioMix = 0;//电子洗码比
                item.naArcadeMix = 0;//街机洗码比
                let pro = new Promise((resolve, reject) => {
                  invoke({
                    url: api.calcUserStat,
                    method: api.post,
                    data: data
                  }).then(result => {
                    const [err,ret] = result
                    if (err) {
                      reject('error')
                    } else {
                      var data = ret.data.payload
                      if (data[0]) {
                        this.calcSubmitAmount(naAllCode,data[0],item)
                      }
                      resolve(item)
                    }
                  })
                })
                naAllReady.push(pro)
              }
              let _this = this
              Promise.all(naAllReady).then(result => {
                result.filter(element => {return element.naAllbetCount > 0}).length > 0 ? this.clickChild.push(result.filter(element => {return element.naAllbetCount > 0})) : ''
                _this.$store.commit('closeLoading')
              }).catch(err => {
                _this.$message({
                  type: 'error',
                  message: err.message
                })
                _this.$store.commit('closeLoading')
              })
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
      var data = {
        parentId: parent.userId
      }
      invoke({
        url: api.reportPlayer,
        method: api.post,
        data: data
      }).then(result => {
        this.nowPlayer = []
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          data.map(item => {
            item.naAllbetCount = 0
            item.naAllWinlose = 0
            item.naAllSubmit = 0
            item.naLiveWinlose = 0
            item.naLiveSubmit = 0
            item.naVedioWinlose = 0
            item.naVedioSubmit = 0
            item.naArcadeWinlose = 0
            item.naArcadeSubmit = 0
            item.naAllBetAmount = 0//总投注
            item.naLiveBetAmount =0//真人投注
            item.naVedioBetAmount = 0 //电子投注
            item.naArcadeBetAmount = 0//街
            item.naLiveMix =0;//真人洗码比
            item.naVedioMix = 0;//电子洗码比
            item.naArcadeMix = 0;//街机洗码比
          })
          var result = []
          var cut_count = 50 // 数组切割长度
          for (var i = 0;i < Math.ceil(data.length / cut_count);i++) {
            i == 0 ? result.push(data.slice(i, cut_count)) : result.push(data.slice(i * cut_count, cut_count * (i + 1)))
          }
          let time = this.isSelect_time ? this.searchDate : getWeek()
          let naAllGameTyle = [
            {code: gameType('naLive'), company: 'na'},
            {code: gameType('naVedio'), company: 'na'},
            {code: gameType('naArcade'), company: 'na'}
          ] // 所有游戏类型
          let naAllReady = [] // promise所有结果返回
          let naAllCode = {
            naLive: 30000,
            naVedio: 40000,
            naArcade: 50000
          }
          for (let item of result) {
            let player_data = {
              gameType: naAllGameTyle.map(game => {return game.code}),
              gameUserNames: item.map(item=>{return item.userName}),
              query: {
                createdAt: time
              }
            }
            let pro = new Promise((resolve, reject) => {
              invoke({
                url: api.calcPlayerStat,
                method: api.post,
                data: player_data
              }).then(result => {
                const [err, ret] = result
                if (err) {
                  reject(err)
                } else {
                  var data = ret.data.payload
                  for (let player of data) {
                    item.map(inside => {
                      if (player.userName == inside.userName) {
                        this.calcSubmitAmount(naAllCode,player,inside)
                        this.nowPlayer.push(inside)
                      }
                    })
                  }
                  resolve(item)
                }
              })
            })
            naAllReady.push(pro)
          }
          let _this = this
          Promise.all(naAllReady).then(result => {
            _this.$store.commit('closeLoading')
          }).catch(err => {
            _this.$message({
              type: 'error',
              message: err.message
            })
            _this.$store.commit('closeLoading')
          })
        }
      })
    }, // 点击查询商户玩家
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
    goPlayDetail (row) {
      localStorage.setItem('playerName', row)
      this.$router.push('agentPlayerDetail')
      this.$store.commit({
        type: 'playerUserName',
        data: row
      })
    }, // 跳转至玩家详情
    calcSubmitAmount(naAllCode,data,item){
      item.naAllbetCount = data.betCount
      item.naBetamount = data.betAmount
      let gameTypeMap = data.gameTypeMap
      // 遍历游戏类型
      for (let code in gameTypeMap) {
        // 真人
        if (naAllCode.naLive == code) {
          item.naLiveWinlose += gameTypeMap[code].winloseAmount // 真人输赢金额
          item.naLiveMix = item.gameList.filter(mix => {return mix.code == code})[0].mix // 真人洗码比
          item.naLiveBetAmount += gameTypeMap[code].betAmount * -1 // 真人下注金额
          item.naLiveMixAmount = gameTypeMap[code].mixAmount       // 真人洗码量
          let naLiveNowBouns = item.naLiveMixAmount * item.naLiveMix *0.01  // 真人佣金
          let naLiveNowAllBet = item.naLiveWinlose + naLiveNowBouns         // 真人代理总金额
          item.rate != 0 ? item.naLiveSubmit = (100 - item.rate )*0.01 * naLiveNowAllBet : item.naLiveSubmit = 0 // 真人交公司
        }
        // 电子 
        else if (naAllCode.naVedio == code) {
          item.naVedioWinlose += gameTypeMap[code].winloseAmount    // 电子输赢金额
          item.naVedioMix = item.gameList.filter(mix => {return mix.code == code})[0].mix // 电子洗码比
          item.naVedioBetAmount = gameTypeMap[code].betAmount * -1  // 电子下注金额
          let naVideoNowBouns = item.naVedioBetAmount * item.naVedioMix *0.01 // 电子佣金
          let naVideoNowAllBet = item.naVedioWinlose + naVideoNowBouns; // 电子代理总金额
          item.rate != 0 ? item.naVedioSubmit = (100 - item.rate)*0.01 * naVideoNowAllBet : item.naVedioSubmit = 0 // 电子交公司
        }
        // 街机 
        else if (naAllCode.naArcade == code) {
          item.naArcadeWinlose += gameTypeMap[code].winloseAmount   // 街机输赢金额
          item.naArcadeMix = item.gameList.filter(mix => {return mix.code == code})[0].mix  // 街机洗码比
          item.naArcadeBetAmount = gameTypeMap[code].betAmount * -1 // 街机下注金额
          let naArcadeNowBouns = item.naArcadeBetAmount * item.naArcadeMix *0.01  // 街机佣金
          let naArcadeNowAllBet = item.naArcadeWinlose + naArcadeNowBouns;        // 街机代理总金额
          item.rate != 0 ? item.naArcadeSubmit = (100 - item.rate )*0.01 * naArcadeNowAllBet : item.naArcadeSubmit = 0 // 街机交公司
        }
        // 总计
        item.naAllWinlose = item.naLiveWinlose + item.naVedioWinlose + item.naArcadeWinlose
        item.naAllSubmit = item.naLiveSubmit + item.naVedioSubmit + item.naArcadeSubmit
      }
    }
  }
}
</script>

<style scpoed>
  .naAllReport .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
  .naAllReport .input{width: 25rem}
  .naAllReport .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
  .naAllReport .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
  .naAllReport .nowUserlist,
  .naAllReport .childlist,
  .naAllReport .playerlist{width: 99%;margin: 2rem auto}
  .naAllReport .fontUrl{cursor: pointer;color: #20a0ff}
  .naAllReport .fontUrl:hover{text-decoration: underline;}

  .green{color: #00CC00}
  .red{color: #FF3300}
</style>
