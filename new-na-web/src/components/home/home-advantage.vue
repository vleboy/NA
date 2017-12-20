<template>
  <div class="home-advantage">
    <div class="container">
      <h2>NA优势</h2>
      <div class="line"><i></i></div>
      <div class="advantage-desc">NA是站在您与玩家的角度考虑问题的平台商，想您所想、急您所急 
为您在产品上面打造更便捷更完善的功能您的需求就是我们的需要，请您及时告知我们！</div>
      <div class="advantage-box flex boxs">
        <div class="advantage-items">
          <ul>
            <li v-for="item in advantageLists">
              <img :src="item.icon" alt="">
              <div class="desc-cn">{{item.descCn}}</div>
              <div class="desc-en">{{item.descEn}}</div>
            </li>
          </ul>
        </div>
        <div class="advantage-img">
          <img src="../../assets/img/advantageRight.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home-advantage',
  data () {
    return {
      advantageLists: [
        {icon: require('@/assets/img/advantage1.png'), descCn: '强大的移动端', descEn: 'Powerful mobile version'},
        {icon: require('@/assets/img/advantage2.png'), descCn: '专业的技术团队', descEn: 'Professional technical team'},
        {icon: require('@/assets/img/advantage3.png'), descCn: '完善的经营分析系统', descEn: 'Perfect operating analysis'},
        {icon: require('@/assets/img/advantage4.png'), descCn: '严谨的权限管理系统', descEn: 'Rigorous access management'},
        {icon: require('@/assets/img/advantage5.png'), descCn: '7x24小时支持服务', descEn: '24/7 Support service'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-advantage
  padding-bottom 45px
  h2
    font-size 2.5rem
    color #444444
    text-align center
    margin-top 70px
    margin-bottom 30px
  .line
    text-align center
    font-size 0
    margin-bottom 30px
    i
      display inline-block
      width 80px
      height 1px
      background #FECB16
  .advantage-desc
    width 60%
    text-align center
    font-size 1rem
    color #666666
    margin 0  auto 80px
  .advantage-box
    justify-content space-between
    position relative
    overflow hidden
    .advantage-items
      width 77%
      ul
        display flex
        padding 90px 0
        li
          border-left 1px solid #FFCB16
          padding 20px 10px
          display flex
          flex-direction column
          align-items center
          justify-content center
          color #856801
          border-bottom 10px solid #FFCB16
          .desc-cn
            font-size 16px
            margin-top 5px
          .desc-en
            font-size 12px
        li:last-child
          border-right 1px solid #FFCB16
    .advantage-img
      width 23%
      position relative
.animationLeft
  animation: bounceLeft 2s ease both
.animationRight
  animation: bounceRight 1.5s ease both
@keyframes bounceRight
    0%
      opacity 0
      transform translateX(50%);
    20%
      opacity 0
      transform translateX(40%)
    100% 
      opacity 1
      transform translateX(0%)
@keyframes bounceLeft
    0%
      opacity 0
      transform translateX(-80%);
    20%
      opacity 0
      transform translateX(-60%)
    100% 
      opacity 1
      transform translateX(0%)
@media (min-width: 768px) and (max-width: 1200px)
  .home-advantage
    padding-bottom 50px
    h2
      margin-top 50px
      margin-bottom 18px
      font-size 34px
    .advantage-desc
      font-size 14px
      margin 0 auto 45px
    .advantage-box
      .advantage-items
        width 100%
        ul
          padding 0
          li
           flex-basis 20%
           text-align center
          margin  0 auto
      .advantage-img
        display none
@media (max-width: 768px)
  .home-advantage
    padding-bottom 20px
    h2
      margin-top 1.4rem
      font-size 20px
    .advantage-desc
      width 100%
      margin 0 auto 15px
    .advantage-box
      .advantage-items
        width 100%
        ul
          padding 0
          flex-direction column
          li
            border-left 10px solid #FFCB16
            border-right 10px solid #FFCB16
            border-bottom 1px solid #FFCB16
            border-top 1px solid #FFCB16
            margin-bottom 10px
          li:last-child
            border-right 10px solid #FFCB16
      .advantage-img
        display none
</style>

