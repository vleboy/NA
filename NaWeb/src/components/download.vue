<template>
  <div class="download">
      <div class="content">
        <h2>
          <img src="../assets/logo.png">
          GAME DOWNLOAD HERE
        </h2>
        <div class="download-address">
            <div class="android"><a href="javascript:;"><img src="../assets/e1.png" alt=""></a></div>
            <div class="ios"><a href="javascript:;"><img src="../assets/e2.png" alt=""></a></div>
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
  background: url('../assets/download.jpg') no-repeat;
  background-size: cover;
  .content {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%)translateY(-50%);
    font-size: 26px;
    color: #ffffff;
    text-align: center;
  }
  h2 {
    img {
      width: 10%;
    }
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

