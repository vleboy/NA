<template>
  <div class="naAllGame-report">
    <div class="nowUserlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">当前选择列表<!-- <span v-if="nowRole != loginId" class="fontUrl" @click="goBack()" style="font-size:1.2rem;font-weight:normal;margin-left:1rem">回到上一级</span> --></p>
        <div style="float:right;margin-right:1rem">
          <el-date-picker class="input" v-model="searchDate" type="datetimerange" placeholder="选择日期时间范围(默认最近一周)" :editable="false"></el-date-picker>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchData" :loading="loading">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="[]" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="总输赢金额" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="总商户交公司" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA电子游戏(商户交公司)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA真人游戏(商户交公司)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA街机游戏(商户交公司)" prop="betCount" align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="childlist" v-if="loginRole != '100'">
      <p class="title">下级列表</p>
      <el-table :data="[]" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="类型" prop="role" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="管理员账号" prop="username" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="总输赢金额" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="总商户交公司" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA电子游戏(商户交公司)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA真人游戏(商户交公司)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA街机游戏(商户交公司)" prop="betCount" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper"></el-pagination>
      </div>
    </div>

    <div class="playerlist">
      <div class="clearFix" style="margin-bottom:0.5rem">
        <p class="title" style="float:left">所属玩家列表</p>
        <div style="float:right;margin-right:1rem">
          <el-input placeholder="请输入玩家用户名" class="input" v-model="playerData"></el-input>
          <el-button type="primary" style="margin:0 -0.6rem 0 0.2rem" @click="searchPlayer" :loading="playerLoading">搜索</el-button>
          <el-button @click="resetPlayerSearch">重置</el-button>
        </div>
      </div>
      <el-table :data="[]" stripe>
        <el-table-column label="序号" prop="rank" align="center" width="75" type="index">
        </el-table-column>
        <el-table-column label="用户名" prop="role" align="center">
        </el-table-column>
        <el-table-column label="昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="交易次数" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="总输赢金额" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA电子游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA真人游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
        <el-table-column label="NA街机游戏(输赢金额)" prop="betCount" align="center">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'naAllGameReport'
    })
    this.$store.commit('returnLocalStorage')
  },
  data () {
    return {
      playerData: '',
      loading: false,
      playerLoading: false,
      searchDate: [],
      childSize: 10,
      childPage: 1,
      playerSize: 20,
      playerPage: 1,
      nowRole: '',
      loginId: localStorage.loginId,
      loginRole: localStorage.loginRole
    }
  }
}
</script>

<style scpoed>
.naAllGame-report .clearFix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.naAllGame-report .input{width: 25rem}
.naAllGame-report .page{padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
.naAllGame-report .title{font-size: 1.5rem;margin: 0 0 0.5rem 0;font-weight: 600;display: inline-block}
.naAllGame-report .nowUserlist,
.naAllGame-report .childlist,
.naAllGame-report .playerlist{width: 99%;margin: 2rem auto}
.naAllGame-report .fontUrl{cursor: pointer;color: #20a0ff}
.naAllGame-report .fontUrl:hover{text-decoration: underline;}

.green{color: #00CC00}
.red{color: #FF3300}
</style>
