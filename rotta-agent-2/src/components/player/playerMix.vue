<template>
  <div class="p-modal-recharge">
    <el-dialog title="新增洗码比" :visible.sync="isOpenModal"  @close="sureCloseModal" size="tiny">
      <el-table stripe :data="gameList">
        <el-table-column prop="name" label="游戏类别" align="center">
        </el-table-column>
        <el-table-column label="玩家洗码比（%）"  align="center">
          <template scope="scope">
            <el-tooltip effect="dark" :content="scope.row.playerMix" placement="right">
              <el-input type="number" v-model="scope.row.percentage" placeholder="请输入玩家洗码比（必填）" :disabled="scope.row.isDisabled"
                        @blur="changeMix(scope.row)"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="g-text-right" style="margin-top: 20px" v-if="isEdit">
        <el-button @click="isOpenModal = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submit()">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
      <div class="g-text-right" style="margin-top: 20px" v-else>
        注： 玩家洗码比只能新增，不能编辑和修改
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  import { pattern } from '@/behavior/regexp'
  import api from '@/api/api'

  export default {
    name: 'playerMix',
    props:['dataMix'],
    data () {
      return {
        isOpenModal: false,
        isFetching: false,
        isSending: false,
        isEdit: false,
        checkChipList: [],
        mixList: [],
        gameList: []
      }
    },
    methods:{
      getAgentPlayerMix () {
        this.mixList = []
        if(this.isFetching) return
        this.isFetching = true
        invoke({
          url: api.getAgentPlayerMix,
          method: api.post,
          data: {
            parentId: this.dataMix.parent
          }
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              this.gameList = ret.data.data.gameList
              this.isEdit = this.dataMix.gameList.length != this.gameList.length
              for (let list of this.dataMix.gameList) {
                for (let item of this.gameList) {
                  if (list.code == item.code) {
                    item.percentage = list.mix
                    item.isDisabled = true
                  }
                  item.playerMix = `该玩家游戏洗码比范围为0~${item.mix}`
                }
              }

              this.isFetching = false
            }
          }
        )
        this.$store.commit('closeLoading')
      },
      openChipModal () {
        this.isOpenModal = true
        this.getAgentPlayerMix()
      },
      submit () {
        let isCheck = this.gameList.some(item=>{
          return item.isPercentage == false
        })

        let newGameList = []

        for (let item of this.gameList) {
          newGameList.push({
            mix: item.percentage,
            code: item.code,
            name: item.name
          })
        }

        if (isCheck) {
          return this.$message.error('请输入正确的玩家洗码比')
        }

        if (this.isSending) return
        this.isSending = true

        invoke({
          url: api.editPlayerMix,
          method: api.post,
          data: {
            userName: this.dataMix.userName,
            gameList: newGameList
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.isSending = false
            } else {
              this.$message.success('提交成功')
              this.isSending = false
              this.isOpenModal = false
              this.$emit('getPlayerDetail')
            }
          }
        )
      },
      sureCloseModal () {
        this.isOpenModal = false
      },
      changeMix (row) {
        if (row.percentage > row.mix || !pattern.positive.exec(row.percentage)){
          this.$message.error(`请输入正确的${row.name}洗码比范围(最多保留2位小数)`)
          row.isPercentage = false
        } else {
          row.isPercentage = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
