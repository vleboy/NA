<template>
  <div class="home">
    <!-- <Banner /> -->
    <home-service-plan />
    <homeDownload />
    <home-contactus />
    <home-cooperation />
    <home-footer />
  </div>
</template>

<script>
import homeFooter from '@/components/home-footer'
import homeCooperation from '@/components/home-cooperation'
import homeContactus from '@/components/home-contactus'
import homeDownload from '@/components/home-download'
import homeServicePlan from '@/components/home-service-plan'
export default {
  name: 'Home',
  components: {
    homeFooter,
    homeCooperation,
    homeContactus,
    homeDownload,
    homeServicePlan
  }
}
</script>

<style lang="stylus" scoped>
</style>

