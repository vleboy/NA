<template>
  <div>
    <el-dialog :title="isSaveStatus ? '玩家存点' : '玩家提点'" :visible.sync="isOpenModal" size="tiny">
      <el-form :model="balanceInfo">
        <el-form-item :label="isSaveStatus ? '起始账户' : '转入账户'" label-width="100px" >
          【代理】{{balanceInfo.parentName}}
        </el-form-item>
        <el-form-item :label="isSaveStatus ? '存点数' : '提点数'" label-width="100px">
          <el-input v-model="balanceInfo.points" :placeholder="isSaveStatus ? '请输入存点数' : '请输入提点数'" type="number" class="input"></el-input>
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
        balanceInfo: this.dataProp
      }
    },
    computed:{
      isSaveStatus () {
        return this.dataProp.isSave == 0
      }
    },
    methods:{
      openRechargeModal () {
        this.isOpenModal = true
        this.balanceInfo.remark = ''
        this.balanceInfo.points = ''
      },
      submit () {
        var rex = new RegExp(/^[0-9]*[1-9][0-9]*$/)
        if (!this.isSave && (this.balanceInfo.points > this.balanceInfo.balance)) {
          return this.$message.error('对不起，提点数不能超过当前剩余点数')
        } else if (this.isSave && (!rex.exec(this.balanceInfo.points) || this.balanceInfo.points > 1000000000)) {
          return this.$message.error('存点数范围为1-1000,000,00的正整数')
        } else if (!this.isSave && !rex.exec(this.balanceInfo.points)) {
          return this.$message.error('提点数为正整数')
        } else if (!this.balanceInfo.fromUserId) {
          return this.$message.error('请选择账户')
        }
        if (this.isSending) return
        this.isSending = true
        invoke({
          url: this.isSave ? api.playerDeposit : api.playerTake,
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
              this.$emit('closeModal')
            }
          }
        )
      }
    }
  }
</script>

<style scoped>
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
