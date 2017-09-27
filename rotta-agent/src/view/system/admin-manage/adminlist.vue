<template>
  <div class="adminlist">
    <!-- <searchbox></searchbox> -->
    <div class="search">
      <p>共搜索到 {{count}} 条数据</p>
    </div>
  <div class="adminlist-form">
    <el-table border tooltip-effect="dark" :data="adminList">
        <el-table-column type="index" width="65" align="center" label="序号">
        </el-table-column>
        <el-table-column prop="uname" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="displayName" label="昵称" align="center">
        </el-table-column>
        <!-- <el-table-column prop="hostName" label="真实姓名"  align="center">
        </el-table-column> -->
        <el-table-column prop="points" label="剩余点数" align="center">
          <template scope="scope">
            <span>{{formatPoints(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间"  align="center">
          <template scope="scope">
            <span>{{formatTime(scope.row.createdAt)}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="agentEmail" label="邮箱" align="center">
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
import { detailTime, formatPoints } from '@/behavior/format'
// import Searchbox from '@/components/searchbox'
export default {
  // components: {
  //   Searchbox
  // },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'adminlist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getAdminlist')
  },
  computed: {
    adminList () {
      return this.$store.state.variable.adminList
    },
    count () {
      return this.$store.state.variable.adminList.length
    }
  },
  methods: {
    formatTime (time) {
      return detailTime(time)
    }, // 格式时间
    formatPoints (points) {
      return formatPoints(points)
    }
  }
}
</script>

<style scpoed>
.adminlist .search{margin-left: 2rem;margin-top: 2rem}
.adminlist .search p{padding-bottom: 1rem}
.adminlist .adminlist-form{width: 99%;margin: 0 auto;margin-top: 1rem}
</style>
