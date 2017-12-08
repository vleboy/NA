<template>
  <div class="home">
    <home-banner />
    <home-prize />
    <home-platform />
    <home-video-player />
    <home-advantage />
    <home-news />
    <home-dynamic />
    <home-service-plan />
    <home-download />
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
import homeDynamic from '@/components/home-dynamic'
import homeNews from '@/components/home-news'
import homeAdvantage from '@/components/home-advantage'
import homeVideoPlayer from '@/components/home-video-player'
import homePlatform from '@/components/home-platform'
import homePrize from '@/components/home-prize'
import homeBanner from '@/components/home-banner'
export default {
  name: 'Home',
  components: {
    homeFooter,
    homeCooperation,
    homeContactus,
    homeDownload,
    homeServicePlan,
    homeDynamic,
    homeNews,
    homeAdvantage,
    homeVideoPlayer,
    homePlatform,
    homePrize,
    homeBanner
  }
}
</script>

<style lang="stylus" scoped>
</style>

