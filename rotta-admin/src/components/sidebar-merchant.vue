<template>
  <div>
	<el-row>
      <el-col>
          <el-menu :default-active="nowindex" theme="dark" :router="true" :unique-opened="true">
              <div class="logo"><img style=" width: 60%;" src="static/NAlogo.png"></div>
              <el-menu-item index="board">看板</el-menu-item>
              <el-menu-item index="personal">个人中心</el-menu-item>
              <el-submenu index="2">
                  <template slot="title">玩家中心</template>
                  <el-menu-item index="playerlist">玩家列表</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                  <template slot="title">游戏中心</template>
                  <el-menu-item index="gamelist">游戏列表</el-menu-item>
                  <el-menu-item index="gameBackstage">游戏后台</el-menu-item>
              </el-submenu>
              <!-- <el-submenu index="4">
                  <template slot="title">运营中心</template>
              </el-submenu>
              </el-submenu>
              <el-submenu index="6">
                  <template slot="title">客服中心</template>
                    <el-submenu index="6-1">
                      <template slot="title">帮助信息</template>
                        <el-menu-item index="helplist">帮助列表</el-menu-item>
                        <el-menu-item index="helpdetail">帮助详情</el-menu-item>
                        <el-menu-item index="addhelp">新增帮助</el-menu-item>
                    </el-submenu>
              </el-submenu> -->
              <el-submenu index="7">
                  <template slot="title">系统设置</template>
                  <!-- <el-submenu index="7-1">
                      <template slot="title">登录日志</template>
                      <el-menu-item index="">玩家登录日志</el-menu-item>
                      <el-menu-item index="merchantloginlist">商户登录日志</el-menu-item>
                  </el-submenu> -->
                  <el-submenu index="7-2">
                      <template slot="title">操作日志</template>
                      <el-menu-item index="admindate">管理员操作日志</el-menu-item>
                  </el-submenu>
                  <!-- <el-submenu index="7-3">
                      <template slot="title">管理员管理</template>
                      <el-menu-item index="adminlist">管理员列表</el-menu-item>
                      <el-menu-item index="addadmin">添加管理员</el-menu-item>
                  </el-submenu> -->
                  <!-- <el-menu-item index="msnlist">线路号列表</el-menu-item> -->
              </el-submenu>
          </el-menu>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    nowindex () {
      return this.$store.state.variable.nowIndex
    }
  }
}
</script>

<style scoped>
.logo {
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  padding: 15px;
}
</style>
