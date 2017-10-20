<template>
  <div class="com-setform">
    <h2 class="title">配置代理信息</h2>
    <el-form :model="setcomInfo" :rules="rules" ref="setcomInfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="商户点数" prop="points">
        <el-input v-model="setcomInfo.points" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户线路号" prop="msn">
        <el-input v-model="setcomInfo.msn" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="randomMSN">随机分配</el-button>
      </el-form-item>
      <el-form-item label="代理拥有的游戏">
        <el-select v-model="setcomInfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option label="棋牌游戏" :value="0" style="max-width:336px"></el-option>
            <el-option label="电子游戏" :value="1" style="max-width:336px"></el-option>
            <el-option label="真人视讯" :value="2" style="max-width:336px"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户白名单" prop="loginWhiteList">
        <el-input v-model="setcomInfo.loginWhiteList" placeholder="请输入IP地址或IP范围,一行一个规则,每行以分号结尾" type="textarea" :rows="4" class="input" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="商户域名" prop="frontURL">
        <el-input v-model="setcomInfo.frontURL" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="checkURL">验证</el-button>
      </el-form-item>
      <h2 class="title">配置商户后台管理员</h2>
      <el-form-item label="商户管理员用户名" prop="username">
        <el-input v-model="setcomInfo.username" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户管理员密码" prop="password">
        <el-input v-model="setcomInfo.password" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="randomPassword">生成</el-button>
      </el-form-item>
      <el-form-item label="商户管理员真实姓名" prop="adminName">
        <el-input v-model="setcomInfo.adminName" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户管理员邮箱" prop="adminEmail">
        <el-input v-model="setcomInfo.adminEmail" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户管理员联系方式" prop="adminContact">
        <el-input v-model="setcomInfo.adminContact" class="input" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store/store'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import { checkUserEmail, checkAdmincontact, checkPoints, checkUsername, checkLimit, checkName, checkPassword, checkLoginWhiteList, checkMSN, checkURL } from '@/behavior/regexp'
export default {
  name: 'out-setform',
  data () {
    return {
      setcomInfo: {
        points: '', // 初始代理点数
        msn: '', // 线路号
        gameList: [], // 拥有游戏
        loginWhiteList: '', // 商户白名单
        frontURL: '', // 商户前端域名
        username: '', // 商户管理员用户名
        password: '', // 商户管理员密码
        adminName: '', // 商户管理员姓名
        adminEmail: '', // 商户管理员邮箱
        adminContact: '' // 商户管理员联系方式
      },
      rules: {
        points: [
          {validator: checkPoints, trigger: 'blur'}
        ],
        msn: [
          {validator: checkMSN, trigger: 'blur'}
        ],
        limit: [
          {validator: checkLimit, trigger: 'blur'}
        ],
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        adminEmail: [
          {validator: checkUserEmail, trigger: 'blur'}
        ],
        adminContact: [
          {validator: checkAdmincontact, trigger: 'blur'}
        ],
        adminName: [
          {validator: checkName, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        loginWhiteList: [
          {validator: checkLoginWhiteList, trigger: 'blur'}
        ],
        frontURL: [
          {validator: checkURL, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    randomPassword () {
      invoke({
        url: api.randomPassword,
        method: api.post
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload.generatedPassword
            this.setcomInfo.password = data
            store.state.checkform.password = true
          }
        }
      )
    },
    randomMSN () {
      invoke({
        url: api.randomMSN,
        method: api.get
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var data = ret.data.payload
            data = ((parseFloat(data) * 0.001).toFixed(3) + '').substring(2)
            this.setcomInfo.msn = data
            store.state.checkform.msn = true
          }
        }
      )
    },
    checkURL () {
      var url = 'https://' + this.setcomInfo.frontURL
      window.open(url)
    }
  },
  beforeDestroy () {
    this.$store.commit({
      type: 'recordComcreate',
      data: this.setcomInfo
    })
    var comcreate = this.$store.state.variable.comcreate
    invoke({
      url: api.createUser,
      method: api.post,
      data: comcreate
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          // console.log('注册线路商成功后返回数据是:', data)
          this.$store.commit({
            type: 'recordComsuccess',
            data: data
          })
        }
      }
    )
  }
}
</script>

<style scoped>
.out-setform{width:39rem;margin: 0 auto;}
.title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
.input{width: 20rem}
</style>
