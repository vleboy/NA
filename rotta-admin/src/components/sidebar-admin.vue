<template>
  <div class="sidebar">
	<el-row>
      <el-col>
          <el-menu :default-active="nowindex" theme="dark" :router="true" :unique-opened="true">
              <div class="logo"><img style=" width: 60%;" src="static/NAlogo.png"></div>
              <el-menu-item index="board" v-show="userRight.board.hasRight">看板</el-menu-item>
              <el-menu-item index="personal" v-show="userRight.personal.hasRight">个人中心</el-menu-item>
              <el-submenu index="1">
                  <template slot="title">输赢报表</template>
                  <!-- <el-menu-item index="">公司输赢总报表</el-menu-item> -->
                  <el-submenu index="1-1">
                      <template slot="title">NA游戏报表</template>
                      <el-menu-item index="naAllGameReport">NA游戏总报表</el-menu-item>
                      <el-menu-item index="naVedioGameReport">NA电子游戏报表</el-menu-item>
                      <el-menu-item index="naLiveGameReport">NA真人游戏报表</el-menu-item>
                      <el-menu-item index="naArcadeGameReport">NA街机游戏报表</el-menu-item>
                      <el-menu-item index="naMallReport">NA商城总报表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-2">
                      <template slot="title">TTG游戏总报表</template>
                      <!-- <el-menu-item index="ttgAllGameReport">TTG游戏总报表</el-menu-item> -->
                      <el-menu-item index="ttgVedioGameReport">TTG电子游戏报表</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-submenu index="2" v-show="userRight.managerList.hasRight || userRight.outcreate.hasRight || userRight.merchantList.hasRight || userRight.comcreate.hasRight">
                  <template slot="title">商户中心</template>
                  <el-submenu index="2-1" v-show="userRight.managerList.hasRight || userRight.outcreate.hasRight">
                      <template slot="title">线路商管理</template>
                      <el-menu-item index="outlist" v-show="userRight.managerList.hasRight">线路商列表</el-menu-item>
                      <el-menu-item index="outcreate" v-show="userRight.outcreate.hasRight">创建线路商</el-menu-item>
                  </el-submenu>
                  <el-submenu index="2-2" v-show="userRight.merchantList.hasRight || userRight.comcreate.hasRight">
                      <template slot="title">商户管理</template>
                      <el-menu-item index="comlist" v-show="userRight.merchantList.hasRight">商户列表</el-menu-item>
                      <el-menu-item index="comcreate" v-show="userRight.comcreate.hasRight">创建商户</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-submenu index="3" v-show="userRight.playerlist.hasRight">
                  <template slot="title">玩家中心</template>
                  <el-menu-item index="playerlist">玩家列表</el-menu-item>
              </el-submenu>
              <el-submenu index="4" v-show="userRight.gamelist.hasRight || userRight.gameBackstage.hasRight">
                  <template slot="title">游戏中心</template>
                  <el-menu-item index="gamelist" v-show="userRight.gamelist.hasRight">游戏列表</el-menu-item>
                  <el-menu-item index="gameBackstage" v-show="userRight.gameBackstage.hasRight">游戏后台</el-menu-item>
              </el-submenu>

              <el-submenu index="5" v-show="userRight.gameNoticeList.hasRight || userRight.horseRaceLampList.hasRight || userRight.gameMailList.hasRight || userRight.boothList.hasRight || userRight.computerGame.hasRight">
                  <template slot="title">运营中心</template>
                  <!-- <el-submenu index="5-1">
                      <template slot="title">赛事管理</template>
                        <el-menu-item index=""></el-menu-item>
                  </el-submenu>
                  <el-submenu index="5-2">
                      <template slot="title">活动管理</template>
                        <el-menu-item index=""></el-menu-item>
                  </el-submenu> -->
                  <el-submenu index="5-2">
                    <template slot="title">NA游戏配置</template>
                    <el-menu-item index="videoGameConfig">NA电子游戏配置</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5-3">
                    <template slot="title">TTG游戏配置</template>
                    <el-menu-item index="videoGameConfigTTG">TTG电子游戏配置</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5-4">
                    <template slot="title">神秘大奖</template>
                    <el-menu-item index="prizePlayerList">玩家中奖列表</el-menu-item>
                    <el-menu-item index="prizeConfig">奖品配置</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5-5" v-show="userRight.gameNoticeList.hasRight || userRight.horseRaceLampList.hasRight">
                      <template slot="title">公告管理</template>
                       <el-menu-item index="gameNoticeList" v-show="userRight.gameNoticeList.hasRight">游戏公告列表</el-menu-item>
                       <el-menu-item index="horseRaceLampList" v-show="userRight.horseRaceLampList.hasRight">跑马灯列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5-6" v-show="userRight.gameMailList.hasRight">
                      <template slot="title">邮件管理</template>
                      <el-menu-item index="gameMailList">游戏邮件列表</el-menu-item>
                  </el-submenu>

                  <el-submenu index="5-7" v-show="userRight.boothList.hasRight">
                    <template slot="title">展位管理</template>
                    <el-menu-item index="boothList">展位列表</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="businessRecord">商户运营记录</el-menu-item>
                  <el-menu-item index="propPrice">道具定价</el-menu-item>
              </el-submenu>
              <el-submenu index="6" v-show="userRight.computerGame.hasRight">
                <template slot="title">风控中心</template>
                <el-menu-item index="computerGame">NA电子游戏</el-menu-item>
              </el-submenu>
              <!-- <el-submenu index="6" v-show="this.userRight.finance === true">
                  <template slot="title">财务中心</template>
                  <el-menu-item index="manager">直属线路商报表</el-menu-item>
                  <el-menu-item index="merchant">直属商户报表</el-menu-item>
              </el-submenu> -->
                <!-- <el-menu-item index="propertycenter">财务中心</el-menu-item> -->
             <!--  <el-menu-item index="control" v-show="this.userRight.risk === true">风控中心</el-menu-item> -->

              <!-- <el-submenu index="6" v-show="this.userRight.service === true">
                  <template slot="title">客服中心</template>
                    <el-submenu index="6-1">
                      <template slot="title">帮助信息</template>
                        <el-menu-item index="helplist">帮助列表</el-menu-item>
                        <el-menu-item index="helpdetail">帮助详情</el-menu-item>
                        <el-menu-item index="addhelp">新增帮助</el-menu-item>
                    </el-submenu>
              </el-submenu> -->
              <el-submenu index="7" v-show="userRight.managerloginlist.hasRight || userRight.merchantloginlist.hasRight || userRight.admindate.hasRight || userRight.adminlist.hasRight || userRight.addadmin.hasRight || userRight.adminright.hasRight || userRight.msnlist.hasRight">
                  <template slot="title">系统设置</template>
                  <el-submenu index="7-1" v-show="userRight.managerloginlist.hasRight || userRight.merchantloginlist.hasRight">
                      <template slot="title">登录日志</template>
                      <el-menu-item index="managerloginlist" v-show="userRight.managerloginlist.hasRight">线路商登录日志</el-menu-item>
                      <el-menu-item index="merchantloginlist" v-show="userRight.merchantloginlist.hasRight">商户登录日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="7-2" v-show="userRight.admindate.hasRight">
                      <template slot="title">操作日志</template>
                      <el-menu-item index="admindate">管理员操作日志</el-menu-item>
                  </el-submenu>
                  <el-submenu index="7-3" v-show="userRight.adminlist.hasRight || userRight.addadmin.hasRight || userRight.adminright.hasRight ||userRight.addcharacter.hasRight">
                      <template slot="title">管理员管理</template>
                      <el-menu-item index="adminlist" v-show="userRight.adminlist.hasRight">管理员列表</el-menu-item>
                      <el-menu-item index="addadmin" v-show="userRight.addadmin.hasRight">添加管理员</el-menu-item>
                      <el-menu-item index="adminright" v-show="userRight.adminright.hasRight">管理员角色列表</el-menu-item>
                      <el-menu-item index="addcharacter" v-show="userRight.addcharacter.hasRight">新增管理员角色</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="msnlist" v-show="userRight.msnlist.hasRight">线路号列表</el-menu-item>
              </el-submenu>
              <!-- <el-menu-item index="lineup" v-show="this.userRight.person === true">排队设置</el-menu-item> -->
          </el-menu>
      </el-col>
  </el-row>
  </div>
