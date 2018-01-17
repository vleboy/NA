<template>
  <div class="bread">
    <el-breadcrumb separator="/" v-if="nowindex === 'board'" class="title">
      <el-breadcrumb-item>看板系统 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">看板</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'gamelist'" class="title">
      <el-breadcrumb-item>游戏中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">游戏列表</span> </el-breadcrumb-item>
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

    <el-breadcrumb separator="/" v-if="nowindex === 'gameBackstage'" class="title">
      <el-breadcrumb-item>游戏中心 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">游戏后台</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'propList'" class="title">
      <el-breadcrumb-item>道具管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">道具列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'packageList'" class="title">
      <el-breadcrumb-item>道具管理 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">礼包列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'addGame'" class="title">
      <el-breadcrumb-item>游戏列表 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">创建游戏</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'gameList'" class="title">
      <el-breadcrumb-item>游戏列表 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">游戏列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'operatorList'" class="title">
      <el-breadcrumb-item>游戏供应商 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">供应商列表</span> </el-breadcrumb-item>
    </el-breadcrumb>

    <el-breadcrumb separator="/" v-if="nowindex === 'addOperator'" class="title">
      <el-breadcrumb-item>游戏供应商 </el-breadcrumb-item>
      <el-breadcrumb-item><span  class="large">创建游戏供应商</span> </el-breadcrumb-item>
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
