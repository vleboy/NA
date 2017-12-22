<template>
  <div class="login">

    <div class="login-left">
      <p class="title-big">NA 游戏管理后台</p>
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
        <!--<el-form-item label="商户标识" prop="">-->
          <!--<el-input class="input" v-model="userInfo.suffix" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="验证码" class="captcha-form">
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

<script type="text/ecmascript-6">
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
// import { checkUsername, checkPassword, checkCaptcha, checkSuffix } from '@/behavior/regexp'
export default {
  name: 'login',
  computed: {
    loading () {
      return this.$store.state.variable.isloading
    }
  },
  mounted () {
  },
  data () {
    return {
      userInfo: {
        role: '1',
        username: '', // 用户名
        password: '', // 密码
        captcha: '' // 验证码
      },
      codeFetching: false
    }
  },
  methods: {
    getcaptcha () {
      if (!this.userInfo.username) {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        })
      } else {
        if (this.codeFetching) return
        var user = {
          usage: 'login',
          relKey: `Platform_${this.userInfo.username}`
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
              this.userInfo.getcode = `data:image/png;base64,${captcha}`
              this.codeFetching = false
            }
          }
        )
      }
    }, // 获取验证码
    login () {
      this.$store.commit('startLoading')
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
//            this.userInfo.captcha = ''
            this.getcaptcha()
            this.$store.commit('closeLoading')
          } else {
            var success = ret.data.payload
            console.log('登录成功返回数据', success)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$store.commit('closeLoading')
            this.$store.commit({
              type: 'recordToken',
              data: success.token
            })
            var info = {
              username: success.username,
              userId: success.userId,
              userRole: success.role
            }
            this.$store.commit({
              type: 'recordUserinfo',
              data: info
            })
            localStorage.setItem('loginToken', success.token)
            localStorage.setItem('loginLevel', success.level)
            localStorage.setItem('loginId', success.userId)
            localStorage.setItem('loginRole', success.role)
            localStorage.setItem('loginUsername', success.username)
            localStorage.setItem('loginParent', success.parent)
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
  height: 100%;
  width: 100%;
}
/**/
.login-left{flex: 0.4; text-align: right;}
.login-center{flex: 0.1; text-align: center}
.login-right{flex: 0.5; text-align: left;}
/**/
.title-big{font-size: 3rem;}
.title-small{font-size: 1.2rem;margin-top: 0.5rem}
/**/
.input{width: 15rem;}
.captcha-form:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.captcha-input{width: 7.5rem;float: left;}
.code-imgbox{width: 7.2rem; height: 2.1rem;margin-left: 0.15rem;float: left;}
.code-img{width: 7.2rem; height: 2.1rem; border: 1px solid #eee;}
.code-btn{text-align: center;width: 100%}

/**/
.login .justfy1{width: 15rem;}
</style>
