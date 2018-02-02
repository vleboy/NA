<template>
  <div class="recursion-form">
     <el-table stripe :data="comlist" style="margin-top:1rem">
      <el-table-column label="管理员账号" prop="username" align="center">
        <template scope="scope">
          <span class="fontUrl" @click="showChild(scope.row)">{{(scope.row.username)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理昵称" prop="displayName" align="center">
      </el-table-column>
      <el-table-column label="上级代理" prop="parent" align="center" sortable>
        <template scope="scope">
            <span @click="goParent(scope.row.parent)" class="fontUrl" v-if="scope.row.parent !== '01'">{{(scope.row.parentDisplayName)}}</span>
            <span v-if="scope.row.parent === '01'">直属于平台</span>
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
      <el-table-column label="代理成数" prop="rate" align="center" sortable>
          <template scope="scope">
              <span>{{(scope.row.rate)}}%</span>
          </template>
      </el-table-column>
      <el-table-column label="剩余点数" align="center" sortable prop="balance">
          <template scope="scope">
              <span>{{points(scope.row.balance)}}</span>
          </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt" align="center" width="120" sortable>
          <template scope="scope">
              <span>{{Time(scope.row.createdAt)}}</span>
          </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" sortable width="90">
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
      <el-table-column label="操作" align="center" width="80">
          <template scope="scope">
            <el-button type="text" class="myBtn" @click="storePoints(scope.$index, scope.row)">存点</el-button>
            <el-button type="text" class="myBtn" @click="withdrawPoints(scope.$index, scope.row)">提点</el-button>
              <el-button type="text" class="myBtn" @click="">
                  <el-dropdown trigger="click">
                      <span style="color:#20a0ff">更多</span>
                      <el-dropdown-menu slot="dropdown">
                          <p @click="editUser(scope.$index, scope.row)">
                              <el-dropdown-item>编辑</el-dropdown-item>
                          </p>
                          <p @click="lockUser(scope.$index, scope.row)" v-if="scope.row.status === 1">
                              <el-dropdown-item>锁定</el-dropdown-item>
                          </p>
                          <p @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.status === 0">
                              <el-dropdown-item>解锁</el-dropdown-item>
                          </p>
                          <p @click="createAgent(scope.$index, scope.row)" v-if="scope.row.status === 1 && scope.row.parentName != 'XYZBF'">
                              <el-dropdown-item>创建代理</el-dropdown-item>
                          </p>
                          <p @click="createPlayer(scope.$index, scope.row)" v-if="scope.row.status === 1">
                              <el-dropdown-item>创建玩家</el-dropdown-item>
                          </p>
                      </el-dropdown-menu>
                  </el-dropdown>
              </el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comlist.length" :page-sizes="[10, 20]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
    </div>
  </div>
</template>

<script>
import { detailTime, formatStatus, formatContractPeriod, formatRemark, formatPoints, formatUsername } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  computed:{
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
  data () {
    return {
      loginUser: localStorage.loginSuffix,
      nowSize: 10,
      nowPage: 1
    }
  },
  methods: {
    Remark (remark) {
      return formatRemark(remark)
    }, // 格式化备注
    Status (status) {
      return formatStatus(status)
    }, // 格式化用户状态
    contractPeriod (con) {
      return formatContractPeriod(con)
    }, // 格式化合同时间
    Time (time) {
      return detailTime(time)
    }, // 格式时间
    points (points) {
      return formatPoints(points)
    }, // 格式化点数
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
    createAgent(index, row){
      // console.log(row.userId)
      this.$store.commit({
        type: 'selectParent',
        data: row.userId
      })
      localStorage.setItem('nowParentSn', row.sn)
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
    } // 查看当前代理下级
  }
}
</script>

<style scoped>
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}
.recursion-form .gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.recursion-form .myBtn{float: left;width:100%;margin: 0;}
.recursion-form .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.recursion-form .fontUrl{cursor: pointer;color: #20a0ff}
</style>
