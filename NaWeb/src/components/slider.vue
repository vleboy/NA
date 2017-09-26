<template lang="html">
    <div class="block">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-carousel height="100%" autoplay>
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
      <div class="down" @click="moveDown()"></div>
     </div>
</template>

<script>
export default {
  methods: {
    moveDown: function() {
      $.fn.fullpage.moveSectionDown()
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
    .el-carousel__item:nth-child(3) {
       background: url('../assets/banner1.jpg') no-repeat;
       background-position: 0 10%;
       background-size: 100%;
    }
    .el-carousel__item:nth-child(4) {
      background: url('../assets/banner2.jpg') no-repeat;
      background-position: 0 100%;
      background-size: 100%;
    }
    .el-carousel__item:nth-child(5) {
      background: url('../assets/banner3.jpg') no-repeat;
      background-position: 0 25%;
      background-size: 100%;
    }
    .el-carousel__item:nth-child(6) {
      background: url('../assets/banner4.jpg') no-repeat;
      background-position: 0 80%;
      background-size: 100%;
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
      -webkit-transform: translateX(-52%);
              transform: translateX(-52%);
      margin: 0;
      padding: 0;
      z-index: 2;
      width: 158px;
      height: 68px;
      background: url('../assets/down.png') no-repeat;
      background-size: 100%;
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
</style>
