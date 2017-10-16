<template lang="html">
    <div class="block">
      <!-- <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div> -->
      <el-carousel height="100%" autoplay>
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <img :src="item.imgUrl">
        </el-carousel-item>
      </el-carousel>
      <!-- <div class="down" @click="moveDown()"></div> -->
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
      ]
    }
  }
}
</script>

<style lang="less" scoped>
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
      bottom: 5%!important;
    }
    .el-carousel__arrow {
      font-size: 40px;
      width: 80px;
      height: 80px;
    }
  }
</style>
