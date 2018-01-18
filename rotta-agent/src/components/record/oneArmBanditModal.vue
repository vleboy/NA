<template>
  <div class="oneArm_modal">
    <div class="record-bg" :class="recordBackgroundUrl">
      <div class="record-content" :class="recordClassContent">
        <div v-for="(data,index) in recordArray" :key="index" class="record-wrap"
             :class="recordClassWrap">
          <div v-for="(item,indexChild) in data" :key="indexChild" class="record-low"
               :class="{'tlzm-low':gameType=='40001', 'sfss-low':gameType=='40004','xlxr-low':gameType=='40003','fyht-low':gameType=='40006','csjb-low':gameType=='40005','no-win':!item.isWin}">
            <img :src="`../../../static/playerBill/${gameTypeFile[gameType]}/${item.value}.png`" class="record-icon"
                 :class="recordClassIcon">
          </div>
        </div>
      </div>
    </div>
    <div class="record-footer" v-if='recordArray.length'>
      <el-col :span="8">
        余额：&ensp;{{itemRecord.userBalance|currency}}
      </el-col>
      <el-col :span="8">
        赢得：&ensp;{{itemRecord.totalGold|currency}}
      </el-col>
      <el-col :span="8">
        总赌注：&ensp;{{(itemRecord.bet||mode)|currency}}
      </el-col>
    </div>
    <div v-else class="no-record">战绩截图同步中，请稍后在查看</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailTime } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'

export default {
  name: 'OneArmBanditModal',
  props:['dataProp'],
  data () {
    return {
      dialogLoading: false,
      propInfo: {}, // 组件信息
      gameType: '', // 真人视讯下游戏类别
      itemRecord: {}, //单个信息
      finalRecord: [], //循环列表需要的战绩数组（最终版）
      playerRecordList: [], //战绩信息
      recordArray: [], //战绩二维数组
      winCard: [], //战绩二维数组
      gameTypeFile: {
        '40001': 'tlzm',
        '40002': 'xcl',
        '40003': 'xlxr',
        '40004': 'sfss',
        '40005': 'csjb',
        '40006': 'fyht'
      }
    }
  },
  computed: {
    // 罗塔之谜 40001
    // 小厨娘   40002
    // 祥龙献瑞 40003
    // 四方神兽 40004
    // 财神进宝 40005
    // 福运亨通 40006
    recordBackgroundUrl () {
      let classType = {}
      classType = {
        'record-tlzm': this.gameType=='40001',
        'record-xcl': this.gameType=='40002',
        'record-xlxr': this.gameType=='40003',
        'record-sfss': this.gameType=='40004',
        'record-csjb': this.gameType=='40005',
        'record-fyht': this.gameType=='40006'
      }
      return classType
    },
    recordClassContent () {
      let classContent = {}
      classContent = {
        'tlzm': this.gameType=='40001',
        'xlxr': this.gameType=='40003',
        'sfss': this.gameType=='40004',
        'csjb': this.gameType=='40005',
        'fyht': this.gameType=='40006'
      }
      return classContent
    },
    recordClassWrap () {
      let classWrap = {}
      classWrap = {
        'tlzm-wrap': this.gameType=='40001',
        'xlxr-wrap': this.gameType=='40003',
        'sfss-wrap': this.gameType=='40004',
        'csjb-wrap': this.gameType=='40005',
        'fyht-wrap': this.gameType=='40006'
      }
      return classWrap
    },
    recordClassIcon () {
      let classIcon = {}
      classIcon = {
        'tlzm-icon': this.gameType=='40001',
        'xlxr-icon': this.gameType=='40003',
        'sfss-icon': this.gameType=='40004',
        'csjb-icon': this.gameType=='40005',
        'fyht-icon': this.gameType=='40006'
      }
      return classIcon
    }
  },
  methods:{
    formatterTime (row) {
      return detailTime(row)
    }, // 格式化创建时间
    split_array (arr, len) {
      var a_len = arr.length;
      var result = [];
      for(var i=0;i<a_len;i+=len){
        result.push(arr.slice(i,i+len));
      }
      return result;
    },
    getOneArmBandit() {
      this.recordArray = [] //战绩二维数组
      this.finalRecord = []
      this.winCard = []
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
            this.mode =  res.data.data.record.mode
            this.playerRecordList = JSON.parse( res.data.data.record.gameDetail)  // 转化为JSON数组
            this.recordArray = this.split_array(this.playerRecordList.viewGrid,3) // 把数组分为3个为数组的二维数组
            this.itemRecord = JSON.parse(JSON.stringify(this.playerRecordList)) // 获取截图下面的数据统计信息

            // 以下是处理图片中奖位置定位逻辑处理
            if(this.playerRecordList.getFeatureChance) { // 进入免费局
              for (let [parentIndexFree, dataFree] of this.recordArray.entries()) {
                for (let [indexFree, itemFree] of dataFree.entries()){
                  if (this.playerRecordList.scatterGrid[parentIndexFree] == indexFree){
                    this.finalRecord.push({
                      isWin: true,
                      value: itemFree
                    })
                  } else {
                    this.finalRecord.push({
                      isWin: false,
                      value: itemFree
                    })
                  }
                }
              }
              this.recordArray = this.split_array(this.finalRecord,3) // 处理后又变成了一维数组，然后再次处理为二维数组
            } else { //未进入免费局
              if(this.playerRecordList.winGrid.length) {  // 中奖情况下
                for (let win of this.playerRecordList.winGrid) {
                  this.winCard.push(win.winCard)
                }

                for(var i = 0; i < this.winCard.length; i++) {
                  if(i>=1) { // 一次中奖有多条线情况下
                    for (let [parentIndexMul, dataMul] of this.recordArray.entries()) {
                      for (let [indexMul, itemMul] of dataMul.entries()){
                        if (this.winCard[i][parentIndexMul] == indexMul && itemMul.isWin==false){
                          itemMul.isWin = true
                        }
                      }
                    }
                  } else { // 只有一条线中奖
                    for (let [parentIndex, data] of this.recordArray.entries()) {
                      for (let [index, item] of data.entries()){
                        if (this.winCard[i][parentIndex] == index){
                          this.finalRecord.push({
                            isWin: true,
                            value: item
                          })
                        } else {
                          this.finalRecord.push({
                            isWin: false,
                            value: item
                          })
                        }
                      }
                    }
                    this.recordArray = this.split_array(this.finalRecord,3)
                  }
                }
                this.recordArray = this.split_array(this.finalRecord,3)
              } else { // 未中奖情况下
                for (let dataElse of this.recordArray) {
                  for (let itemElse of dataElse){
                    this.finalRecord.push({
                      isWin: false,
                      value: itemElse
                    })
                  }
                }
                this.recordArray = this.split_array(this.finalRecord,3) // 处理后又变成了一维数组，然后再次处理为二维数组
              }
            }
          }
          this.dialogLoading = false
        }
      )
    }
  },
  filters:{   //过滤器，所有数字保留两位小数
    currency(value){
      return (value-0).toFixed(2);
    }
  }
}
</script>

