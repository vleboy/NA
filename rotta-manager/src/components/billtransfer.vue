<template>
  <div class="billTransfer">
    <!-- 存点框 -->
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-tooltip class="item" effect="dark" :content="storeBills" placement="top">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
                <span>{{parentName}}</span>
            </el-form-item>
            <el-form-item label="存入账户" prop="">
                <span>{{nowUser}}</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="storePoints.remark"></el-input>
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
    

    <!-- 提点框 -->
      <el-dialog title="提点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="提取点数" prop="">
              <el-tooltip class="item" effect="dark" :content="withdrawBills" placement="top">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
              <span>{{nowUser}}</span>
            </el-form-item>
            <el-form-item label="转入账户" prop="">
                <span>{{parentName}}</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
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
    }, // 唤起存点框
    withdrawDialog () {
      if (this.$store.state.variable.pointsIndex == 'withdraw') {
        return true
      } else {
        return false
      }
    }, // 唤起提点框
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
    }, // 存提点的起始账户
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
    }, // 存提点用户上级ID
    parentName () {
      var name = this.$store.state.variable.nowUser.parentName || ''
      if (name.indexOf('_') != -1) {
        name = name.split('_')[1]
        return '【线路商】' + name
      } else {
        return '【线路商】' + name
      }
    }, // 存提点用户上级昵称
    storeBills () {
      if (this.storeDialog) {
        invoke({
          url: api.bills + '/' + localStorage.loginId,
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
        return '起始账户余额为' + this.countBills
      }
    }, // 存点起始账户余额
    withdrawBills () {
      if (this.withdrawDialog) {
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
        return '起始账户余额为' + this.countBills
      }
    } // 提点起始账户余额
  },
  data () {
    return {
      countBills: 0, // 存提点起始账户余额
      isfinish: false, // 存提点是否完成
      loading: false, // 加载动画
      storePoints: {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      }, // 存点明细
      withdrawPoints: {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      }, // 提点明细
      successBack: '' // 存提点成功后返回的数据
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
      } // 存点明细
      this.withdrawPoints = {
        fromUserId: '',
        toRole: '',
        toUser: '',
        amount: '',
        remark: ''
      }, // 提点明细
      this.successBack = ''
    }, // 关闭存提点框
    postStore () {
      this.loading = true
      var data = this.storePoints
      data.toRole = this.$store.state.variable.nowUser.role
      data.toUser = this.$store.state.variable.nowUser.username
      if (!this.storePoints.fromUserId || !this.storePoints.amount || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount)) {
        // console.log('存点错误时显示数据', data)
        this.$message({
          message: '请完善存点信息',
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
    }, // 发送存点信息
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
        // console.log('提点错误时显示数据', data)
        this.$message({
          message: '请完善存点信息',
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
    } // 发送提点信息
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
