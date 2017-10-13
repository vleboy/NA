<template>
  <div class="admindate">
    <div class="search">
      <p>共 {{count}} 条数据</p>
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
        <el-table-column label="操作人" prop="username" align="center" sortable>
          <template scope="scope">
            <span>{{user(scope.row.username)}}</span>
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
    <div class="page">
      <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.adminCooperdate.length" :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
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
      var allData = this.$store.state.variable.adminCooperdate
      if (this.nowPage === 1) {
        allData = this.$store.state.variable.adminCooperdate.slice(0, this.nowSize)
      } else {
        allData = this.$store.state.variable.adminCooperdate.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
      return allData
    },
    count () {
      return this.$store.state.variable.adminCooperdate.length
    }
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1
    }
  },
  methods: {
    user (name) {
      return formatUsername(name)
    },
    formatTime (time) {
      return detailTime(time)
    }, // 格式时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    }
  },
  beforeDestroy () {
  }
}
</script>

<style scpoed>
.admindate .search{margin-left: 2rem;margin-top: 2rem}
.admindate .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.admindate .search p{padding-bottom: 1rem}
.admindate .admindate-list{width: 99%;margin: 0 auto;margin-top: 2rem}
.green{color: #00CC00}
.red{color: #FF3300}
</style>
