<template>
  <div>
    <el-row class="g-text-left" style="margin-bottom: 15px">
      <el-col :span="6">交易时间：{{formatterTime(dataProp.createdAt)}}</el-col>
      <el-col :span="6">交易类型：{{dataProp.typeName}}</el-col>
    </el-row>
    <el-row class="g-text-left" style="margin-bottom: 15px">
      <el-col :span="6">结算前余额：{{formatPoints(dataProp.originalAmount)}}</el-col>
      <el-col :span="4">操作金额：{{formatPoints(dataProp.betAmount)}}</el-col>
      <el-col :span="4">返还金额：{{formatPoints(dataProp.retAmount)}}</el-col>
      <el-col :span="4">净利润：
        <span :class="{'-p-green':dataProp.profitAmount>0,'-p-red':dataProp.profitAmount<0}">{{formatPoints(dataProp.profitAmount)}}</span>
      </el-col>
      <!--<el-col :span="6">结算余额：-->
        <!--<span :class="{'-p-green':dataProp.balance>0,'-p-red':dataProp.balance<0}">{{formatPoints(dataProp.balance)}}</span>-->
      <!--</el-col>-->
    </el-row>

    <el-table  :data="dataList">
      <el-table-column prop="sn" label="流水号" align="left"></el-table-column>
      <el-table-column prop="createdAt" label="交易时间" align="left">
        <template scope="scope">
          {{formatterTime(scope.row.createdAt)}}
        </template>
      </el-table-column>
      <el-table-column label="交易类型" align="left">
        <template scope="scope">
          {{typeList[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="originalAmount" label="帐变前余额" align="left">
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
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { detailTime, thousandFormatter } from '@/behavior/format'
  import { invoke } from '@/libs/fetchLib'
  import api from '@/api/api'

  export default {
    name: 'oneRunningAccount',
    props:['dataProp'],
    data () {
      return {
        typeList: {
          '3': '下注',
          '4': '返奖',
          '5': '返还',
          '10': '系统升级原账结余',
          '11': '中心钱包',
          '12': '代理操作',
          '13': '商城'
        }
      }
    },
    computed:{
      dataList(){
       return this.dataProp.content
      }
    },
    methods:{
      formatterTime (row) {
        return row ? detailTime(row) : '-'
      }, // 格式化创建时间
      formatPoints (num) {
        return thousandFormatter(num)
      } // 千位符格式化
    }
  }
</script>

<style scoped>
  .-p-green{color: #00CC00}
  .-p-red{color: #FF3300}
</style>
