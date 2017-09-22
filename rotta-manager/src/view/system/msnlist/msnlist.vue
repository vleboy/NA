<template>
  <div class="msn">
    <div class="search">
        <el-input placeholder="请输入需要查询的线路号" class="input" v-model="thisMsn"></el-input><el-button type="primary">搜索</el-button><el-button type="primary">重置</el-button>
    </div>
    <div class="msnlist" v-loading="loading">
        <el-table :data="msnList" border>
            <el-table-column label="序号" prop="rank" align="center" width="65" type="selection">
            </el-table-column>
            <el-table-column label="线路号" prop="msn" align="center" width="180" :formatter="formatMSN">
            </el-table-column>
            <el-table-column label="状态" prop="status" align="center">
              <template scope="scope">
                <p v-if="scope.row.status === 0" class="green">未使用</p>
                <p v-if="scope.row.status === 1" class="red">已使用</p>
                <p v-if="scope.row.status === 2" class="blue">已锁定</p>
              </template>
            </el-table-column>
            <el-table-column label="商户" prop="displayName" align="center" :formatter="backDisplayname">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="65">
                <template scope="scope">
                    <!-- <el-button type="text" class="myBtn" v-if="scope.row.status === 1">查看</el-button> -->
                    <el-button type="text" class="myBtn" v-if="scope.row.status === 2" @click="checkOpera(scope.$index, scope.row)">解锁</el-button>
                    <el-button type="text" class="myBtn" v-if="scope.row.status === 0" @click="checkOpera(scope.$index, scope.row)">锁定</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.msnList.length" :page-sizes="[10, 20]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
    </div>
</div>
</template>
<script>
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'msnlist'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getMsnList')
  },
  data () {
    return {
      loading: false,
      thisMsn: '', // 搜索的商户号
      nowSize: 10,
      nowPage: 1
    }
  },
  computed: {
    msnList () {
      if (this.nowPage === 1) {
        return this.$store.state.variable.msnList.slice(0, this.nowSize)
      } else {
        return this.$store.state.variable.msnList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    // searchMSN () {
    //   this.$store.commit({
    //     type: 'getSearchMSN',
    //     data: this.thisMsn
    //   })
    //   this.$store.commit('msnSearch')
    // },
    // resetList () {
    //   this.thisMsn = ''
    //   this.$store.commit('resetMSNlist')
    // }, // 重置列表
    backDisplayname (row, col) {
      var displayName = ''
      if (row.displayName === '' || row.displayName === undefined) {
        displayName = '暂无'
      } else {
        displayName = row.displayName
      }
      return displayName
    },
    getNowsize (size) {
      this.nowSize = size
    },
    getNowpage (page) {
      this.nowPage = page
    },
    async checkOpera (index, row) {
      this.loading = true
      // console.log('操作的线路号为 ' + row.msn + ' / ' + '当前线路号的状态是 ' + row.status)
      var msn = row.msn
      var operate = row.status
      if (operate === 0) {
        operate = 2
      } else {
        operate = 0
      }
      let result = await invoke({
        url: api.msnLock + '/' + msn + '/' + operate,
        method: api.get
      })
      if (result) {
        var message = ''
        if (operate === 0) {
          message = '解锁成功'
        } else {
          message = '线路号已锁定'
        }
        this.$message({
          message: message,
          type: 'success'
        })
        this.$store.dispatch('getMsnList')
        this.loading = false
      }
    }, // 锁定/解锁线路号
    formatMSN (row, col) {
      var msn = row.msn
      msn = (msn * 0.001).toFixed(3).substring(2)
      return msn
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msn .msnlist{padding: 2rem;}
.page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
/**/
.green{color: #00CC00}
.red{color: #ff3300}
.blue{color: rgba(16, 141, 233, 1)}
/**/
.msn .search{text-align: right;margin-top: 1rem;background-color: #e9e9e9;padding: 3rem 2rem}
.msn .input{width: 15rem;margin-right: 0.5rem}
</style>
