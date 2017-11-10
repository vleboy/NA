<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">NA 代理后台管理系统</h3>
    <el-form-item prop="username">
      <el-input type="text" placeholder="账号" v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" auto-complete="off" placeholder="密码" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input type="text" auto-complete="off" placeholder="验证码" style="width:70%;" v-model="loginForm.captcha"></el-input>
      <div @click="refresh" v-loading="load" class="code">
         <el-button class="code-btn" type="text" v-if="!codeImg">获取验证码</el-button>
         <img :src="`data:image/png;base64,${codeImg}`" alt="" v-else>
      </div>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from '@/api/api'
import validator from 'assets/lib/validator'
export default {
  name: 'login',
  data () {
    return {
      codeImg: '',
      load: false,
      loginForm: {
        role: '1000',
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { validator: validator.regxpAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validator.regxpPassword, trigger: 'blur' }
        ],
        captcha: [
          { validator: validator.regxpCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    refresh: function () {
      if (this.loginForm.username !== '') {
        this.load = true
        const data = {
          usage: 'login',
          relKey: this.loginForm.username
        }
        this.$http({
          method: 'post',
          url: api.getCode,
          data: data
        })
        .then(res => {
          this.codeImg = res.data.payload
          this.load = false
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        this.$message({
          message: '请输入用户名以获取验证码',
          type: 'error'
        })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginForm)
          this.$store.dispatch('login', this.loginForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login-container
    -webkit-border-radius 5px
    border-radius 5px
    -moz-border-radius 5px
    background-clip padding-box
    margin 120px auto
    width 350px
    padding 35px 35px 15px 35px
    background #fff
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
    .title
      margin 0px auto 40px auto
      text-align center
      color #505458
    .remember 
      margin 0px 0px 35px 0px
    .code
      display inline-block
      img 
        vertical-align middle
        cursor pointer
</style>