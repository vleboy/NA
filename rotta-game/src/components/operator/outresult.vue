<template>
  <div class="outresult">
    <el-table stripe :data="companyList">
      <el-table-column label="序号" prop="companyName" align="center" width="65" type="index"></el-table-column>
      <el-table-column label="供应商名称" prop="companyName" align="center" width="150"></el-table-column>
      <el-table-column label="供应商标识" prop="companyIden" align="center" width="150"></el-table-column>
      <el-table-column label="接入类型" prop="companyType" align="center" width="120">
        <template scope="scope">
          {{companyTypeArray[scope.row.companyType-1]}}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" prop="companyContactWay" align="center" width="120"></el-table-column>
      <el-table-column label="供应商邮箱" prop="companyEmail" align="center" width="150"></el-table-column>
      <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime" align="center" width="150"></el-table-column>
      <el-table-column label="状态" align="center" prop="companyStatus" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.companyStatus ? 'success' : 'danger'">
            {{status[scope.row.companyStatus]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="key" align="center" prop="companyKey" width="190">
        <template scope="scope">
          {{scope.row.companyKey ? scope.row.companyKey : '暂无'}}
        </template>
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
      <el-table-column label="操作" align="center" min-width="160">
        <template scope="scope">
          <el-button type="text"  @click="goDetail(scope.row)" style="margin-left: 10px">查看</el-button>
          <el-button type="text"  @click="editOperator(scope.row)">编辑</el-button>
          <el-button type="text"  @click="operation(scope.row)">{{scope.row.companyStatus ? '停用':'启用'}}</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.operatorList.length"
                       :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">

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
      nowSize: 20,
      nowPage: 1,
      companyTypeArray: ['A类','B类'],
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
    editOperator (item) {
      this.$router.push('addOperator')
      this.$store.commit('isOpenEdit')
      this.$store.commit({
        type: 'storageOperatorItem',
        data: item
      })
    },
    operation (data) {
      this.$confirm(`${data.companyStatus ? '此操作将停用该供应商下的所有游戏， 是否继续？' : '此操作将启用该供应商，旗下所有游戏将生效，是否继续？'}`,
        '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('startLoading')
        invoke({
          url: api.changeCompany,
          method: api.post,
          data:{
            companyName: data.companyName,
            companyId: data.companyId,
            status: data.companyStatus ? 0 : 1
          }
        }).then((data) => {
          let [err, res] = data
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.$store.dispatch('getOperatorList')
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }
          this.$store.commit('closeLoading')
        })
      });
    },
    getCompanyList () {

    },
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
.outresult{padding:1rem 2rem;}
.gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
</style>
