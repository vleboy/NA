<template>
  <div class="billTransfer">
    <!-- 操纵当前线路商 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'outdetail_pro'">
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
                <el-select placeholder="请选择" class="dialogInput" v-model="storePoints.fromUserId">
                  <el-option value="" :label="optionOne_label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="pro_postStore">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <!-- <p class="success-content-one"><span v-text="this.$store.state.variable.outdetaildata.username.split('_')[1]"></span> ===> + <span v-text="storePoints.amount"></span></p> -->
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
        
      </el-dialog>

      <el-dialog title="提点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-form label-width="100px" label-position="right" v-if="isfinish === false">
              <el-form-item label="提提点数" prop="">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-form-item>
              <el-form-item label="转入账户" prop="">
                  <el-select placeholder="请选择" class="dialogInput" v-model="withdrawPoints.toUser">
                    <el-option value="" :label="optionOne_label"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="bottom-btn" v-if="isfinish === false">
            <el-button @click="cancel" class="distance">取 消</el-button>
            <el-button type="primary" @click="pro_postWithdraw">继 续</el-button>
          </div>
          <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <!-- <p class="success-content-two"><span v-text="this.$store.state.variable.outdetaildata.username.split('_')[1]">  </span> ===> - <span v-text="withdrawPoints.amount"></span></p> -->
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    
    <!-- 操纵下级线路商或商户 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'outdetail_damn'">
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
                <el-select placeholder="请选择" class="dialogInput" v-model="storePoints.fromUserId">
                  <el-option value="" :label="optionOne_label"></el-option>
                  <el-option :value="childData.parent" :label="parentName" v-if="childData.parent !== '01'"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="damn_postStore">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <!-- <p class="success-content-one"><span v-text="childData.username">  </span> ===> + <span v-text="storePoints.amount"></span></p> -->
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
        
      </el-dialog>

      <el-dialog title="提点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-form label-width="100px" label-position="right" v-if="isfinish === false">
              <el-form-item label="提提点数" prop="">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-form-item>
              <el-form-item label="转入账户" prop="">
                  <el-select placeholder="请选择" class="dialogInput" v-model="withdrawPoints.toUser">
                    <el-option value="" :label="optionOne_label"></el-option>
                    <el-option :value="childData.parentName" :label="parentName" v-if="childData.parent !== '01'"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="bottom-btn" v-if="isfinish === false">
            <el-button @click="cancel" class="distance">取 消</el-button>
            <el-button type="primary" @click="damn_postWithdraw">继 续</el-button>
          </div>
          <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <!-- <p class="success-content-two"><span v-text="childData.username">  </span> ===> - <span v-text="withdrawPoints.amount"></span></p> -->
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 操纵当前商户 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'comdetail_pro'">
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
                <el-select placeholder="请选择" class="dialogInput" v-model="storePoints.fromUserId">
                  <el-option value="" :label="optionOne_label"></el-option>
                  <el-option :value="this.$store.state.variable.comdetaildata.parent" :label="comparent" v-if="this.$store.state.variable.comdetaildata.parent !== '01'"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="com_postStore">继 续</el-button>
        </div>
        <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <!-- <p class="success-content-one"><span v-text="this.$store.state.variable.comdetaildata.username.split('_')[1]">  </span> ===> + <span v-text="storePoints.amount"></span></p> -->
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
        
      </el-dialog>

      <el-dialog title="提点操作" :visible.sync="withdrawDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-form label-width="100px" label-position="right" v-if="isfinish === false">
              <el-form-item label="提提点数" prop="">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-form-item>
              <el-form-item label="转入账户" prop="">
                  <el-select placeholder="请选择" class="dialogInput" v-model="withdrawPoints.toUser">
                    <el-option value="" :label="optionOne_label"></el-option>
                     <el-option :value="this.$store.state.variable.comdetaildata.parentName" :label="comparent" v-if="this.$store.state.variable.comdetaildata.parent !== '01'"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="bottom-btn" v-if="isfinish === false">
            <el-button @click="cancel" class="distance">取 消</el-button>
            <el-button type="primary" @click="com_postWithdraw">继 续</el-button>
          </div>
          <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <!-- <p class="success-content-two"><span v-text="this.$store.state.variable.comdetaildata.username.split('_')[1]">  </span> ===> - <span v-text="withdrawPoints.amount"></span></p> -->
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 操作列表当前商户或线路商-->
    <div v-if="this.$store.state.variable.pointsIndex === 'list_transfer'">
      <el-dialog title="存点操作" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="存入点数">
                <el-input placeholder="请输入点数" class="dialogInput" v-model="storePoints.amount"></el-input>
            </el-form-item>
            <el-form-item label="起始账户" prop="">
                <el-select placeholder="请选择" class="dialogInput" v-model="storePoints.fromUserId">
                  <el-option value="" :label="optionOne_label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="storePoints.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="list_storePoints">继 续</el-button>
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
              <el-form-item label="提提点数" prop="">
                  <el-input placeholder="请输入点数" class="dialogInput" v-model="withdrawPoints.amount"></el-input>
              </el-form-item>
              <el-form-item label="转入账户" prop="">
                  <el-select placeholder="请选择" class="dialogInput" v-model="withdrawPoints.toUser">
                    <el-option value="" :label="optionOne_label"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input placeholder="注明存点备注,如没有可不填" :maxlength="180" type="textarea" :rows="6" class="dialogInput" v-model="withdrawPoints.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="bottom-btn" v-if="isfinish === false">
            <el-button @click="cancel" class="distance">取 消</el-button>
            <el-button type="primary" @click="list_withdrawPoint">继 续</el-button>
          </div>
          <div v-if="isfinish === true">
          <p class="success"><i class="el-icon-circle-check"></i>操作成功</p>
          <div style="text-align:center">
            <el-button type="primary" @click="cancel">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 解锁/锁定当前线路商或商户 -->
    <div v-if="this.$store.state.variable.pointsIndex === 'list_unlockUser'">
      <el-dialog title="解锁用户" :visible.sync="storeDialog" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form label-width="100px" label-position="right" v-if="isfinish === false">
            <el-form-item label="生效时间" style="margin-left:10%">
              <el-date-picker v-model="contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false' :disabled="isforever" :picker-options="pickerOptions"></el-date-picker><el-checkbox v-model="isforever" class="isforever" @change="changeContractPeriod">永久</el-checkbox>
            </el-form-item>
        </el-form>
        <div class="bottom-btn" v-if="isfinish === false">
          <el-button @click="cancel" class="distance">取 消</el-button>
          <el-button type="primary" @click="list_unlockUser">继 续</el-button>
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
  computed: {
    storeDialog () {
      return this.$store.state.variable.storeDialog
    }, // 存点框
    withdrawDialog () {
      return this.$store.state.variable.withdrawDialog
    }, // 提点框
    childData () {
      return this.$store.state.variable.pointsObject
    }, // 对其下级商户或线路商存提点的用户数据
    optionOne_label () {
      var name = localStorage.loginUsername.split('_')[1]
      var x = ''
      if (localStorage.loginUsername.split('_')[0] === 'Platform') {
        x = '【平台管理员】'
      } else {
        x = localStorage.loginUsername.split('_')[0]
      }
      return x + ' ' + name
    }, // 管理员姓名
    parentName () {
      var x = this.childData.parentName
      x = '【' + x.split('_')[0] + '】' + ' ' + x.split('_')[1]
      return x
    },
    comparent () {
      var y = this.$store.state.variable.comdetaildata.parentName
      y = '【' + y.split('_')[0] + '】' + ' ' + y.split('_')[1]
      return y
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
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
    pro_postStore () {
      var data = this.storePoints
      data.toRole = this.$store.state.variable.outdetaildata.role
      data.fromUserId = localStorage.loginId
      data.toUser = this.$store.state.variable.outdetaildata.username
      if (this.storePoints.fromUserId === '' || this.storePoints.amount === '' || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount) === true) {
        // 
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              // 
              this.isfinish = true
              this.$store.dispatch('getOutdetail_property')
            }
          }
        )
      }
    }, // 发送管理员对该详情页线路商存点信息
    pro_postWithdraw () {
      var data = this.withdrawPoints
      data.toRole = localStorage.loginRole
      data.fromUserId = this.$store.state.variable.outdetaildata.userId
      data.toUser = localStorage.loginUsername
      if (this.withdrawPoints.fromUserId === '' || this.withdrawPoints.amount === '' || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount) === true) {
        // 
        this.$message({
          message: '请完善提点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              
              this.isfinish = true
              this.$store.dispatch('getOutdetail_property')
            }
          }
        )
      }
    }, // 发送管理员对该详情页线路商提点信息
    damn_postStore () {
      var data = this.storePoints
      data.toRole = this.childData.role
      if (!this.storePoints.fromUserId) {
        data.fromUserId = localStorage.loginId
      }
      data.toUser = this.childData.username
      if (this.storePoints.fromUserId === '' || this.storePoints.amount === '' || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount) === true) {
        // 
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              // 
              this.isfinish = true
              this.$store.dispatch('getOutdetail_child_merchants')
              this.$store.dispatch('getOutdetail_child_managers')
              this.$store.dispatch('getOutdetail_property')
            }
          }
        )
      }
    }, // 发送管理员或其所属线路商对其下级线路商或商户存点信息
    damn_postWithdraw () {
      var data = this.withdrawPoints
      data.fromUserId = this.childData.userId
      if (!this.withdrawPoints.toUser) {
        data.toUser = localStorage.loginUsername
        data.toRole = localStorage.loginRole
      } else {
        data.toUser = this.childData.parentName
        if (this.childData.parent === '01') {
          data.toRole = '1'
        } else {
          data.toRole = '10'
        }
      }
      if (this.withdrawPoints.fromUserId === '' || this.withdrawPoints.amount === '' || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount) === true) {
        // 
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
      } else {
        // 
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
            } else {
              var data = ret.data.payload
              // 
              this.isfinish = true
              this.$store.dispatch('getOutdetail_child_merchants')
              this.$store.dispatch('getOutdetail_child_managers')
              this.$store.dispatch('getOutdetail_property')
            }
          }
        )
      }
    }, // 发送管理员或其所属线路商对其下级线路商或商户提点信息
    com_postStore () {
      var data = this.storePoints
      data.toRole = this.$store.state.variable.comdetaildata.role
      if (!data.fromUserId) {
        data.fromUserId = localStorage.loginId
      }
      data.toUser = this.$store.state.variable.comdetaildata.username
      if (this.storePoints.fromUserId === '' || this.storePoints.amount === '' || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount) === true) {
        // 
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              // 
              this.isfinish = true
              this.$store.dispatch('getComdetail_property')
            }
          }
        )
      }
    }, // 发送管理员或其所属线路商对其下级商户存点信息
    com_postWithdraw () {
      var data = this.withdrawPoints
      data.fromUserId = this.$store.state.variable.comdetaildata.userId
      if (!data.toUser) {
        data.toUser = localStorage.loginUsername
        data.toRole = localStorage.loginRole
      } else {
        data.toUser = this.$store.state.variable.comdetaildata.parentName
        data.toRole = '10'
      }
      // 
      if (this.withdrawPoints.fromUserId === '' || this.withdrawPoints.amount === '' || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount) === true) {
        // 
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              
              this.isfinish = true
              this.$store.dispatch('getComdetail_property')
            }
          }
        )
      }
    }, // 发送管理员或其所属线路商对其下级商户提点信息
    list_storePoints () {
      var data = this.storePoints
      data.toRole = this.$store.state.variable.nowUser.role
      data.fromUserId = localStorage.loginId
      data.toUser = this.$store.state.variable.nowUser.username
      if (this.storePoints.fromUserId === '' || this.storePoints.amount === '' || Number(this.storePoints.amount) < 0 || isNaN(this.storePoints.amount) === true) {
        // 
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              
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
    }, // 在列表中对线路商或商户存点
    list_withdrawPoint () {
      var data = this.withdrawPoints
      data.fromUserId = this.$store.state.variable.nowUser.userId
      data.toUser = localStorage.loginUsername
      data.toRole = localStorage.loginRole
      if (this.withdrawPoints.fromUserId === '' || this.withdrawPoints.amount === '' || Number(this.withdrawPoints.amount) < 0 || isNaN(this.withdrawPoints.amount) === true) {
        
        this.$message({
          message: '请完善存点信息',
          type: 'error'
        })
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
            } else {
              var data = ret.data.payload
              
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
    }, // 在列表中对线路商或商户提点
    list_unlockUser () {
      var data = {
        role: this.$store.state.variable.nowUser.role,
        userId: this.$store.state.variable.nowUser.userId,
        status: 1,
        contractPeriod: this.contractPeriod
      }
      // 
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
