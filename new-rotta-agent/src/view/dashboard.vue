<template>
  <div class="dashboard">
    <navbar />
  </div>
</template>

<script>
import navbar from 'components/navbar/navbar'
export default {
  name: 'dashboard',
  components: {
    navbar
  }
}
</script>

<style lang="stylus" scoped>
.dashboard
  position relative
  width 100%
</style>

