<template>
  <div>
	<el-row>
      <el-col>
          <el-menu :default-active="nowindex" theme="dark" :router="true" :unique-opened="true">
              <div class="logo"><img style=" width: 70%;" src="static/NAlogo.png"></div>
              <el-menu-item index="board">看板</el-menu-item>
              <el-menu-item index="personal">个人中心</el-menu-item>
              <el-submenu index="1">
                <template slot="title">代理中心</template>
                <el-menu-item index="comlist">代理列表</el-menu-item>
                <el-menu-item index="bfsetting">包房代理配置</el-menu-item>
              </el-submenu>
              <!-- <el-submenu index="1">
                  <template slot="title">代理中心</template>
                  <el-submenu index="1-2">
                      <template slot="title">代理管理</template>
                      <el-menu-item index="comlist">代理列表</el-menu-item>
                      <el-menu-item index="comcreate">创建代理</el-menu-item>
                  </el-submenu>
              </el-submenu> -->
              <el-submenu index="2">
                <template slot="title">玩家中心</template>
                <el-menu-item index="agentPlayerList">玩家列表</el-menu-item>
              </el-submenu>
              <!-- <el-submenu index="2">
                <template slot="title">玩家中心</template>
                  <el-menu-item index="agentPlayerList">玩家列表</el-menu-item>
                  <el-menu-item index="addPlayer">创建玩家</el-menu-item>
                  <el-menu-item index="agentPlayerStatistics">玩家统计</el-menu-item>
              </el-submenu> -->
              <el-submenu index="3">
                  <template slot="title">系统设置</template>
                  <el-submenu index="3-1">
                      <template slot="title">登录日志</template>
                      <el-menu-item index="managerloginlist" v-if="Number(this.level) === 0">管理员登录日志</el-menu-item>
                      <el-menu-item index="merchantloginlist">代理登录日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-2">
                      <template slot="title">操作日志</template>
                      <el-menu-item index="admindate">管理员操作日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-3" v-if="this.suffix === 'Agent'">
                      <template slot="title">管理员管理</template>
                      <el-menu-item index="adminlist">管理员列表</el-menu-item>
                      <el-menu-item index="addadmin">添加管理员</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">游戏中心</template>
                <el-menu-item index="gameBackstage">游戏后台</el-menu-item>
                <el-menu-item index="vedioGameReport">电子游戏总报表</el-menu-item>
              </el-submenu>
          </el-menu>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      level: localStorage.loginLevel,
      suffix: localStorage.loginSuffix
    }
  },
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
