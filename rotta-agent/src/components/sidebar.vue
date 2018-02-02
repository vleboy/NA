<template>
  <div>
	<el-row>
      <el-col>
          <el-menu :default-active="nowindex" theme="dark" :router="true" :unique-opened="true">
              <div class="logo"><img style=" width: 70%;" src="static/NAlogo.png"></div>
              <el-menu-item index="board">看板</el-menu-item>
              <el-menu-item index="personal">个人中心</el-menu-item>
              <el-submenu index="1">
                  <template slot="title">输赢报表</template>
                  <!-- <el-menu-item index="allReport">公司输赢总报表</el-menu-item> -->
                  <el-submenu index="1-1">
                      <template slot="title">NA游戏报表</template>
                      <!-- <el-menu-item index="naAllGameReport">NA游戏总报表</el-menu-item> -->
                      <el-menu-item index="naVedioGameReport">NA电子游戏报表</el-menu-item>
                      <!-- <el-menu-item index="naLiveGameReport">NA真人游戏报表</el-menu-item> -->
                      <el-menu-item index="naArcadeGameReport">NA街机游戏报表</el-menu-item>
                      <el-menu-item index="naMallReport">NA商城总报表</el-menu-item>
                      <el-menu-item index="commingSoon" ><a href="javascript:;" @click="getSign">NA真人游戏</a></el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-2">
                      <template slot="title">TTG游戏报表</template>
                      <!-- <el-menu-item index="ttgAllGameReport">TTG游戏总报表</el-menu-item> -->
                      <el-menu-item index="ttgVedioGameReport">TTG电子游戏报表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-3">
                      <template slot="title">SA游戏报表</template>
                      <el-menu-item index="saLiveGameReport">SA真人游戏报表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-4">
                      <template slot="title">MG游戏报表</template>
                      <el-menu-item index="mgVedioGameReport">MG电子游戏报表</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">代理中心</template>
                <el-menu-item index="comlist">代理列表</el-menu-item>
                <el-menu-item index="point-warning" v-if="suffix == 'Agent'">接入商点数告警列表</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">玩家中心</template>
                <el-menu-item index="agentPlayerList">玩家列表</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                  <template slot="title">系统设置</template>
                  <el-submenu index="4-1">
                      <template slot="title">登录日志</template>
                      <el-menu-item index="managerloginlist" v-if="Number(this.level) === 0">管理员登录日志</el-menu-item>
                      <el-menu-item index="merchantloginlist">代理登录日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-2">
                      <template slot="title">操作日志</template>
                      <el-menu-item index="admindate">管理员操作日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-3" v-if="this.suffix === 'Agent'">
                      <template slot="title">管理员管理</template>
                      <el-menu-item index="adminlist">管理员列表</el-menu-item>
                      <el-menu-item index="addadmin">添加管理员</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">游戏中心</template>
                <!-- <el-menu-item index="gameBackstage">游戏后台</el-menu-item> -->
                <el-menu-item index="bfsetting">包房代理游戏配置</el-menu-item>
              </el-submenu>
          </el-menu>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { invoke } from '@/libs/fetchLib'
import api from '@/api/api'
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
  },
  methods: {
    // 跳转NA真人后台
    getSign (item) {
      invoke({
        url: api.getSign,
        method: api.post,
        data: {
          gameType: 30000
        }
      })
      .then(res => {
        const [err, ret] = res
        if (err) {
          this.$message({
            message: err.msg,
            type: 'error'
          })
        } else {
          window.open(ret.data.url)
        }
      })
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
a {
  list-style: none;
  color: #ffffff;
  text-decoration-line: none;
}
</style>
