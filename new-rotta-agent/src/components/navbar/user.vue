<template>
  <div class="user">
    <div class="userBox">
      <img src="/static/img/admin.png" alt="头像" class="user-icon">
    </div>
    <el-dropdown trigger="click">
      <span class="username">NAagent</span>
        <el-dropdown-menu slot="dropdown">
          <p><el-dropdown-item><router-link :to="{ path: '/personal' }" >个人中心</router-link></el-dropdown-item></p>
          <p><el-dropdown-item>退出登录</el-dropdown-item></p>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'user'
}
</script>

<style lang="stylus" scoped>
.userBox
  display inline-block
  width 2.5rem
  height 2.5rem
  vertical-align -0.75rem
  img 
    width 100%
</style>


