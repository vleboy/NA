<template lang="html">
  <div class="about">
    <!-- <div class="left">
      <span>关于我们</span>
    </div> -->
    <div class="right">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <h1><i></i>数字娱乐新势力</h1>
      <p><span>新亚洲集团</span>是亚洲领先的数字娱乐解决方案供应商。我们作为一支立足于亚洲，面向全球的数字娱乐新势力， 为客户提供优质、灵活的数字娱乐内容是我们的使命， 通过我们对于互联网以及数字娱乐的理解来推动整个行业的发展是我们的愿景。</p>
      <div class="bottom">

      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('../assets/about.jpg') no-repeat;
  background-size: cover;

  .right {
    position: absolute;
    top: 54px;
    width: 25.42%;
    right: 202px;
    .logo {
      width: 258px;
      height: 129px;
      margin: 0 auto 59px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h1 {
      font-size: 52px;
      color: #333333;
      margin-bottom: 25px;
      i {
        display: inline-block;
        width: 38px;
        height: 43px;
        margin-right: 19px;
        background: url('../assets/iconRight.png') no-repeat;
        background-size: cover;
      }
    }
    p {
      font-size: 18px;
      color: #595959;
      line-height: 40.42508px;
      margin-bottom: 45px;
      span {
        font-size: 27px;
        color: #c00000;
      }
    }
    .bottom {
      width: 100%;
      height: 360px;
      background: url('../assets/rightImg.png') no-repeat;
      background-size: 100%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .about {
    .left {
      width: 159px;
      height: 179px;
      line-height: 179px;
      margin-left: 112px;
      span {
        font-size: 23px;
      }
    }
    .right {
      top: 65px;
      right: 10.47%;
      width: 25.47%;
      .logo {
        width: 172px;
        height: 86px;
        margin: 0 auto 45px;
      }
      h1 {
        font-size: 34px;
        margin-bottom: 20px;
        i {
          width: 25px;
          height: 29px;
        }
      }
      p {
        font-size: 12px;
        margin-bottom: 21px;
        span {
          font-size: 18px;
        }
      }
      .bottom {
        height: 240px;
      }
    }
  }
}
</style>
