<template>
  <div class="managerloginlist">
    <searchbox></searchbox>
    <div class="search">
      <p>共搜索到 0 条数据</p>
      <!-- <el-button type="primary">导出excel</el-button> -->
    </div>
    <div class="outdate-list">
      <el-table stripe :data="loginList">
        <el-table-column label="序号" prop="" align="center" width="65" type="index">
        </el-table-column>
        <el-table-column label="线路商标识" prop="suffix" align="center">
        </el-table-column>
        <el-table-column label="线路商昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="线路商管理账号" prop="username" align="center">
          <template scope="scope">
            <span>{{formatUser(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录IP" prop="lastIP"  align="center">
        </el-table-column>
        <el-table-column label="最后登录时间" prop="updatedAt" min-width="95" align="center">
          <template scope="scope">
            <span>{{formatTime(scope.row.updatedAt)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" align="center">
          <template scope="scope">
            <p v-if="scope.row.userStatus === 0" class="red"><span class="statusIcon1">&middot;</span>锁定</p>
            <p v-if="scope.row.userStatus === 1" class="green"><span class="statusIcon2">&middot;</span>正常</p>
          </template>
        </el-table-column>
        <el-table-column label="账号详情" prop="detail" align="center">
          <template scope="scope">
            <p v-if="scope.row.ret === 'N'" class="red"><span class="statusIcon1">&middot;</span>{{scope.row.detail}}</p>
            <p v-if="scope.row.ret === 'Y'" class="green"><span class="statusIcon2">&middot;</span>{{scope.row.detail}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" min-width="65">
            <template scope="scope">
              <el-button type="text" @click="lockUser(scope.$index, scope.row)" v-if="scope.row.userStatus === 1">锁定</el-button>
              <el-button type="text" @click="unlockUser(scope.$index, scope.row)" v-if="scope.row.userStatus === 0">解锁</el-button>
            </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div style="text-align:right;margin: 2rem 2rem 0 0">
      <el-button type='primary'>上一页</el-button>
      <el-button type='primary'>下一页</el-button>
    </div>
  </div>
</template>
<script>
import Searchbox from '@/components/searchbox'
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  components: {
    Searchbox
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'managerloginlist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'postSearch_conditon',
      data: {}
    })
  },
  created () {
    this.$store.dispatch('getManager_LoginList')
  },
  computed: {
    loginList () {
      return this.$store.state.variable.managerLoginList
    }
  },
  methods: {
    formatUser (o) {
      if (o) {
        return o.split('_')[1]
      } else {
        return ''
      }
    },
    formatTime (time) {
      return detailTime(time)
    }, // 格式时间
    lockUser (index, row) {
      var user = {
        role: row.role,
        userId: row.userId,
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
          } else {
            var data = ret.payload
            // console.log('操作成功返回数据', data)
            this.$message({
              message: '锁定成功',
              type: 'success'
            })
            this.$store.dispatch('getManager_LoginList')
          }
        }
      )
    }, // 锁定用户
    unlockUser (index, row) {
      var user = {
        role: row.role,
        userId: row.userId,
        status: 1
      }
      invoke({
        url: api.userStatus,
        method: api.post,
        data: user
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.payload
            // console.log('操作成功返回数据', data)
            this.$message({
              message: '解锁成功',
              type: 'success'
            })
            this.$store.dispatch('getManager_LoginList')
          }
        }
      )
    } // 解锁用户
  }
}
</script>

<style scpoed>
.managerloginlist .search{margin-left: 2rem;margin-top: 2rem}
.managerloginlist .search p{padding-bottom: 1rem}
.managerloginlist .outdate-list{width: 99%;margin: 0 auto;margin-top: 3rem}
.green{color: #00CC00}
.red{color: #FF3300}
.managerloginlist .statusIcon1{font-size: 2rem;color:#F04134;display: inline-block;margin-right: 0.2rem;vertical-align: -0.3rem}
.managerloginlist .statusIcon2{font-size: 2rem;color:#00A854;display: inline-block;margin-right: 0.2rem;vertical-align: -0.3rem}
</style>
