<template>
  <div class="game">
    <div class="game-list"
      v-for="(item, index) in gameLists"
      :class="{'is-reversed': index % 2 !== 0}"
      :key="index"
    >
      <div class="game-list-container">
        <div class="game-cover">
          <img :src="item.img" alt="">
        </div>

        <div class="game-main">
          <div class="game-title">{{item.title}}</div>
          <div class="game-desc">{{item.desc}}</div>
          <div class="game-tag">
            <img v-for="tag in item.tags" :src="tag.img" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game',
  head: {
    title: 'NA游戏'
  },
  data () {
    return {
      gameLists: [
        {
          img: require('@/assets/img/game1.png'),
          title: '全新真人Live更添玩家互动',
          desc: '借助NA平台的整合能力，与全球游戏内容供应商达成战略合作，建设博彩专业化游戏及泛娱乐化游戏的全球供应链。该供应链将为博彩行业的游戏输出带来质量更高、速度更快的特性，在行业内容多元化发展与内容统一管理上带来极大的提升。',
          tags: [
            {img: require('@/assets/img/gameIcon1.png')},
            {img: require('@/assets/img/gameIcon2.png')},
            {img: require('@/assets/img/gameIcon3.png')}
          ]
        },
        {
          img: require('@/assets/img/game2.png'),
          title: '多元化电子游戏全新体验简单操作',
          desc: '传统的电子游戏现以演变为多种形式NA将根据全球游戏受欢迎程度将平台电子游戏多元化包括但不限于：水果机，动物乐园，打鱼等',
          tags: [
            {img: require('@/assets/img/gameIcon3.png')},
            {img: require('@/assets/img/gameIcon4.png')},
            {img: require('@/assets/img/gameIcon5.png')},
            {img: require('@/assets/img/gameIcon6.png')}
          ]
        },
        {
          img: require('@/assets/img/game3.png'),
          title: '棋牌游戏新模式房主管理更便捷',
          desc: '多种类别的棋牌游戏，满足各地域不同的需求，开房者还可自由配置游戏模式、抽水模式等参数多种系统和设置帮助开房者更好的管理房间与玩家，在推广和盈利上可更好的管控，如多个包房不同抽水的管理等。',
          tags: [
            {img: require('@/assets/img/gameIcon10.png')},
            {img: require('@/assets/img/gameIcon9.png')},
            {img: require('@/assets/img/gameIcon8.png')},
            {img: require('@/assets/img/gameIcon7.png')}
          ]
        },
        {
          img: require('@/assets/img/game4.png'),
          title: '体育投注更全面总有你关注的赛事',
          desc: 'NA提供健全的的体育博彩系统，游戏库中拥有超过50种不同类型的体育走地赛事，涉及足球、篮球、网球等世界主流体育项目，每月超过10,000场赛事预播及直播。',
          tags: [
            {img: require('@/assets/img/gameIcon14.png')},
            {img: require('@/assets/img/gameIcon13.png')},
            {img: require('@/assets/img/gameIcon12.png')},
            {img: require('@/assets/img/gameIcon11.png')}
          ]
        }
      ]
    }
  }
}
</script>


<style lang="stylus" scoped>
.is-reversed .game-list-container
  flex-direction: row-reverse
.game-list-container
  display flex
  font-size 0
  align-items center

.game-cover
  flex-basis 50%
  img
    width 100%
.game-main
  flex-basis 50%
  padding-left 30px

.game-title
  font-weight bolder 
  font-size 2.5rem
  line-height 1.3em
  margin-bottom 30px
  width 40%

.game-desc
  font-size 1rem
  width 80%

.game-tag
  margin-top 15px
  img
    width 20%
    margin 0 10px 0 0

@media (min-width: 768px) and (max-width: 1200px)
  .game-title
    font-size 34px
    margin-bottom 15px
    width 50%

  .game-desc
    font-size 14px
@media (max-width: 768px)
  .is-reversed .game-list-container
    flex-direction column

  .game-list-container
    flex-direction column
  
  .game-title, .game-desc, .game-main
    width 100%

  .game-main
    padding 20px 10px

  .game-title
    font-size 20px
    margin-bottom 15px
</style>


