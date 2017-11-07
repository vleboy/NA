<template>
  <div class="billTransfer">
    <!-- 加点框 -->
      <el-dialog title="加点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="增加点数">
                <el-tooltip class="item" effect="dark" :content="storeBills" placement="top">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount" :disabled="storePoints.fromUserId==''"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
                <el-select placeholder="请选择" class="dialogInput" v-model="storePoints.fromUserId">
                  <el-option :value="adminId" :label="adminName"></el-option>
                  <el-option :value="parentId" :label="parentName" v-if="hasParent"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="增加账户" prop="">
                <span>{{nowUser}}</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明加点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="postStore" :loading="loading">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <p class="success">
            起始账户: <span>{{successBack.fromDisplayName}}</span> <span class="red"> 减少点数: {{storePoints.amount}} </span>
          </p>
          <p class="success">
            转入账户: <span>{{successBack.toDisplayName}}</span> <span class="green"> 增加点数: {{storePoints.amount}} </span>
          </p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>
    

    <!-- 减点框 -->
      <el-dialog title="减点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="减少点数" prop="">
              <el-tooltip class="item" effect="dark" :content="withdrawBills" placement="top">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount" :disabled="withdrawPoints.toUser==''"></el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
              <span>{{nowUser}}</span>
            </el-form-item>
            <el-form-item label="转入账户" prop="">
                <el-select placeholder="请选择" class="dialogInput" v-model="withdrawPoints.toUser">
                  <el-option :value="logValue" :label="adminName"></el-option>
                  <el-option :value="parentValue" :label="parentName" v-if="hasParent"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明加点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="postWithdraw" :loading="loading">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <p class="success">
            起始账户: <span>{{successBack.fromDisplayName}} </span> <span class="red"> 减少点数: {{withdrawPoints.amount}} </span>
          </p>
          <p class="success">
            转入账户: <span>{{successBack.toDisplayName}} </span> <span class="green"> 增加点数: {{withdrawPoints.amount}} </span>
          </p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>

    <!-- 解锁框 -->
      <el-dialog title="解锁用户" :visible.sync="unlockDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="生效时间" style="margin-left:10%">
              <el-date-picker v-model="contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="isforever" :picker-options="pickerOptions"></el-date-picker><el-checkbox v-model="isforever" class="isforever" @change="changeContractPeriod">永久</el-checkbox>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="unlockUser">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
  },
  computed: {
    storeDialog () {
      if (this.$store.state.variable.pointsIndex == 'store') {
        return true
      } else {
        return false
      }
    }, // 唤起加点框
    withdrawDialog () {
      if (this.$store.state.variable.pointsIndex == 'withdraw') {
        return true
      } else {
        return false
      }
    }, // 唤起减点框
    unlockDialog () {
      if (this.$store.state.variable.pointsIndex == 'unlock') {
        return true
      } else {
        return false
      }
    }, // 唤起解锁框
    nowUser () {
      var data = this.$store.state.variable.nowUser || ''
      if (data.role == '1') {
        if (data.username.indexOf('_') != -1) {
          return '【管理员】' + data.username.split('_')[1]
        } else {
          return '【管理员】' + data.username
        }
      } else if (data.role == '10') {
        if (data.username.indexOf('_') != -1) {
          return '【线路商】' + data.username.split('_')[1]
        } else {
          return '【线路商】' + data.username
        }
      } else if (data.role == '100') {
        if (data.username.indexOf('_') != -1) {
          return '【商户】' + data.username.split('_')[1]
        } else {
          return '【商户】' + data.username
        }
      }
    }, // 加减点的起始账户
    adminId () {
      return localStorage.loginId
    }, // 当前登录管理员ID
    adminName () {
      var name = localStorage.loginUsername || ''
      if (name.indexOf('_') != -1) {
        name = name.split('_')[1]
        return '【管理员】' + name
      } else {
        return '【管理员】' + name
      }
    }, // 当前登录管理员用户名
    parentId () {
      return this.$store.state.variable.nowUser.parentId
    }, // 加减点用户上级ID
    parentName () {
      var name = this.$store.state.variable.nowUser.parentDisplayName || ''
      if (name.indexOf('_') != -1) {
        name = name.split('_')[1]
        return '【线路商】' + name
      } else {
        return '【线路商】' + name
      }
    }, // 加减点用户上级昵称
    hasParent () {
      var data = this.$store.state.variable.nowUser || ''
      if (data.parentId != '01') {
        return true
      } else if (data.parentId == '01') {
        return false
      }
    }, // 是否加在上级
    storeBills () {
      if (!this.storePoints.fromUserId) {
        return '请选择起始账户'
      } else {
        return '起始账户余额为' + this.countBills
      }
    }, // 加点起始账户余额
    withdrawBills () {
      if (!this.withdrawPoints.toUser) {
        return '请选择转入账户'
      } else {
        return '起始账户余额为' + this.countBills
      }
    }, // 减点起始账户余额
    logValue () {
      var name = localStorage.loginUsername || ''
      return name
    }, // 减点时默认的下拉框值
    parentValue () {
      var name = this.$store.state.variable.nowUser.parentName || ''
      return name
    } // 减点时上级的下拉框值
  },
  watch: {
    'storePoints.fromUserId' (val) {
      if (val) {
        invoke({
          url: api.bills + '/' + val,
          method: api.get
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload.balance
              this.countBills = data
            }
          }
        )
      }
    },
    'withdrawPoints.toUser' (val) {
      if (val) {
        var id = this.$store.state.variable.nowUser.userId
        invoke({
          url: api.bills + '/' + id,
          method: api.get
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var data = ret.data.payload.balance
              this.countBills = data
            }
          }
        )
      }
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      countBills: 0, // 加减点起始账户余额
      isfinish: false, // 加减点是否完成
      loading: false, // 加载动画
      storePoints: {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      }, // 加点明细
      withdrawPoints: {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      }, // 减点明细
      successBack: '', // 加减点成功后返回的数据
      contractPeriod: '', // 生效时间
      isforever: false // 是否永久
    }
  },
  methods: {
    cancel () {
      this.$store.commit({
        type: 'getpointsIndex',
        data: ''
      })
      this.isfinish = false
      this.loading = false
      this.storePoints = {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      } // 加点明细
      this.withdrawPoints = {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      } // 减点明细
      this.successBack = ''
      this.isforever = false
      this.contractPeriod = ''
    }, // 关闭加减点框
    postStore () {
      this.loading = true
      var data = this.storePoints
      data.toRole = this.$store.state.variable.nowUser.role
      data.toUser = this.$store.state.variable.nowUser.username
      if (!this.storePoints.fromUserId || !this.storePoints.amount || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount)) {
        // console.log('加点错误时显示数据', data)
        this.$message({
          message: '请完善加点信息',
          type: 'error'
        })
        this.loading = false
      } else {
        invoke({
          url: api.billTransfer,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'warning'
              })
              this.loading = false
            } else {
              var data = ret.data.payload
              this.successBack = data
              if (this.$store.state.variable.nowIndex == 'outlist') {
                this.$store.dispatch('getOutlist')
              } else if (this.$store.state.variable.nowIndex == 'comlist') {
                this.$store.dispatch('getComlist')
              } else if (this.$store.state.variable.nowIndex == 'outdetail') {
                this.$store.dispatch('getOutdetail_property')
                this.$store.dispatch('getOutdetail_child_managers')
                this.$store.dispatch('getOutdetail_child_merchants')
              } else if (this.$store.state.variable.nowIndex == 'comdetail') {
                this.$store.dispatch('getComdetail_property')
              }
              this.loading = false
              this.isfinish = true
            }
          }
        )
      }
    }, // 发送加点信息
    postWithdraw () {
      this.loading = true
      var data = this.withdrawPoints
      data.fromUserId = this.$store.state.variable.nowUser.userId
      data.toRole = ''
      if (data.toUser == localStorage.loginUsername) {
        data.toRole = '1'
      } else {
        data.toRole = '10'
      }
      if (!this.withdrawPoints.toUser || !this.withdrawPoints.amount || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount)) {
        // console.log('减点错误时显示数据', data)
        this.$message({
          message: '请完善加点信息',
          type: 'error'
        })
        this.loading = false
      } else {
        invoke({
          url: api.billTransfer,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'warning'
              })
              this.loading = false
            } else {
              var data = ret.data.payload
              this.successBack = data
              if (this.$store.state.variable.nowIndex == 'outlist') {
                this.$store.dispatch('getOutlist')
              } else if (this.$store.state.variable.nowIndex == 'comlist') {
                this.$store.dispatch('getComlist')
              } else if (this.$store.state.variable.nowIndex == 'outdetail') {
                this.$store.dispatch('getOutdetail_property')
                this.$store.dispatch('getOutdetail_child_managers')
                this.$store.dispatch('getOutdetail_child_merchants')
              } else if (this.$store.state.variable.nowIndex == 'comdetail') {
                this.$store.dispatch('getComdetail_property')
              }
              this.loading = false
              this.isfinish = true
            }
          }
        )
      }
    }, // 发送减点信息
    changeContractPeriod () {
      if (this.isforever === true) {
        this.contractPeriod = 0
      } else {
        this.contractPeriod = ''
      }
    }, // 永久合同时间
    unlockUser () {
      var data = {
        role: this.$store.state.variable.nowUser.role,
        userId: this.$store.state.variable.nowUser.userId,
        status: 1,
        contractPeriod: this.contractPeriod
      }
      // console.log(data)
      if (this.contractPeriod === undefined || this.contractPeriod === '' || this.contractPeriod[0] === null || this.contractPeriod[1] === null) {
        this.$message({
          message: '请选择生效时间',
          type: 'error'
        })
      } else {
        invoke({
          url: api.userStatus,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              var data = ret.data.payload
              // console.log(data)
              this.$message({
                message: '解锁成功',
                type: 'success'
              })
              this.isfinish = true
              if (this.$store.state.variable.nowIndex === 'outlist') {
                this.$store.dispatch('getOutlist')
              } else if (this.$store.state.variable.nowIndex === 'comlist') {
                this.$store.dispatch('getComlist')
              }
            }
          }
        )
      }
    } // 解锁商户或线路商
  }
}
</script>

<style scoped>
.green{color: #00CC00}
.red{color: #FF3300}
.billTransfer .bottom-btn{text-align: center;}
.billTransfer .distance{margin-right: 10%}
.billTransfer .dialogInput{width: 80%}
.billTransfer .success{text-align: center;margin-bottom: 2rem}
.billTransfer .el-icon-circle-check{color: #00CC00;font-size: 1.5rem;vertical-align: -0.2rem;margin-right: 0.5rem}
.billTransfer .success-content-one{text-align: center;margin-bottom: 2rem;color: #00CC00}
.billTransfer .success-content-two{text-align: center;margin-bottom: 2rem;color: #FF3300}
.billTransfer .input{max-width: 17.5rem;}
.billTransfer .isforever{margin-left: 0.2rem}
</style>
