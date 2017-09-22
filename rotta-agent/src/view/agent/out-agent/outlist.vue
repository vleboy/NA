<template>
<div>
  <div class="outlist">
    <div class="search">
      <searchbox></searchbox>
    </div>
    <div>
      <gocreate></gocreate>
    </div>
    <div class="outresult">
        <el-table stripe :data="outlist">
          <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
          </el-table-column>
          <el-table-column type="expand" width="20">
              <template scope="props">
                  <el-form label-position="left" inline>
                      <el-form-item label="线路商ID" class="moreinfo">
                          <span>{{ props.row.userId }}</span>
                      </el-form-item>
                      <el-form-item label="管理员账号" class="moreinfo">
                          <span>{{ props.row.username.split('_')[1] }}</span>
                      </el-form-item>
                      <el-form-item label="管理员密码" class="moreinfo">
                          <span>{{ props.row.password }}</span>
                      </el-form-item>
                      <el-form-item label="管理员姓名" class="moreinfo">
                          <span>{{ props.row.hostName }}</span>
                      </el-form-item>
                      <el-form-item label="管理员联系方式" class="moreinfo">
                          <span>{{ props.row.hostContact }}</span>
                      </el-form-item>
                      <el-form-item label="管理员邮箱" class="moreinfo">
                          <span>{{ props.row.adminEmail }}</span>
                      </el-form-item>
                      <el-form-item label="线路商生效时间" class="moreinfo">
                          <span>{{ contractPeriod(props.row.contractPeriod) }}</span>
                      </el-form-item>
                  </el-form>
              </template>
          </el-table-column>
          <el-table-column label="线路商标识" prop="suffix" align="center">
          </el-table-column>
          <el-table-column label="线路商昵称" prop="displayName" align="center">
          </el-table-column>
          <el-table-column label="线路商抽成比" prop="rate" align="center">
            <template scope="scope">
              <span>{{(scope.row.rate)}}%</span>
            </template>
          </el-table-column>
          <el-table-column label="可用商户名额" prop="limit" align="center">
            <template scope="scope">
              <span>{{(scope.row.merchantUsedCount)}}</span>/<span>{{(scope.row.limit)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="剩余点数" prop="balance" align="center">
            <template scope="scope">
              <span>{{points(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="线路商游戏" prop="gamelist" align="center">
              <template scope="scope">
                  <div slot="reference" class="gamelist">
                      <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item.name }}</el-tag>
                  </div>
              </template>
          </el-table-column>
          <el-table-column label="线路商邮箱" prop="managerEmail" header-align="center">
          </el-table-column>
          <el-table-column label="创建时间" prop="createdAt" align="center" width="120">
            <template scope="scope">
              <span>{{Time(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最后登录时间" prop="loginAt" align="center" width="120">
              <template scope="scope">
              <span>{{Time(scope.row.loginAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" sortable width="90">
            <template scope="scope">
              <span>{{Status(scope.row.status)}}</span>
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
                  <el-button type="text" class="myBtn" @click="checkUser(scope.$index, scope.row)">查看</el-button>
                  <el-button type="text" class="myBtn" @click="editUser(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" class="myBtn" @click="">
                    <el-dropdown trigger="click">
                      <span style="color:#20a0ff">更多</span>
                        <el-dropdown-menu slot="dropdown">
                          <p @click="storePoints(scope.$index, scope.row)"><el-dropdown-item>存点</el-dropdown-item></p>
                          <p @click="withdrawPoints(scope.$index, scope.row)"><el-dropdown-item>提点</el-dropdown-item></p>
                          <p @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.status === 0"><el-dropdown-item>解锁</el-dropdown-item></p>
                          <p @click="lockUser(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>锁定</el-dropdown-item></p>
                        </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
              </template>
          </el-table-column>
        </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.outlist.length" :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
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
import { detailTime, formatStatus, formatContractPeriod, formatRemark, formatPoints } from '@/behavior/format'
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
      data: 'outlist'
    })
  },
  created () {
    this.$store.dispatch('getOutlist')
  },
  data () {
    return {
      nowSize: 5,
      nowPage: 1
    }
  },
  computed: {
    outlist () {
      var outlist = this.$store.state.variable.outlist
      if (this.nowPage === 1) {
        outlist = this.$store.state.variable.outlist.slice(0, this.nowSize)
      } else {
        outlist = this.$store.state.variable.outlist.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
      return outlist
    }
  },
  methods: {
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
        type: 'recordOutdetailID',
        data: row.userId
      })
      this.$store.commit('closeEdit')
      this.$router.push('outdetail')
    }, // 查看用户
    editUser (index, row) {
      // console.log('查看的用户为 ' + row.username + ' / ' + '查看的用户ID为 ' + row.userId)
      this.$store.commit({
        type: 'recordOutdetailID',
        data: row.userId
      })
      this.$store.commit('startEdit')
      this.$router.push('outdetail')
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
      // console.log('存点用户是：', row.username, '用户ID', row.userId)
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
        data: 'list_transfer'
      })
      this.$store.commit('startStoreDialog')
    }, // 存点
    withdrawPoints (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username
      }
      // console.log('提点用户是：', row.username, '用户ID', row.userId)
      this.$store.commit({
        type: 'getpointsIndex',
        data: 'list_transfer'
      })
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit('startWithdrawDialog')
    }, // 提点
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
            console.log(data)
            this.$message({
              message: '锁定',
              type: 'success'
            })
            this.$store.dispatch('getOutlist')
            this.$store.dispatch('getComlist')
          }
        }
      )
    }, // 锁定用户
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
        data: 'list_unlockUser'
      })
      this.$store.commit('startStoreDialog')
    } // 解锁用户
  }
}
</script>

<style scoped>
.outlist .search{width: 100%;height: 8rem}
.outlist .outresult{width: 99%;margin: 2rem auto}
.outlist .moreinfo{float: left;width: 40%}
.remarkBox{word-wrap: break-word; word-break: normal;max-width: 200px;}
.outlist .gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.outlist .myBtn{float: left;width:100%;margin: 0;}
.outlist .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
</style>
