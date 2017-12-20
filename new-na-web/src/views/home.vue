<template>
  <div class="home">
    <home-prize />
    <section><home-platform /></section>
    <section><home-video-player /></section>
    <section> <home-advantage /></section>
    <home-news />
    <section><home-dynamic /></section>
    <section><home-service-plan /></section>
    <section> <home-download /></section>
    <section><home-contactus /></section>
    <section><home-cooperation /></section>
  </div>
</template>

<script>
import $ from 'jquery'

import homeCooperation from '@/components/home/home-cooperation'
import homeContactus from '@/components/home/home-contactus'
import homeDownload from '@/components/home/home-download'
import homeServicePlan from '@/components/home/home-service-plan'
import homeDynamic from '@/components/home/home-dynamic'
import homeNews from '@/components/home/home-news'
import homeAdvantage from '@/components/home/home-advantage'
import homeVideoPlayer from '@/components/home/home-video-player'
import homePlatform from '@/components/home/home-platform'
import homePrize from '@/components/home/home-prize'
export default {
  name: 'Home',
  head: {
    title: 'NA首页'
  },
  components: {
    homeCooperation,
    homeContactus,
    homeDownload,
    homeServicePlan,
    homeDynamic,
    homeNews,
    homeAdvantage,
    homeVideoPlayer,
    homePlatform,
    homePrize
  },
  mounted () {
    let Panels = $('section')
    if (Panels.length) {
      $(window).on('scroll', function () {
        var ScrollTop = $(window).scrollTop()
        for (var i = 0; i < Panels.length; i++) {
          if (ScrollTop >= Panels.eq(i).offset().top - 700) {
            Panels.eq(i).find('.boxs').addClass('animate')
            if (i === 2) {
              Panels.eq(i).find('.advantage-img').addClass('animationRight')
              Panels.eq(i).find('.advantage-items').addClass('animationLeft')
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

