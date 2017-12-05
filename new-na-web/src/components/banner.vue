<template>
  <div class="banner">
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
export default {
  name: 'banner',
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
       { banner: require('@/assets/img/banner1.jpg') },
       { banner: require('@/assets/img/banner2.jpg') },
       { banner: require('@/assets/img/banner3.jpg') }
      ]
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus" scoped>
.banner
  position relative
  width 100%
  height 900px
  .swiper-container
    width 100%
    height 100%
    .swiper-pagination
      position absolute
      bottom 30px
  img 
    width 100%
    height 100%
</style>

