<template>
  <div class="saAllReport" @click="getTimer">
    <div class="nowUserlist">

      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表</p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false" align="right" :clearable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>

      <el-table :data="saAllNowlist" stripe>
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
        <el-table-column label="交易次数" prop="saAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="saAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="saAllSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saAllSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(输赢金额)" prop="saLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(商家交公司)" prop="saLiveSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saLiveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(输赢金额)" prop="saFishingWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saFishingWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saFishingWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(商家交公司)" prop="saFishingSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saFishingSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist">
      <p class="title">直属下级列表</p>
      <el-table :data="saAllNowchild" stripe>
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
        <el-table-column label="交易次数" prop="saAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="saAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="saAllSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saAllSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(输赢金额)" prop="saLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(商家交公司)" prop="saLiveSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saLiveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(输赢金额)" prop="saFishingWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saFishingWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saFishingWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(商家交公司)" prop="saFishingSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saFishingSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-for="(item, index) of saAllRenderChild">
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
        <el-table-column label="交易次数" prop="saAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="saAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总游戏交公司" prop="saAllSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saAllSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(输赢金额)" prop="saLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(商家交公司)" prop="saLiveSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saLiveSubmit)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(输赢金额)" prop="saFishingWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saFishingWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saFishingWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(商家交公司)" prop="saFishingSubmit" align="left">
          <template scope="scope">
            <span>{{points(scope.row.saFishingSubmit)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="playerlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left"><span v-if="playerParent">({{playerParent}})</span>所属玩家列表</p>
      </div>
      <el-table :data="saAllPlayer" stripe>
        <el-table-column label="序号" prop="rank" align="left" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" align="left">
          <template scope="scope">
            <span class="fontUrl" @click="goPlayDetail(scope.row.userName)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" align="left">
        </el-table-column>
        <el-table-column label="交易次数" prop="saAllbetCount" align="left">
        </el-table-column>
        <el-table-column label="总游戏输赢金额" prop="saAllWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saAllWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saAllWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA真人游戏(输赢金额)" prop="saLiveWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saLiveWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saLiveWinlose)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="SA捕鱼游戏(输赢金额)" prop="saFishingWinlose" align="left">
          <template scope="scope">
            <span :class="[Number(scope.row.saFishingWinlose) > 0 ? 'green' : 'red']">{{points(scope.row.saFishingWinlose)}}</span>
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
      data: 'saAllGameReport'
    })
    this.$store.commit('returnLocalStorage')
  },
  created () {
    this.refreshList()
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'saAllGameReport'
    })
  },
  computed: {
    saAllNowlist () {
      let data = [this.nowList]
      return data
    },
    saAllNowchild () {
      return this.nowChild
    },
    saAllRenderChild () {
      let child = this.clickChild
      return child
    },
    saAllPlayer () {
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
        displayName: localStorage.loginDislayName,
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
          user.saAllbetCount = 0
          user.saAllWinlose = 0
          user.saAllSubmit = 0
          user.saLiveWinlose = 0
          user.saLiveSubmit = 0
          user.saFishingWinlose = 0
          user.saFishingSubmit = 0
          this.nowList = user
          if (localStorage.loginSuffix != 'Agent') {
            let time = this.isSelect_time ? this.searchDate : getWeek()
            let saAllGameTyle = [
              {code: gameType('saFishing'), company: 'sa'},
              {code: gameType('saLive'), company: 'sa'}
            ] // 所有游戏类型
            let saAllCode = {
              saLive: 1060000,
              saFishing: 1110000
            }
            let data = {
              gameType: saAllGameTyle.map(game => {return game.code}),
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
              if (err) {
              } else {
                var data = ret.data.payload
                if (data) {
                  this.nowList.saAllbetCount = data[0].betCount
                  for (let code in data[0].gameTypeMap) {
                    if (saAllCode.saLive == code) {
                      this.nowList.saLiveWinlose += data[0].gameTypeMap[code].winloseAmount
                      this.nowList.saLiveSubmit += data[0].gameTypeMap[code].submitAmount
                    } else if (saAllCode.saFishing == code) {
                      this.nowList.saFishingWinlose += data[0].gameTypeMap[code].winloseAmount
                      this.nowList.saFishingSubmit += data[0].gameTypeMap[code].submitAmount
                    }
                    this.nowList.saAllWinlose = this.nowList.saLiveWinlose + this.nowList.saFishingWinlose
                    this.nowList.saAllSubmit = this.nowList.saLiveSubmit + this.nowList.saFishingSubmit
                  }
                }
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

            let saAllGameTyle = [
              {code: gameType('saFishing'), company: 'sa'},
              {code: gameType('saLive'), company: 'sa'}
            ] // 所有游戏类型

            let saAllReady = [] // promise所有结果返回
            let saAllCode = {
              saLive: 1060000,
              saFishing: 1110000
            }
            for (let item of child) {
              let data = {
                gameType: saAllGameTyle.map(game => {return game.code}),
                role: item.role,
                userIds: [item.userId],
                query: {createdAt: time}
              }
              item.saAllbetCount = 0
              item.saAllWinlose = 0
              item.saAllSubmit = 0
              item.saLiveWinlose = 0
              item.saLiveSubmit = 0
              item.saFishingWinlose = 0
              item.saFishingSubmit = 0
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
                      item.saAllbetCount = data[0].betCount
                      for (let code in data[0].gameTypeMap) {
                        if (saAllCode.saLive == code) {
                          item.saLiveWinlose += data[0].gameTypeMap[code].winloseAmount
                          item.saLiveSubmit += data[0].gameTypeMap[code].submitAmount
                          this.nowList.saLiveWinlose += data[0].gameTypeMap[code].winloseAmount
                          this.nowList.suffix != 'Agent' ? this.nowList.saLiveSubmit += data[0].gameTypeMap[code].submitAmount : ''
                        } else if (saAllCode.saFishing == code) {
                          item.saFishingWinlose += data[0].gameTypeMap[code].winloseAmount
                          item.saFishingSubmit += data[0].gameTypeMap[code].submitAmount
                          this.nowList.saFishingWinlose += data[0].gameTypeMap[code].winloseAmount
                          this.nowList.suffix != 'Agent' ? this.nowList.saFishingSubmit += data[0].gameTypeMap[code].submitAmount : ''
                        }
                        item.saAllWinlose = item.saLiveWinlose + item.saFishingWinlose
                        item.saAllSubmit = item.saLiveSubmit + item.saFishingSubmit
                      }
                      this.nowList.saAllWinlose += item.saAllWinlose
                      this.nowList.suffix != 'Agent' ? this.nowList.saAllSubmit += item.saAllSubmit : ''
                      this.nowList.saAllbetCount += item.saAllbetCount
                      this.nowChild.push(item)
                    }
                    resolve(data)
                  }
                })
              })
              saAllReady.push(pro)
            }
            let _this = this
            Promise.all(saAllReady).then(result => {
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

            let saAllGameTyle = [
              {code: gameType('saFishing'), company: 'sa'},
              {code: gameType('saLive'), company: 'sa'}
            ] // 所有游戏类型

            let saAllReady = [] // promise所有结果返回
            let saAllCode = {
              saLive: 1060000,
              saFishing: 1110000
            }
            for (let item of child) {
              let data = {
                gameType: saAllGameTyle.map(game => {return game.code}),
                role: item.role,
                userIds: [item.userId],
                query: {createdAt: time}
              }
              item.saAllbetCount = 0
              item.saAllWinlose = 0
              item.saAllSubmit = 0
              item.saLiveWinlose = 0
              item.saLiveSubmit = 0
              item.saFishingWinlose = 0
              item.saFishingSubmit = 0
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
                      item.saAllbetCount = data[0].betCount
                      for (let code in data[0].gameTypeMap) {
                        if (saAllCode.saLive == code) {
                          item.saLiveWinlose += data[0].gameTypeMap[code].winloseAmount
                          item.saLiveSubmit += data[0].gameTypeMap[code].submitAmount
                        } else if (saAllCode.saFishing == code) {
                          item.saFishingWinlose += data[0].gameTypeMap[code].winloseAmount
                          item.saFishingSubmit += data[0].gameTypeMap[code].submitAmount
                        }
                        item.saAllWinlose = item.saLiveWinlose + item.saFishingWinlose
                        item.saAllSubmit = item.saLiveSubmit + item.saFishingSubmit
                      }
                    }
                    resolve(item)
                  }
                })
              })
              saAllReady.push(pro)
            }
            let _this = this
            Promise.all(saAllReady).then(result => {
              result.filter(element => {return element.saAllbetCount > 0}).length > 0 ? this.clickChild.push(result.filter(element => {return element.saAllbetCount > 0})) : ''
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
                
                let saAllGameTyle = [
                  {code: gameType('saFishing'), company: 'sa'},
                  {code: gameType('saLive'), company: 'sa'}
                ] // 所有游戏类型

                let saAllReady = [] // promise所有结果返回
                let saAllCode = {
                  saLive: 1060000,
                  saFishing: 1110000
                }
                for (let item of child) {
                  let data = {
                    gameType: saAllGameTyle.map(game => {return game.code}),
                    role: item.role,
                    userIds: [item.userId],
                    query: {createdAt: time}
                  }
                  item.saAllbetCount = 0
                  item.saAllWinlose = 0
                  item.saAllSubmit = 0
                  item.saLiveWinlose = 0
                  item.saLiveSubmit = 0
                  item.saFishingWinlose = 0
                  item.saFishingSubmit = 0
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
                          item.saAllbetCount = data[0].betCount
                          for (let code in data[0].gameTypeMap) {
                            if (saAllCode.saLive == code) {
                              item.saLiveWinlose += data[0].gameTypeMap[code].winloseAmount
                              item.saLiveSubmit += data[0].gameTypeMap[code].submitAmount
                            } else if (saAllCode.saFishing == code) {
                              item.saFishingWinlose += data[0].gameTypeMap[code].winloseAmount
                              item.saFishingSubmit += data[0].gameTypeMap[code].submitAmount
                            }
                            item.saAllWinlose = item.saLiveWinlose + item.saFishingWinlose
                            item.saAllSubmit = item.saLiveSubmit + item.saFishingSubmit
                          }
                        }
                        resolve(item)
                      }
                    })
                  })
                  saAllReady.push(pro)
                }
                let _this = this
                Promise.all(saAllReady).then(result => {
                   result.filter(element => {return element.saAllbetCount > 0}).length > 0 ? this.clickChild.push(result.filter(element => {return element.saAllbetCount > 0})) : ''
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

              let saAllGameTyle = [
                {code: gameType('saFishing'), company: 'sa'},
                {code: gameType('saLive'), company: 'sa'}
              ] // 所有游戏类型

              let saAllReady = [] // promise所有结果返回
              let saAllCode = {
                saLive: 1060000,
                saFishing: 1110000
              }
              for (let item of child) {
                let data = {
                  gameType: saAllGameTyle.map(game => {return game.code}),
                  role: item.role,
                  userIds: [item.userId],
                  query: {createdAt: time}
                }
                item.saAllbetCount = 0
                item.saAllWinlose = 0
                item.saAllSubmit = 0
                item.saLiveWinlose = 0
                item.saLiveSubmit = 0
                item.saFishingWinlose = 0
                item.saFishingSubmit = 0
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
                        item.saAllbetCount = data[0].betCount
                        for (let code in data[0].gameTypeMap) {
                          if (saAllCode.saLive == code) {
                            item.saLiveWinlose += data[0].gameTypeMap[code].winloseAmount
                            item.saLiveSubmit += data[0].gameTypeMap[code].submitAmount
                          } else if (saAllCode.saFishing == code) {
                            item.saFishingWinlose += data[0].gameTypeMap[code].winloseAmount
                            item.saFishingSubmit += data[0].gameTypeMap[code].submitAmount
                          }
                          item.saAllWinlose = item.saLiveWinlose + item.saFishingWinlose
                          item.saAllSubmit = item.saLiveSubmit + item.saFishingSubmit
                        }
                      }
                      resolve(item)
                    }
                  })
                })
                saAllReady.push(pro)
              }
              let _this = this
              Promise.all(saAllReady).then(result => {
                result.filter(element => {return element.saAllbetCount > 0}).length > 0 ? this.clickChild.push(result.filter(element => {return element.saAllbetCount > 0})) : ''
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
            item.saAllbetCount = 0
            item.saAllWinlose = 0
            item.saAllSubmit = 0
            item.saLiveWinlose = 0
            item.saLiveSubmit = 0
            item.saFishingWinlose = 0
            item.saFishingSubmit = 0
          })
          var result = []
          var cut_count = 50 // 数组切割长度
          for (var i = 0;i < Math.ceil(data.length / cut_count);i++) {
            i == 0 ? result.push(data.slice(i, cut_count)) : result.push(data.slice(i * cut_count, cut_count * (i + 1)))
          }
          let time = this.isSelect_time ? this.searchDate : getWeek()

          let saAllGameTyle = [
            {code: gameType('saFishing'), company: 'sa'},
            {code: gameType('saLive'), company: 'sa'}
          ] // 所有游戏类型

          let saAllReady = [] // promise所有结果返回

          let saAllCode = {
            saLive: 1060000,
            saFishing: 1110000
          }

          for (let item of result) {
            let player_data = {
              gameType: saAllGameTyle.map(game => {return game.code}),
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
                        inside.saAllbetCount = player.betCount
                        for (let code in player.gameTypeMap) {
                          if (saAllCode.saLive == code) {
                            inside.saLiveWinlose += player.gameTypeMap[code].winloseAmount
                          } else if (saAllCode.saFishing == code) {
                            inside.saFishingWinlose += player.gameTypeMap[code].winloseAmount
                          }
                          inside.saAllWinlose = inside.saLiveWinlose + inside.saFishingWinlose
                        }
                        this.nowPlayer.push(inside)
                      }
                    })
                  }
                  resolve(item)
                }
              })
            })
            saAllReady.push(pro)
          }
          let _this = this
          Promise.all(saAllReady).then(result => {
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
  }
}
</script>

<style scpoed>
  .saAllReport .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
  .saAllReport .input{width: 25rem}
  .saAllReport .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
  .saAllReport .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
  .saAllReport .nowUserlist,
  .saAllReport .childlist,
  .saAllReport .playerlist{width: 99%;margin: 2rem auto}
  .saAllReport .fontUrl{cursor: pointer;color: #20a0ff}
  .saAllReport .fontUrl:hover{text-decoration: underline;}

  .green{color: #00CC00}
  .red{color: #FF3300}
</style>
