<template>
  <div class="home-service-plan">
    <div  class="container">
      <h2>服务方案</h2>
      <div class="line"><i></i></div>
      <div class="service-plan-desc">为保障商户利益，降低运营风险，NA配备了完善的服务体系，及时快速的为商户解决问题</div>
      <div class="service-plan-items flex boxs">
        <div class="service-plan-item">
          <div class="service-icon"><img src="../../assets/img/service1.png" alt=""></div>
          <div class="service-title">点对点营销服务体系</div>
          <div class="service-desc">NA指派专人与线路商一对一服务，包活营销活动、事件营销、品牌建设 等服务，将在人力与财力上给予支持。</div>
        </div>
        <div class="service-plan-item">
          <div class="service-icon"><img src="../../assets/img/service2.png" alt=""></div>
          <div class="service-title">客户支持与技术提升</div>
          <div class="service-desc">一站式的客户支持服务和平台技术 提升，保障客户接入后的安全、稳 定和业务连续性。</div>
        </div>
        <div class="service-plan-item">
          <div class="service-icon"><img src="../../assets/img/service3.png" alt=""></div>
          <div class="service-title">咨询规划与设计实施</div>
          <div class="service-desc">帮助客户构筑从战略到转化的桥梁，通过平台架构的顶层设计，引领企业移动数据化转型。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-service-plan'
}
</script>

<style lang="stylus" scoped>
.home-service-plan
  background url('../../assets/img/servicePlan.jpg') no-repeat
  background-size cover
  color #FFFFFF
  text-align center
  padding 80px 0 160px
  h2
    font-size 2.5rem
    text-align center
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
  .service-plan-desc
    text-align center
    font-size 1rem
    margin-bottom 130px
  .service-plan-items
    justify-content space-between
    .service-plan-item
      flex-basis 30%
      border-radius 6px 
      text-align center
      padding 40px 30px
      background #ffffff
      color #222222
      display flex
      flex-direction column
      align-items center
      justify-content center
      cursor pointer
      .service-icon
        max-width 65px
        max-height 65px
        margin-bottom 60px
        img 
          width 100%
          height 100%
      .service-title
        font-size 1.5rem
        margin-bottom 37px
        font-weight bold 
      .service-desc
        font-size 15px
@media (min-width: 768px) and (max-width: 1200px)
  .home-service-plan
    padding 55px 0 60px
    h2
      margin-bottom 18px
      font-size 34px
    .service-plan-desc
      font-size 14px
      margin-bottom 60px
    .service-plan-items
      .service-plan-item
        .service-icon
          max-width 42px
          max-height 42px
          margin-bottom 38px
        .service-title
          font-size 18px
          margin-bottom 23px
        .service-desc
          font-size 12px
@media (max-width: 768px)
  .home-service-plan
    padding 46px 0 44px
    h2
      font-size 1.4rem
    .service-plan-desc
      margin-bottom 30px
    .service-plan-items
      flex-direction column
      .service-plan-item
        margin-bottom 25px
        // .service-icon, .service-title
        //   margin-bottom 20px
        .service-desc
          font-size 14px
</style>

