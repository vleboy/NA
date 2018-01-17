<template>
  <div>
	<el-row>
      <el-col>
          <el-menu :default-active="nowindex" theme="dark" :router="true" :unique-opened="true">
              <div class="logo"><img style=" width: 60%;" src="static/NAlogo.png"></div>
              <el-menu-item index="board">看板</el-menu-item>
              <el-submenu index="1">
                <template slot="title">游戏供应商</template>
                <el-menu-item index="operatorList">供应商列表</el-menu-item>
                <el-menu-item index="addOperator">创建供应商</el-menu-item>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">游戏列表</template>
                <el-menu-item index="gameList">游戏列表</el-menu-item>
                <el-menu-item index="addGame">创建游戏</el-menu-item>
              </el-submenu>

              </el-submenu>
              <el-submenu index="3">
                <template slot="title">道具管理</template>
                <el-menu-item index="propList">道具列表</el-menu-item>
                <el-menu-item index="packageList">礼包列表</el-menu-item>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">游戏中心</template>
                <el-menu-item index="gameBackstage">游戏后台</el-menu-item>
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
