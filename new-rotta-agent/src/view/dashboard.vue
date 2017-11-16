<template>
  <div class="dashboard">
    <siderbar />
    <navbar />
    <div class="main-app">
      <router-view />
    </div>
  </div>
</template>

<script>
import siderbar from 'components/siderbar/siderbar'
import navbar from 'components/navbar/navbar'
export default {
  name: 'dashboard',
  components: {
    siderbar,
    navbar
  }
}
</script>

<style lang="stylus" scoped>
.dashboard
  position relative
  width 100%
  .main-app
    width calc(100% - 180px)
    margin 90px 0 0 180px
</style>

