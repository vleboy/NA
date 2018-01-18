<template>
  <div class="realLife_modal">
    <el-dialog title="修改玩家洗码比" :visible.sync="isOpenPlayerMix" class="g-text-center">
      <div v-loading.body="dialogLoading" element-loading-text="加载中...">
        <el-table :data="agentList">
          <el-table-column prop="name" label="游戏类别"  align="center"></el-table-column>
          <el-table-column prop="mix" label="玩家洗码比" align="center">
            <template scope="scope">
              <el-tooltip effect="dark" :content="scope.row.playerMixTip" placement="right">
                <el-input type="number" v-model="scope.row.percentage" placeholder="请输入玩家洗码比（必填）"
                          @blur="changeMix(scope.row)"></el-input>
                {{scope.row}}
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenPlayerMix = false">取 消</el-button>
        <el-button type="primary" @click="submitPlayerMix()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { detailTime } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'

  export default {
    name: 'playerWashCodeRatio',
    props:['dataProp'],
    data () {
      return {
        dialogLoading: false,
        isOpenPlayerMix: false,
        agentList: [],
        propInfo: {} // 组件信息
      }
    },
    methods:{
      openPlayerMixModal () {
        this.agentList = []
        this.isOpenPlayerMix = true
        this.getChildrenList()
      },
      getChildrenList () {
        invoke({
          url: api.getChildrenList,
          method: api.post
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            } else {
              this.propInfo = JSON.parse(JSON.stringify(this.dataProp.gameList || []))
              for (let item of ret.data.list) {
                if (item.displayName == this.dataProp.merchantName) {
                  this.agentList = item.gameList
                }
              }
              for (let item of this.agentList) {
                item.playerMixTip = `该玩家游戏洗码比范围为: 0% ~ ${item.mix}%`
                for(let data of this.propInfo){
                  if(item.code == data.code) {
                    item.percentage = data.mix
                    item.isPercentage = true
                  }
                }
              }
            }
          }
        )
      },
      changeMix (row) {
        if (row.percentage < 0 || row.percentage > row.mix){
          this.$message.error(`请输入正确的${row.name}洗码比范围`)
          row.isPercentage = false
        } else {
          row.isPercentage = true
        }
      },
      submitPlayerMix() {
        let isCheck = this.agentList.some(item=>{
          return item.isPercentage == false
        })
        let newGameList = []
        for (let item of this.agentList) {
          newGameList.push({
            mix: item.percentage || '',
            code: item.code,
            name: item.name
          })
        }
        for (let item of newGameList){
          if(item.mix == '') {
            return this.$message.error('请输入正确的玩家洗码比')
          }
        }
        if (isCheck) {
          return this.$message.error('请输入正确的玩家洗码比')
        }
        if(this.dialogLoading) return
        this.dialogLoading = true
        invoke({
          url: api.editPlayerMix,
          method: api.post,
          data: {
            userName: localStorage.playerName,
            gameList: newGameList
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
              this.isOpenPlayerMix = false
              this.$message.success('编辑成功')
              this.$emit('refreshPlayerDetail')
            }
            this.dialogLoading = false
          }
        )
      }
    }
  }
</script>

<style scoped>

  .realLife_modal .record-row {
    padding: 20px;
    padding-left: 50px;
    text-align: left;
  }
  .realLife_modal .-row-left {
    padding-left: 100px;
  }
</style>
