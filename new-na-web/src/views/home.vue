<template>
  <div class="home">
    <!-- <Banner /> -->
    <home-cooperation />
    <home-footer />
  </div>
</template>

<script>
import homeFooter from '@/components/home-footer'
import homeCooperation from '@/components/home-cooperation'
export default {
  name: 'Home',
  components: {
    homeFooter,
    homeCooperation
  }
}
</script>

<style lang="stylus" scoped>
</style>

