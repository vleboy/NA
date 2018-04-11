<template>
  <div class="oneArm_modal">
    <div class="record-bg" :class="recordBackgroundUrl">
      <div class="record-content" :class="recordClassContent">
        <div v-for="(data,index) in recordArray" :key="index" class="record-wrap"
             :class="recordClassWrap">
          <div v-for="(item,indexChild) in data" :key="indexChild" class="record-low" :class=""
               :class="[recordClassLow,{'no-win':!item.isWin}]">
            <img :src="`${imgPrefix}${gameTypeFile[gameType]}/${item.value}.png`" class="record-icon"
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
        '42001': 'tlzm',
        '40002': 'xcl',
        '42002': 'xcl',
        '40003': 'xlxr',
        '42003': 'xlxr',
        '40004': 'sfss',
        '42004': 'sfss',
        '40005': 'csjb',
        '42005': 'csjb',
        '40006': 'fyht',
        '42006': 'fyht'
      },
      imgPrefix: 'https://d38xgux2jezyfx.cloudfront.net/recordImg/'
    }
  },
  computed: {
    // 罗塔之谜 40001
    // 小厨娘    40002 "|| 42002
    // 祥龙献瑞 40003
    // 四方神兽 40004
    // 财神进宝 40005
    // 福运亨通 40006
    gameTypeId () {
      let typeId = {}
      typeId = {
        'tlzm': (this.gameType=='40001') || (this.gameType=='42001'),
        'xcl': (this.gameType== '40002') || (this.gameType=='42002'),
        'xlxr': (this.gameType=='40003') || (this.gameType=='42003'),
        'sfss': (this.gameType=='40004') || (this.gameType=='42004'),
        'csjb': (this.gameType=='40005') || (this.gameType=='42005'),
        'fyht': (this.gameType=='40006') || (this.gameType=='42006')
      }
      return typeId
    },
    recordBackgroundUrl () {
      let classType = {}
      classType = {
        'record-tlzm': this.gameTypeId.tlzm,
        'record-xcl': this.gameTypeId.xcl,
        'record-xlxr': this.gameTypeId.xlxr,
        'record-sfss': this.gameTypeId.sfss,
        'record-csjb': this.gameTypeId.csjb,
        'record-fyht': this.gameTypeId.fyht
      }
      return classType
    },
    recordClassContent () {
      let classContent = {}
      classContent = {
        'tlzm': this.gameTypeId.tlzm,
        'xlxr': this.gameTypeId.xlxr,
        'sfss': this.gameTypeId.sfss,
        'csjb': this.gameTypeId.csjb,
        'fyht': this.gameTypeId.fyht
      }
      return classContent
    },
    recordClassWrap () {
      let classWrap = {}
      classWrap = {
        'tlzm-wrap': this.gameTypeId.tlzm,
        'xlxr-wrap': this.gameTypeId.xlxr,
        'sfss-wrap': this.gameTypeId.sfss,
        'csjb-wrap': this.gameTypeId.csjb,
        'fyht-wrap': this.gameTypeId.fyht
      }
      return classWrap
    },
    recordClassLow () {
      let classLow = {}
      classLow = {
        'tlzm-low': this.gameTypeId.tlzm,
        'xlxr-low': this.gameTypeId.xlxr,
        'sfss-low': this.gameTypeId.sfss,
        'csjb-low': this.gameTypeId.csjb,
        'fyht-low': this.gameTypeId.fyht
      }
      return classLow
    },
    recordClassIcon () {
      let classIcon = {}
      classIcon = {
        'tlzm-icon': this.gameTypeId.tlzm,
        'xlxr-icon': this.gameTypeId.xlxr,
        'sfss-icon': this.gameTypeId.sfss,
        'csjb-icon': this.gameTypeId.csjb,
        'fyht-icon': this.gameTypeId.fyht
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
    background: url("https://d38xgux2jezyfx.cloudfront.net/recordImg/tlzm/tlzm-bg.png");
  }
  .oneArm_modal .record-xcl{
    background: url("https://d38xgux2jezyfx.cloudfront.net/recordImg/xcl/xcl-bg.png");
  }
  .oneArm_modal .record-xlxr{
    background: url("https://d38xgux2jezyfx.cloudfront.net/recordImg/xlxr/xlxr-bg.jpg");
  }
  .oneArm_modal .record-sfss{
    background: url("https://d38xgux2jezyfx.cloudfront.net/recordImg/sfss/sfss-bg.jpg");
  }
  .oneArm_modal .record-fyht{
    background: url("https://d38xgux2jezyfx.cloudfront.net/recordImg/fyty/fyht-bg.jpg");
  }
  .oneArm_modal .record-csjb{
    background: url("https://d38xgux2jezyfx.cloudfront.net/recordImg/csjb/csjb-bg.jpg");
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
