<template>
  <div>
  	<div class="comlist">
    	<div class="search">
    		<searchbox></searchbox>
    	</div>
      <div>
        <gocreate v-if="loginUser == '1'"></gocreate>
      </div>
    	<div class="comresult">
        	<el-table stripe :data="comlist" @sort-change="defineSort">
            <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
            </el-table-column>
            <el-table-column label="商户标识" prop="sn" align="left" min-width="100">
            </el-table-column>
            <el-table-column label="商户昵称" prop="displayName" align="left" min-width="100">
            </el-table-column>
            <el-table-column label="线路号" prop="merchantEmail" align="left" min-width="90">
              <template scope="scope">
                <span>{{formatMSN(scope.row.msn)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上级线路商" prop="parent" align="left" sortable="custom" min-width="130">
              <template scope="scope">
                <span @click="goComParent(scope.row.parent)" class="fontUrl" v-if="scope.row.parent !== '01'">{{scope.row.parentDisplayName}}</span>
                <span v-if="scope.row.parent === '01'">直属于平台</span>
              </template>
            </el-table-column>
            <el-table-column label="商家占成" prop="rate" align="left" sortable="custom" min-width="100">
            	<template scope="scope">
              	<span>{{(scope.row.rate)}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="剩余点数" prop="balance" align="left" sortable="custom" min-width="120">
              <template scope="scope">
              	<span>{{points(scope.row.balance)}}</span>
                <div>
                <span @click="storePoints(scope.$index, scope.row)" v-if="scope.row.status === 1" style="color:#4db3ff;cursor:pointer">加点</span>
                <span @click="withdrawPoints(scope.$index, scope.row)" v-if="scope.row.status === 1" style="color:#4db3ff;cursor:pointer">减点</span>
              </div>
              </template>
            </el-table-column>
            <el-table-column label="商户游戏" prop="gameList" align="center" width="110">
                <template scope="scope">
                    <div slot="reference" class="gamelist">
                        <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item.name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column label="创建时间" prop="createdAt" align="left" width="120" sortable="custom">
  			      <template scope="scope">
              	<span>{{Time(scope.row.createdAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="最后登录时间" prop="loginAt" align="left" width="150" sortable="custom">
  			      <template scope="scope">
              	<span style="word-break:normal">{{Time(scope.row.loginAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="left" prop="status" sortable="custom" width="90" >
              <template scope="scope">
                <span>{{Status(scope.row.status)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="left" width="65">
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
            <el-table-column label="操作" align="left" width="80">
                <template scope="scope">
                    <el-button type="text" class="myBtn" @click="checkUser(scope.$index, scope.row)">查看</el-button>
                      <el-dropdown trigger="click">
                        <span style="color:#20a0ff;cursor:pointer;">更多</span>
                          <el-dropdown-menu slot="dropdown">
                            <p @click="storePoints(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>加点</el-dropdown-item></p>
                            <p @click="withdrawPoints(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>减点</el-dropdown-item></p>
                            <p @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.status === 0"><el-dropdown-item>开启</el-dropdown-item></p>
                            <p @click="lockUser(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>停用</el-dropdown-item></p>
                          </el-dropdown-menu>
                      </el-dropdown>
                </template>
            </el-table-column>
        	</el-table>
        <div class="page">
          <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comlist.length" :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage" :current-page.sync="currentPage"></el-pagination>
        </div>
     	</div>
    </div>
    <billtransfer></billtransfer>
  </div>
</template>

<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import Billtransfer from '@/components/billtransfer'
import Gocreate from '@/components/gocreate'
import Searchbox from '@/components/searchbox'
import { detailTime, formatStatus, formatContractPeriod, formatRemark, formatPoints, formatUsername, formatMSN } from '@/behavior/format'
export default {
  components: {
    Searchbox,
    Billtransfer,
    Gocreate
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'comlist'
    })
    this.$store.commit({
      type: 'postSearch_conditon',
      data: {}
    })
  },
  created () {
    this.$store.dispatch('getComlist')
  },
  data () {
    return {
      loginUser: localStorage.loginRole,
      sort: {
        sortkey: '',
        sortway: ''
      },
      nowSize: 20,
      nowPage: 1
    }
  },
  computed: {
    currentPage () {
      return this.$store.state.orignPage
    },
    comlist () {
      var comlist = this.$store.state.variable.comlist
      if (this.nowPage === 1) {
        comlist = this.$store.state.variable.comlist.slice(0, this.nowSize)
      } else {
        comlist = this.$store.state.variable.comlist.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
      return comlist
    }
  },
  watch: {
    sort: {
      handler: function (val, oldVal) {
        if (val && val.sortkey != null && val.sortway != null) {
          this.$store.commit('startLoading')
          var data = {
            query: {},
            sortkey: val.sortkey,
            sort: val.sortway.slice(0,4)
          }
          invoke({
            url: api.merchants,
            method: api.post,
            data: data
          }).then(
            result => {
              const [err, ret] = result
              if (err) {
                this.$store.commit('closeLoading')
                this.$message({
                  message: err.msg,
                  type: 'warning'
                })
              } else {
                var data = ret.data.payload
                this.$store.commit({
                  type: 'recordComlist',
                  data: data
                })
                this.$store.commit('closeLoading')
              }
            }
          )
        }
      },
      deep:true
    }
  },
  methods: {
    defineSort (col) {
      this.sort.sortkey = col.prop
      this.sort.sortway = col.order
    }, // 后端排序
    formatMSN (msn) {
      return formatMSN(msn)
    }, // 格式化线路号
    goComParent (parent) {
      // console.log('上级线路商', parent)
      this.$store.commit({
        type: 'recordOutdetailID',
        data: parent
      })
      this.$store.commit('closeEdit')
      this.$router.push('outdetail')
      this.$store.commit('startLoading')
      this.$store.dispatch('getOutdetail')
      this.$store.dispatch('getOutdetail_property')
      this.$store.dispatch('getOutdetail_child_managers')
      this.$store.dispatch('getOutdetail_child_merchants')
    }, // 跳转到商户上级线路商
    formatUser (user) {
      return formatUsername(user)
    }, // 格式化用户名
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
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username,
        parentId: row.parent,
        parentName: row.parentDisplayName
      }
      this.$store.commit('resetPartLoading')
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
      localStorage.setItem('parentID', row.parent)
      localStorage.setItem('nowUser', row.userId)
      this.$store.commit('closeEdit')
      this.$router.push('comdetail')
    }, // 查看用户
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
    },
    openURL (url) {
      window.open(url)
    }, // 打开前端域名
    storePoints (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username,
        parentId: row.parent,
        parentName: row.parentDisplayName,
        parentUserName: row.parentName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'store'
      })
    }, // 加点
    withdrawPoints (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username,
        parentId: row.parent,
        parentName: row.parentDisplayName,
        parentUserName: row.parentName
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'withdraw'
      })
    }, // 减点
    lockUser (index, row) {
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
          } else {
            var data = ret.data.payload
            // console.log(data)
            this.$message({
              message: '停用',
              type: 'success'
            })
            this.$store.dispatch('getOutlist')
            this.$store.dispatch('getComlist')
          }
        }
      )
    }, // 停用用户
    unlockUser (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username
      }
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'unlock'
      })
    } // 开启用户
  }
}
</script>

<style scoped>
.comlist .search{width: 100%;height: 8rem;}
.comlist .comresult{width: 99%;margin: 1.5rem auto}
.comlist .moreinfo{float: left;width: 40%}
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}
.comlist .gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.comlist .myBtn{float: left;width:100%;margin-left: -8px;}
.comlist .fontUrl{cursor: pointer;color: #20a0ff}
.comlist .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
</style>
