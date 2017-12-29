$<template>
  <div class="playerdetail">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{userName}} <el-button  type="text" @click="accountDetail()">查看流水账详单</el-button></h2>
      </div>
      <div class="baseinfo">
        <h4>基本信息</h4>
        <div class="baseinfo-form">
          <p>
            <el-col :span="4"><span>所属商户：{{detailInfo.merchantName}}</span></el-col>
            <el-col :span="4"><span>线路号：{{detailInfo.msn}}</span></el-col>
            <el-col :span="7"><span>上次登录游戏时间：{{lastTime}}</span></el-col>
            <el-col :span="5"><span>电子游戏洗码比(%)：{{detailInfo.liveMix+'%'}}</span></el-col>
            <el-col :span="4"><span>真人游戏洗码比(%)：{{detailInfo.vedioMix+'%'}}</span></el-col>
          </p>
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
          <!--<el-radio-group v-model="radioInfo" @change="changeRadio()">-->
            <!--<el-radio-button label="0">全部</el-radio-button>-->
            <!--<el-radio-button label="10000">棋牌游戏</el-radio-button>-->
            <!--<el-radio-button label="40000">电子游戏</el-radio-button>-->
            <!--<el-radio-button label="30000">真人视讯</el-radio-button>-->
            <!--<el-radio-button label="50000">街机游戏</el-radio-button>-->
            <!--<el-radio-button label="-1">中心钱包</el-radio-button>-->
            <!--<el-radio-button label="-3">商城</el-radio-button>-->
          <!--</el-radio-group>-->
        </div>
        <div class="countinfo-center">
          <el-col :span="12">
            <span v-if='radioInfo!=-1'>输赢总计: <span :class="{'-p-green':this.allAmount>0,'-p-red':this.allAmount<0}">{{formatPoints(allAmountFun)}}</span></span>&emsp;
            <span class="justfy2">当前剩余点数：<span style="color: #F7BA2A">{{formatPoints(detailInfo.balance)}}</span></span>
            <el-button type="text" style="margin-right: 1rem" @click="getPlayerDetail">刷新</el-button>
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
            <el-table-column prop="billId" label="账单号" width="120" align="center"></el-table-column>
            <el-table-column prop="nowPoints" label="账户余额" width="120" align="center">
              <template scope="scope">
                {{formatPoints(scope.row.originalAmount+scope.row.amount)}}
              </template>
            </el-table-column>
            <el-table-column label="进入时间" :formatter="getBtime" width="180" align="center"></el-table-column>
            <el-table-column label="退出时间" :formatter="getAtime" width="180" align="center"></el-table-column>
            <el-table-column prop="typeName" label="交易类型" width="120" align="center"></el-table-column>
            <el-table-column prop="originalAmount" label="入账金额" width="120" align="center">
              <template scope="scope">
                {{formatPoints(scope.row.originalAmount)}}
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="游戏金额" width="120" align="center">
              <template scope="scope">
                <span :class="{'-p-green':scope.row.amount >=0,'-p-red':scope.row.amount < 0}">
                  {{formatPoints(scope.row.amount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="出账金额" width="120" align="center">
              <template scope="scope">
                <span>{{formatPoints(scope.row.originalAmount+scope.row.amount)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="帐类型" align="center">
              <template scope="scope">
                <span :class="{'-p-green':scope.row.amount >=0,'-p-red':scope.row.amount < 0}" v-if="scope.row.kindId!=-1&&scope.row.kindId!=-3">
                  {{(scope.row.amount>=0) ? '玩家赢' : '玩家输'}}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="operator" label="操作人" width="160" align="center"></el-table-column>
            <el-table-column label="备注" align="center">
              <template scope="scope">
                <el-popover trigger="hover" placement="bottom-start">
                  <p>{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</p>
                  <div slot="reference" class="g-text-ellipsis" style="width: 68px;">
                    {{ scope.row.remark }}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button  type="text" v-if="scope.row.kindId!=-3&&scope.row.kindId!=-1" @click="billDetail(scope.row)">查看详单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, sizes, jumper" :total="detailInfo.list.length"
                           :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"
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
      isShowRadio: false, // 切换数据来源
      isGetSearch: false, // 判断是否从搜索点入
      detailList: [],
      searchArray: [],
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
      ]
    }
  },
  mounted () {

    if(!this.$store.state.variable.playerDetail.length){
      this.getPlayerDetail(localStorage.playerName)
    }
    this.companySelect()
  },
  computed: {
    playerDetailList () {
      return JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
    },
    detailInfo () {
      if (!this.isShowRadio) {
        return this.playerDetailList
      } else {
        return this.detailList
      }
    },
    lastTime () {
      return detailTime(this.$store.state.variable.playerDetail.updateAt)
    },
    dataList () {
      if (!this.isShowRadio) { // 主要是处理从层级关系跳转至玩家详细的逻辑
        if (this.nowPage === 1) {
          return this.playerDetailList.list.slice(0, this.nowSize)
        } else {
          return this.playerDetailList.list.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      } else {
        if (this.nowPage === 1) {
          return this.detailList.list.slice(0, this.nowSize)
        } else {
          return this.detailList.list.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
        }
      }
    },
    userName () {
      return formatUserName(this.$store.state.variable.playerDetail.userName || localStorage.playerName)
    },
    allAmountFun () {
      this.allAmount = 0
      if (!this.isShowRadio) {
        for (let item of this.playerDetailList.list) {
          if (item.kindId != '-1') {
            this.allAmount = item.amount + this.allAmount
          }
        }
      } else {
        for (let item of this.detailList.list) {
          if (item.kindId != '-1') {
            this.allAmount = item.amount + this.allAmount
          }
        }
      }
      return this.allAmount
    },
  },
  methods: {
    getAtime (row, col) {
      return detailTime(row.createAt)
    }, // 格式化退出时间
    getBtime (row, col) {
      if(row.joinTime) {
        return detailTime(row.joinTime)
      } else {
        return '-'
      }
    }, // 格式化进入时间
    getNowsize (size) {
      this.nowSize = size
      // console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    },
    changeRadio () {
      console.log(111)
      this.getPlayerDetail()
//      if(this.amountDate.length){
//        this.searchAmount()
//      } else {
//        this.detailList = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
//      }
//      this.isShowRadio = true
//
//      if (this.radioInfo !== '0') {
//        this.searchArray = []
//        for (let item of this.detailList.list) {
//          if (item.kindId === Number(this.radioInfo)) {
//            this.searchArray.push(item)
//          }
//        }
//        this.detailList.list = this.searchArray
//        this.isGetSearch = false
//      }
    },
    getPlayerDetail (param) {
      this.initTime()
      let name = this.$store.state.variable.playerDetail.userName || param
      let [startTime, endTime] = this.amountDate
      startTime = new Date(startTime).getTime()
      endTime = new Date(endTime).getTime()
      // this.$store.commit('startLoading')
      invoke({
        url: `${api.getPlayDetail}?userName=${name}&company=${this.companyInfo}&kindId=${this.radioInfo}
        &startTime=${startTime}&endTime=${endTime}`,
        method: api.get
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          } else {
            this.$store.commit({
              type: 'playerDetail',
              data: res.data
            })
//            this.detailList = res.data
//            this.changeRadio()
          }
          // this.$store.commit('closeLoading')
        }
      )
    },
    searchAmount () {
//      const [startDate, endDate] = this.amountDate
      this.currentPage = 1;
      this.getPlayerDetail()
//      this.isShowRadio = true
//      this.isGetSearch = true
//      console.log(this.amountDate)
//      if (!this.amountDate.length) return this.$message.error('请选择时间段')
//      this.detailList = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
//      this.searchArray = []
//      if(this.amountDate[0]==null || this.amountDate[1]==null) {
//        this.radioInfo = ""
//        this.amountDate = []
//        this.detailList.list = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail)).list
//      } else {
//        for (let item of this.detailList.list) {
//          if (new Date(item.updateAt).setHours(0,0,0,0) >= new Date(startDate).getTime() &&
//            (new Date(item.updateAt).setHours(0,0,0,0) <= new Date(endDate).getTime())) {
//            this.searchArray.push(item)
//          }
//        }
//
//        // 这里是先选按钮 在过滤时间
//        if (this.radioInfo!=='0') {
//          this.detailList.list = []
//          for (let item of this.searchArray) {
//            if (item.kindId === Number(this.radioInfo)) {
//              this.detailList.list.push(item)
//            }
//          }
//        } else {
//          this.detailList.list = this.searchArray
//        }
//      }
    },
    billDetail (row) {
      localStorage.setItem('playerBillId', row.billId)
      localStorage.setItem('playerGameType', row.gameType)
      this.$store.commit({
        type: 'playerGameType',
        data: row.gameType
      })
      this.$router.push('playerBill')
    },
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
      const start = new Date();
      const end = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      this.amountDate = [start,end];
    }
  },
  filters:{   //过滤器，所有数字保留两位小数
    currency(value){
      return (value-0).toFixed(2);
    }
  },
  watch: {
    '$route': function (_new, _old) {
      if (_old.fullPath === '/playerlist' || _old.fullPath ==='/vedioGameReport' || _old.fullPath ==='/liveGameReport') {
        this.getPlayerDetail(localStorage.playerName)
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

  .playerdetail .baseinfo-form span{display: inline-block;padding: 2.2rem 0}
  .playerdetail .countinfo-form{padding: 2rem;}

  .playerdetail .countinfo-title{background-color: #f5f5f5;font-size: 1.1rem;padding: 2rem; overflow: hidden}
  .playerdetail .countinfo-center{background-color: #f5f5f5;font-size: 1.1rem;padding:0 2rem; overflow: hidden}
  .playerdetail h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .playerdetail .justfy2{font-size: 1rem;padding-right: 1rem;}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
