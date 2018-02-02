<template>
 <div class="billTransfer">
    <!-- 解锁/锁定当前线路商或商户 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'list_unlockUser'">
      <el-dialog title="解锁用户" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <div style="text-align:center;margin-bottom:2rem">
              确认解锁该用户吗?
            </div>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="list_unlockUser" :loading='loading'>继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 代理存提点框 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'billtransfer'">
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
              <span>{{parentName}}</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" type="textarea" :rows="6" :maxlength="180" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="postStore" :loading='loading'>继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="提点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-form label-width="100px" label-position="right" v-if="isfinish === false">
              <el-form-item label="提取点数" prop="">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-form-item>
              <el-form-item label="转入账户" prop="">
                  <span>{{parentName}}</span>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input placeholder="注明存点备注,如没有可不填" type="textarea" :maxlength="180" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="bottom-btn" v-if="isfinish === false">
            <el-button @click="cancel" class="distance">取 消</el-button>
            <el-button type="primary" @click="postWithdraw" :loading='loading'>继 续</el-button>
          </div>
          <div v-if="isfinish === true">
            <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
            <div style="text-align:center">
              <el-button type="primary" @click="cancel">确定</el-button>
            </div>
          </div>
      </el-dialog>
    </div>
    
    <!-- 玩家存提点框 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'playertransfer'">
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
              <span>{{parentName}}</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" type="textarea" :rows="6" :maxlength="180" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="playerStore" :loading='loading'>继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="提点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-form label-width="100px" label-position="right" v-if="isfinish === false">
              <el-form-item label="提取点数" prop="">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-form-item>
              <el-form-item label="转入账户" prop="">
                  <span>{{parentName}}</span>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input placeholder="注明存点备注,如没有可不填" type="textarea" :maxlength="180" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="bottom-btn" v-if="isfinish === false">
            <el-button @click="cancel" class="distance">取 消</el-button>
            <el-button type="primary" @click="playerWithdraw" :loading='loading'>继 续</el-button>
          </div>
          <div v-if="isfinish === true">
            <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
            <div style="text-align:center">
              <el-button type="primary" @click="cancel">确定</el-button>
            </div>
          </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.isfinish = false
  },
  computed: {
    storeDialog () {
      return this.$store.state.variable.storeDialog
    }, // 存点框
    withdrawDialog () {
      return this.$store.state.variable.withdrawDialog
    }, // 提点框
    dialog_object () {
      return this.$store.state.variable.dialogObj
    },
    parentName () {
      if (this.$store.state.variable.dialogObj.parentId === '01') {
        return '【代理管理员】' + ' ' + this.$store.state.variable.dialogObj.parentName
      } else {
        return '【代理】' + ' ' + this.$store.state.variable.dialogObj.parentName
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
      loading: false,
      isfinish: false,
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
      contractPeriod: '',
      isforever: false
    }
  },
  methods: {
    changeContractPeriod () {
      if (this.isforever === true) {
        this.contractPeriod = 0
      } else {
        this.contractPeriod = ''
      }
    }, // 永久合同时间
    cancel () {
      this.$store.commit('closeStoreDialog')
      this.$store.commit('closeWithdrawDialog')
      this.$store.commit('resetfinish')
      this.isfinish = false
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
      } // 提点明细
    },
    postStore () {
      this.loading = true
      var data = this.storePoints
      if (this.$store.state.variable.dialogObj.parentId === '01') {
        data.fromUserId = localStorage.loginId
      } else {
        data.fromUserId = this.$store.state.variable.dialogObj.parentId
      }
      if (this.$store.state.variable.dialogObj.userRole === '10000') {
        data.toRole = '10000'
      } else {
        data.toRole = '1000'
      }
      data.toUser = this.$store.state.variable.dialogObj.username
      if (!this.storePoints.amount || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount) === true) {
        // console.log(data)
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
        this.loading = false
      } else {
        var url = ''
        if (this.$store.state.variable.dialogObj.type) {
          url = api.playerDeposit
        } else {
          url = api.billTransfer
        }
        invoke({
          url: url,
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
              // console.log('存点成功返回', data)
              this.loading = false
              this.isfinish = true
              if (this.$store.state.variable.nowIndex == 'comlist') {
                this.$store.dispatch('getComlist')
                this.$store.dispatch('getSelfData')
              } else if (this.$store.state.variable.nowIndex == 'comdetail') {
                this.$store.dispatch('getComdetail_property')
                this.$store.dispatch('getComdetail_child')
                this.$store.dispatch('getDetailPlayer')
              }
            }
          }
        )
      }
    }, // 代理存点
    postWithdraw () {
      this.loading = true
      var data = this.withdrawPoints
      if (this.$store.state.variable.dialogObj.type) {
        data.fromUserId = this.$store.state.variable.dialogObj.parentId
      } else {
        data.fromUserId = this.$store.state.variable.dialogObj.userId
      }
      if (this.$store.state.variable.dialogObj.type) {
        data.toUser = this.$store.state.variable.dialogObj.username
      } else {
        if (this.$store.state.variable.dialogObj.parentId === '01') {
          data.toUser = localStorage.loginUsername
        } else {
          data.toUser = this.$store.state.variable.dialogObj.parentName
        }
      }
      data.toRole = '1000'
      // console.log('1:', data)
      if (!this.withdrawPoints.amount || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount) === true) {
        // console.log(data)
        this.loading = false
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
      } else {
        var url = ''
        if (this.$store.state.variable.dialogObj.type) {
          url = api.playerTake
        } else {
          url = api.billTransfer
        }
        invoke({
          url: url,
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
            } else {
              var data = ret.data.payload
              // console.log('提点成功返回', data)
              this.loading = false
              this.isfinish = true
              if (this.$store.state.variable.nowIndex == 'comlist') {
                this.$store.dispatch('getComlist')
                this.$store.dispatch('getSelfData')
              } else if (this.$store.state.variable.nowIndex == 'comdetail') {
                this.$store.dispatch('getComdetail_property')
                this.$store.dispatch('getComdetail_child')
                this.$store.dispatch('getDetailPlayer')
              }
            }
          }
        )
      }
    }, // 代理提点
    playerStore () {
      this.loading = true
      var data = {
        fromUserId: this.$store.state.variable.dialogObj.fromUserId,
        toUser: this.$store.state.variable.dialogObj.userName,
        amount: this.storePoints.amount,
        remark: this.storePoints.remark
      }
      if (!this.storePoints.amount || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount) === true) {
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
        this.loading = false
      } else {
        invoke({
          url: api.playerDeposit,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.$message.success('提交成功')
              this.loading = false
              this.isfinish = true
              this.$store.dispatch('getAgentPlayer')
              this.$store.dispatch('getSelfData')
            }
          }
        )
      }
    }, // 玩家存点
    playerWithdraw () {
      this.loading = true
      var data = {
        fromUserId: this.$store.state.variable.dialogObj.fromUserId,
        toUser: this.$store.state.variable.dialogObj.userName,
        amount: this.withdrawPoints.amount,
        remark: this.withdrawPoints.remark
      }
      if (!this.withdrawPoints.amount || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount) === true) {
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
        this.loading = false
      } else {
        invoke({
          url: api.playerTake,
          method: api.post,
          data: data
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.$message.success('提交成功')
              this.loading = false
              this.isfinish = true
              this.$store.dispatch('getAgentPlayer')
              this.$store.dispatch('getSelfData')
            }
          }
        )
      }
    }, // 玩家提点
    list_unlockUser () {
      this.loading = true
      var data = {
        role: this.$store.state.variable.dialogObj.role,
        userId: this.$store.state.variable.dialogObj.userId,
        status: 1,
        contractPeriod: 0
      }
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
            this.loading = false
            this.isfinish = true
            this.$store.dispatch('getComlist')
          }
        }
      )
    } // 解锁代理
  }
}
</script>

<style scoped>
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
