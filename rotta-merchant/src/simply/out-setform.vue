<template>
  <div class="out-setform">
    <h2 class="title">配置代理信息</h2>
    <el-form :model="setOutinfo" :rules="rules" ref="setOutinfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="初始代理点数" prop="points">
        <el-input v-model="setOutinfo.points" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理可放商户名额" prop="limit">
        <el-input v-model="setOutinfo.limit" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理拥有的游戏">
        <el-select v-model="setOutinfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option label="棋牌游戏" :value="0" style="max-width:336px"></el-option>
            <el-option label="电子游戏" :value="1" style="max-width:336px"></el-option>
            <el-option label="真人视讯" :value="2" style="max-width:336px"></el-option>
        </el-select>
      </el-form-item>
      <h2 class="title">配置代理商后台管理员</h2>
      <el-form-item label="代理商管理员用户名" prop="username">
        <el-input v-model="setOutinfo.username" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员密码" prop="password">
        <el-input v-model="setOutinfo.password" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="randomPassword">生成</el-button>
      </el-form-item>
      <el-form-item label="代理商管理员真实姓名" prop="adminName">
        <el-input v-model="setOutinfo.adminName" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员邮箱" prop="adminEmail">
        <el-input v-model="setOutinfo.adminEmail" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员联系方式" prop="adminContact">
        <el-input v-model="setOutinfo.adminContact" class="input" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store/store'
import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import { checkUserEmail, checkAdmincontact, checkPoints, checkUsername, checkLimit, checkName, checkPassword } from '@/behavior/regexp'
export default {
  name: 'out-setform',
  data () {
    return {
      setOutinfo: {
        points: '', // 初始代理点数
        limit: '', // 可放名额
        gameList: [], // 拥有游戏
        username: '', // 代理商管理员用户名
        password: '', // 代理商管理员密码
        adminName: '', // 代理商管理员姓名
        adminEmail: '', // 代理商管邮箱
        adminContact: '' // 代理商管理员联系方式
      },
      rules: {
        points: [
          {validator: checkPoints, trigger: 'blur'}
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
            this.setOutinfo.password = data
            store.state.checkform.password = true
          }
        }
      )
    }
  },
  beforeDestroy () {
    this.$store.commit({
      type: 'recordOutcreate',
      data: this.setOutinfo
    })
    var outcreate = this.$store.state.variable.outcreate
    invoke({
      url: api.createUser,
      method: api.post,
      data: outcreate
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload
          
          this.$store.commit({
            type: 'recordOutsuccess',
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
