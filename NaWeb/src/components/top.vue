<template lang="html">
  <div class="top" @click="moveTop()">
    <!-- <img src="../assets/arrow_top.png" alt=""> -->
  </div>
</template>

<script>
export default {
  methods: {
    moveTop: function () {
      $.fn.fullpage.moveTo(1)
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  position: fixed;
  right: 21px;
  bottom: 45px;
  width: 57px;
  height: 57px;
  background: url('../assets/arrow_top.png')no-repeat;
  // background-size: cover;
  cursor: pointer;
  z-index: 999;
  &:hover {
    background-position: 0px -76px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .top {
    width: 32px;
    height: 32px;
    line-height: 32px;
    right: 14px;
    bottom: 12px;
    background-size: cover;
    &:hover {
      background-position: 0px -44px;
    }
  }
}
@media screen and (max-width: 750px) {
  .top {
    width: 38px;
    height: 40px;
    line-height: 32px;
    right: 12px;
    bottom: 12px;
    background-size: cover;
    &:hover {
      background-position: 0px -44px;
    }
  }
}
</style>
