<template>
  <div>
    <div class="comlist">
      <div class="search">
        <searchbox></searchbox>
      </div>
      <div>
        <gocreate></gocreate>
      </div>
      <div class="comresult">
          <el-table stripe :data="comlist">
            <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
            </el-table-column>
            <!-- <el-table-column type="expand" width="20">
                <template scope="props">
                    <el-form label-position="left" inline>
                        <el-form-item label="商户ID" class="moreinfo">
                            <span>{{ props.row.userId }}</span>
                        </el-form-item>
                        <el-form-item label="商户邮箱" class="moreinfo">
                            <span>{{ props.row.merchantEmail }}</span>
                        </el-form-item>
                        <el-form-item label="商户前端域名" class="moreinfo">
                            <span @click="openURL(props.row.frontURL)" class="fontUrl">{{ props.row.frontURL }}</span>
                        </el-form-item>
                        <el-form-item label="商户白名单" class="moreinfo">
                            <span>{{ (props.row.loginWhiteList) }}</span>
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
                        <el-form-item label="商户生效时间" class="moreinfo">
                            <span>{{ contractPeriod(props.row.contractPeriod) }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column> -->
            <el-table-column label="商户标识" prop="suffix" align="center">
            </el-table-column>
            <el-table-column label="商户昵称" prop="displayName" align="center">
            </el-table-column>
            <el-table-column label="商户线路号" prop="merchantEmail" align="center">
              <template scope="scope">
                <span>{{formatMSN(scope.row.msn)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上级线路商" prop="" align="center" sortable>
              <template scope="scope">
                <span @click="goComParent(scope.row.parent)" class="fontUrl" v-if="scope.row.parent !== '01'">{{scope.row.parentDisplayName}}</span>
                <span v-if="scope.row.parent === '01'">直属于平台</span>
              </template>
            </el-table-column>
            <el-table-column label="商户抽成比" prop="rate" align="center" sortable>
              <template scope="scope">
                <span>{{(scope.row.rate)}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="剩余点数" prop="balance" align="center" sortable>
              <template scope="scope">
                <span>{{points(scope.row.balance)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商户游戏" prop="gameList" align="center" width="110">
                <template scope="scope">
                    <div slot="reference" class="gamelist">
                        <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item.name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column label="创建时间" prop="createdAt" align="center" width="120" sortable>
              <template scope="scope">
                <span>{{Time(scope.row.createdAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="最后登录时间" prop="loginAt" align="center" width="150" sortable>
              <template scope="scope">
                <span style="word-break:normal">{{Time(scope.row.loginAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" sortable width="90" >
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
                    <!-- <el-button type="text" class="myBtn" @click="editUser(scope.$index, scope.row)">编辑</el-button> -->
                    <el-button type="text" class="myBtn" @click="">
                      <el-dropdown trigger="click">
                        <span style="color:#20a0ff">更多</span>
                          <el-dropdown-menu slot="dropdown">
                            <p @click="storePoints(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>加点</el-dropdown-item></p>
                            <p @click="withdrawPoints(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>减点</el-dropdown-item></p>
                            <p @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.status === 0"><el-dropdown-item>开启</el-dropdown-item></p>
                            <p @click="lockUser(scope.$index, scope.row)" v-if="scope.row.status === 1"><el-dropdown-item>停用</el-dropdown-item></p>
                          </el-dropdown-menu>
                      </el-dropdown>
                    </el-button>
                </template>
            </el-table-column>
          </el-table>
        <div class="page">
          <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comlist.length" :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
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
      nowSize: 20,
      nowPage: 1
    }
  },
  computed: {
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
  methods: {
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
      this.$store.commit({
        type: 'recordNowlistUser',
        data: user
      })
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
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
      // console.log('当前是第:' + page + '页')
    },
    openURL (url) {
      // console.log('域名', url)
      window.open(url)
    }, // 打开前端域名
    storePoints (index, row) {
      var user = {
        userId: row.userId,
        role: row.role,
        username: row.username,
        parentId: row.parent,
        parentName: row.parentName,
        parentDisplayName: row.parentDisplayName
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
        parentName: row.parentName,
        parentName: row.parentName,
        parentDisplayName: row.parentDisplayName
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
            console.log(data)
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
.comlist .search{width: 100%;height: 8rem}
.comlist .comresult{width: 99%;margin: 2rem auto}
.comlist .moreinfo{float: left;width: 40%}
.remarkBox{word-wrap: break-word; word-break: normal;width: 200px}
.comlist .gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.comlist .myBtn{float: left;width:100%;margin: 0;}
.comlist .fontUrl{cursor: pointer;color: #20a0ff}
.comlist .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
</style>
