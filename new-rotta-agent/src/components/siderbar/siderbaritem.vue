<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">
      <el-menu-item :index='`${item.path}`' v-if="!item.children">{{item.name}}</el-menu-item>
      <el-submenu :index="`${item.name}`" v-else>
          <template slot="title">{{item.name}}</template>
          <sidebar-item :routes='item.children'></sidebar-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>

