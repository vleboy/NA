<template>
  <div class="loginbar">
    <div class="helpBox">
      <img src="/static/icon.png" alt="帮助" class="help-icon">
    </div>
    <span class="help" @click="showSlider">层级关系</span>
    <div class="userBox">
      <img src="/static/admin.png" alt="头像" class="user-icon">
    </div>
    <el-dropdown trigger="click">
      <span class="username">{{formatUser(username)}}</span>
        <el-dropdown-menu slot="dropdown">
          <p @click="goPersonal"><el-dropdown-item>个人中心</el-dropdown-item></p>
          <p @click="logout"><el-dropdown-item>退出登录</el-dropdown-item></p>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'loginbar',
  computed: {
    username () {
      return localStorage.loginUsername
    }
  },
  methods: {
    goPersonal () {
      this.$router.push('personal')
    }, // 进入个人中心页面
    logout () {
      this.$confirm('是否退出登录?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '您已退出登录!'
        })
        this.$store.commit({
          type: 'recordNowindex',
          data: 'board'
        })
        this.$router.push('welcome')
        this.$store.commit('resetTab')
        this.$store.commit('logout')
        localStorage.clear()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }, // 退出登录操作
    showSlider () {
      this.$store.commit('isMap')
    }, // 呼出层级关系
    formatUser (o) {
      if (o) {
        return o.split('_')[1]
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.loginbar{margin: 0.5rem 1rem 0 0}
.loginbar .helpBox{display: inline-block;width: 1.1rem;height: 1.1rem;vertical-align: -0.1rem}
.loginbar .help-icon{width: 100%;height: 100%;}
.loginbar .help{margin-right: 0.4rem;vertical-align: 0.1rem;cursor: pointer;color: #20a0ff;}

.loginbar .userBox{display: inline-block;width: 2.5rem;height: 2.5rem;vertical-align: -0.75rem}
.loginbar .user-icon{width: 100%;height: 100%}
.loginbar .username{font-size: 1.1rem;cursor: pointer;}
/* .el-dropdown-menu{background-color: #000} */
</style>
