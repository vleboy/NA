<template lang="html">
  <div class="footer">
    <div class="logo">
      <a href="/">
        <img src="../assets/logo.png" alt="">
      </a>
      <p>© 2017, New Asia. All right reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  // bottom: 0;
  width: 100%;
  height: 165px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  text-align: center;
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%)translateY(-50%);
    a {
      display: inline-block;
      width: 157px;
      height: 78px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .footer {
    height: 110px;
    font-size: 9.34px;
    .logo {
      a {
        width: 105px;
        height: 52px;
      }
    }
  }
}
@media screen {
  .footer {
    height: 80px;
    .logo {
      width: 100%;
      a {
        width: 80px;
        height: 40px;
      }
    }
  }
}
</style>
