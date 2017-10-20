<template>
  <div class="createBtn">

    <div v-if="nowindex === 'outcreate'">
      <div v-if="steps === 0">
        <el-button type="primary" class="createBtn-btn" @click="gosetout">下一步</el-button>
        <el-button> 重 置 </el-button>
      </div>
      <div v-if="steps === 1">
        <el-button type="primary" class="createBtn-btn" @click="gosucout">下一步</el-button>
        <el-button> 重 置 </el-button>
      </div>
      <div v-if="steps === 3">
        <el-button type="primary" @click="goOutlist">返回列表</el-button>
        <el-button class="justfy"> 查 看 </el-button>
        <el-button @click="print"> 打 印 </el-button>
      </div>
    </div>

    <div v-if="nowindex === 'comcreate'">
      <div v-if="steps === 0">
        <el-button type="primary" class="createBtn-btn" @click="gosetcom">下一步</el-button>
        <el-button> 重 置 </el-button>
      </div>
      <div v-if="steps === 1">
        <el-button type="primary" class="createBtn-btn" @click="gosuccom">下一步</el-button>
        <el-button> 重 置 </el-button>
      </div>
      <div v-if="steps === 3">
        <el-button type="primary" @click="goComlist">返回列表</el-button>
        <el-button class="justfy"> 查 看 </el-button>
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
  methods: {
    gosetout () {
      if (this.$store.state.checkform.suffix === false || this.$store.state.checkform.displayName === false || this.$store.state.checkform.email === false || this.$store.state.checkform.rate === false || this.$store.state.checkform.hostName === false || this.$store.state.checkform.hostContact === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
      }
    }, // 填写线路商基本信息
    gosucout () {
      // console.log(this.$store.state.checkform)
      if (this.$store.state.checkform.points === false || this.$store.state.checkform.limit === false || this.$store.state.checkform.username === false || this.$store.state.checkform.password === false || this.$store.state.checkform.name === false || this.$store.state.checkform.userContact === false || this.$store.state.checkform.userEmail === false) {
        this.$message({
          message: '请完善配置信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
      }
    }, // 填写商户基本信息
    gosetcom () {
      if (this.$store.state.checkform.suffix === false || this.$store.state.checkform.displayName === false || this.$store.state.checkform.email === false || this.$store.state.checkform.rate === false || this.$store.state.checkform.hostName === false || this.$store.state.checkform.hostContact === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
      }
    }, // 配置线路商信息
    gosuccom () {
      // console.log(this.$store.state.checkform)
      if (this.$store.state.checkform.points === false || this.$store.state.checkform.msn === false || this.$store.state.checkform.loginWhitelist === false || this.$store.state.checkform.frontURL === false || this.$store.state.checkform.username === false || this.$store.state.checkform.password === false || this.$store.state.checkform.name === false || this.$store.state.checkform.userContact === false || this.$store.state.checkform.userEmail === false) {
        this.$message({
          message: '请完善配置信息',
          type: 'error'
        })
      } else {
        this.$store.commit('changeSteps')
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

    }, // 查看该线路商详情
    goComdetail () {

    }, // 查看该商户详情
    print () {
      window.print()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createBtn{text-align: center;margin-top: 1rem;margin-bottom: 5rem}
.createBtn-btn{margin-right: 10.5rem;margin-left: 1rem}
.justfy{margin:0 10rem;}
</style>
