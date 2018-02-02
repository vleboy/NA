<template>
  <div class="createBtn">
    <div v-if="nowindex === 'comcreate'">
      <div v-if="steps === 0">
        <el-button type="primary" class="createBtn-btn" @click="gosetcom">下一步</el-button>
        <el-button class="" @click="reset">重置</el-button>
      </div>
      <div v-if="steps === 1">
        <el-button type="primary" class="createBtn-btn" @click="gosuccom">下一步</el-button>
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
    gosetcom () {
      if (this.$store.state.checkform.sn === false || this.$store.state.checkform.username === false || this.$store.state.checkform.password === false || this.$store.state.checkform.displayName === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
      }
    }, // 配置代理信息
    gosuccom () {
      if (this.$store.state.checkform.points === false || this.$store.state.checkform.rate === false || localStorage.nowGameList == 'false') {
        if (localStorage.nowGameList == 'false' && this.$store.state.checkform.points === true && this.$store.state.checkform.rate === true) {
          this.$message({
            message: '请选择至少一款游戏！',
            type: 'error'
          })
        } else {
          this.$message({
            message: '请完善配置信息',
            type: 'error'
          })
        }
      } else {
        this.$store.commit('changeSteps')
        localStorage.removeItem('nowGameList')
      }
    }, // 配置代理信息
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
    }, // 返回代理列表
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
    }, // 查看该代理详情
    reset () {
      if (this.nowindex === 'outcreate' && this.steps === 0) {
        this.outinfo = {
          suffix: '', // 线路商标识
          displayName: '', // 线路商昵称
          rate: '', // 线路商抽成比
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
          points: '', // 初始代理点数
          limit: '', // 可放名额
          gameList: [], // 拥有游戏
          username: '', // 代理商管理员用户名
          password: '', // 代理商管理员密码
          adminName: '', // 代理商管理员姓名
          adminEmail: '', // 代理商管邮箱
          adminContact: '' // 代理商管理员联系方式
        }
      } else if (this.nowindex === 'comcreate' && this.steps === 0) {
        this.cominfo = {
          sn: '', // 代理标识
          username: '', // 代理用户名
          password: '', // 代理密码
          displayName: '', // 代理昵称
          parent: '', // 上级代理
          remark: '', // 备注
          contractPeriod: 0, // 生效时间
          isforever: true, // 是否永久有效
          snType: '' //默认代理标识
        }
        if (localStorage.loginSuffix == 'Agent') {
          this.cominfo.sn = 'NA369'
        } else {
          this.cominfo.sn = localStorage.loginSn
        }
      } else if (this.nowindex === 'comcreate' && this.steps === 1) {
        this.comset = {
          company: '', // 选择的游戏厂商
          selectGame: '', // 选择的厂商的游戏
          showSelect: [], // 列表展示数据
          gameList: [], // 代理游戏
          points: '', // 代理点数
          rate: '' // 代理抽成比
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
.createBtn{text-align: center;margin-top: 1rem;margin-bottom: 5rem;}
.createBtn .createBtn-btn{margin-right: 7rem;margin-left: 1rem}
.createBtn .justfy{margin:0 10rem;}
</style>
