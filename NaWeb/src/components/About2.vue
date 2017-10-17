<template>
  <div class="about2">
    <img src="/static/mobile/e2.jpg" alt="" width="100%" class="normal">
    <img src="/static/mobile/mobs_1.jpg" alt="" width="100%" class="landscape">
  </div>
</template>

<style lang="less" scoped>
.about2 {
    width: 100%;
    height: 100%;
    .normal {
      display: block
    }
    .landscape {
      display: none
    }
}
@media screen and (orientation: landscape) {
  /*横屏 css*/
   .about2 {
    .normal {
      display: none
    }
    .landscape {
      display: block
    }
   }
} 
</style>

