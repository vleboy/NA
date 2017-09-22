<template>
  <div>
	<el-row>
      <el-col>
          <el-menu :default-active="nowindex" theme="dark" :router="true" :unique-opened="true" @select="openNewWindow">
              <el-menu-item index="board">看板</el-menu-item>
              <el-menu-item index="personal" v-if="this.userRight.person === true">个人中心</el-menu-item>
              <el-submenu index="1" v-if="this.userRight.merchant === true">
                  <template slot="title">商户中心</template>
                  <el-submenu index="1-1">
                      <template slot="title">线路商管理</template>
                      <el-menu-item index="outlist">线路商列表</el-menu-item>
                      <el-menu-item index="outcreate">创建线路商</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-2">
                      <template slot="title">商户管理</template>
                      <el-menu-item index="comlist">商户列表</el-menu-item>
                      <el-menu-item index="comcreate">创建商户</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-submenu index="2" v-if="this.userRight.player === true">
                  <template slot="title">玩家中心</template>
                  <el-menu-item index="playerlist">玩家列表</el-menu-item>
              </el-submenu>
              <el-submenu index="3" v-if="this.userRight.game === true">
                  <template slot="title">游戏中心</template>
                  <el-menu-item index="gamelist">游戏列表</el-menu-item>
                  <el-menu-item index="gameBackstage">游戏后台</el-menu-item>
              </el-submenu>
              <el-submenu index="4" v-if="this.userRight.operation === true">
                  <template slot="title">运营中心</template>
                  <!-- <el-submenu index="4-1">
                      <template slot="title">赛事管理</template>
                        <el-menu-item index=""></el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-2">
                      <template slot="title">活动管理</template>
                        <el-menu-item index=""></el-menu-item>
                  </el-submenu> -->
                 <!--  <el-submenu index="4-3">
                      <template slot="title">广告管理</template>
                      <el-menu-item index="advertiselist">广告列表</el-menu-item>
                      <el-menu-item index="advertisedetail">广告详情页</el-menu-item>
                      <el-menu-item index="addadvertise">添加广告</el-menu-item>
                  </el-submenu> -->
                  <el-submenu index="4-4">
                      <template slot="title">公告管理</template>
                       <el-menu-item index="gameNoticeList">游戏公告列表</el-menu-item>
                       <el-menu-item index="horseRaceLampList">跑马灯列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-5">
                      <template slot="title">站内信管理</template>
                      <el-menu-item index="gameMailList">游戏邮件列表</el-menu-item>
                  </el-submenu>

                  <el-submenu index="4-6">
                    <template slot="title">展位管理</template>
                    <el-menu-item index="boothList">展位列表</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <!-- <el-submenu index="5" v-if="this.userRight.finance === true">
                  <template slot="title">财务中心</template>
                  <el-menu-item index="manager">直属线路商报表</el-menu-item>
                  <el-menu-item index="merchant">直属商户报表</el-menu-item>
              </el-submenu> -->
                <!-- <el-menu-item index="propertycenter">财务中心</el-menu-item> -->
             <!--  <el-menu-item index="control" v-if="this.userRight.risk === true">风控中心</el-menu-item> -->

              <el-submenu index="6" v-if="this.userRight.service === true">
                  <template slot="title">客服中心</template>
                    <el-submenu index="6-1">
                      <template slot="title">帮助信息</template>
                        <el-menu-item index="helplist">帮助列表</el-menu-item>
                        <el-menu-item index="helpdetail">帮助详情</el-menu-item>
                        <el-menu-item index="addhelp">新增帮助</el-menu-item>
                    </el-submenu>
              </el-submenu>
              <el-submenu index="7" v-if="this.userRight.system === true || this.userRight.system">
                  <template slot="title">系统设置</template>
                  <el-submenu index="7-1" v-if="this.userRight.system === true">
                      <template slot="title">登录日志</template>
                      <el-menu-item index="managerloginlist">线路商登录日志</el-menu-item>
                      <el-menu-item index="merchantloginlist">商户登录日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="7-2" v-if="this.userRight.system === true">
                      <template slot="title">操作日志</template>
                      <el-menu-item index="admindate">管理员操作日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="7-3" v-if="this.userRight.system === true">
                      <template slot="title">管理员管理</template>
                      <el-menu-item index="adminlist">管理员列表</el-menu-item>
                      <el-menu-item index="addadmin">添加管理员</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="msnlist" v-if="this.userRight.system === true || this.userRight.system.msn === true">线路号列表</el-menu-item>
              </el-submenu>
              <!-- <el-menu-item index="lineup" v-if="this.userRight.person === true">排队设置</el-menu-item> -->
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
  },
  data () {
    return {
      userRight: JSON.parse(localStorage.userRight)
    }
  },
  methods: {
    openNewWindow (data) {
      console.log(data)
      // window.open('http://localhost:4800/#/' + data)
    }
  }
}
</script>

<style scoped>

</style>
