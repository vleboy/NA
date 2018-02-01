$<template>
  <div class="playerAccount">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{userName}}</h2>
      </div>
      <div class="baseinfo">
        <el-row class="baseinfo-form">
          <el-col :span="6">
            时间：
            <el-date-picker
              v-model="amountDate"
              type="daterange"
              align="right"
              @change="changeDate"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="monthDate"
              type="month"
              @change="changeMonth"
              placeholder="按月选择">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            最近：
            <el-radio-group v-model="radioTime" @change="changeTime()">
              <el-radio-button label="1">1周</el-radio-button>
              <el-radio-button label="2">1个月</el-radio-button>
              <el-radio-button label="3">1年</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="7" class="g-text-right">
            <el-button @click="isShowSearch = !isShowSearch" type="text">高级筛选
              <i :class="{'el-icon-caret-top':!isShowSearch,'el-icon-caret-bottom':isShowSearch}" style="font-size: 12px"></i>
            </el-button>
          </el-col>
          <el-col v-if="isShowSearch" style="position: relative">
            <div  class="from-search">
              类型：
              <el-radio-group v-model="radioType">
                <el-radio-button label="3">下注</el-radio-button>
                <el-radio-button label="11">转入</el-radio-button>
                <el-radio-button label="12">转出</el-radio-button>
                <el-radio-button label="4">返奖</el-radio-button>
              </el-radio-group>
            </div>
            <div class="from-search">
              资金流向：
              <el-radio-group v-model="radioMoney">
                <el-radio-button label="1">本次发生金额（入）</el-radio-button>
                <el-radio-button label="-1">本次发生金额（出）</el-radio-button>
              </el-radio-group>
            </div>
            <div class="form-button">
              <el-button type="primary" size="large" @click="searchData(true)">筛选</el-button>
              <el-button type="primary" size="large" @click="searchData(false)">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="account-total">
        <!--<div class="total-all">-->
          <!--<i class="el-icon-information" style="color: #1c8de0;"></i> &ensp;共搜索到{{playerAccountList.length || 0}}笔数据 &emsp;总计：-->
          <!--<span style="font-weight: bold">{{formatNum}} </span>元-->
        <!--</div>-->
        <div class="total-check -p-red" v-if="checkedArray.length">
          <i class="el-icon-information" style="color: #f7ba2a;"></i> &ensp;已选中{{checkedArray.length || 0}}笔数据 &emsp;总计：
          <span style="font-weight: bold">{{checkFormatNum}} </span>元
        </div>
      </div>
      <div class="countinfo">
        <div class="countinfo-form">
          <el-table stripe :data="dataList" @selection-change="selectionChange">
            <el-table-column type="selection" width="60" align="left"></el-table-column>
            <el-table-column prop="sn" label="流水号" width="300" align="left"></el-table-column>
            <el-table-column prop="createdAt" label="日期" :formatter="getAtime"  align="left"></el-table-column>
            <el-table-column label="交易类型" align="left">
              <template scope="scope">
                {{typeList[scope.row.type]}}
              </template>
            </el-table-column>
            <el-table-column prop="originalAmount" label="帐变前余额"  align="left">
              <template scope="scope">
                {{formatPoints(scope.row.originalAmount)}}
              </template>
            </el-table-column>
            <el-table-column label="本次发生金额（入）" align="left">
              <template scope="scope">
                <span class="-p-green" v-if="scope.row.amount>=0">
                   {{formatPoints(scope.row.amount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="本次发生金额（出）" align="left">
              <template scope="scope">
                <span class="-p-red" v-if="scope.row.amount<0">
                  {{formatPoints(scope.row.amount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="发生后金额"  align="left">
              <template scope="scope">
                {{formatPoints(scope.row.balance)}}
              </template>
            </el-table-column>
            <!--<el-table-column label="操作" align="left">-->
              <!--<template scope="scope">-->
                <!--<el-button  type="text" @click="openModal(scope.row.businessKey)">查看战绩</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, jumper" :total="playerAccountList.length"
                           :page-size="20" @size-change="getNowsize" @current-change="getNowpage"
                           :current-page.sync="currentPage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
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
      data: 'playerAccount'
    })
  },
  activated: function () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'playerAccount'
    })
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      pageSize: 100,
      radioTime: '1',
      radioMoney: '',
      currentPage: 1,
      radioType: '',
      monthDate: '', // 月份快捷选择
      startDate: '', // 开始时间搓
      endDate: '', // 结束时间搓
      allAmount: 0,
      isOpenModal: false,
      isShowSearch: false,
      isFetching: false,
      isLastMessage: false, // 主要判断是否是后台返回最后一次信息
      typeList: {
        '3': '下注',
        '4': '返奖',
        '5': '返还',
        '10': '系统升级原账结余',
        '11': '中心钱包转入',
        '12': '中心签到转出',
        '14': '购买游戏结算',
        '15': '代理操作'
      },
      checkedArray: [], // 选中的数据数组
      amountDate: [], // 时间日期选择
      playerAccountList: [], // 玩家流水账列表
      playerRecordList: [], // 玩家战绩列表
      playerAccountListStorage: [],
      playerAccountListStartKey: ''
    }
  },
  mounted () {
    this.changeTime()
  },
  computed: {
    dataList () {
      if (this.nowPage === 1) {
        return this.playerAccountList.slice(0, this.nowSize)
      } else {
        return this.playerAccountList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    },
    userName () {
      return formatUserName(this.$store.state.variable.playerUserName || localStorage.playerName)
    },
    formatNum () {
      this.allAmount = 0
      for (let item of this.playerAccountList) {
        this.allAmount += Number(item.amount)
      }
      return thousandFormatter(this.allAmount)
    }
  },
  methods: {
    getAtime (row, col) {
      return detailTime(row.createdAt)
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      if(page == Math.ceil(this.playerAccountList.length/this.nowSize) && !this.isFetching && page != 1 && !this.isLastMessage) {
        this.playerAccountListStorage = JSON.parse(JSON.stringify(this.playerAccountList))
        this.getPlayerAccount()
      }
    },
    getPlayerAccount () {
      if(this.isFetching) return
      this.isFetching = true
      // this.$store.commit('startLoading');
      invoke({
        url: api.playerAccount,
        method: api.post,
        data: {
          userName: localStorage.playerName,
          type: this.radioType,
          action: this.radioMoney,
          startTime: this.amountDate ? this.startDate : '',
          endTime: this.amountDate ? this.endDate : '',
          startKey: this.playerAccountListStartKey,
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
            this.playerAccountList = res.data.list
            this.playerAccountListStartKey = res.data.startKey
            this.playerAccountUserName = res.data.userName
            this.playerAccountListStorage.length && (this.playerAccountList = this.playerAccountListStorage.concat(this.playerAccountList))
          }
          // this.$store.commit('closeLoading')
          this.isFetching = false
        }
      )
    },
    openModal(data) {
      this.isOpenModal = true;
      invoke({
        url: api.playerRecord,
        method: api.post,
        data: {
          userName: localStorage.playerName,
          betId: data
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
            this.playerRecordList = JSON.parse(res.data.data.record.gameDetail)
            console.log(this.playerRecordList, 'this.playerRecordList')
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    changeTime () {
      const end = new Date();
      const start = new Date();
      if(this.radioTime){
        this.monthDate = '';
      }
      switch (+this.radioTime) {
        case 1:
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
          this.amountDate = [start,end];
              break;
        case 2:
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.amountDate = [start,end];
              break;
        case 3:
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
          this.amountDate = [start,end];
              break;
      }
    }, // 最近的时间快捷选择联动
    changeDate () {
      if(this.amountDate){
        this.startDate = new Date(this.amountDate[0].setMonth(this.amountDate[0].getMonth())).setHours(0,0,0,0);
        this.endDate = new Date(this.amountDate[1].setMonth(this.amountDate[1].getMonth())).setHours(0,0,0,0)+24*3600*1000-1;
      }else{
        this.radioTime = '';
        this.monthDate = '';
      }
      this.initData()
      this.getPlayerAccount()
    }, //日期改变联动
    changeMonth (date) {
      if(date && this.monthDate) {
        const month = new Date(date)
        const startDay = new Date(month.setMonth(month.getMonth(),1));
        const endDay = new Date(month.setMonth(month.getMonth()+1,0));
        this.amountDate = [startDay,endDay]
        this.radioTime = ''
      }
    }, // 月份联动
    selectionChange (val) {
      this.checkedArray = val;
      this.checkFormatNum = 0;
      for (let item of this.checkedArray) {
        this.checkFormatNum += Number(item.amount)
      }
      this.checkFormatNum = thousandFormatter(this.checkFormatNum)
    }, //多选
    searchData (bool) {
      !bool && (this.radioMoney = '',this.radioType = '');
      this.initData()
      this.getPlayerAccount()
    }, // 重置筛选条件
    formatPoints (num) {
      return thousandFormatter(num)
    },
    initData () {
      this.currentPage = 1;
      this.playerAccountList = [];
      this.playerAccountListStorage = []
      this.playerAccountListStartKey = ''
    }
  },
  filters:{   //过滤器，所有数字保留两位小数
    currency(value){
      return (value-0).toFixed(2);
    }
  },
  watch: {
    '$route': function (_new, _old) {
      if ((_old.fullPath === '/playerdetail') && (_new.fullPath != '/playerlist') && (localStorage.playerName != this.playerAccountUserName)){
        this.initData();
        this.changeDate()
      }
    }
  }
}
</script>

<style scpoed>
  .playerAccount .my-title{text-align: center;margin-bottom: 40px}
  h2{font-size: 2.5rem;color: #5a5a5a;padding-top: 2rem;}
  .playerAccount .baseinfo, .account-total,
  .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;}

  .playerAccount .baseinfo-form{background-color: #eef1f6;padding: 1rem;font-size: 0.8rem;overflow: hidden;margin-bottom: 10px}
  .playerAccount .baseinfo-form .from-search{margin-top: 10px}
  .playerAccount .countinfo-form{background-color: #fff;padding-left: 0;font-size: 0.8rem;overflow: hidden}

  .playerAccount p{overflow: hidden}
  .playerAccount .account-total{margin-bottom: 10px;font-size: 16px}
  .playerAccount .total-all{background-color: #c2e7fd;padding: 10px;border-radius: 4px}
  .playerAccount .total-check{background-color: #ffebbd;padding: 10px;border-radius: 4px;}
  .playerAccount .form-button{position: absolute;  top: 25%;  right: 0;}
  h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