</template>

<script>
import crypto from '@/crypto/crypto'
export default {
  name: 'sidebar',
  computed: {
    nowindex () {
      return this.$store.state.variable.nowIndex
    }
  },
  data () {
    return {
      userRight: {
        rottaMap: {
          hasRight: false,
          name: '层级关系'
        }, // 层级关系
        board: {
          hasRight: false,
          name: '看板'
        }, // 看板
        personal: {
          hasRight: false,
          name: '个人中心'
        }, // 个人中心
        managerList: {
          hasRight: false,
          name: '线路商列表'
        }, // 线路商列表
        outcreate: {
          hasRight: false,
          name: '创建线路商'
        }, // 创建线路商
        merchantList: {
          hasRight: false,
          name: '商户列表'
        }, // 商户列表
        comcreate: {
          hasRight: false,
          name: '创建商户'
        }, // 创建商户
        playerlist: {
          hasRight: false,
          name: '玩家列表'
        }, // 玩家列表
        gamelist: {
          hasRight: false,
          name: '游戏列表'
        }, // 游戏列表
        gameBackstage: {
          hasRight: false,
          name: '游戏后台'
        }, // 游戏后台
        gameNoticeList: {
          hasRight: false,
          name: '游戏公告列表'
        }, // 游戏公告列表
        horseRaceLampList: {
          hasRight: false,
          name: '跑马灯列表'
        }, // 跑马灯列表
        gameMailList: {
          hasRight: false,
          name: '游戏邮件列表'
        }, // 游戏邮件列表
        boothList: {
          hasRight: false,
          name: '展位列表'
        }, // 展位列表
        computerGame: {
          hasRight: false,
          name: '电子游戏风控'
        }, // 电子游戏风控
        managerloginlist: {
          hasRight: false,
          name: '线路商登录日志'
        }, // 线路商登录日志
        merchantloginlist: {
          hasRight: false,
          name: '商户登录日志'
        }, // 商户登录日志
        admindate: {
          hasRight: false,
          name: '管理员操作日志'
        }, // 管理员操作日志
        adminlist: {
          hasRight: false,
          name: '管理员列表'
        }, // 管理员列表
        addadmin: {
          hasRight: false,
          name: '添加管理员'
        }, // 添加管理员
        adminright: {
          hasRight: false,
          name: '管理员角色列表'
        }, // 管理员权限
        addcharacter: {
          hasRight: false,
          name: '新增管理员角色'
        }, // 管理员权限
        msnlist: {
          hasRight: false,
          name: '线路号列表'
        } // 线路号列表
      } // 所有权限
    }
  },
  mounted () {
    var key = localStorage.loginToken.substring(0,6)
    var fuck = JSON.parse(crypto.aesDecrypt(localStorage.userRight, key))
    for (let index in this.userRight) {
      if(fuck.indexOf(this.userRight[index].name) != -1) {
        this.userRight[index].hasRight = true
      }
    }
  },
  methods: {
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
.sidebar{padding-bottom: 5rem}
</style>
