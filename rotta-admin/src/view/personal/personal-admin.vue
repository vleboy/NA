<template>
  <div class="personalcenter">
    <div style="text-align:center">
      <h2 style="font-size: 2rem;margin:1.5rem 0 0 0">{{adminInfo.uname}}</h2>
    </div>
    <div class="manangeinfo" v-loading="infoLoading" element-loading-text="加载中">
        <h4>管理信息</h4>
        <div class="manangeform">
            <p>
              <span>管理员账号: {{adminInfo.uname}}</span>
              <span>管理员密码: {{adminInfo.password}}<h5 class="newPassword" @click="newPassword">修改密码</h5></span>
              <span>管理员余额: <i style="color: #00CC00;font-style: normal">{{balance}}</i></span>
            </p>
            <p>
              <span>管理员姓名: {{adminInfo.adminName}}</span>
              <span>管理员Email: {{adminInfo.adminEmail}}</span>
              <span>管理员角色: {{formatRole(adminInfo.subRole)}}</span>
            </p>
            <p>
              <span>管理员联系方式: {{adminInfo.adminContact}}</span>
              <span>上次登录时间: {{formatTime(adminInfo.loginAt)}}</span>
              <span>上次登录IP: {{adminInfo.lastIP}}</span>
            </p>
        </div>
    </div>
    <div class="manager-copertion" v-loading="billLoading" element-loading-text="加载中">
        <!-- <h4>平台管理员点数操作记录</h4> -->
        <div class="copertion-form">
            <div class="form-header">
                <!-- <span class="points">当前管理员剩余点数: <span style="color:#FF9900">{{balance}}</span>
                </span> -->
                <!-- <div class="right">
                  <el-input placeholder="请输入搜索条件" class="input"></el-input><el-button type="primary" class="myBtn">搜索</el-button>
                </div> -->
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" border max-height='10px' :data="adminWaterFall">
                    <el-table-column label="序号" align="center" width="60" prop="" type="index"></el-table-column>
                    <!-- <el-table-column label="流水号" align="left" width="" prop="sn"></el-table-column> -->
                    <el-table-column label="账户余额" align="left" width="120" prop="balance">
                      <template scope="scope">
                        <span>{{formatPoints(scope.row.balance)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易点数" align="left" width="120" prop="amount">
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
                          {{scope.row.toDisplayName}} 对 {{scope.row.fromDisplayName}}
                        </span>
                        <span v-if="scope.row.fromLevel < scope.row.toLevel">
                          {{scope.row.fromDisplayName}} 对 {{scope.row.toDisplayName}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="交易类型" align="center" prop="" width="90">
                      <template scope="scope">
                        <p v-if="scope.row.action === 1">
                          <span>减点</span>
                          </p>
                        <p v-if="scope.row.action === -1">
                          <span>加点</span>
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
                    <el-table-column label="操作人" align="left" width="80" prop="operator">
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
              <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.variable.personalproperty.length" :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
            </div>
        </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="changepassword" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="billTransfer">
        <el-form :model="passwordAbout" :ref="passwordAbout" :rules="rules" label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="新密码" style="margin-left:10%" prop="newPassword">
              <el-input placeholder="请输入新密码" v-model="passwordAbout.newPassword" class="passwordinput"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" style="margin-left:10%" prop="repeatNew">
              <el-input placeholder="请重复新密码" v-model="passwordAbout.repeatNew" class="passwordinput"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel(passwordAbout)" class="distance">取 消</el-button>
          <el-button type="primary" @click="postChange" :loading="loading">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>修改成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel(passwordAbout)">确定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { detailTime, formatPoints, formatRemark } from '@/behavior/format'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('resetPartLoading')
    this.$store.commit('resetAjax')
    this.$store.commit({
      type: 'recordPersonal_property',
      data: []
    })
    this.$store.commit({
      type: 'recordNowindex',
      data: 'personal'
    })
    this.$store.commit('returnLocalStorage')
    this.$store.dispatch('getPersonal_info_admin')
    this.$store.dispatch('getPersonal_bills')
    this.$store.dispatch('getPersonal_property')
  },
  computed: {
    billLoading () {
      return this.$store.state.variable.partLoading.billLoading
    },
    ajaxCount () {
      return this.$store.state.ajaxCount
    },
    adminInfo () {
      this.oldPassword = this.$store.state.variable.personalinfo.password
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
  watch: {
    ajaxCount (val) {
      if (val == 2) {
        this.infoLoading = false
      }
    }
  },
  data () {
    var checkNewPassword = (rule, value, callback) => {
      var password = function passwordLevel (password) {
        var Modes = 0
        for (let i = 0; i < password.length; i++) {
          Modes |= CharMode(password.charCodeAt(i))
        }
        return bitTotal(Modes)
        // CharMode函数
        function CharMode (iN) {
          if (iN >= 48 && iN <= 57) {
            return 1
          } // 数字
          if (iN >= 65 && iN <= 90) {
            return 2
          } // 大小写
          if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
            return 4
          } else {
            return 8
          } // 特殊字符
        }
        // bitTotal函数
        function bitTotal (num) {
          let modes = 0
          for (let i = 0; i < 4; i++) {
            if (num & 1) modes++
            num >>>= 1
          }
          return modes
        }
      }
      if (value === '') {
        callback(new Error('密码不能为空'))
        this.checknew = false
      } if (value == this.oldPassword) {
        callback(new Error('密码不能与原密码一致'))
        this.checknew = false
      } else if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
        this.checknew = false
      } else if (value.length > 16) {
        callback(new Error('密码不能多于16位'))
        this.checknew = false
      } else {
        var x = password(value)
        if (x < 3) {
          callback(new Error('密码必须包含大写字母、小写字母、数字、符号，中任意三种的组合'))
          this.checknew = false
        } else {
          value = value.trim()
          this.checknew = true
          callback()
        }
      }
    } // 验证密码
    var checkRepeatNew = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复新密码'))
        this.repeatNew = false
      } else if (value !== this.passwordAbout.newPassword) {
        callback(new Error('两次密码输入不一致'))
        this.repeatNew = false
      } else {
        value = value.trim()
        this.repeatNew = true
        callback()
      }
    } // 验证重复输入密码
    return {
      infoLoading: true,
      loading: false,
      nowSize: 20,
      nowPage: 1,
      passwordAbout: {
        newPassword: '', // 新密码
        repeatNew: '' // 重复新密码
      },
      oldPassword: '', // 原密码
      changepassword: false, // 是否开启修改密码对话框
      isfinish: false, // 修改是否完成
      checknew: false, // 检验新密码
      repeatnew: false, // 检验重复新密码
      rules: {
        newPassword: [
          {validator: checkNewPassword, trigger: 'blur'}
        ],
        repeatNew: [
          {validator: checkRepeatNew, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    newPassword () {
      this.changepassword = true
      this.isfinish = false
      this.passwordAbout = {
        newPassword: '', // 新密码
        repeatNew: '' // 重复新密码
      }
    }, // 唤起对话框
    cancel () {
      this.changepassword = false
      this.$refs[this.passwordAbout].resetFields()
    }, // 重置修改
    postChange () {
      if (this.checknew === true && this.repeatNew === true) {
        this.loading = true
        var data = {
          userId: this.adminInfo.userId,
          password: this.passwordAbout.newPassword
        }
        // console.log(data)
        invoke({
          url: api.changePassword,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.loading = false
            } else {
              this.loading = false
              var data = ret.data.payload
              // console.log(data)
              this.$store.dispatch('getPersonal_info')
              this.isfinish = true
            }
          }
        )
      } else {
        this.$message({
          message: '请完善修改信息',
          type: 'error'
        })
      }
    },
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
.personalcenter .manangeform{background-color: #f5f5f5;}

.personalcenter .copertion-form{background-color: #f5f5f5;padding-left: 1.5%}
.personalcenter .form-header{padding: 1rem 0}

.personalcenter .manangeform span{display: inline-block;width: 25%;padding: 2rem 1.5rem 1.5rem 2rem;}
.personalcenter h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
.personalcenter .right{float: right;margin-bottom: 1rem;padding-right: 2.6rem}
.personalcenter .points{vertical-align: -0.75rem}
.personalcenter .input{width: 20rem;margin-right: 0.4rem;}
.personalcenter .myBtn{}

/**/
.personalcenter .newPassword{margin-left: 0.5rem;color: #20a0ff;display: inline-block;font-size: 1rem;font-weight: normal;cursor: pointer;}
.personalcenter .billTransfer .bottom-btn{text-align: center;}
.personalcenter .billTransfer .distance{margin-right: 10%}
.personalcenter .billTransfer .dialogInput{width: 80%}
.personalcenter .billTransfer .success{text-align: center;margin-bottom: 2rem}
.personalcenter .billTransfer .el-icon-circle-check{color: #00CC00;font-size: 1.5rem;vertical-align: -0.2rem;margin-right: 0.5rem}
.personalcenter .billTransfer .success-content-one{text-align: center;margin-bottom: 2rem;color: #00CC00}
.personalcenter .billTransfer .success-content-two{text-align: center;margin-bottom: 2rem;color: #FF3300}
.personalcenter .billTransfer .passwordinput{max-width: 18rem;}
.personalcenter .billTransfer .isforever{margin-left: 0.2rem}

/*分页器*/
.page {padding-bottom: 2rem;text-align: right;margin-right: 2%;margin-top: 0.5rem}
/**/
.green{color: #00CC00}
.red{color: #FF3300}
/**/
.remark{word-wrap: break-word; word-break: normal;width: 200px}
</style>
