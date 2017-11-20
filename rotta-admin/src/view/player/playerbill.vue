$<template>
  <div class="playBill">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{userName}} <el-button  type="text" @click="accountDetail()">查看流水账详单</el-button></h2>
        <h2>利润总额：<span :class="{'-p-green':playerBillDetailInfo.depSumAmount>=0,'-p-red':playerBillDetailInfo.depSumAmount<0}">
          {{formatPoints(playerBillDetailInfo.depSumAmount)}}</span>
        </h2>
      </div>
      <div class="baseinfo">
        <h4>账单基本信息</h4>
        <div class="baseinfo-form">
          <p style="margin-bottom: 28px">
            <el-col :span="6"><span>账单号：{{playerBillDetailInfo.billId}}</span></el-col>
            <el-col :span="6"><span>进入时间：{{goTime}}</span></el-col>
            <el-col :span="6"><span>退出时间：{{outTime}}</span></el-col>
            <el-col :span="6"><span>avgRTP：{{playerBillDetailInfo.avgRTP|currency}}</span></el-col>
          </p>
          <p>
            <el-col :span="6"><span>下注总额：{{formatPoints(playerBillDetailInfo.sumAmount)}}</span></el-col>
            <el-col :span="6"><span>返还总额：{{formatPoints(playerBillDetailInfo.reSumAmount)}}</span></el-col>
            <el-col :span="6"><span>利润总额：{{formatPoints(playerBillDetailInfo.depSumAmount)}}</span></el-col>
            <el-col :span="6"><span>洗码量：{{playerBillDetailInfo.mixNum}}</span></el-col>
          </p>
        </div>
      </div>
      <div class="countinfo">
        <div class="countinfo-center">
          <h4>账单流水详情信息</h4>
          <el-col :span="12" style="float: right; text-align: right;margin-top: 14px">
            <el-input v-model="searchItem" placeholder="请输入流水号" style="width:60%"></el-input>
            <el-button type="primary" @click="searchAmount">搜索</el-button>
            <el-button type="primary" @click="resetAmount" style="margin-left: 0">重置</el-button>
          </el-col>
        </div>
        <div class="countinfo-form">
          <el-table :data="dataList">
            <el-table-column prop="sn" label="流水号" align="center"></el-table-column>
            <el-table-column label="下注时间" :formatter="getAtime" align="center"></el-table-column>
            <el-table-column label="结算前余额" align="center">
              <template scope="scope">
                {{formatPoints(scope.row.originalAmount)}}
              </template>
            </el-table-column>
            <el-table-column label="下注金额" align="center">
              <template scope="scope">
                {{formatPoints(scope.row.amount)}}
              </template>
            </el-table-column>
            <el-table-column label="返还金额" align="center">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.reAmount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="净利润" align="center">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.deAmount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="rate" label="当前成数" align="center"></el-table-column>
            <el-table-column prop="mix" label="当前洗码比" align="center"></el-table-column>
            <el-table-column label="结算余额" align="center">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.balance)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button  type="text" @click="openModal(scope.row)">战绩截图</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerBillDetailList.length"
                           :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="战绩详细" :visible.sync="isOpenModal" class="g-text-center">
      <div v-loading.body="dialogLoading" element-loading-text="加载中...">
        <div class="record-bg" :class="{'record-tlzm':gameType=='40001','record-xcl':gameType=='40002'}">
          <div class="record-content" :class="{'tlzm':gameType=='40001'}">
            <div v-for="(data,index) in recordArray" :key="index" class="record-wrap" :class="{'tlzm-wrap':gameType=='40001'}">
              <div v-for="(item,indexChild) in data" :key="indexChild" class="record-low" :class="{'tlzm-low':gameType=='40001', 'no-win':!item.isWin}">
                <img :src="`../../../static/playerBill/${gameTypeNum}/${item.value}.png`" class="record-icon" :class="{'tlzm-icon':gameType=='40001'}">
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
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUserName, thousandFormatter } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerBill'
    })
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      radioInfo: '0',
      searchItem: '',
      allAmount: 0,
      isOpenModal: false,
      dialogLoading: false,
      detailList: [],
      searchArray: [],
      gameType: {},
      playerBillDetailInfo: {}, //基本信息
      itemRecord: {}, //单个信息
      finalRecord: [], //循环列表需要的战绩数组（最终版）
      playerBillDetailList: [], //列表信息
      playerRecordList: [], //战绩信息
      recordArray: [], //战绩二维数组
      winCard: [], // 中奖数组位置
      copyList: []
    }
  },
  mounted () {
    this.getPlayerBillDetail()
  },
  computed: {
    goTime () {
      return detailTime(this.playerBillDetailInfo.joinTime)
    },
    outTime () {
      return detailTime(this.playerBillDetailInfo.createdAt)
    },
    dataList () {
      if (this.nowPage === 1) {
        return this.playerBillDetailList.slice(0, this.nowSize)
      } else {
        return this.playerBillDetailList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    },
    userName () {
      return formatUserName(localStorage.playerName)
    },
    gameTypeNum () {
      return this.gameType == '40002' ? "xcl" : "tlzm"
    }
  },
  methods: {
    getAtime (row) {
      return detailTime(row.createdAt)
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
    },
    getNowpage (page) {
      this.nowPage = page
    },
    getPlayerBillDetail () {
      this.$store.commit('startLoading')
      invoke({
        url: api.playerBill,
        method: api.post,
        data:{
          billId: localStorage.playerBillId
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
            this.playerBillDetailInfo =  res.data.billInfo
            this.playerBillDetailList =  res.data.list
            this.copyList =  res.data.list
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    searchAmount () {
      this.searchArray = [];
      for (let item of this.copyList) {
        if (item.sn.indexOf(this.searchItem)>-1) {
          this.searchArray.push(item)
        }
      }
      this.playerBillDetailList = this.searchArray
    },
    openModal(data) {
      this.recordArray = []
      this.finalRecord = []
      this.winCard = []
      this.isOpenModal = true
//      this.dialogLoading = true
      invoke({
        url: api.playerRecord,
        method: api.post,
        data: {
          userName: localStorage.playerName,
          betId: data.businessKey
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
            if (res.data.data != null) {
              this.gameType = res.data.data.gameId
              this.mode = res.data.data.record.mode
              this.playerRecordList = JSON.parse(res.data.data.record.gameDetail)  // 转化为JSON数组
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
          }
          this.$store.commit('closeLoading')
          this.dialogLoading = false
        }
      )
    },
    accountDetail (){
      this.$router.push('playerAccount')
    },
    resetAmount () {
      this.searchItem = '';
      this.getPlayerBillDetail()
    },
    split_array (arr, len) {
      var a_len = arr.length;
      var result = [];
      for(var i=0;i<a_len;i+=len){
        result.push(arr.slice(i,i+len));
      }
      return result;
    },
    formatPoints (num) {
      return thousandFormatter(num)
    }
  },
  filters:{   //过滤器，所有数字保留两位小数
    currency(value){
      return (value-0).toFixed(2);
    }
  }
}
</script>

<style scpoed>
  .playBill .my-title{text-align: center;margin-bottom: 40px}
  h2{font-size: 2.5rem;color: #5a5a5a;padding-top: 2rem;}
  .playBill .baseinfo,
  .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;}

  .playBill .baseinfo-form{background-color: #f5f5f5;padding: 2rem;font-size: 0.8rem;overflow: hidden}
  .playBill .countinfo-form{background-color: #fff;padding-left: 0;font-size: 0.8rem;overflow: hidden}

  .playBill p{overflow: hidden}
  .playBill .countinfo-center{font-size: 1.1rem;overflow: hidden}
  .playBill h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a;display: inline-block}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
  .playBill .record-bg{
    background-repeat:no-repeat!important;
    background-size: 100% auto!important;
    height: 500px;
    position: relative;
  }
  .playBill .record-content{
    position: absolute;
    top: 22%;
    width: 100%;
  }
  .playBill .tlzm{
    top:18%;
  }
  .playBill .record-wrap{
    display: inline-block;
    position: relative;
    left: 10px;
  }
  .playBill .tlzm .tlzm-wrap{
    top:20%;
    left: 0;
  }
  .playBill .record-footer{
    overflow: hidden;
    background-color: #000;
    padding: 9px 0;
    color: #fff;
  }
  .playBill .record-low{
    display: block;
    width: 116px;
  }
  .playBill .tlzm .tlzm-low{
    width: 128px;
  }
  .playBill .record-icon{
    width: 100%;
  }
  .playBill .tlzm .tlzm-icon{
    width: 92%;
  }
  .playBill .record-tlzm{
    background: url("../../../static/playerBill/tlzm-bg.png");
  }
  .playBill .record-xcl{
    background: url("../../../static/playerBill/xcl-bg.png");
  }
  .playBill .el-dialog--small{
    width: 940px;
  }
  .playBill .no-record {
    position: absolute;
    top: 48%;
    left: 25%;
    font-size: 30px;
    font-weight: bold;
  }
  .playBill .no-win{
    background-color: #fbdebf;
    opacity: 0.2;
  }
</style>
