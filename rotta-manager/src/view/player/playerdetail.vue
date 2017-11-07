<template>
  <div class="playerdetail">
    <div class="playdetailform">
      <div class="my-title">
        <h2>{{userName}}</h2>
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
          <span class="justfy2">当前剩余点数：<span style="color: #F7BA2A">{{detailInfo.balance|currency}}</span></span>
          <el-button type="text" style="margin-right: 1rem" @click="getPlayerDetail">刷新</el-button>
          <el-radio-group v-model="radioInfo" @change="changeRadio()">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="10000">棋牌游戏</el-radio-button>
            <el-radio-button label="40000">电子游戏</el-radio-button>
            <el-radio-button label="30000">真人视讯</el-radio-button>
            <el-radio-button label="-1">中心钱包</el-radio-button>
            <el-radio-button label="-3">商城</el-radio-button>
          </el-radio-group>
        </div>
        <div class="countinfo-center">
          <el-col :span="5">
            <span>花费总点数 : <span class="-p-red">{{allAmountFun|currency}}</span></span>
          </el-col>

          <el-col :span="7" style="float: right; text-align: right">
            <el-date-picker
              v-model="amountDate"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
            <el-button type="primary" @click="searchAmount">搜索</el-button>
          </el-col>
        </div>
        <div class="countinfo-form">
          <el-table border :data="dataList">
            <el-table-column prop="date" label="序号" width="65" align="center" type="index"></el-table-column>
            <el-table-column prop="nowPoints" label="账户余额" width="120" align="center">
              <template scope="scope">
                {{(scope.row.originalAmount+scope.row.amount)|currency}}
              </template>
            </el-table-column>
            <el-table-column label="交易点数" width="120" align="center">
              <template scope="scope">
                <span :class="{'-p-green':scope.row.action ==1,'-p-red':scope.row.action ==-1}">{{scope.row.amount|currency}}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易时间" :formatter="getAtime" width="180" align="center"></el-table-column>
            <el-table-column prop="typeName" label="交易类型" width="120" align="center"></el-table-column>
            <el-table-column label="交易详情(原账+当前操作额=现在余额)"  align="center">
              <template scope="scope">
                <span>{{scope.row.originalAmount}}</span><span :class="{'-p-green':scope.row.action ==1,'-p-red':scope.row.action ==-1}">
                <span v-if="scope.row.action==1">+</span>{{scope.row.amount}}</span>=<span>{{(scope.row.originalAmount+scope.row.amount)|currency}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operator" label="操作人" width="160" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          </el-table>
          <div style="text-align: right;margin:2rem 0">
            <el-pagination layout="prev, pager, next, sizes, jumper" :total="detailInfo.list.length"
                           :page-sizes="[20, 50]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { detailTime, formatUserName } from '@/behavior/format'
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
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      radioInfo: '0',
      searchArray: [],
      amountDate: [],
      allAmount: 0,
      isShowRadio: false, // 切换数据来源
      isGetSearch: false, // 判断是否从搜索点入
      detailList: []
    }
  },
  mounted () {
    if(!this.$store.state.variable.playerDetail.length){
      this.getPlayerDetail(localStorage.playerName)
    }
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
      return detailTime(this.$store.state.variable.playerDetail.createAt)
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
          if (item.amount < 0 && (item.kindId!=-1)) {
            this.allAmount = item.amount + this.allAmount
          }
        }
      } else {
        for (let item of this.detailList.list) {
          if (item.amount < 0 && (item.kindId!=-1)) {
            this.allAmount = item.amount + this.allAmount
          }
        }
      }
      return Math.abs(this.allAmount)
    }
  },
  methods: {
    getPlayerDetail (param) {
      let name = this.$store.state.variable.playerDetail.userName || param
      this.amountDate = []
      this.$store.commit('startLoading')
      invoke({
        url: `${api.getPlayDetail}?userName=${name}`,
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
            this.detailList = res.data
            this.changeRadio()
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    getAtime (row, col) {
      return detailTime(row.updateAt)
    }, // 格式化创建时间
    getNowsize (size) {
      this.nowSize = size
    },
    getNowpage (page) {
      this.nowPage = page
    },
    changeRadio () {
      this.isShowRadio = true
      if (!this.isGetSearch) {
        this.amountDate = []
      }
      this.detailList = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
      if (this.radioInfo !== '0') {
        this.searchArray = []
        for (let item of this.detailList.list) {
          if (item.kindId === Number(this.radioInfo)) {
            this.searchArray.push(item)
          }
        }
        this.detailList.list = this.searchArray
        this.isGetSearch = false
      }
    },
    searchAmount () {
      const [startDate, endDate] = this.amountDate
      this.isShowRadio = true
      this.isGetSearch = true
      if (!this.amountDate.length) return this.$message.error('请选择时间段')
      this.detailList = JSON.parse(JSON.stringify(this.$store.state.variable.playerDetail))
      this.searchArray = []
      for (let item of this.detailList.list) {
        if (new Date(item.updateAt).setHours(0,0,0,0) >= new Date(startDate).getTime() &&
          (new Date(item.updateAt).setHours(0,0,0,0) <= new Date(endDate).getTime())) {
          this.searchArray.push(item)
        }
      }
      this.detailList.list = this.searchArray
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
  .my-title{text-align: center}
  h2{font-size: 2.5rem;color: #5a5a5a;padding-top: 2rem;}
  .baseinfo,
  .countinfo{padding: 0 2rem;margin: 0 auto;vertical-align: baseline;}

  .baseinfo-form,
  .countinfo-form{background-color: #f5f5f5;padding-left: 2rem;font-size: 0.8rem;overflow: hidden}

  .baseinfo-form span{display: inline-block;padding: 2.2rem 0}
  .countinfo-form{padding: 2rem;}

  .countinfo-title{background-color: #f5f5f5;font-size: 1.1rem;padding: 2rem; overflow: hidden}
  .countinfo-center{background-color: #f5f5f5;font-size: 1.1rem;padding:0 2rem; overflow: hidden}

  h4{font-size: 1.3rem;font-weight: normal;padding: 1.5rem 0;color: #5a5a5a}
  .justfy2{font-size: 1rem;padding-right: 1rem;}
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
