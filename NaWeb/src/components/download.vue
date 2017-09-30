<template>
  <div class="download">
      <div class="content">
        <h2>NA GAME DOWNLOAD HERE</h2>
        <div class="download-address">
            <div class="android"><a href="javascript:;"><img src="../assets/android.png" alt=""></a></div>
            <div class="ios"><a href="javascript:;"><img src="../assets/ios.png" alt=""></a></div>
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
  background: url('../assets/download.png') no-repeat;
  background-size: cover;
  .content {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translateX(-50%)translateY(-50%);
    font-size: 26px;
    color: #ffffff;
    text-align: center;
  }
  .download-address {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    div {
      a {
        display: inline-block;
      }
    }
    .android {
      text-align: right;
      padding-right: 5px;
    }
    .ios {
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
      top: 44%;
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

