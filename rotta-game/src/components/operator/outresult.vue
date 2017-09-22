<template>
  <div class="outresult">
    <el-table stripe :data="companyList">
        <el-table-column label="序号" prop="companyName" align="center" width="65" type="index">
        </el-table-column>
        <el-table-column label="运营商名称" prop="companyName" align="center">
        </el-table-column>
        <!--<el-table-column label="合作模式" prop="rate" :formatter='getRate' align="center">-->
        <!--</el-table-column>-->
        <el-table-column label="联系方式" prop="companyContactWay" align="center">
        </el-table-column>
        <el-table-column label="运营商邮箱" prop="companyEmail" align="center">
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime" align="center" min-width="95">
        </el-table-column>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" :formatter="getStatus" width="90">
        </el-table-column>
        <el-table-column label="备注" align="center" width="65">
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <p>{{scope.row.remark == 'NULL!' ? '' : scope.row.remark}}</p>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      <el-table-column label="操作" align="center" min-width="65">
            <template scope="scope">
                <el-button type="text" class="myBtn" @click="goDetail(scope.row)">查看</el-button>
                <!--<el-button type="text" class="myBtn" @click="editUser(scope.$index, scope.row)">更多</el-button>-->
            </template>
        </el-table-column>
    </el-table>
    <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.operatorList.length"
                       :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">

        </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  name: 'outresult',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
  },
  created () {
    this.$store.dispatch('getOperatorList')
  },
  data () {
    return {
      nowSize: 5,
      nowPage: 1,
      status: ['锁定', '正常']
    }
  },
  computed: {
    companyList () {
      if (this.nowPage === 1) {
        return this.$store.state.variable.operatorList.slice(0, this.nowSize)
      } else {
        return this.$store.state.variable.operatorList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getStatus (row, col) {
      return this.status[row.companyStatus]
    }, // 格式化登录状态
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt)) + ''
      var formatprev = dateformat(now, 'isoDate')
      return formatprev
    }, // 格式化创建时间
    goDetail (row) {
      this.$store.commit('startLoading')
      invoke({
        url: `${api.companyOne}/${row.companyName}/${row.companyId}`,
        method: api.get
      }).then((data) => {
        let [err, res] = data
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          this.$store.commit({
            type: 'gameDetailInfo',
            data: res.data.payload
          })
        }
        this.$store.commit('closeLoading')
      })
      this.$router.push('operatordetail')
    }, // 查看用户
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outresult{padding: 2rem;}
.gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.myBtn{width: 100%;margin: 0 auto}
.page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
</style>
