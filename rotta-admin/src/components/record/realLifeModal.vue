<template>
  <div class="realLife_modal">
    <div v-loading.body="dialogLoading" element-loading-text="加载中...">
      <el-row class="record-row">
        <el-col :span="12">游戏名称：{{recordInfo.gameName}}</el-col>
        <el-col :span="12" class="-row-left">投注编号：{{recordInfo.betId}}</el-col>
      </el-row>
      <el-row class="record-row">
        <el-col :span="12">投注时间：{{formatterTime(recordInfo.betTime)}}</el-col>
        <el-col :span="12" class="-row-left">派彩时间：{{formatterTime(recordInfo.settleTime)}}</el-col>
      </el-row>
      <el-row class="record-row">
        <el-col :span="12">会员：{{recordInfo.userName}}</el-col>
        <el-col :span="12" class="-row-left">游戏：{{recordInfo.gameTable}}</el-col>
      </el-row>
      <el-row class="record-row">
        <el-col :span="12" v-if="gameType!='30003'">游戏结果：{{brandResult[recordInfo.bpresult]}}（庄：
            <span v-for="(item,index) in recordInfo.b" :key="index">
              <img style="width: 3%" :src="brandImg[item.m]">:{{brandList[item.n]}},
            </span> 闲：
             <span v-for="(item,index) in recordInfo.p" :key="index">
              <img style="width: 3%" :src="brandImg[item.m]">:{{brandList[item.n]}},
            </span>）
        </el-col>
        <el-col v-else :span="12">
          游戏结果：{{recordInfo.roundResult}}
        </el-col>
        <el-col :span="12" class="-row-left">玩家下注：{{recordInfo.betNum}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'

export default {
  name: 'RealLifeModal',
  props:['dataProp'],
  data () {
    return {
      dialogLoading: false,
      recordInfo: {}, // 获取战绩所有对象
      propInfo: {}, // 组件信息
      gameType: '', // 真人视讯下游戏类别
      winLostState:['取消','输','赢','和'],
      brandImg:{
        'C': 'static/playerBill/brand/C.png',
        'D': 'static/playerBill/brand/D.png',
        'H': 'static/playerBill/brand/H.png',
        'S': 'static/playerBill/brand/S.png'
      },// 牌型
      brandList:{
        '1': 'A',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': 'J',
        '12': 'Q',
        '13': 'k'
      },//牌型点数
      brandResult:{
        '0': '庄',
        '1': '闲',
        '2': '和',
        '3': '庄、庄对',
        '4': '庄、闲对',
        '5': '和、庄对',
        '6': '和、闲对',
        '7': '闲、庄对',
        '8': '闲、闲对',
        '9': '庄、庄对、闲对',
        '10': '和、庄对、闲对',
        '11': '闲、庄对、闲对'
      }//牌型点数
    }
  },
  methods:{
    formatterTime (row) {
      return detailTime(row)
    }, // 格式化创建时间
    getRealLife() {
      if(this.dialogLoading) return
      this.dialogLoading = true
      invoke({
        url: api.playerRecord,
        method: api.post,
        data: {
          userName: localStorage.playerName,
          betId: this.dataProp.businessKey
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
            this.gameType =  res.data.data.gameId
            this.recordInfo = res.data.data.record
            this.recordInfo.roundResult = JSON.parse(res.data.data.record.roundResult)
            this.recordInfo.p = this.recordInfo.roundResult.p
            this.recordInfo.b = this.recordInfo.roundResult.b
            this.recordInfo.bpresult  = this.recordInfo.roundResult.bpresult
          }
          this.dialogLoading = false
        }
      )
    }
  }
}
</script>

<style scoped lang="less">

  .realLife_modal{

    .record-row {
      padding: 20px;
      padding-left: 50px;
      text-align: left;
    }
    .-row-left {
      padding-left: 100px;
    }
  }
</style>
