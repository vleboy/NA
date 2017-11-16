<template>
  <div class="navbar">
    <div class="navbar-top">
      <div class="breadcrumb">
        <el-breadcrumb separator="/" class="title">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item><span  class="large">看板</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user-info">
        <div class="userBox">
          <img src="/static/img/admin.png" alt="头像" class="user-icon">
        </div>
        <el-dropdown trigger="click">
          <span class="username">NAagent</span>
            <el-dropdown-menu slot="dropdown">
              <p><el-dropdown-item>个人中心</el-dropdown-item></p>
              <p><el-dropdown-item>退出登录</el-dropdown-item></p>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="navbar-bottom">
      <el-tabs v-model="editableTabsValue2" type="card" closable >
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          {{item.content}}
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      editableTabsValue2: '2',
      editableTabs2: [
        {
          title: 'Tab 1',
          name: '1'
        },
        {
          title: 'Tab 2',
          name: '2'
        }
      ],
      tabIndex: 2
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar
  position fixed
  top 0
  left 180px
  height 90px
  width calc(100% - 180px)
  background #eef1f6
  .navbar-top
    display flex
    justify-content space-between
    .breadcrumb 
      margin 1rem 0 0 1rem
      .large
        font-size 1.2rem
      .title
        line-height 1.2rem
    .user-info
      margin .5rem 1rem 0 0
      cursor pointer
      .userBox
        display inline-block
        width 2.5rem
        height 2.5rem
        vertical-align -0.75rem
        img 
          width 100%
</style>


