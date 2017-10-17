<template lang="html">
    <div class="block">
      <!-- <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div> -->
      <el-carousel height="100%" autoplay class="landscape">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <img :src="item.imgUrl">
        </el-carousel-item>
      </el-carousel>

      <el-carousel height="100%" autoplay class="normal">
        <el-carousel-item v-for="(item,index) in banners2" :key="index">
          <img :src="item.imgUrl">
        </el-carousel-item>
      </el-carousel>
      <div class="down" @click="moveDown()"></div>
     </div>
</template>

<script>
export default {
  data () {
    return {
      banners: [
        {imgUrl: '/static/mobile/2.jpg'},
        {imgUrl: '/static/mobile/1.jpg'},
        {imgUrl: '/static/mobile/3.jpg'},
        {imgUrl: '/static/mobile/4.jpg'}
      ],
      banners2: [
        {imgUrl: '/static/mobile/mob3_h.jpg'},
        {imgUrl: '/static/mobile/mob4_h.jpg'},
        {imgUrl: '/static/mobile/mob2_h.jpg'},
        {imgUrl: '/static/mobile/mob1_h.jpg'}
      ]
    }
  },
  methods: {
    moveDown: function() {
      $.fn.fullpage.moveSectionDown()
    },
  }
}
</script>

<style lang="less" scoped>
  .block {
    width: 100%;
    height: 100%;
    position: relative;
    .normal {
      display: block;
    }
    .landscape {
       display: none
     }
    .logo {
      position: absolute;
      top: 35px;
      left: 45px;
      width: 160px;
      height: 80px;
      z-index: 99;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el-carousel {
      width: 100%;
      height: 100%;
    }
    .el-carousel__item h3 {
      height: 100%;
      color: #fff;
      font-size: 14px;
      opacity: 0.75;
      line-height: 100%;
      margin: 0;
    }
    .el-carousel__item {
       background-size: cover;
       background-repeat: no-repeat;
       img {
         width: 100%;
         height: 100%;
       }
       .imgCover {
         position: absolute;
         top: 0;
         width: 100%;
         height: 100%;
         background: url('../assets/gas.png') no-repeat;
         background-size: cover;
       }
    }
    .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 100%;
    }
    .el-carousel__indicators {
      bottom: 5%!important;
    }
    .el-carousel__arrow {
      font-size: 40px;
      width: 80px;
      height: 80px;
    }
    .down {
      position: absolute;
      bottom: -5%;
      left: 50%;
      transform: translateX(-52%)scale(.4);
      margin: 0px;
      padding: 0;
      z-index: 2;
      width: 158px;
      height: 68px;
      background: url('../assets/down.png') no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
@media screen and (orientation: portrait) {
  /*竖屏 css*/
   .block {
     .normal {
       display: none
     }
     .landscape {
       display: block
     }
     .down {
       bottom: -1%;
     } 
   }
}  
</style>
