<template>
  <div class="p-modal-recharge">
    <el-dialog title="玩家限红" :visible.sync="isOpenModal"  @close="sureCloseModal">
      <el-checkbox-group v-model="checkChipList" v-if="chipList.length">
        <el-checkbox v-for="item of chipList" :label="item.id" style="margin-left: 0">
          {{item.text}}
        </el-checkbox>
      </el-checkbox-group>
      <div v-else class="g-text-center">{{!isFetching ? '该代理暂无限红数据!' : '加载中...'}}</div>
      <div class="g-text-right">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submit()">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'

  export default {
    name: 'playerChip',
    props:['dataProp'],
    data () {
      return {
        isOpenModal: false,
        isFetching: false,
        isSending: false,
        checkChipList: [],
        chipList: [],
        balanceInfo: this.dataProp
      }
    },
    methods:{
      getChipList () {
        this.chipList = []
        if(this.isFetching) return
        this.isFetching = true
        invoke({
          url: api.chipList,
          method: api.post,
          data: {
            parentId: this.dataProp.fromUserId
          }
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              for (let item of ret.data.list) {
                this.chipList.push({
                  id: item.id,
                  text:`${item.gameId == 1 ? '百家乐' : '轮盘'}，最大：${item.max}，最小：${item.min}，筹码：${item.jtton}`,
                  value: item
                })
              }
              this.isFetching = false
            }
          }
        )
        this.$store.commit('closeLoading')
      },
      openChipModal () {
        for (let item of this.dataProp.chip) {
          this.checkChipList.push(item.id)
        }
        this.isOpenModal = true
        this.getChipList()
      },
      submit () {
        let storageChipList = []
        let param = {}
        for (let item of this.checkChipList) {
          for (let data of this.chipList) {
            if(item == data.id){
              storageChipList.push(data.value)
            }
          }
        }

        if (this.dataProp.isAgent) {
          param = {
            userId: this.dataProp.userId,
            chip: storageChipList
          }
        } else {
          param = {
            userName: this.dataProp.userName,
            chip: storageChipList
          }
        }
        if (this.isSending) return
        this.isSending = true

        invoke({
          url: this.dataProp.isAgent ? api.updateAgentChip : api.editPlayerChip,
          method: api.post,
          data: param
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
              this.isOpenModal = false
            }
          }
        )
      },
      sureCloseModal () {
        this.isOpenModal = false
        this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>

</style>
