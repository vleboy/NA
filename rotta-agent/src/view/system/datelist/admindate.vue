<template>
  <div class="admindate">
    <div class="search">
      <p>共搜索到 {{count}} 条数据</p>
      <!-- <el-button type="primary">导出excel</el-button> -->
    </div>
    <div class="admindate-list">
      <el-table stripe :data="adminoperate">
        <el-table-column label="序号" prop="" align="center" width="65" type='index'>
        </el-table-column>
        <el-table-column label="操作" prop="action" align="center" sortable>
        </el-table-column>
        <el-table-column label="操作时间" prop="createdAt" align="center" sortable>
          <template scope="scope">
            <span>{{formatTime(scope.row.createdAt)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="" align="center" sortable>
          <template scope="scope">
            <span>{{(scope.row.username)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作结果" prop="ret"  align="center" sortable>
          <template scope="scope">
            <span class="green" v-if="scope.row.ret === 'Y'">成功</span>
            <span class="red" v-if="scope.row.ret === 'N'">失败</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:right;margin: 2rem 2rem 2rem 0">
      <el-button type='primary'>上一页</el-button>
      <el-button type='primary'>下一页</el-button>
    </div>
  </div>
</template>
<script>
import { detailTime, formatUsername } from '@/behavior/format'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'admindate'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getAdmin_cooperDate')
  },
  computed: {
    adminoperate () {
      return this.$store.state.variable.adminCooperdate
    },
    count () {
      return this.$store.state.variable.adminCooperdate.length
    }
  },
  methods: {
    user (name) {
      return formatUsername(name)
    }, // 格式化用户名
    formatTime (time) {
      return detailTime(time)
    } // 格式时间
  }
}
</script>

<style scpoed>
.admindate .search{margin-left: 2rem;margin-top: 2rem}
.admindate .search p{padding-bottom: 1rem}
.admindate .admindate-list{width: 99%;margin: 0 auto;margin-top: 2rem}
.green{color: #00CC00}
.red{color: #FF3300}
</style>
