<template>
  <div class="home-menu">
    <h1>
      <img src="../assets/img/logo.png" alt="">
      <p>新亚洲集团</p>
    </h1>
    <nav>
      <ul>
        <li class="active">首页</li>
        <li>NA优势</li>
        <li>创新产品</li>
        <li>NA游戏</li>
        <li>服务方案</li>
        <li>联系我们</li>
        <li>游戏下载</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'home-menu'
}
</script>

<style lang="stylus" scoped>
.home-menu
  position absolute
  top 0
  left 0
  width 300px
  height 100%
  color #ffffff
  background #00000073
  text-align center
  z-index 99 
  h1
    max-width 157px 
    margin 0 auto
    padding 50px 0 10px
    p
      font-size 30px
  nav
    ul
      li 
        height 50px
        border-bottom 1px solid #444444
        display flex
        flex-direction column
        align-items center
        justify-content center
        cursor pointer
      .active
        color #FFCB16
        background #000000
        border-right 3px solid #FFCB16
        border-bottom none
@media (min-width: 768px) and (max-width: 1200px)
  .home-menu
    width 170px
    h1
      max-width 90px
      padding 30px 0 10px
      p
        font-size 18px
    nav
      ul
        li
          height 30px
          font-size 12px
@media (max-width: 768px)
  .home-menu
    position fixed
    width 100%
    height auto
    h1
      max-width 37.5px
      padding 7.5px 0
      p
        display none
    nav
      display none
</style>


