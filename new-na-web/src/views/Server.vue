<template>
  <div class="server">
    <div class="service-items">
      <h2>NA Gaming 服务模块</h2>
      <div class="service-items-desc">四大服务模块，满足你所有的需求</div>
      <div class="service-items-line"><i></i></div>

      <div class="service-item">
        <div class="service-lists">
          <div class="service-list-cover">
            <img src="../assets/img/server1.png" alt="">
          </div>

          <div class="service-list-main">
            <div class="service-list-tag">one - to - one marketing service system</div>
            <div class="service-list-title">点对点营销服务体系</div>
            <div class="service-list-line"></div>
            <p>通过介入重大的行业活动或整合双方有效的资源策划大型活动而迅速提高企业及其品牌知名度、美誉度和影响力。共同策划、组织和利用具有新闻价值、社会影响以及名人效应的人物或事件，吸引用户、行业团体的兴趣与关注。共同树立和维护良好的品牌形象,促进销售,提升品牌价值,增强产品的核心竞争力。</p>
          </div>
        </div>

        <div class="service-lists reverse">
          <div class="service-list-cover">
            <img src="../assets/img/server2.png" alt="">
          </div>

          <div class="service-list-main">
            <div class="service-list-tag">New Asia Service System</div>
            <div class="service-list-title">客服与技术服务体系</div>
            <div class="service-list-line"></div>
            <p>         为保障商户利益，降低运营风险，NA配备了完善的服务体系，及时快速的为商户解决问题。NA平台客服采用7x24小时工作制，保障响应的及时性降低商户时间成本与风险，技术团队根据问题的大小与及时性，采取不同的维护措施，力保商户正常运营。公司严格把控服务时间，所有问题解决均不得超过24小时，保障商户的利益。</p>
          </div>
        </div>

      </div>

      <div class="service-item">
        <div class="service-lists is-reverse no-reverse">
          <div class="service-list-cover">
            <img src="../assets/img/server3.png" alt="">
          </div>

          <div class="service-list-main">
            <div class="service-list-tag">Customer support and technology promotion</div>
            <div class="service-list-title">客户支持与技术提升</div>
            <div class="service-list-line"></div>
            <p>一站式的客户支持服务和平台技术提升，保障企业接入后的安全、稳定和业务连续性。公司采用了全球最新的前端和后端技术，前端视觉与特效可达端游水准，后端算法、安全性、稳定性比拟银行系统。NA后续部分产品将转变为3D呈现，力求在保证游戏稳定及功能的同时，让游戏变得更有趣。</p>
          </div>
        </div>

        <div class="service-lists is-reverse reverse">
          <div class="service-list-cover">
            <img src="../assets/img/server4.png" alt="">
          </div>

          <div class="service-list-main">
            <div class="service-list-tag">Consulting planning and design implementation</div>
            <div class="service-list-title">咨询规划与设计实施</div>
            <div class="service-list-line"></div>
            <p>聚焦企业战略与业务痛点，帮助客户构筑基于能力的差异化战略竞争优势，是NA企业服务的责任。NA GL规划咨询服务，聚焦业务、数据、应用和技术架构集成蓝图与路标规划，专注落地的转型节奏与项目组合，以客户成功为导向，帮助客户自上而下梳理业务及移动信息化需求，解决客户在市场营销、用户引流、用户留存、信息安全、技术创新等方面的痛点问题。</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'server',
  head: {
    title: '服务方案'
  }
}
</script>

<style lang="stylus" scoped>
//服务体系
.service-system
  background-color #f4f5f9
  h2
    font-size 2.5rem
    color #6A6A6A
    text-align center
    padding-top 70px
    margin-bottom 10px

.service-system-bg
  width 750px
  height 550px
  margin 0 auto
  padding 30px 15px
  background url('../assets/img/serverBg.png') no-repeat
  background-size 100%

.service-system-banners
  display flex
  align-items center
  text-align center
  width 400px
  height 400px

.server-banner
  padding 0 30px
  p
    color #6a6a6a
    font-size 13px
    margin-bottom 20px
  a
    padding 10px 20px
    background #3A3E63
    border-radius 2px 

.banner-title
  font-size 18px
  margin-bottom 20px

.banner-line
  width 40px;
  height 1px;
  background #6a6a6a
  margin 0 auto 20px
//服务方案列表
.service-items
  h2
    font-size 2.5rem
    color #6A6A6A
    text-align center
    margin-top 70px
    margin-bottom 10px

.service-items-desc
  text-align center
  font-size 1rem
  color #6A6A6A
  margin-bottom 30px

.service-items-line
  text-align center
  font-size 0
  margin-bottom 30px
  i
    display inline-block
    width 80px
    height 1px
    background #999999

.service-item
  display flex

.is-reverse
  flex-direction row-reverse
.service-lists
  display flex
  width 50%
  align-items center
  background-color #3A3E63
  font-size 0
  overflow hidden

.service-list-cover
  width 50%
  img
    width 100%

.service-list-main
  width 50%
  padding 0 20px
  color #ffffff
  p
    text-indent 2em
    font-size 13px

.service-list-tag
  font-size 12px
  margin-bottom 10px

.service-list-title
  font-size 18px
  margin-bottom 5px

.service-list-line
  width 40px
  height 4px
  background-color #fff
  margin-bottom 20px

@media (min-width: 768px) and (max-width: 1200px)
  .service-item
    flex-direction column
  
  .service-list-main
    p
      font-size 18px
  
  .reverse
    flex-direction row-reverse
  
  .no-reverse
    flex-direction row

  .service-lists
    width 100%
  
  .service-list-tag
    font-size 13px
    margin-bottom 20px

  .service-list-title
    font-size 23px
    margin-bottom 10px

  .service-list-line
    margin-bottom 40px

@media (max-width: 768px)
  .service-system-bg
    width 100%
    height auto
    background-size cover
  
  .service-system-banners
    width 100%

  .service-item, .service-lists
    width 100%
    flex-direction column

  .service-list-cover, .service-list-main
    width 100%

  .service-list-tag
    margin-top 20px
    
  .service-list-main
    p
      margin-bottom 40px
      font-size 1rem
  
  .service-items-desc
    font-size 13px

  .service-items, .service-system 
    h2
      font-size 24px
</style>

