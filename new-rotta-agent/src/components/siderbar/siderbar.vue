<template>
  <div class="siderbar">
    <h1><img src="../../../static/img/NAlogo.png" alt=""></h1>
    <el-menu
      default-active="$route.path" 
      class="el-menu-vertical-demo" 
      theme="dark"
      :router="true"
      :unique-opened="true">
      <sidebar-item :routes='routers'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './siderbaritem'
export default {
  name: 'siderbar',
  data () {
    return {
      routers: this.$router.options.routes[1].children
    }
  },
  mounted () {
    console.log(this.$route.path)
  },
  components: {
    SidebarItem
  }
}
</script>

<style lang="stylus" scoped>
.siderbar
  transition width .28s ease-out
  width 180px
  height 100%
  position fixed
  top 0
  bottom 0
  left 0
  z-index 1001
  overflow-y auto
  background #334258
  h1
    text-align center
    img 
      width 80%
  .el-menu
    border-right 0
</style>
