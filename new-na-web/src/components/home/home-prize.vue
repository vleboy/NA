<template>
  <div class="home-prize">
    <div class="container">
      <div class="home-prize-box boxs">
        <div class="prize-number">
          <div class="prize-title">NA BONUS 神秘大奖奖池</div>
          <div class="prize-numbers">CNY 20200</div>
        </div>
        <div class="players">
          <ul>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
          </ul>
          <div class="line"></div>
          <ul>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
            <li><span>yeh***99</span><span>小厨娘</span><span class="number-color">1231231</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-prize'
}
</script>

<style lang="stylus" scoped>
.home-prize
  background #FAFAFA
  border-bottom 1px solid #E1E1E1
  padding 40px 0
  .home-prize-box
    display flex
    text-align center
    .prize-number
      padding 20px 20px
      border 3px solid yellow
      border-image: linear-gradient( red , yellow) 30 30
      background #13060B
      color #ffffff
      .prize-title
        font-size 1.8rem
      .prize-numbers
        font-size 2.5rem
        color #FECB16
    .players
      display flex
      border 1px solid #B1B1B1
      color #444444
      font-size 20px
      font-weight 500 
      padding 10px 30px
      margin-left 50px
      ul
        li
          span 
            margin 0 15px
          .number-color
            color #ff0f13
      .line
        width 2px
        height 100%
        margin 0 15px
        background #dedede
@media (min-width: 768px) and (max-width: 1200px)
  .home-prize
    .home-prize-box
      .players
        width 50%
        margin-left 45px
        ul
          width 100%
        ul:last-child
          display none
        .line
          display none
      .prize-number
        width 50%
@media (max-width: 768px)
  .home-prize
    padding 0
    .container
      padding 0
    .home-prize-box
      flex-direction column
      .prize-number
        padding 10px 10px
        border none
        .prize-title
          font-size 17px
        .prize-numbers
          font-size 20px
      .players
        margin 0
        padding 20px 20px
        font-size 16px
        ul
          width 100%
        ul:last-child
          display none
        .line
          display none
</style>

