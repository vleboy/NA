<template>
  <div class="home-dynamic">
    <div class="container">
      <h2>NA动态</h2>
      <div class="line"><i></i></div>
      <div class="dynamic-desc">新亚洲集团成⽴于2012年，是⼀家主要经营互联⽹平台业务的专业博彩公司。
公司是由菲律宾政府认可的发牌及监管机构 PAGCOR颁发软件系统经权威认证，
集团旗下所有游戏皆受菲律宾政府的监管与保护，正规合法，公平公正。</div>
      <div class="dynamic-items flex boxs">
        <div class="dynamic-item" v-for="item in news">
          <a href="">
            <div class="card-img"><img :src="item.img" alt=""></div>
            <div class="card-box">
              <h3>{{item.title}}</h3>
              <p>{{item.msg}}</p>
              <button>详情阅读</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-dynamic',
  data () {
    return {
      news: [
        {img: require('../../assets/img/news.png'), title: 'API旗舰版接口服务', msg: '1、包含基础版所有功能。2、在APP内添加注册、充值按钮，玩家可直接点击按钮跳转到注册、充值页面进行相关操作，注册与充值页面均为商户自有页面3、商户后台运营接入服务，商户可使用自有的...'},
        {img: require('../../assets/img/news1.png'), title: '全站棋牌游戏限免房卡活动', msg: '为了让玩家能尽享游戏，熟悉NAGaming的棋牌规则及体验，我们推出棋牌游戏限免房卡的互动，供大家体验。活动时间：2017年x月 - 2017年x月参与游戏：推锅、推筒子、牌九、四川麻将...'},
        {img: require('../../assets/img/news2.png'), title: '独有神秘奖励机制  更添玩家互动粘度', msg: 'NAGaming对全平台游戏设置神秘⼤奖，将收益的30%作为平台奖金池，根据当日流⽔数据算法随机掉落到玩家账户，并附带掉落特效，任何接入NA平台的商户均可让玩家免费享受该...'},
        {img: require('../../assets/img/news3.jpg'), title: '多平台移动端游戏整合服务', msg: '1、为保证游戏品质、速度、安全等因素，NAGaming策划整合标准，通过标准系统筛选各平台移动端和H5游戏，整合到NAGaming APP内。商户可从NA标准游戏库内自由选择游戏，2、商户在...'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-dynamic
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
  .dynamic-desc
    width 60%
    text-align center
    font-size 1rem
    color #666666
    margin 0  auto 80px
  .dynamic-items
    justify-content space-between
    margin-bottom 40px
    .dynamic-item
      width 23%
      color #222222
      &:hover 
         box-shadow 0 0 50px rgba(0, 0, 0, 0.3)
      a
        transition box-shadow 0.5s
        &:hover .card-img
          height 130px
        &:hover .card-img img
          opacity .6
          transform scale(1.2)
        &:hover .card-box
          height 350px
        .card-img
          height 180px
          overflow hidden
          transition height 0.5s
          img 
            width 100%
            height 100%
            display block
            opacity 1
            transform scale(1)
            transition opacity 0.5s, transform 0.5s
        .card-box
          position relative
          height 300px
          padding 1rem 1rem
          transition height 0.5s
          h3
            font-size 20px
            color #444444
            width 99%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          p
            font-size 13px
            color #888888
            margin-bottom 40px
            overflow:hidden;
            text-overflow ellipsis 
            display -webkit-box
            -webkit-line-clamp 5
            -webkit-box-orient vertical
          button
            font-size 14px
            padding 10px 45px
            border-radius 20px
            background #C2C2C2
            color #111111
            border none
            display block
            margin 0 auto
            cursor pointer
            margin-bottom 40px
            &:hover
              background #FECB16
@media (min-width: 768px) and (max-width: 1200px)
  .home-dynamic
    h2
      margin-top 50px
      margin-bottom 18px
      font-size 34px
    .dynamic-desc
      font-size 14px
      margin 0  auto 50px
    .dynamic-items
      .dynamic-item
        flex-basis 30%
      .dynamic-item:last-child
        display none
@media (max-width: 768px)
  .home-dynamic
    .container
      padding 0
    h2
      margin-top 1.4rem
      font-size 20px
    .dynamic-desc
      width 100%
      padding 0 10px
      margin-bottom 30px
    .dynamic-items
      flex-direction column
      margin-bottom 0
      .dynamic-item
        width 100%
        display flex
        flex-direction column
        align-items center
        justify-content center
        cursor pointer
        margin-bottom 0
        pointer-events none
        a
          pointer-events none
          .card-box
            height auto
            img 
              width 100%
          .card-img
            height auto
</style>

