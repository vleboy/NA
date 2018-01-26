<template>
  <div class="login">

    <div class="login-left">
      <p class="title-big">NA 线路商后台管理系统</p>
    </div>

    <div class="login-center"></div>

    <div class="login-right">
      <el-form :model="userInfo" :ref="userInfo" label-position="right" label-width="100px">
        <el-form-item label="用户名" prop="">
          <el-input class="input" v-model="userInfo.username" placeholder="请输入" :maxlength='16'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="">
          <el-input class="input" type="password" v-model="userInfo.password" placeholder="请输入" :maxlength='16'></el-input>
        </el-form-item>
        <el-form-item label="线路商标识" prop="">
          <el-input class="input" v-model="userInfo.suffix" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="captcha-form" prop="">
          <el-input placeholder="请输入" class="captcha-input" v-model="userInfo.captcha" :maxlength='4'></el-input>
          <div class="code-imgbox" @click="getcaptcha" v-loading="codeFetching">
            <el-button class="code-btn" type="text" v-if="!userInfo.getcode">获取验证码</el-button>
            <img v-else class="code-img" :src="userInfo.getcode">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="botton justfy1" :loading="loading" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
// import { checkUsername, checkPassword, checkCaptcha, checkSuffix } from '@/behavior/regexp'
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      userInfo: {
        role: '10',
        username: '', // 用户名
        password: '', // 密码
        suffix: '', // 线路商标识
        captcha: '', // 验证码
        getcode: '' // 获取到的验证码
      },
      codeFetching: false
    }
  },
  methods: {
    getcaptcha () {
      if (!this.userInfo.username || !this.userInfo.suffix) {
        this.$message({
          message: '请输入用户名和线路商标识以获取验证码',
          type: 'error'
        })
      } else {
        if (this.codeFetching) return
        var user = {
          usage: 'login',
          relKey: this.userInfo.suffix.trim() + '_' + this.userInfo.username.trim()
        }
        this.codeFetching = true
        invoke({
          url: api.randomCaptcha,
          method: api.post,
          data: user
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.codeFetching = false
            } else {
              var captcha = ret.data.payload
              // console.log('验证码是', captcha)
              this.codeFetching = false
              this.userInfo.getcode = `data:image/png;base64,${captcha}`
            }
          }
        )
      }
    }, // 获取验证码
    login () {
      this.loading = true
      var log = this.userInfo
      invoke({
        url: api.login,
        method: api.post,
        data: log
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            this.userInfo.captcha = ''
            this.userInfo.getcode = ''
            this.getcaptcha()
            this.loading = false
          } else {
            var success = ret.data.payload
            // console.log('登录成功返回数据', success)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.loading = false
            this.$store.commit({
              type: 'recordToken',
              data: success.token
            })
            this.$router.push('welcome')
            var info = {
              username: success.username,
              userId: success.userId,
              userRole: success.role
            }
            this.$store.commit({
              type: 'recordUserinfo',
              data: info
            })
            let loginTime = new Date()
            loginTime = new Date(loginTime.toString()).getTime()
            localStorage.setItem('loginTime', loginTime)
            localStorage.setItem('loginToken', success.token)
            localStorage.setItem('loginLevel', success.level)
            localStorage.setItem('loginId', success.userId)
            localStorage.setItem('loginRole', success.role)
            localStorage.setItem('loginDislayName', success.displayName)
            localStorage.setItem('loginUsername', success.username)
            this.$store.commit('changeIslogin')
          }
        }
      )
    }, // 登录操作
    forgotPassword () {
    } // 忘记密码
  }
}
</script>

<style scoped>
.login{
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
/**/
.login .login-left{flex: 0.45; text-align: right;}
.login .login-center{flex: 0.1; text-align: center}
.login .login-right{flex: 0.45; text-align: left;}
/**/
.login .title-big{font-size: 3rem;}
.login .title-small{font-size: 1.2rem;margin-top: 0.5rem}
/**/
.login .input{width: 15rem;}
.login .captcha-form:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.login .captcha-input{width: 7.5rem;float: left;}
.login .code-imgbox{width: 7.2rem; height: 2.1rem; margin-left: 0.15rem;float: left;}

/**/
.login .justfy1{width: 15rem;}
.code-img{width: 7.2rem; height: 34px;border: 1px solid #eee; border-radius: 2px}
.code-btn{text-align: center;width: 100%}
</style>
