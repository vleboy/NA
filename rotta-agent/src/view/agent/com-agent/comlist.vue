<template>
 <div class="agent-comlist">
    <i class="el-icon-arrow-right" @click="showMap" v-if="this.isSlider === false"></i>
    <transition name="fade">
      <div class="rottamap" v-show="this.isSlider === true">
          <div class="rottamap-content">
              <rottamap></rottamap>
          </div>
      </div>
    </transition>
    <div :class="{'comlist-scroll-true': isSlider, 'comlist-scroll-false': !isSlider }">
      <div class="comlist">
          <!-- 当前代理 -->
          <div class="comresult">
            <p class="listTitle">当前代理:
              <span class="fontUrl" @click="backParent" v-if="selfUser.length > 0 && nowUserId != loginId">返回上一级</span>
            </p>
              <el-table stripe :data="selfUser">
                <el-table-column label="管理员账号" prop="username" align="center">
                  <template scope="scope">
                    <span>{{(scope.row.username)}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="代理昵称" prop="displayName" align="center">
                </el-table-column>
                <el-table-column label="上级代理" prop="parent" align="center">
                  <template scope="scope">
                      <span @click="goParent(scope.row.parent)" class="fontUrl" v-if="loginUser == 'Agent' && scope.row.parent != '01'">{{(scope.row.parentDisplayName)}}</span>
                      <span v-if="loginUser != 'Agent' && scope.row.parent != '01'">{{(scope.row.parentDisplayName)}}</span>
                      <span v-if="scope.row.parent == '01'">直属于平台</span>
                  </template>
                </el-table-column>
                <el-table-column label="代理游戏" prop="gamelist" align="center" width="110">
                    <template scope="scope">
                        <div slot="reference" class="gamelist">
                            <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item.name }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="洗码比" prop="gamelist" align="center" width="110">
                    <template scope="scope">
                        <div slot="reference" class="gamelist">
                            <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item.mix }}%</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="代理成数" prop="rate" align="center">
                    <template scope="scope">
                        <span>{{(scope.row.rate)}}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="剩余点数" align="center" prop="balance">
                    <template scope="scope">
                        <span>{{points(scope.row.balance)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createdAt" align="center" width="120">
                    <template scope="scope">
                        <span>{{Time(scope.row.createdAt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="status" width="90">
                    <template scope="scope">
                        <el-tag :type="scope.row.status ? 'success' : 'danger'">
                            {{Status(scope.row.status)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" width="65">
                    <template scope="scope">
                        <el-popover trigger="hover" placement="bottom">
                            <div class="remarkBox">
                                <p>{{ Remark(scope.row.remark) }}</p>
                            </div>
                            <div slot="reference" class="">
                                <el-icon name="search" style="color:#108ee9"></el-icon>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="90">
                    <template scope="scope">
                      <el-button type="text" class="myBtn" @click="createAgent(scope.$index, scope.row)" v-if="scope.row.status === 1 && scope.row.parentName != 'XYZBF'">创建代理</el-button>
                      <el-button type="text" class="myBtn" @click="createPlayer(scope.$index, scope.row)" v-if="scope.row.status === 1">创建玩家</el-button>
                      <el-button type="text" class="myBtn" @click="goDetail(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <!-- 当前代理下级列表 -->

          <div class="comresult">
            <div class="clearFix">
              <p class="listTitle" style="float:left">下级代理列表</p>
              <el-button class="searchBtn" @click="resetAgentlist">重置</el-button>
              <el-button type="primary" class="searchBtn" style="margin-right:0.5rem" @click="searchAgentlist">搜索</el-button>
              <el-input v-model="agentSearchData" placeholder="请输入搜索内容" class="input" style="float:right"></el-input>
            </div>
              <recursion></recursion>
          </div>
          <!-- 当前代理所属玩家 -->
          <div class="comresult">
            <div class="clearFix">
              <p class="listTitle" style="float:left">所属玩家列表</p>
              <el-button class="searchBtn" @click="resetPlayerlist">重置</el-button>
              <el-button type="primary" class="searchBtn" style="margin-right:0.5rem" @click="searchPlayerlist">搜索</el-button>
              <el-input v-model="playerSearchData" placeholder="请输入搜索内容" class="input" style="float:right"></el-input>
            </div>
              <el-table stripe :data="agentPlayerlist" style="margin-top:1rem">
                  <el-table-column type="index" width="65" align="center" label="序号">
                  </el-table-column>
                  <el-table-column prop="userName" label="用户名" align="center">
                  </el-table-column>
                  <!-- <el-table-column prop="password" label="密码" align="center">
                  </el-table-column> -->
                  <el-table-column prop="balance" label="点数" show-overflow-tooltip align="center">
                  </el-table-column>
                  <el-table-column prop="merchantName" label="直属代理" align="center" sortable>
                    <template scope="scope">
                        <el-button type="text" @click="jumpAgentDetail(scope.row)">{{scope.row.merchantName}}</el-button>
                    </template>
                  </el-table-column>
                  <!--<el-table-column width="120" prop="createAt" label="创建时间" align="center" sortable>-->
                    <!--<template scope="scope">-->
                        <!--<span>{{Time(scope.row.createdAt)}}</span>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <el-table-column width="120" prop="updateAt" label="最后登录时间" align="center" sortable>
                    <template scope="scope">
                        <span>{{Time(scope.row.updateAt)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" align="center">
                    <template scope="scope">
                      <el-tag :type="scope.row.state ? 'success' : 'danger'">
                          {{playerStatus[scope.row.state]}}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" align="center" width="65">
                      <template scope="scope">
                          <el-popover trigger="hover" placement="bottom" width="200">
                              <div class="remarkBox">{{ scope.row.remark === 'NULL!' ? '无' : scope.row.remark}}</div>
                              <div slot="reference" class="">
                                  <el-icon name="search" style="color:#108ee9"></el-icon>
                              </div>
                          </el-popover>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" show-overflow-tooltip align="center" width="80">
                    <template scope="scope">
                      <el-button type="text" class="myBtn" @click="playerStorePoints(scope.$index, scope.row)">存点</el-button>
                      <el-button type="text" class="myBtn" @click="playerWithdrawPoints(scope.$index, scope.row)">提点</el-button>
                      <el-button type="text" class="myBtn" @click="">
                          <el-dropdown trigger="click">
                              <span style="color:#20a0ff">更多</span>
                              <el-dropdown-menu slot="dropdown">
                                  <p @click="playerDetail(scope.row)">
                                      <el-dropdown-item>查看</el-dropdown-item>
                                  </p>
                                  <p @click="changeStatus(scope.row)">
                                      <el-dropdown-item v-if="scope.row.state === 1">锁定</el-dropdown-item>
                                      <el-dropdown-item v-if="scope.row.state === 0">解锁</el-dropdown-item>
                                  </p>
                              </el-dropdown-menu>
                          </el-dropdown>
                      </el-button>
                    </template>
                  </el-table-column>
              </el-table>
          </div>
      </div>
    </div>
    <billtransfer></billtransfer>
</div>
</template>

<script>
import Recursion from '@/components/recursion-form' // 递归表格
import Rottamap from '@/components/rottamap' // 组织架构
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import Billtransfer from '@/components/billtransfer'
import { detailTime, formatStatus, formatContractPeriod, formatRemark, formatPoints, formatUsername } from '@/behavior/format'
export default {
  components: {
    Rottamap,
    Billtransfer,
    Recursion
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    // this.$store.commit({
    //   type: 'recordComlist',
    //   data: []
    // })
    // this.$store.commit({
    //   type: 'recordSelfData',
    //   data: []
    // })
    this.$store.commit({
      type: 'recordAgentPlayer',
      data: []
    })
    // this.$store.commit({
    //   type: 'recordMapUser',
    //   data: ''
    // })
    this.$store.commit({
      type: 'recordNowindex',
      data: 'comlist'
    })
  },
  created () {
    this.$store.dispatch('getSelfData')
    this.$store.dispatch('getAgentPlayer')
    this.$store.dispatch('getComlist')
  },
  data () {
    return {
      nowUserId: '',
      loginId: localStorage.loginId,
      loginUser: localStorage.loginSuffix,
      nowSize: 10,
      nowPage: 1,
      playerStatus: ['已锁定', '正常'],
      agentSearchData: '', // 代理列表搜索条件
      playerSearchData: '' // 玩家列表搜索条件
    }
  },
  computed: {
    isSlider () {
      return this.$store.state.variable.isSlider
    },
    selfUser () {
      if (this.$store.state.variable.selfData && this.$store.state.variable.selfData.length > 0) {
        this.nowUserId = this.$store.state.variable.selfData[0].userId
      }
      return this.$store.state.variable.selfData
    },
    agentPlayerlist () {
      return this.$store.state.variable.agentPlayer
    },
    comlist () {
      var comlist = this.$store.state.variable.comlist
      if (this.nowPage === 1) {
        comlist = this.$store.state.variable.comlist.slice(0, this.nowSize)
      } else {
        comlist = this.$store.state.variable.comlist.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
      return comlist
    } // 代理列表分页
  },
  methods: {
    backParent () {
      var parentId = this.selfUser[0].parent
      this.$store.commit({
        type: 'recordAgentId',
        data: parentId
      })
      if (parentId == '01') {
        this.$store.commit({
          type: 'recordMapUser',
          data: ''
        })
      } else {
        this.$store.commit({
          type: 'recordMapUser',
          data: parentId
        })
      }
      this.$store.dispatch('getSelfData')
      this.$store.dispatch('getAgentPlayer')
      this.$store.dispatch('getComlist')
    }, // 从当前列表回到上一级
    resetAgentlist () {
      this.$store.dispatch('getComlist')
      this.agentSearchData = ''
    },
    searchAgentlist () {
      if (!this.agentSearchData) {
        return
      } else {
        this.$store.commit({
          type: 'agentCondition',
          data: this.agentSearchData
        })
      }
    },
    resetPlayerlist () {
      this.$store.dispatch('getAgentPlayer')
      this.playerSearchData = ''
    },
    searchPlayerlist () {
      if (!this.playerSearchData) {
        return
      } else {
        this.$store.commit({
          type: 'playerCondition',
          data: this.playerSearchData
        })
      }
    },
    showChild (data) {
      this.$store.commit({
        type: 'recordMapUser',
        data: data.userId
      })
      this.$store.commit('startLoading')
      this.$store.commit({
        type: 'recordAgentId',
        data: data.userId
      })
      this.$store.dispatch('getSelfData')
      this.$store.dispatch('getAgentPlayer')
      this.$store.dispatch('getComlist')
    },
    createAgent(index, row){
      // console.log(row.userId)
      this.$store.commit({
        type: 'selectParent',
        data: row.userId
      })
      if (localStorage.loginSuffix == 'Agent') {
        localStorage.setItem('nowParentSn', row.sn)
      } else {
        localStorage.setItem('nowParentSn', '')
      }
      this.$router.push('comcreate')
    },
    createPlayer(index, row){
      // console.log(row.userId)
      this.$store.commit({
        type: 'selectParent',
        data: row.userId
      })
      this.$router.push('addPlayer')
    },
    playerDetail (row) {
      localStorage.setItem('playerName', row.userName)
      this.$router.push('agentPlayerDetail')
      this.$store.commit({
        type: 'playerUserName',
        data: row.userName
      })
    }, // 跳到玩家详情页
    goDetail (index, row) {
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
      this.$store.commit({
        type: 'parentGame',
        data: row.parent
      })
      this.$store.commit('closeEdit')
      this.$router.push('comdetail')
    }, // 当前列表跳转详情
    jumpAgentDetail (row) {
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.parent
      })
      this.$store.commit('closeEdit')
      this.$router.push('comdetail')
    }, // 跳到玩家所属代理详情页
    showMap () {
      this.$store.commit('isMap')
    }, // 打开组织架构
    selectionChange (val) {
      this.checkedArray = val
      // console.log(this.checkedArray, '被选中的多选')
    }, // 多选玩家
    formatUser (user) {
      return formatUsername(user)
    }, // 格式化用户名
    goParent (parent) {
      // console.log('上级线路商', parent)
      this.$store.commit({
        type: 'recordComdetailID',
        data: parent
      })
      this.$router.push('comdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getComdetail')
      this.$store.dispatch('getComdetail_property')
    }, // 跳转到代理上级代理
    points (points) {
      return formatPoints(points)
    }, // 格式化点数
    Remark (remark) {
      return formatRemark(remark)
    }, // 格式化备注
    Time (time) {
      return detailTime(time)
    }, // 格式时间
    Balance (points) {
    }, // 格式金额
    Status (status) {
      return formatStatus(status)
    }, // 格式化用户状态
    contractPeriod (con) {
      return formatContractPeriod(con)
    }, // 格式化合同时间
    checkUser (index, row) {
      // console.log('查看的用户为 ' + row.username + ' / ' + '查看的用户ID为 ' + row.userId)
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
      localStorage.setItem('nowUser', row.userId)
      this.$store.commit('closeEdit')
      this.$router.push('comdetail')
    }, // 查看用户
    editUser (index, row) {
      // console.log('查看的用户为 ' + row.username + ' / ' + '查看的用户ID为 ' + row.userId)
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
      localStorage.setItem('nowUser', row.userId)
      this.$store.commit('startEdit')
      this.$router.push('comdetail')
    }, // 编辑用户
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    },
    storePoints (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username,
        parentDispalyName: row.parentDisplayName, // 上级昵称
        parentId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
      this.$store.commit('startStoreDialog')
    }, // 代理存点
    withdrawPoints (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username,
        parentDispalyName: row.parentDisplayName, // 上级昵称
        parentId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      // console.log('提点用户是：', row.username, '用户ID', row.userId)
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'billtransfer'
      })
      this.$store.commit('startWithdrawDialog')
    }, // 代理提点
    playerStorePoints (index, row) {
      var user = {
        userId: row.userId, // 玩家ID
        role: row.role, // 玩家角色类别
        userName: row.userName, // 玩家用户名
        parentDispalyName: row.parentDisplayName, // 上级昵称
        fromUserId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'playertransfer'
      })
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit('startStoreDialog')
    }, // 玩家存点
    playerWithdrawPoints (index, row) {
      var user = {
        userId: row.userId, // 玩家ID
        role: row.role, // 玩家角色类别
        userName: row.userName,
        parentDispalyName: row.parentDisplayName, // 上级昵称
        fromUserId: row.parent, // 上级ID
        parentName: row.parentName // 上级用户名
      }
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'playertransfer'
      })
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit('startWithdrawDialog')
    }, // 玩家提点
    lockUser (index, row) {
      this.$store.commit('startLoading')
      var user = {
        userId: row.userId,
        role: row.role,
        status: 0
      }
      invoke({
        url: api.userStatus,
        method: api.post,
        data: user
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.$store.commit('closeLoading')
          } else {
            var data = ret.data.payload
            // console.log(data)
            this.$message({
              message: '锁定',
              type: 'success'
            })
            this.$store.dispatch('getComlist')
            this.$store.commit('closeLoading')
          }
        }
      )
    }, // 锁定代理
    changeStatus (row) {
      this.$store.commit('startLoading')
      invoke({
        url: api.playerForzen,
        method: api.post,
        data: {
          userName: row.userName,
          state: row.state ? 0 : 1
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '状态改变成功',
              type: 'success'
            })
            this.$store.dispatch('getAgentPlayer')
          }
          this.$store.commit('closeLoading')
        }
      )
    }, // 改变玩家状态
    unlockUser (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username
      }
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'list_unlockUser'
      })
      this.$store.commit({
        type: 'getpointsObject',
        data: user
      })
      this.$store.commit('startStoreDialog')
    }, // 解锁用户
  },
  beforeDestroy () {
    var data = ''
    if (localStorage.loginSuffix == 'Agent') {
      data = '01'
    } else {
      data = localStorage.loginId
    }
    this.$store.commit({
      type: 'recordAgentId',
      data: data
    })
  }
}
</script>

