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
        {img: require('../assets/img/dynamic1.png'), title: 'NA新闻标题01', msg: '基本的新闻摘要放在这里，如需了解全文，请点击下方链接，进入全文页面，详细查看该新闻内容，此处4条为最新的发布动态，按照时间优先级排序、替代。'},
        {img: require('../assets/img/dynamic1.png'), title: 'NA新闻标题01', msg: '基本的新闻摘要放在这里，如需了解全文，请点击下方链接，进入全文页面，详细查看该新闻内容，此处4条为最新的发布动态，按照时间优先级排序、替代。'},
        {img: require('../assets/img/dynamic1.png'), title: 'NA新闻标题01', msg: '基本的新闻摘要放在这里，如需了解全文，请点击下方链接，进入全文页面，详细查看该新闻内容，此处4条为最新的发布动态，按照时间优先级排序、替代。'},
        {img: require('../assets/img/dynamic1.png'), title: 'NA新闻标题01', msg: '基本的新闻摘要放在这里，如需了解全文，请点击下方链接，进入全文页面，详细查看该新闻内容，此处4条为最新的发布动态，按照时间优先级排序、替代。'}
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
      flex-basis 23%
      color #222222
      display flex
      flex-direction column
      align-items center
      justify-content center
      cursor pointer
      a
        transition box-shadow 0.5s
        &:hover
          box-shadow 0 0 50px rgba(0, 0, 0, 0.3)
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
          p
            font-size 13px
            color #888888
            margin-bottom 40px
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
        a
          pointer-events none
          .card-box
            height auto
            img 
              width 100%
          .card-img
            height auto
</style>

