<template>
  <div class="home">
    <home-banner />
    <home-prize />
    <section><home-platform /></section>
    <section><home-video-player /></section>
    <!-- <section> <home-advantage /></section>
    <home-news />
    <section><home-dynamic /></section>
    <section><home-service-plan /></section>
    <section> <home-download /></section>
    <section><home-contactus /></section>
    <section><home-cooperation /></section>
    <section><home-footer /></section>   -->
  </div>
</template>

<script>
import $ from 'jquery'

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
  },
  mounted () {
    // let lists = document.querySelectorAll('.boxs')
    // window.addEventListener('scroll', () => {
    //   let ScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   console.log(ScrollTop,lists[0].clientY)
    //   lists.forEach((item) => {
    //     if (ScrollTop >= item.offsetTop - 80) {
    //       item.setAttribute('class', item.getAttribute("class").concat(' animate'))
    //     }
    //   })
    // })
    var Panels = $('section')
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

