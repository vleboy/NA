<template lang="html">
    <div class="block">
      <!-- <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div> -->
      <el-carousel height="100%" autoplay>
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <img :src="item.imgUrl">
          <div class="imgCover" v-show="index === 0" @mousemove="move" @mouseout="out" ref="imgCover"></div>
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
        {imgUrl: '/static/banner2.jpg'},
        {imgUrl: '/static/banner1.jpg'},
        {imgUrl: '/static/banner3.jpg'},
        {imgUrl: '/static/banner4.jpg'}
      ]
    }
  },
  methods: {
    moveDown: function() {
      $.fn.fullpage.moveSectionDown()
    },
    move: function(ev) {
      let iX=ev.clientX-(this.$refs.imgCover[0].offsetWidth/2)
      let iY=ev.clientY-(this.$refs.imgCover[0].offsetHeight/2)
      if(-510 < iX && iX < 510) {
        this.$refs.imgCover[0].style.left= `${-iX/4}px`
      }
      if(-280 < iY && iY < 280) {
        this.$refs.imgCover[0].style.top= `${-iY/4}px`
      }
    },
    out: function() {
      this.$refs.imgCover[0].style.left = 0
      this.$refs.imgCover[0].style.top= 0
    }
  }
}
</script>

<style lang="less">
  .block {
    width: 100%;
    height: 100%;
    position: relative;
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
      bottom: 100px;
    }
    .el-carousel__arrow {
      font-size: 40px;
      width: 80px;
      height: 80px;
    }
    .down {
      position: absolute;
      bottom: 17px;
      left: 50%;
      transform: translateX(-52%);
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
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .block {
    .logo {
      top: 25px;
      left: 30px;
      width: 105px;
      height: 50px;
    }
    .el-carousel__indicators {
      bottom: 70px;
    }
    .down {
      width: 106px;
      height: 46px;
      bottom: 13px;
    }
  }
}
@media (max-width: 768px){
  .block {
    .el-carousel__indicators {
      bottom: 5%;
    }
  }
}
</style>
