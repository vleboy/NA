<template>
  <div class="p-modal-recharge">
    <el-dialog :title="isSaveStatus ? '玩家存点' : '玩家提点'" :visible.sync="isOpenModal" size="tiny">
      <el-form :model="balanceInfo" v-if="!isSuccess">
        <el-form-item :label="isSaveStatus ? '起始账户' : '转入账户'" label-width="100px" >
          {{agentName}}
        </el-form-item>
        <el-form-item :label="isSaveStatus ? '存点数' : '提点数'" label-width="100px">
          <el-tooltip effect="dark" :content="parentPoints" placement="right">
            <el-input v-model="balanceInfo.points" :placeholder="isSaveStatus ? '请输入存点数' : '请输入提点数'" type="number" class="input"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注" label-width="100px" >
          <el-input placeholder="请输入备注" type="textarea" :rows="6" :maxlength="180" class="input"
                    v-model="balanceInfo.remark"></el-input>
        </el-form-item>
        <div class="g-text-right">
          <el-button @click="isOpenModal = false">取 消</el-button>
          <el-button type="primary" :load="isSending" @click="submit()">{{isSending ? '提交中' : '确 定'}}</el-button>
        </div>
      </el-form>
      <div v-else>
        <h3 class="-p-m-tips g-text-center"><i class="el-icon-circle-check -p-green"></i> 操作成功</h3>
        <div>
          <div>
            <span>起始账户：</span>
            <div class="-p-form" style="">
              {{isSaveStatus ? agentName : balanceInfo.userName}} 减少点数：
              <span class="-p-red">{{formatPoints(balanceInfo.points || 0)}}</span>,
              当前剩余点数：{{formatPoints(isSaveStatus ? agentPoints-balanceInfo.points : balanceInfo.balance-balanceInfo.points)}}
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>转入账户：</span>
            <div class="-p-form">
              {{isSaveStatus ? balanceInfo.userName : agentName}} 增加点数：
              <span class="-p-green">{{formatPoints(balanceInfo.points || 0)}}</span>,
              当前点数：{{formatPoints(isSaveStatus ? balanceInfo.balance+Number(balanceInfo.points) : agentPoints+Number(balanceInfo.points))}}
            </div>

          </div>
        </div>
        <div class="g-text-center">
          <el-button type="primary" @click="sureCloseModal()">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { detailTime, thousandFormatter } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'

  export default {
    name: 'playerRecharge',
    props:['dataProp'],
    data () {
      return {
        isOpenModal: false,
        isSending: false,
        isSuccess: false,
        balanceInfo: this.dataProp,
        agentPoints: ''
      }
    },
    computed:{
      isSaveStatus () {
        return this.dataProp.isSave == 0
      },
      agentName () {
        return `【代理】${this.dataProp.parentName}`
      },
      parentPoints () {
        return `上级代理可分配点数为:${this.agentPoints || 0}`
      }
    },
    methods:{
      getList() {
        invoke({
          url: api.getAgentPoint,
          method: api.post,
          data: {
            userId: this.balanceInfo.fromUserId
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.agentPoints = res.data.points
            }
          }
        )
      },
      openRechargeModal () {
        this.isSuccess = false
        this.isOpenModal = true
        this.balanceInfo.remark = ''
        this.balanceInfo.points = ''
        this.getList()
      },
      submit () {
        var rex = new RegExp(/^[0-9]*[1-9][0-9]*$/)
        if (this.isSave && (!rex.exec(this.balanceInfo.points) || this.balanceInfo.points > 1000000000)) {
          return this.$message.error('存点数范围为1-1000,000,00的正整数')
        } else if (!this.isSave && !rex.exec(this.balanceInfo.points)) {
          return this.$message.error('提点数为正整数')
        } else if (!this.balanceInfo.fromUserId) {
          return this.$message.error('请选择账户')
        }
        if (this.isSending) return
        this.isSending = true
        invoke({
          url: this.isSaveStatus ? api.playerDeposit : api.playerTake,
          method: api.post,
          data: {
            fromUserId: this.balanceInfo.fromUserId,
            toUser: this.balanceInfo.userName,
            amount: this.balanceInfo.points,
            remark: this.balanceInfo.remark
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
              this.isSending = false
            } else {
              this.$message.success('提交成功')
              this.isSending = false
              this.isSuccess = true
            }
          }
        )
      },
      sureCloseModal () {
        this.isOpenModal = false
        this.$emit('closeModal')
      },
      formatPoints (num) {
        return thousandFormatter(num)
      } // 千位符格式化
    }
  }
</script>

<style scoped>
  .p-modal-recharge .-p-m-tips{margin-bottom: 20px}
  .p-modal-recharge .-p-form{padding-left: 80px;display: inline-block; position: relative;  top: -20px;}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
