<template>
  <div class="navbar">
    <div class="navbar-top">
      <div class="breadcrumb">
        <bread />
      </div>
      <div class="user-info">
        <user />
      </div>
    </div>
    <tabs />
  </div>
</template>

<script>
import bread from 'components/navbar/bread'
import user from 'components/navbar/user'
import tabs from 'components/navbar/tabs'
export default {
  name: 'navbar',
  components: {
    bread,
    user,
    tabs
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
    .user-info
      margin .5rem 1rem 0 0
      cursor pointer
</style>


