<template>
  <div id="app">
    <home-banner />
    <router-view/>
    <home-footer />
  </div>
</template>

<script>
import homeBanner from '@/components/home/home-banner'
import homeFooter from '@/components/home/home-footer'
export default {
  name: 'app',
  components: {
    homeBanner,
    homeFooter
  }
}
</script>

<style lang="stylus">
@import 'bulma/css/bulma.css';
@import 'nprogress/nprogress.css';
@import 'swiper/dist/css/swiper.css';
@import 'assets/style/main.styl';
</style>
