<template>
  <div class="bread">
    <el-breadcrumb separator="/" v-if="nowindex === 'board'" class="title">
      <el-breadcrumb-item><span  class="large">看板</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'outlist'" class="title">
      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
      <el-breadcrumb-item>线路商管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">线路商列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'outcreate'" class="title">
      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
      <el-breadcrumb-item>线路商管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">创建线路商</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'outdetail'" class="title">
      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
      <el-breadcrumb-item>线路商 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">线路商详情</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'comlist'" class="title">
      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
      <el-breadcrumb-item>商户管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">商户列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'comcreate'" class="title">
      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
      <el-breadcrumb-item>商户管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">创建商户</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'comdetail'" class="title">
      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
      <el-breadcrumb-item>商户管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">商户详情</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'playerlist'" class="title">
      <el-breadcrumb-item>玩家中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">玩家列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'playerdetail'" class="title">
      <el-breadcrumb-item>玩家中心 </el-breadcrumb-item>
      <el-breadcrumb-item>玩家列表 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">玩家详情</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'gamelist'" class="title">
      <el-breadcrumb-item>游戏中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">游戏列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'personal'" class="title">
      <el-breadcrumb-item>个人中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">个人详情</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'advertiselist'" class="title">
      <el-breadcrumb-item>运营中心 </el-breadcrumb-item>
      <el-breadcrumb-item>广告管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">广告列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'advertisedetail'" class="title">
      <el-breadcrumb-item>运营中心 </el-breadcrumb-item>
      <el-breadcrumb-item>广告管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">广告详情页</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'addadvertise'" class="title">
      <el-breadcrumb-item>运营中心 </el-breadcrumb-item>
      <el-breadcrumb-item>广告管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">添加广告</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'manager'" class="title">
      <el-breadcrumb-item>财务中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">直属线路商报表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'merchant'" class="title">
      <el-breadcrumb-item>财务中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">直属商户报表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'helplist'" class="title">
      <el-breadcrumb-item>客服中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">帮助信息列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'helpdetail'" class="title">
      <el-breadcrumb-item>客服中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">帮助信息详情</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'addhelp'" class="title">
      <el-breadcrumb-item>客服中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">新增帮助信息</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'managerloginlist'" class="title">
      <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>登录日志 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">线路商登录日志</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'merchantloginlist'" class="title">
      <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>登录日志 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">商户登录日志</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'admindate'" class="title">
      <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>操作日志 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">管理员操作日志</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'adminlist'" class="title">
      <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">管理员列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'addadmin'" class="title">
      <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">添加管理员</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'msnlist'" class="title">
      <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>线路号管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">线路号列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'gameBackstage'" class="title">
      <el-breadcrumb-item>游戏中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">游戏后台</span> </el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {
  name: 'bread',
  computed: {
    nowindex () {
      return this.$store.state.variable.nowIndex
    }
  }
}
</script>

<style scoped>
.bread{margin-left: 1rem;margin-top: 1rem}
.bread .title{line-height: 1.5rem;font-size: 0.8rem}
.bread .large{font-size: 1.2rem}
</style>
