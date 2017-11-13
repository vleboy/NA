<template>
  <div class="download">
      <div class="content">
        <h2>
          <img src="../assets/logo.png">
          GAME DOWNLOAD
        </h2>
        <div class="download-address">
            <div class="android"><a href="/about.html?type=android&title=安卓下载"><img src="../assets/e1.png" alt=""></a></div>
            <div class="ios"><a href="/about.html?type=ios&title=苹果下载"><img src="../assets/e2.png" alt=""></a></div>
        </div>
      </div>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
.download {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('../assets/download.jpg') no-repeat;
  background-size: 100%;
  .content {
    position: absolute;
    top: 84%;
    left: 50%;
    transform: translateX(-50%)translateY(-50%);
    font-size: 26px;
    color: #ffffff;
    text-align: center;
  }
  h2 {
    img {
      width: 60px;
      height: 30px;
    }
  }
  .download-address {
    margin-top: 20px;
    /*display: flex;*/
    overflow: hidden;
    /*justify-content: space-between;*/
    div {
      a {
        display: inline-block;
      }
    }
    .android {
      width: 50%;
      text-align: right;
      padding-right: 5px;
      float: left;
    }
    .ios {
      width: 50%;
      float: right;
      text-align: left;
    }
    img {
      width: 100%
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .download {
    .content {
      top: 75%;
      font-size: 19px;
    }
    .download-address {
      img {
        width: 75%
      }
    }
  }
}
</style>

