<template lang="html">
  <div class="n2"></div>
</template>

<script>
export default {
  data () {
    return {
      lefts: {
        content: '新亚洲集团基于多年的行业运营经验，总结和分析未来数字娱乐的发展方向，对接了全球优秀的技术资源，本着向行业提供更加多元，更加优质的电子娱乐内容的初衷，即将推出N²计划，敬请期待……',
        imgUrl: ''
      },
      rights: [
        {title: '全新的产品形态,待续...', imgUrl: '/static/n1.JPG'},
        {title: '全新的用户体验,待续...', imgUrl: '/static/n2.jpg'},
        {title: '全新的运营思路,待续...', imgUrl: '/static/n3.jpg'},
        {title: '全新的合作方式,待续...', imgUrl: '/static/n4.jpg'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.n2 {
  width: 100%;
  height: 100%;
  background: url('../assets/n2-mobile-bg.jpg') no-repeat;
  background-size: cover
}
@media screen and (orientation: landscape) {
  .n2 {
    background: url('../assets/mobile/mobs_2.jpg') no-repeat;
    background-size: cover;
  }
}
</style>
