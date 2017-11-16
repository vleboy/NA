<template>
  <div class="siderbar">
    <h1><img src="../../../static/img/NAlogo.png" alt=""></h1>
    <el-menu
      default-active="managerloginlist" 
      class="el-menu-vertical-demo" 
      theme="dark"
      :router="true"
      :unique-opened="true">
      <el-menu-item index="board">看板</el-menu-item>
      <el-menu-item index="personal">个人中心</el-menu-item>
      <el-submenu index="1">
        <template slot="title">代理中心</template>
        <el-menu-item index="/merchant/comlist">代理列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">玩家中心</template>
        <el-menu-item index="agentPlayerList">玩家列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">游戏中心</template>
        <el-menu-item index="gameBackstage">游戏后台</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">系统设置</template>
        <el-submenu index="3-1">
            <template slot="title">登录日志</template>
            <el-menu-item index="managerloginlist">管理员登录日志</el-menu-item>
            <el-menu-item index="merchantloginlist">代理登录日志</el-menu-item>
        </el-submenu>
        <el-submenu index="3-2">
            <template slot="title">操作日志</template>
            <el-menu-item index="admindate">管理员操作日志</el-menu-item>
        </el-submenu>
        <el-submenu index="3-3">
            <template slot="title">管理员管理</template>
            <el-menu-item index="adminlist">管理员列表</el-menu-item>
            <el-menu-item index="addadmin">添加管理员</el-menu-item>
        </el-submenu>
    </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'siderbar'
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
