<template>
  <div class="dashboard">
    <siderbar />
    <navbar />
  </div>
</template>

<script>
import siderbar from 'components/siderbar/siderbar'
import navbar from 'components/navbar/navbar'
export default {
  name: 'dashboard',
  mounted () {
    console.log(this.$router.path)
  },
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
</style>

