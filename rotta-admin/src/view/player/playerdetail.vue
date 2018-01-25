$<template>
  <div class="playerdetail">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{userName}} <el-button  type="text" @click="accountDetail()">查看流水账详单</el-button></h2>
      </div>
      <div class="baseinfo">
        <h4>基本信息</h4>
        <div class="baseinfo-form">
          <el-col :span="4"><span>所属商户：{{detailInfo.merchantName}}</span></el-col>
          <el-col :span="4"><span>线路号：{{detailInfo.msn}}</span></el-col>
          <el-col :span="4"><span>上次登录游戏时间：{{lastTime}}</span></el-col>
          <el-col :span="4" v-for="(item,index) of detailInfo.gameList" :key="index">
            <span>{{item.name+'洗码比'}}：{{item.mix}}%</span>
          </el-col>
        </div>
      </div>
      <div class="countinfo">
        <h4>消费信息</h4>
        <div class="countinfo-title">
          <el-col :span="24" style="margin-bottom: 28px">
            <el-radio-group v-model="companyInfo" @change="changeCompany()">
              <el-radio-button v-for="(item,index) of companyList" :key="index" :label="item.server">{{item.companyName}}</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col>
            <el-radio-group v-model="radioInfo" @change="changeRadio">
              <el-radio-button v-for="(item,index) of gameTypeList" :key="index" :label="item.code">{{item.name}}</el-radio-button>
            </el-radio-group>
          </el-col>
        </div>
        <div class="countinfo-center">
          <el-col :span="12">
            <span v-if='radioInfo!=-1'>输赢总计: <span :class="{'-p-green':this.allAmount>0,'-p-red':this.allAmount<0}">{{formatPoints(allAmountFun)}}</span></span>&emsp;
            <span class="justfy2">当前剩余点数：<span style="color: #F7BA2A">{{formatPoints(detailInfo.balance)}}</span></span>
            <el-button type="text" style="margin-right: 1rem" @click="resultGetPlayerDetail">刷新</el-button>
          </el-col>

          <el-col :span="12" style="float: right; text-align: right">
            <el-date-picker
              v-model="amountDate"
              type="datetimerange"
              align="right"
              :picker-options="pickerOptions"
              placeholder="选择日期时间范围">
            </el-date-picker>
            <el-button type="primary" @click="searchAmount">搜索</el-button>
          </el-col>
        </div>
        <div class="countinfo-form">
          <el-table :data="dataList">
            <el-table-column prop="businessKey" label="交易号" align="center" width="250px"></el-table-column>
            <el-table-column label="交易时间" align="center" width="200px">
              <template scope="scope">
                {{formatterTime(scope.row.createdAt)}}
              </template>
            </el-table-column>
            <el-table-column label="结算前余额" align="center">
              <template scope="scope">
                {{formatPoints(scope.row.originalAmount)}}
              </template>
            </el-table-column>
            <el-table-column label="操作金额" align="center">
              <template scope="scope">
                {{formatPoints(scope.row.betAmount)}}
              </template>
            </el-table-column>
            <el-table-column label="返还金额" align="center">
              <template scope="scope">
                <span>
                  {{formatPoints(scope.row.retAmount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="净利润" align="center">
              <template scope="scope">
                <span :class="{'-p-green':scope.row.profitAmount>0,'-p-red':scope.row.profitAmount<0}">
                  {{formatPoints(scope.row.profitAmount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="交易类型" width="120" align="center"></el-table-column>
            <el-table-column prop="rate" label="当前成数" align="center">
              <template scope="scope">
                <span>
                  {{scope.row.rate}}%
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="mix" label="当前洗码比" align="center">
              <template scope="scope">
                <span>
                  {{scope.row.mix}}%
                </span>
              </template>
            </el-table-column>
            <el-table-column label="结算余额" align="center">
              <template scope="scope">
                <span :class="{'-p-green':scope.row.balance>0,'-p-red':scope.row.balance<0}">
                  {{formatPoints(scope.row.balance)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  width="200">
              <template scope="scope">
                <el-button v-if="scope.row.gameType!=1&&scope.row.gameType!=2&&scope.row.gameType!=3"  type="text"
                           @click="openModalBill(scope.row)">查看战绩</el-button>
                <el-button v-if="scope.row.gameType!=1&&scope.row.gameType!=2&&scope.row.gameType!=3"  type="text"
                           @click="openModalRunning(scope.row)">流水详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, sizes, jumper" :total="playerDetailList.length"
                           :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"
                           :current-page.sync="currentPage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="战绩详细" :visible.sync="isOpenModalBill" class="g-text-center">
      <OneArmBanditModal ref="childMethod" v-if="propChild.gameType =='40000'" :dataProp="propChild"></OneArmBanditModal>
      <RealLifeModal ref="childMethod" v-if="propChild.gameType =='30000'" :dataProp="propChild"></RealLifeModal>
      <ArcadeModal ref="childMethod" v-if="propChild.gameType =='50000'" :dataProp="propChild"></ArcadeModal>
    </el-dialog>

    <el-dialog title="流水详情" :visible.sync="isOpenModalRunning" class="g-text-center">
      <oneRunningAccount :dataProp="runningDetail"></oneRunningAccount>
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
import oneRunningAccount from '@/components/player/oneRunningAccount'
export default {
  components:{oneRunningAccount, ArcadeModal, RealLifeModal, OneArmBanditModal},
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerdetail'
    })
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerdetail'
    })
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      currentPage: 1,
      radioInfo: "",
      amountDate: [],
      allAmount: 0,
      isOpenModalBill: false,
      isOpenModalRunning: false,
      playerDetailList: [],
      playerDetailInfo: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近三天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      companyList: [],
      gameTypeList: [],
      companyInfo: '-1',
      specialNA:[
        {
          code: '-1',
          name: '中心钱包'
        },
        {
          code: '-3',
          name: '商城'
        }
      ],
      jumpUrl:[
        '/playerlist',
        '/naAllGameReport',
        '/naVedioGameReport',
        '/naLiveGameReport',
        '/naArcadeGameReport',
        '/naMallReport',
        '/ttgVedioGameReport',
        '/saLiveGameReport',
        '/allReport'
      ],
      propChild: {},
      runningDetail: {}
    }
  },
  mounted () {
    this.companySelect()
  },
  computed: {
    detailInfo () {
      return this.playerDetailInfo
    },
    lastTime () {
      return detailTime(this.playerDetailInfo.updateAt)
    },
    dataList () {
      if (this.nowPage === 1) {
        return this.playerDetailList.slice(0, this.nowSize)
      } else {
        return this.playerDetailList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    },
    userName () {
      return formatUserName(this.playerDetailInfo.userName || this.$store.state.variable.playerUserName || localStorage.playerName)
    },
    allAmountFun () {
      this.allAmount = 0
      for (let item of this.playerDetailList) {
        if (item.gameType != '2') {
          this.allAmount = item.winloseAmount + this.allAmount
        }
      }
      return this.allAmount
    }
  },
  methods: {
    formatterTime (row) {
      return row ? detailTime(row) : '-'
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    },
    openModalBill (data) {
      this.propChild = data;
      this.isOpenModalBill = true
      if (this.propChild.gameType == '40000') {
        setTimeout(()=>{
          this.$refs.childMethod.getOneArmBandit()
        },0)
      } else if (this.propChild.gameType == '30000') {
        setTimeout(()=>{
          this.$refs.childMethod.getRealLife()
        },0)
      } else if (this.propChild.gameType == '50000') {
        setTimeout(()=>{
          this.$refs.childMethod.getRecordSLXY()
        },0)
      }
    },
    openModalRunning (data) {
      this.isOpenModalRunning = true
      this.runningDetail = data
    },
    changeRadio () {
      this.getPlayerDetail()
    },
    getPlayerDetail () {
      this.initTime()
      let name = this.$store.state.variable.playerUserName || localStorage.playerName
      let [startTime, endTime] = this.amountDate
      startTime = new Date(startTime).getTime()
      endTime = new Date(endTime).getTime()+5000
      // this.$store.commit('startLoading')
      invoke({
        url: api.playerBill,
        method: api.post,
        data:{
          userName: name,
          company: this.companyInfo,
          gameType: this.radioInfo,
          startTime: startTime,
          endTime: endTime
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
            this.playerDetailList = res.data.list
            this.playerDetailInfo = res.data.userInfo
          }
          // this.$store.commit('closeLoading')
        }
      )
    },
    searchAmount () {
      this.currentPage = 1;
      this.getPlayerDetail()
    },
//    billDetail (row) {
//      localStorage.setItem('playerBillId', row.billId)
//      localStorage.setItem('playerGameType', row.gameType)
//      this.$store.commit({
//        type: 'playerGameType',
//        data: row.gameType
//      })
//      this.$router.push('playerBill')
//    },
    accountDetail () {
      this.$router.push('playerAccount')
    },
    formatPoints (num) {
      return thousandFormatter(num)
    },
    companySelect () {
      invoke({
        url: api.companySelect,
        method: api.post,
        data: {
          parent: localStorage.loginRole == 1 ? '' : localStorage.loginId
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
            this.companyList = res.data.payload
            this.companyList.unshift({
              server: '-1',
              companyName: '全部厂商'
            })
            this.changeCompany()
          }
          // this.$store.commit('closeLoading')
        }
      )
    }, //获取运营商列表
    changeCompany () {
      invoke({
        url: api.gameBigType,
        method: api.post,
        data: {
          companyIden: this.companyInfo
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
            this.gameTypeList = res.data.payload
            if(this.companyInfo == 'NA' || this.companyInfo == '-1'){
              this.gameTypeList = this.gameTypeList.concat(this.specialNA)
            }
            if(this.radioInfo=='') {
//              console.log('进入到这里了？')
              this.getPlayerDetail()
            }
            this.gameTypeList.unshift({
              code: '',
              name: '全部'
            })
            this.radioInfo = ''
          }
          // this.$store.commit('closeLoading')
        }
      )
    },
    initTime () {
      const start = this.amountDate[0] ? new Date(this.amountDate[0]) : new Date();
      const end = this.amountDate[1] ? new Date(this.amountDate[1]) : new Date();
      !this.amountDate[0] && start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      this.amountDate = [start,end];
    },
    resultGetPlayerDetail (){
      this.amountDate = [] // 处理时间不更新，列表页筛选不了最新数据问题
      this.getPlayerDetail()
    }
  },
  filters:{   //过滤器，所有数字保留两位小数
    currency(value){
      return (value-0).toFixed(2);
    }
  },
  watch: {
    '$route': function (_new, _old) {
      for (let item of this.jumpUrl) {
        if(item === _old.fullPath) {
          this.getPlayerDetail()
          break
        }
      }
    }
  }
}
</script>

<style scpoed>
  .playerdetail .my-title{text-align: center}
  h2{font-size: 2.5rem;color: #5a5a5a;padding-top: 2rem;}
  .playerdetail .baseinfo,
  .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;}

  .playerdetail .baseinfo-form, .countinfo-form{background-color: #f5f5f5;padding-left: 2rem;font-size: 0.8rem;overflow: hidden}

  .playerdetail .baseinfo-form span{display: inline-block;padding: 10px 0; height: 25px; line-height: 25px}
  .playerdetail .countinfo-form{padding: 2rem;}

  .playerdetail .countinfo-title{background-color: #f5f5f5;font-size: 1.1rem;padding: 2rem; overflow: hidden}
  .playerdetail .countinfo-center{background-color: #f5f5f5;font-size: 1.1rem;padding:0 2rem; overflow: hidden}
  .playerdetail h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .playerdetail .justfy2{font-size: 1rem;padding-right: 1rem;}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
  .playerdetail .el-dialog--small{
    width: 940px;
  }
</style>
