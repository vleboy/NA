<template>
  <div class="home-platform">
    <div class="container">
      <h2>New Asia (NA) 游戏平台</h2>
      <div class="line"><i></i></div>
      <div class="platform-desc">NA游戏平台，是NA娱乐旗下针对博彩行业开发的综合型游戏平台。NA整合上下游各方资源，各国游戏研发团队为NA定制打造各类博彩游戏，
拥有真人直播、赛事、电子游戏、棋牌游戏等，为玩家提供全新的游戏体验，让玩家能通过NA游戏平台享受到博彩的乐趣。</div>
      <div class="platform-box flex boxs">
        <div class="platform-items">
          <div class="platform-item" v-for="item in platformLists[0]">
            <div class="platform-item-img" @mouseover="hoverIn(item)"><img :src="item.img" alt=""></div>
            <div class="platform-item-desc">
              <div class="platform-item-title">{{item.title}}</div>
              <div class="platform-item-msg">{{item.msg}}</div>
            </div>
          </div>
        </div>
        <div class="platform-img" :class="{ bounce: item.title ===lag }" v-for="(item, index) in imgLists" v-show="item.title ===lag">
          <img :src="item.img" alt="" :key="index">
        </div>
        <div class="platform-items">
          <div class="platform-item" v-for="item in platformLists[1]">
            <div class="platform-item-img" @mouseover="hoverIn(item)"><img :src="item.img" alt=""></div>
            <div class="platform-item-desc">
              <div class="platform-item-title">{{item.title}}</div>
              <div class="platform-item-msg">{{item.msg}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-box">
        <ul>
          <li v-for="mobile in mobileLists">
            <div class="mobile-desc">
              <div class="mobile-desc-left">
                <div class="mobile-left">
                   <img :src="mobile.icon" alt="">
                </div>
                <p>{{mobile.title}}</p>
              </div>
              <div class="mobile-desc-right">{{mobile.msg}}</div>
            </div>
            <div class="mobile-img">
              <img :src="mobile.img" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-platform',
  data () {
    return {
      platformLists: [
        [
          {img: require('@/assets/img/live.png'), title: '真人LIVE', msg: '真人荷官游戏体验，亲临现场的感觉，全新上线B27、免佣等投注模式，为您创造更多样的玩法。'},
          {img: require('@/assets/img/game.png'), title: '电子游戏', msg: '老虎机、水果机、动物乐园、打鱼等多样化的电子游戏，根据全球受欢迎程度，每月更新2款以上。'}
        ],
        [
          {img: require('@/assets/img/chess.png'), title: '棋牌游戏', msg: '多种类别的棋牌游戏，满足各地域不同的需求，开房者还可自由配置游戏模式、抽水模式等参数。'},
          {img: require('@/assets/img/sports.png'), title: '体育赛事', msg: '健全的的体育博彩系统，拥有超过50种不同类型的体育走地赛事，每月超过10,000场赛事预播及直播。'}
        ]
      ],
      lag: '真人LIVE',
      imgLists: [
        {img: require('@/assets/img/live.jpg'), title: '真人LIVE'},
        {img: require('@/assets/img/game.jpg'), title: '电子游戏'},
        {img: require('@/assets/img/chess.jpg'), title: '棋牌游戏'},
        {img: require('@/assets/img/sports.jpg'), title: '体育赛事'}
      ],
      mobileLists: [
        {icon: require('@/assets/img/live2.png'), img: require('@/assets/img/live.jpg'), title: '真人LIVE', msg: '真人荷官游戏体验，亲临现场的感觉，全新上线B27、免佣等投注模式，为您创造更多样的玩法。'},
        {icon: require('@/assets/img/game2.png'), img: require('@/assets/img/game.jpg'), title: '电子游戏', msg: '老虎机、水果机、动物乐园、打鱼等多样化的电子游戏，根据全球受欢迎程度，每月更新2款以上。'},
        {icon: require('@/assets/img/chess2.png'), img: require('@/assets/img/chess.jpg'), title: '棋牌游戏', msg: '多种类别的棋牌游戏，满足各地域不同的需求，开房者还可自由配置游戏模式、抽水模式等参数。'},
        {icon: require('@/assets/img/sports2.png'), img: require('@/assets/img/sports.jpg'), title: '体育赛事', msg: '健全的的体育博彩系统，拥有超过50种不同类型的体育走地赛事，每月超过10,000场赛事预播及直播。'}
      ]
    }
  },
  methods: {
    hoverIn (item) {
      switch (item.title) {
        case '真人LIVE':
          this.lag = '真人LIVE'
          break
        case '电子游戏':
          this.lag = '电子游戏'
          break
        case '棋牌游戏':
          this.lag = '棋牌游戏'
          break
        case '体育赛事':
          this.lag = '体育赛事'
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-platform
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
  .platform-desc
    width 60%
    text-align center
    font-size 1rem
    color #666666
    margin 0  auto 80px
  .mobile-box
    display none 
  .platform-box
    justify-content space-between
    .platform-items
      flex-basis 30%
      .platform-item
        display flex
        margin-bottom 100px
        .platform-item-img
          width 58px
          height 58px
          cursor pointer
        .platform-item-desc
          width calc(100% - 58px)
          padding-left 20px
          .platform-item-title
            font-size 20px
            color #444444
          .platform-item-msg
            color #666666
            font-size 14px
    .platform-img
      display flex
      flex-direction column
      align-items center
      justify-content center
    .bounce
      animation Wanimate 1.5s ease both
    @keyframes Wanimate 
      0%
        opacity 0
        transform translateY(15%)
      20%
        opacity 0
        transform translateY(10%)
      100%
        opacity 1
        transform translateY(0%)
@media (min-width: 768px) and (max-width: 1200px)
  .home-platform
    h2
      margin-top 50px
      margin-bottom 18px
      font-size 34px
    .platform-desc
      font-size 14px
    .platform-box
      .platform-items
        .platform-item
          .platform-item-img
            width 46px
            height 46px
          .platform-item-desc
            .platform-item-title
              font-size 1rem
            .platform-item-msg
              font-size 11px
@media (max-width: 768px)
  .home-platform
    .container
      padding 0
    h2
      margin-top 1.4rem
      font-size 20px
    .platform-desc
      width 100%
      font-size 1rem
      margin-bottom 20px
      padding 0 10px
    .platform-box
      display none
    .mobile-box
      display block
      ul
        display flex
        flex-direction: column
        width 100%
        li
          width 100%
          .mobile-desc
            display flex
            background #FECB16
            padding 10px 10px
            .mobile-desc-left
              flex-basis 50%
              display flex
              flex-direction column
              align-items center
              justify-content center
              .mobile-left
                width 30px
                margin 0 auto
                font-size 0
              p
                font-size 14px
            .mobile-desc-right
              padding-left 20px
              font-size 16px
</style>


