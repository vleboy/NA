<template>
  <div class="personalcenter">
    <div style="text-align:center">
      <h2 style="font-size: 2rem;margin:1.5rem 0 0 0">{{adminInfo.uname}}</h2>
    </div>
    <div class="manangeinfo">
        <h4>管理信息</h4>
        <div class="manangeform">
            <p>
              <span>管理员账号: {{adminInfo.uname}}</span>
              <span>管理员姓名: {{adminInfo.adminName}}</span>
              <span>管理员密码: {{adminInfo.password}}</span>
            </p>
            <p>
              <span>管理员Email: {{adminInfo.adminEmail}}</span>
              <span>管理员角色: {{formatRole(adminInfo.subRole)}}</span>
              <span>管理员联系方式: {{adminInfo.adminContact}}</span>
            </p>
            <p>
              <span>上次登录时间: {{formatTime(adminInfo.loginAt)}}</span>
              <span>上次登录IP: {{adminInfo.lastIP}}</span>
            </p>
        </div>
    </div>
    <div class="manager-copertion">
        <h4>平台管理员点数操作记录</h4>
        <div class="copertion-form">
            <div class="form-header">
                <span class="points">当前管理员剩余点数: <span style="color:#FF9900">{{balance}}</span>
                </span>
                <!-- <div class="right">
                  <el-input placeholder="请输入搜索条件" class="input"></el-input><el-button type="primary" class="myBtn">搜索</el-button>
                </div> -->
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="adminWaterFall">
                    <el-table-column label="序号" align="center" width="60" prop="" type="index"></el-table-column>
                    <!-- <el-table-column label="流水号" align="center" width="" prop="sn"></el-table-column> -->
                    <el-table-column label="账户余额" align="center" width="" prop="balance">
                      <template scope="scope">
                        <span>{{formatPoints(scope.row.balance)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易点数" align="center" width="" prop="amount">
                      <template scope="scope">
                        <p v-if="scope.row.action === 1">
                          <span class="green">{{scope.row.amount.toFixed(2)}}</span>
                        </p>
                        <p v-if="scope.row.action === -1">
                          <span class="red">{{scope.row.amount.toFixed(2)}}</span>
                        </p>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易时间" align="center" width="110" prop="updatedAt">
                      <template scope="scope">
                        <span>{{formatTime(scope.row.updatedAt)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易对象" align="center" width="" prop="">
                      <template scope="scope">
                        <span v-if="scope.row.fromLevel > scope.row.toLevel">
                          {{scope.row.toUser.split('_')[1]}} 对 {{scope.row.fromUser.split('_')[1]}}
                        </span>
                        <span v-if="scope.row.fromLevel < scope.row.toLevel">
                          {{scope.row.fromUser.split('_')[1]}} 对 {{scope.row.toUser.split('_')[1]}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易类型" align="center" width="65" prop="">
                      <template scope="scope">
                        <p v-if="scope.row.action === 1">
                          <span>提点</span>
                          </p>
                        <p v-if="scope.row.action === -1">
                          <span>存点</span>
                        </p>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易详情(原账+当前操作额=现在余额)" align="center" prop="">
                      <template scope="scope">
                        <p v-if="scope.row.action === 1">
                          <span>{{scope.row.oldBalance}}</span>
                          <span class="green"> + {{scope.row.amount}}</span> =
                          <span>{{scope.row.balance}}</span>
                        </p>
                        <p v-if="scope.row.action === -1">
                            <span>{{scope.row.oldBalance}}</span>
                            <span class="red"> - {{Math.abs(scope.row.amount)}}</span> =
                            <span>{{scope.row.balance}}</span>
                        </p>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作人" align="center" width="" prop="operator">
                      <template scope="scope">
                        <span>{{scope.row.operator.split('_')[1]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="" width="65">
                      <template scope="scope">
                        <el-popover trigger="hover" placement="bottom">
                        <div class="remark">
                          <p>{{ formatRemark(scope.row.remark) }}</p>
                        </div>
                        <div slot="reference" class="">
                          <el-icon name="search" style="color:#108ee9"></el-icon>
                        </div>
                      </el-popover>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
              <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.personalproperty.length" :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { detailTime, formatPoints, formatRemark } from '@/behavior/format'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'personal'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getPersonal_info')
    this.$store.dispatch('getPersonal_property')
    this.$store.dispatch('getPersonal_bills')
  },
  computed: {
    adminInfo () {
      return this.$store.state.variable.personalinfo
    },
    adminWaterFall () {
      var waterFall = this.$store.state.variable.personalproperty
      if (this.nowPage === 1) {
        waterFall = waterFall.slice(0, this.nowSize)
      } else {
        waterFall = waterFall.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
      return waterFall
    },
    balance () {
      var x = this.$store.state.variable.bills
      return this.formatPoints(x)
    }
  },
  data () {
    return {
      nowSize: 5,
      nowPage: 1
    }
  },
  methods: {
    formatRole (user) {
      if (user === 'admin') {
        user = '平台管理员'
      } else if (user === 'president') {
        user = '总裁'
      } else if (user === 'marketing') {
        user = '市场部管理员'
      } else if (user === 'operation') {
        user = '运营部管理员'
      } else if (user === 'finance') {
        user = '财务部管理员'
      }
      return user
    }, // 格式化管理员角色
    formatTime (time) {
      return detailTime(time)
    },
    formatPoints (points) {
      return formatPoints(points)
    },
    formatRemark (remark) {
      return formatRemark(remark)
    },
    getNowsize (size) {
      this.nowSize = size
    },
    getNowpage (page) {
      this.nowPage = page
    }
  }
}
</script>

<style scpoed>
.personalcenter .manangeinfo,
.personalcenter .manager-copertion{width: 99%;margin: 0 auto;vertical-align: baseline;}
.personalcenter .manangeform{background-color: #f5f5f5;margin-bottom: 2rem}

.personalcenter .copertion-form{background-color: #f5f5f5;padding-left: 1.5%}
.personalcenter .form-header{padding: 1rem 0}

.personalcenter .manangeform span{display: inline-block;width: 25%;padding: 2rem 1.5rem 1.5rem 2rem;}
.personalcenter h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
.personalcenter .right{float: right;margin-bottom: 1rem;padding-right: 2.6rem}
.personalcenter .points{vertical-align: -0.75rem}
.personalcenter .input{width: 20rem;margin-right: 0.4rem;}
.personalcenter .myBtn{}
/*分页器*/
.page {padding-bottom: 2rem;text-align: right;margin-right: 2%;margin-top: 0.5rem}
/**/
.green{color: #00CC00}
.red{color: #FF3300}
/**/
.personalcenter .remark{word-wrap: break-word; word-break: normal;width: 200px}
</style>
