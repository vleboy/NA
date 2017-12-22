<template>
  <div class="innovation">
    <card-item 
      v-for="(item, index) in productList"
      :key="index"
      :class="{'is-reversed': index % 2 === 0}"
      :data= "item"
    />
  </div>
</template>

<style lang="stylus" scoped>
.innovation
  .is-reversed
    background-color #f9f9f9
</style>

<script>
import cardItem from '@/components/card-item'

export default {
  name: 'innovation',
  head: {
    title: '创新产品'
  },
  data () {
    return {
      productList: [
        {
          title: '全球内容供应  提升内容品质',
          desc: '借助NA平台的整合能力，与全球游戏内容供应商达成战略合作，建设博彩专业化游戏及泛娱乐化游戏的全球供应链。该供应链将为博彩行业的游戏输出带来质量更高、速度更快的特性，在行业内容多元化发展与内容统一管理上带来极大的提升。',
          img: '/static/innovation1.png'
        },
        {
          title: '游戏内容定制服务  满足不同玩家的需求',
          desc: '各地域与国家的游戏形态均不一样，NA根据线路商市场需求与玩家需求，针对不同地域与国家，提供针对性的内容定制，如：广东麻将、国标麻将、牛牛、斗地主、炸金花等',
          img: '/static/innovation2.png'
        },
        {
          title: '货币统一  轻松游戏',
          desc: 'NA Gaming 完整的货币系统，一种货币玩转所有平台游戏，管理者也能更直观便捷的管理货币交易',
          img: '/static/innovation3.png'
        },
        {
          title: '神秘大奖  天天掉落',
          desc: 'NA对全平台游戏设置神秘大奖，根据当日水流数据随机掉落到玩家账户，并附带掉落特效，任何接入平台的线路商均可享受到该奖项掉落，该神秘奖的款项由NA全权支付。该神秘大奖是NA独有的奖项，可作为线路商推广的噱头。',
          img: '/static/innovation4.png'
        }
      ]
    }
  },
  components: {
    cardItem
  }
}
</script>


