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
          <el-table-column label="序号" prop="rank" align="center" width="65" type="index">
          </el-table-column>
          <el-table-column type="expand" width="10">
              <template scope="props">
                  <el-form label-position="left" inline>
                      <el-form-item label="商户ID" class="moreinfo">
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
                      <el-form-item label="商户生效时间" class="moreinfo">
                          <span>{{ contractPeriod(props.row.contractPeriod) }}</span>
                      </el-form-item>
                  </el-form>
              </template>
          </el-table-column>
          <el-table-column label="商户标识" prop="suffix" align="center">
          </el-table-column>
          <el-table-column label="商户昵称" prop="displayName" align="center">
          </el-table-column>
          <el-table-column label="商户抽成比" prop="rate" align="center">
          	<template scope="scope">
            	<span>{{(scope.row.rate)}}%</span>
            </template>
          </el-table-column>
          <el-table-column label="可用商户名额" prop="limit" align="center">
          </el-table-column>
          <el-table-column label="拥有点数" prop="balance" align="center">
            <template scope="scope">
            	<span>{{(scope.row.balance)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商户游戏" prop="gameList" align="center">
              <template scope="scope">
                  <div slot="reference" class="gamelist">
                      <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item }}</el-tag>
                  </div>
              </template>
          </el-table-column>
          <el-table-column label="商户邮箱" prop="merchantEmail" align="center">
          </el-table-column>
          <el-table-column label="创建时间" prop="" align="center" width="120">
			<template scope="scope">
            	<span>{{Time(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最后登录时间" prop="loginAt" align="center" width="120">
			<template scope="scope">
            	<span>{{Time(scope.row.loginAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" sortable width="90" :formatter="Status">
          </el-table-column>
          <el-table-column label="备注" align="center" width="65">
              <template scope="scope">
                <el-popover trigger="hover" placement="bottom">
                <div class="remark">
                  <p>{{ scope.row.remark }}</p>
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
                  <el-button type="text" class="myBtn">更多</el-button>
              </template>
          </el-table-column>
      	</el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.comlist.length" :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
      </div>
   	</div>
  </div>
  </div>
</template>

<script>
import Gocreate from '@/components/gocreate'
import Searchbox from '@/components/searchbox'
import { detailTime, formatStatus, formatContractPeriod } from '@/behavior/format'
export default {
  components: {
    Searchbox,
    Gocreate
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'comlist'
    })
  },
  created () {
    this.$store.dispatch('getComlist')
  },
  data () {
    return {
      nowSize: 5,
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
      // 
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
      this.$store.commit('closeEdit')
      this.$router.push('comdetail')
    }, // 查看用户
    editUser (index, row) {
      // 
      this.$store.commit({
        type: 'recordComdetailID',
        data: row.userId
      })
      this.$store.commit('startEdit')
      this.$router.push('comdetail')
    }, // 编辑用户
    getNowsize (size) {
      this.nowSize = size
      // 
    },
    getNowpage (page) {
      this.nowPage = page
      // 
    }
  }
}
</script>

<style scoped>
.search{width: 100%;height: 8rem}
.comresult{width: 99%;margin: 2rem auto}
.moreinfo{float: left;width: 40%}
.remark{word-wrap: break-word; word-break: normal;width: 200px}
.gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.myBtn{display: block;margin-left: 0;padding-left: 0.5rem}
.page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
</style>
