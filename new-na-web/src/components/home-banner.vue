<template>
  <div class="banner">
    <home-menu />
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.index">
        <img :src="item.banner" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import homeMenu from './home-menu'
export default {
  name: 'home-banner',
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      banners: [
      //  {banner: require('@/assets/img/banner1.jpg') },
      //  {banner: require('@/assets/img/banner2.jpg') },
        {banner: require('@/assets/img/banner1.jpg')}
      ]
    }
  },
  components: {
    swiper,
    swiperSlide,
    homeMenu
  }
}
</script>

<style lang="stylus" scoped>
.banner
  position relative
  width 100%
  .swiper-container
    width 100%
    .swiper-pagination
      position absolute
      bottom 30px
    .swiper-slide
      height auto
  img 
    width 100%
    height 100%
</style>

