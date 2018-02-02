<template>
  <div class="p-transaction">

    <div class="-p-header">
      <el-row>
        <el-col class="-p-h-bottom">
          <el-radio-group v-model="companyInfo" @change="changeCompany()">
            <el-radio-button v-for="(item,index) of companyList" :key="index" :label="item.server">{{item.companyName}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="-p-h-bottom">
          <el-radio-group v-model="radioInfo" @change="changeRadio">
            <el-radio-button v-for="(item,index) of gameTypeList" :key="index" :label="item.code">{{item.name}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
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
        <el-col :span="12">
          <span class="justfy2">当前剩余点数：<span style="color: #F7BA2A">{{formatPoints(balance)}}</span></span>
          <el-button type="text" @click="resultGetPlayerDetail">刷新</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="-p-content">
      <el-table  :data="dataList">
        <el-table-column prop="businessKey" label="交易号" align="left" width="320"></el-table-column>
        <el-table-column label="交易时间" align="left" width="200px">
          <template scope="scope">
            {{formatterTime(scope.row.createdAt)}}
          </template>
        </el-table-column>
        <el-table-column label="结算前余额" align="left">
          <template scope="scope">
            {{formatPoints(scope.row.originalAmount)}}
          </template>
        </el-table-column>
        <el-table-column label="操作金额" align="left">
          <template scope="scope">
            {{formatPoints(scope.row.betAmount)}}
          </template>
        </el-table-column>
        <el-table-column label="返还金额" align="left">
          <template scope="scope">
                <span>
                  {{formatPoints(scope.row.retAmount)}}
                </span>
          </template>
        </el-table-column>
        <el-table-column label="净利润" align="left">
          <template scope="scope">
                <span :class="{'-p-green':scope.row.profitAmount>0,'-p-red':scope.row.profitAmount<0}">
                  {{formatPoints(scope.row.profitAmount)}}
                </span>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="交易类型" width="120" align="left"></el-table-column>
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
        <el-table-column label="操作" align="left"  width="200">
          <template scope="scope">
            <el-button v-if="scope.row.gameType!=1&&scope.row.gameType!=2&&scope.row.gameType!=3"  type="text"
                       @click="openModalBill(scope.row)">查看战绩</el-button>
            <el-button v-if="scope.row.gameType!=1&&scope.row.gameType!=2&&scope.row.gameType!=3"  type="text"
                       @click="openModalRunning(scope.row)">流水详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin:2rem 0">
        <div style="margin-bottom: 10px;font-size: 15px;" v-if='radioInfo!=-1'>本页输赢总计:
              <span :class="{'-p-green':this.allAmount>0,'-p-red':this.allAmount<0}">
                {{formatPoints(allAmountFun)}}
              </span>
        </div>

        <el-pagination layout="prev, pager, next, jumper" :total="playerDetailList.length"
                       :page-size="20" @size-change="getNowsize" @current-change="getNowpage"
                       :current-page.sync="currentPage">
        </el-pagination>
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
  import { detailTime, thousandFormatter } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'
  import ArcadeModal from '@/components/record/arcadeModal'
  import RealLifeModal from '@/components/record/realLifeModal'
  import OneArmBanditModal from '@/components/record/oneArmBanditModal'
  import oneRunningAccount from '@/components/player/oneRunningAccount'

  export default {
    components:{oneRunningAccount, ArcadeModal, RealLifeModal, OneArmBanditModal},
    name: 'transactionRecord',
    props:['dataProp'],
    data () {
      return {
        nowSize: 20,
        nowPage: 1,
        pageSize: 100,
        currentPage: 1,
        allAmount: 0,
        isFetching: false,
        isLastMessage: false, // 主要判断是否是后台返回最后一次信息
        isOpenModalBill: false,
        isOpenModalRunning: false,
        radioInfo: '',
        amountDate: [],
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
        playerDetailList: [],
        playerDetailListStorage: [],
        playerDetailStartKey: '',
        balance: '',
        propChild: {},
        runningDetail: {}
      }
    },
    computed:{
      dataList () {
        if (this.nowPage === 1) {
          return this.playerDetailList.slice(0, this.nowSize)
        } else {
          return this.playerDetailList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      },
      allAmountFun () {
        this.allAmount = 0
        for (let item of this.dataList) {
          if (item.gameType != '2') {
            this.allAmount = item.winloseAmount + this.allAmount
          }
        }
        return this.allAmount
      }
    },
    mounted () {
      this.getTransactionRecord()
      this.companySelect()
    },
    methods:{
      getNowsize (size) {
        this.nowSize = size
        // console.log('当前每页:' + size)
      },
      getNowpage (page) {
        this.nowPage = page
        if((page == Math.ceil(this.playerDetailList.length/this.nowSize) && !this.isFetching) && page != 1 && !this.isLastMessage) {
          this.playerDetailListStorage = JSON.parse(JSON.stringify(this.playerDetailList))
          this.getTransactionRecord()
        }
      },
      openModalBill (data) {
        this.propChild = data;
        if (this.propChild.gameType == '40000') {
          this.isOpenModalBill = true
          setTimeout(()=>{
            this.$refs.childMethod.getOneArmBandit()
          },0)
        } else if (this.propChild.gameType == '30000') {
          this.isOpenModalBill = true
          setTimeout(()=>{
            this.$refs.childMethod.getRealLife()
          },0)
        } else if (this.propChild.gameType == '50000') {
          this.isOpenModalBill = true
          setTimeout(()=>{
            this.$refs.childMethod.getRecordSLXY()
          },0)
        } else {
          this.$message.error('对不起，该游戏不支持查看战绩')
        }
      },
      openModalRunning (data) {
        this.isOpenModalRunning = true
        this.runningDetail = data
      },
      changeRadio () {
        this.initData()
        this.getTransactionRecord()
      },
      getTransactionRecord () {
        if(this.isFetching) return
        this.isFetching = true
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
            endTime: endTime,
            startKey: this.playerDetailStartKey,
            pageSize: this.pageSize
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
              this.isLastMessage = res.data.list < this.pageSize
              this.playerDetailList = res.data.list
              this.balance = res.data.balance
              this.playerDetailStartKey = res.data.startKey
              this.playerDetailListStorage.length && (this.playerDetailList = this.playerDetailListStorage.concat(this.playerDetailList))
            }
            // this.$store.commit('closeLoading')
            this.isFetching = false
          }
        )
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
              if(this.radioInfo=='') {
                this.initData()
                this.getTransactionRecord()
              }
              this.gameTypeList.unshift({
                code: '',
                name: '全部'
              })
              this.radioInfo = ''
            }
          }
        )
      },
      searchAmount () {
        this.initData()
        this.getTransactionRecord()
      },
      initTime () {
        const start = this.amountDate[0] ? new Date(this.amountDate[0]) : new Date();
        const end = this.amountDate[1] ? new Date(this.amountDate[1]) : new Date();
        !this.amountDate[0] && start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
        this.amountDate = [start,end];
      },
      resultGetPlayerDetail (){
        this.amountDate = [] // 处理时间不更新，列表页筛选不了最新数据问题
        this.initData()
        this.getTransactionRecord()
      },
      initData () {
        this.currentPage = 1;
        this.playerDetailList = [];
        this.playerDetailListStorage = []
        this.playerDetailStartKey = ''
      },
      formatterTime (row) {
        return row ? detailTime(row) : '-'
      }, // 格式化创建时间
      formatPoints (num) {
        return thousandFormatter(num)
      } // 千位符格式化
    }
  }
</script>

<style lang="less" scoped>
  .p-transaction{
    .-p-content{
      padding: 20px 0 0 0;
    }
    .-p-h-bottom{
      margin-bottom: 28px;
    }
  }
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