<style scoped>
.agent-comlist{position: relative}
.rottamap{
  z-index: 500;
  min-height: 850px;
  width: 320px;
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right: 0;
  background-color: #324157;
}
.rottamap .rottamap-content{
  background-color: #eee;
  height: 100%;
  overflow: auto;
}

/* 显示组织架构时的样式 */
.comlist-scroll-true{
  height:100%;
  padding:0 0 0 325px;
  box-sizing:border-box;
  overflow-x: hidden;
}

/* 不显示组织架构的样式 */
.comlist-scroll-false{
  height:100%;
  padding:0 0 0 0.5rem;
  box-sizing:border-box;
  overflow-x: hidden;
}
.clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.comlist{margin-bottom: 50px}
.comlist .listTitle{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 300;display: inline-block}
.comlist .input{width: 15rem}
.comlist .searchBtn{float: right;}
.comlist .comresult{width: 99.8%;margin: 0.2rem 0.1rem 2rem 0}
.comlist .moreinfo{float: left;width: 40%}
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}
.comlist .gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.comlist .myBtn{float: left;width:100%;margin: 0;}
.comlist .fontUrl{cursor: pointer;color: #20a0ff}
.comlist .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.agent-comlist .el-icon-arrow-right{border:1px solid #eee;background-color: #fff;padding: 1.25rem 0.1rem;font-size:1.2rem;position:absolute;z-index: 100;left: 0;top: 41.5%;cursor: pointer}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  width: 0;
}
</style>
