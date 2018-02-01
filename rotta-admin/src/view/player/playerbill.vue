$<template>
  <div class="playBill">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{playerBillDetailInfo.userName}}</h2>
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
            <el-col :span="6"><span>avgRTP：{{playerBillDetailInfo.avgRTP||0}}</span></el-col>
          </p>
          <p>
            <el-col :span="6"><span>下注总额：{{formatPoints(playerBillDetailInfo.sumAmount)}}</span></el-col>
            <el-col :span="6"><span>返还总额：{{formatPoints(playerBillDetailInfo.reSumAmount)}}</span></el-col>
            <el-col :span="6"><span>利润总额：{{formatPoints(playerBillDetailInfo.depSumAmount)}}</span></el-col>
            <el-col :span="6"><span>洗码量：{{playerBillDetailInfo.mixNum||0}}</span></el-col>
          </p>
        </div>
      </div>
      <div class="countinfo">
        <div class="countinfo-center">
          <h4>账单流水详情信息</h4>
          <el-col :span="12" style="float: right; text-align: right;margin-top: 14px">
            <el-input v-model="searchItem" placeholder="请输入局ID" style="width:60%"></el-input>
            <el-button type="primary" @click="searchAmount">搜索</el-button>
            <el-button type="primary" @click="resetAmount" style="margin-left: 0">重置</el-button>
          </el-col>
        </div>
        <div class="countinfo-form">
          <el-table :data="dataList">
            <el-table-column prop="roundId" label="局ID" align="left" width="250px"></el-table-column>
            <el-table-column label="下注时间" align="left" width="200px">
              <template scope="scope">
                {{formatterTime(scope.row.createdAt)}}
              </template>
            </el-table-column>
            <el-table-column label="结算前余额" align="left">
              <template scope="scope">
                {{formatPoints(scope.row.originalAmount)}}
              </template>
            </el-table-column>
            <el-table-column label="下注金额" align="left">
              <template scope="scope">
                {{formatPoints(scope.row.amount)}}
              </template>
            </el-table-column>
            <el-table-column label="返还金额" align="left">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.reAmount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="净利润" align="left">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.deAmount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="rate" label="当前成数" align="left">
              <template scope="scope">
                <span>
                  {{scope.row.rate}}%
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="mix" label="当前洗码比" align="left">
              <template scope="scope">
                <span>
                  {{scope.row.mix}}%
                </span>
              </template>
            </el-table-column>
            <el-table-column label="结算余额" align="left">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.balance)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="left">
              <template scope="scope">
                <el-button  type="text" @click="openModal(scope.row)">查看战绩</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerBillDetailList.length"
                           :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"
                           :current-page.sync="currentPage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="战绩详细" :visible.sync="isOpenModal" class="g-text-center">
      <OneArmBanditModal ref="childMethod" v-if="gameTypeStatus =='40000'" :dataProp="propChild"></OneArmBanditModal>
      <RealLifeModal ref="childMethod" v-if="gameTypeStatus =='30000'" :dataProp="propChild"></RealLifeModal>
      <ArcadeModal ref="childMethod" v-if="gameTypeStatus =='50000'" :dataProp="propChild"></ArcadeModal>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { detailTime, formatUserName, thousandFormatter } from '@/behavior/format'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
import ArcadeModal from '@/components/record/arcadeModal'
import RealLifeModal from '@/components/record/realLifeModal'
import OneArmBanditModal from '@/components/record/oneArmBanditModal'
export default {
  components: {ArcadeModal, RealLifeModal, OneArmBanditModal},
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerBill'
    })
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerBill'
    })
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      currentPage: 1,
      searchItem: '',
      allAmount: 0,
      isOpenModal: false,
      searchArray: [],
      playerBillDetailInfo: {
        depSumAmount: 0,
        mixNum: 0,
        reSumAmount: 0,
        sumAmount: 0
      }, //基本信息
      playerBillDetailList: [], //列表信息
      copyList: [],
      propChild: {} // 组件通信传递
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
    gameTypeStatus () {
      return this.$store.state.variable.playerGameType || localStorage.playerGameType
    }
  },
  methods: {
    formatterTime (row) {
      return row ? detailTime(row) : '-'
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
      this.currentPage = 1;
      this.searchArray = [];
      for (let item of this.copyList) {
        if (item.roundId.indexOf(this.searchItem)>-1) {
          this.searchArray.push(item)
        }
      }
      this.playerBillDetailList = this.searchArray
    },
    openModal(data) {
      this.propChild = data;
      this.isOpenModal = true
      if (this.gameTypeStatus == '40000') {
        setTimeout(()=>{
          this.$refs.childMethod.getOneArmBandit()
        },0)
      } else if (this.gameTypeStatus == '30000') {
        setTimeout(()=>{
          this.$refs.childMethod.getRealLife()
        },0)
      } else if (this.gameTypeStatus == '50000') {
        setTimeout(()=>{
          this.$refs.childMethod.getRecordSLXY()
        },0)
      }
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
  },
  watch: {
    '$route': function (_new, _old) {
      if (_old.fullPath === '/playerdetail') {
        this.getPlayerBillDetail()
      }
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
  .playBill .el-dialog--small{
    width: 940px;
  }
</style>