<style scoped>
  .oneArm_modal .record-bg{
    background-repeat:no-repeat!important;
    background-size: 100% auto!important;
    height: 500px;
    position: relative;
  }
  .oneArm_modal .record-content{
    position: absolute;
    top: 22%;
    width: 100%;
  }
  .oneArm_modal .tlzm{
    top:18%;
  }
  .oneArm_modal .sfss{
    top:24%;
  }
  .oneArm_modal .xlxr{
    top:25%;
  }
  .oneArm_modal .fyht{
    top:18%;
  }
  .oneArm_modal .csjb{
    top:25%;
  }
  .oneArm_modal .record-wrap{
    display: inline-block;
    position: relative;
    left: 10px;
  }
  .oneArm_modal .tlzm .tlzm-wrap{
    top:20%;
    left: 0;
  }
  .oneArm_modal .sfss .sfss-wrap{
    left: 0;
  }
  .oneArm_modal .xlxr .xlxr-wrap{
    left: 0;
  }
  .oneArm_modal .fyht .fyht-wrap{
    left: 0;
  }
  .oneArm_modal .csjb .csjb-wrap{
    left: 0;
  }
  .oneArm_modal .record-footer{
    overflow: hidden;
    background-color: #000;
    padding: 9px 0;
    color: #fff;
  }
  .oneArm_modal .record-low{
    display: block;
    width: 116px;
  }
  .oneArm_modal .tlzm .tlzm-low{
    width: 128px;
  }
  .oneArm_modal .sfss .sfss-low{
    width: 131px;
  }
  .oneArm_modal .xlxr .xlxr-low{
    width: 131px;
  }
  .oneArm_modal .fyht .fyht-low{
    width: 128px;
  }
  .oneArm_modal .csjb .csjb-low{
    width: 128px;
  }
  .oneArm_modal .record-icon{
    width: 100%;
  }
  .oneArm_modal .tlzm .tlzm-icon{
    width: 92%;
  }
  .oneArm_modal .sfss .sfss-icon{
    width: 77%;
  }
  .oneArm_modal .xlxr .xlxr-icon{
    width: 72%;
  }
  .oneArm_modal .fyht .fyht-icon{
    width: 80%;
  }
  .oneArm_modal .csjb .csjb-icon{
    width: 78%;
  }
  .oneArm_modal .record-tlzm{
    background: url("../../../static/playerBill/tlzm-bg.png");
  }
  .oneArm_modal .record-xcl{
    background: url("../../../static/playerBill/xcl-bg.png");
  }
  .oneArm_modal .record-xlxr{
    background: url("../../../static/playerBill/xlxr-bg.jpg");
  }
  .oneArm_modal .record-sfss{
    background: url("../../../static/playerBill/sfss-bg.jpg");
  }
  .oneArm_modal .record-fyht{
    background: url("../../../static/playerBill/fyht-bg.jpg");
  }
  .oneArm_modal .record-csjb{
    background: url("../../../static/playerBill/csjb-bg.jpg");
  }

  .oneArm_modal .no-record {
    position: absolute;
    top: 48%;
    left: 25%;
    font-size: 30px;
    font-weight: bold;
  }
  .oneArm_modal .no-win{
    background-color: #fbdebf;
    opacity: 0.2;
  }
</style>
