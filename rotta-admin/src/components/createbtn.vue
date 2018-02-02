<template>
  <div class="createBtn">

    <div v-if="nowindex === 'outcreate'">
      <div v-if="steps === 0">
        <el-button type="primary" class="createBtn-btn" @click="gosetout">下一步</el-button>
        <el-button class="" @click="reset">重置</el-button>
      </div>
      <div v-if="steps === 1">
        <el-button type="primary" class="createBtn-btn" @click="gosucout" :loading="loading">下一步</el-button>
        <el-button class="" @click="reset">重置</el-button>
      </div>
      <div v-if="steps === 3">
        <el-button type="primary" @click="goOutlist">返回列表</el-button>
        <el-button class="justfy" @click="goOutdetail"> 查 看 </el-button>
        <el-button @click="print"> 打 印 </el-button>
      </div>
    </div>

    <div v-if="nowindex === 'comcreate'">
      <div v-if="steps === 0">
        <el-button type="primary" class="createBtn-btn" @click="gosetcom">下一步</el-button>
        <el-button class="" @click="reset">重置</el-button>
      </div>
      <div v-if="steps === 1">
        <el-button type="primary" class="createBtn-btn" @click="gosuccom" :loading="loading">下一步</el-button>
        <el-button class="" @click="reset">重置</el-button>
      </div>
      <div v-if="steps === 3">
        <el-button type="primary" @click="goComlist">返回列表</el-button>
        <el-button class="justfy" @click="goComdetail"> 查 看 </el-button>
        <el-button @click="print"> 打 印 </el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  computed: {
    steps () {
      return this.$store.state.variable.steps
    },
    nowindex () {
      return this.$store.state.variable.nowIndex
    }
  },
  props: ['managerInfo', 'setOutinfo', 'merchantInfo', 'setcomInfo'],
  data () {
    return {
      loading: false,
      outinfo: this.managerInfo,
      outset: this.setOutinfo,
      cominfo: this.merchantInfo,
      comset: this.setcomInfo
    }
  },
  watch: {
    result (val) {
      if (this.nowindex === 'outcreate' && this.steps === 0) {
        this.outinfo = val
      } else if (this.nowindex === 'outcreate' && this.steps === 1) {
        this.outset = val
      } else if (this.nowindex === 'comcreate' && this.steps === 0) {
        this.cominfo = val
      } else if (this.nowindex === 'comcreate' && this.steps === 1) {
        this.comset = val
      }
    },
    outinfo (val) {
      this.$emit('on-result-change', val)
    },
    outset (val) {
      this.$emit('on-result-change', val)
    },
    cominfo (val) {
      this.$emit('on-result-change', val)
    },
    comset (val) {
      this.$emit('on-result-change', val)
    }
  },
  methods: {
    gosetout () {
      if (this.$store.state.checkform.suffix === false || this.$store.state.checkform.displayName === false || this.$store.state.checkform.email === false || this.$store.state.checkform.hostName === false || this.$store.state.checkform.hostContact === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
      }
    }, // 填写线路商基本信息
    gosucout () {
      this.loading = true
      if (this.$store.state.checkform.points === false || this.$store.state.checkform.rate === false || this.$store.state.checkform.username === false || this.$store.state.checkform.password === false || this.$store.state.checkform.name === false || this.$store.state.checkform.userContact === false || this.$store.state.checkform.userEmail === false) {
        this.$message({
          message: '请完善配置信息',
          type: 'error'
        })
        this.loading = false
      } else {
        let self = this
        setTimeout(function(){
          self.loading = false
          self.$store.commit('changeSteps')
        },3000)
      }
    }, // 配置线路商信息
    gosetcom () {
      if (this.$store.state.checkform.suffix === false || this.$store.state.checkform.displayName === false || this.$store.state.checkform.email === false || this.$store.state.checkform.hostName === false || this.$store.state.checkform.hostContact === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
      }
    }, // 填写商户基本信息
    gosuccom () {
      this.loading = true
      if (this.$store.state.checkform.points === false || this.$store.state.checkform.rate === false || this.$store.state.checkform.msn === false || this.$store.state.checkform.loginWhitelist === false || this.$store.state.checkform.frontURL === false || this.$store.state.checkform.username === false || this.$store.state.checkform.password === false || this.$store.state.checkform.name === false || this.$store.state.checkform.userContact === false || this.$store.state.checkform.userEmail === false || this.$store.state.checkform.sn === false) {
        this.$message({
          message: '请完善配置信息',
          type: 'error'
        })
        this.loading = false
      } else {
        let self = this
        setTimeout(function(){
          self.loading = false
          self.$store.commit('changeSteps')
        },3000)
      }
    }, // 配置商户信息
    goOutlist () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'outlist'
      })
      this.$router.push('outlist')
    }, // 返回线路商列表
    goComlist () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'comlist'
      })
      this.$router.push('comlist')
    }, // 返回商户列表
    goOutdetail () {
      this.$store.commit({
        type: 'recordOutdetailID',
        data: this.$store.state.variable.outsuccess.userId
      })
      this.$router.push('outdetail')
    }, // 查看该线路商详情
    goComdetail () {
      this.$store.commit({
        type: 'recordComdetailID',
        data: this.$store.state.variable.comsuccess.userId
      })
      this.$router.push('comdetail')
    }, // 查看该商户详情
    reset () {
      if (this.nowindex === 'outcreate' && this.steps === 0) {
        this.outinfo = {
          suffix: '', // 线路商标识
          displayName: '', // 线路商昵称
          managerEmail: '', // 线路商邮箱
          parent: '', // 上级线路商
          remark: '', // 备注
          hostName: '', // 负责人
          hostContact: '', // 负责人联系方式
          contractPeriod: [], // 生效时间
          isforever: false // 是否永久有效
        }
      } else if (this.nowindex === 'outcreate' && this.steps === 1) {
        this.outset = {
          selectCompany: '', // 选择的游戏厂商
          selectGame: '', // 选择的厂商的游戏
          showSelect: [], // 列表展示数据
          points: '', // 初始代理点数
          rate: '', // 线路商抽成比
          gameList: [], // 拥有游戏
          username: '', // 代理商管理员用户名
          password: '', // 代理商管理员密码
          adminName: '', // 代理商管理员姓名
          adminEmail: '', // 代理商管邮箱
          adminContact: '' // 代理商管理员联系方式
        }
      } else if (this.nowindex === 'comcreate' && this.steps === 0) {
        this.cominfo = {
          suffix: '', // 标识
          displayName: '', // 商户昵称
          merchantEmail: '', // 商户邮箱
          parent: '', // 上级商户
          remark: '', // 备注
          hostName: '', // 负责人
          hostContact: '', // 负责人联系方式
          contractPeriod: [], // 生效时间
          isforever: false // 是否永久有效
        }
      } else if (this.nowindex === 'comcreate' && this.steps === 1) {
        this.comset = {
          selectCompany: '', // 选择的游戏厂商
          selectGame: '', // 选择的厂商的游戏
          showSelect: [], // 列表展示数据
          points: '', // 初始代理点数
          msn: '', // 线路号
          sn: '', // 商户标识
          rate: '', // 商户抽成比
          gameList: [], // 拥有游戏
          loginWhiteList: '', // 商户白名单
          frontURL: '', // 商户前端域名
          username: '', // 商户管理员用户名
          password: '', // 商户管理员密码
          adminName: '', // 商户管理员姓名
          adminEmail: '', // 商户管理员邮箱
          adminContact: '' // 商户管理员联系方式
        }
      }
    },
    print () {
      window.print()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createBtn{text-align: center;margin-top: 1rem;margin-bottom: 5rem;margin-left: -4rem}
.createBtn .createBtn-btn{margin-right: 7rem;margin-left: 1rem}
.createBtn .justfy{margin:0 10rem;}
</style>
