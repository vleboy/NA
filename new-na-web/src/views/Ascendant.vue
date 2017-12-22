<template>
  <div class="Ascendant">
    <card-item 
      :data = "info[0]"
    />

    <div class="info-item">
      <!-- <img src="/static/ascendant2.png" alt=""> -->
      <div class="info-content">
        <h2>全球化的网络覆盖</h2>
        <p>独立的亚马逊外围服务器，享受高速宽带全球多个服务器节点，速度更快多条线路并行时，APP智能匹配最佳联机</p>
      </div>
    </div>

     <card-item 
      :data = "info[1]"
     />
  </div>
</template>

<script>
import cardItem from '@/components/card-item'
export default {
  head: {
    title: 'NA优势'
  },
  data () {
    return {
      info: [
        {
          title: '超级强大的移动端版本',
          desc: 'Android+iOS便捷安装： 一次下载永久使用，无需像H5版本每次必须扫码进入；货币中心：一种货币通用所有游戏，再也不用换来换去；数据更新：全平台热更新，一点即可，无需更多操作；',
          img: '/static/ascendant1.png'
        },
        {
          title: '强大的经营分析系统',
          desc: '360°全方位经营分析，让您一目了然知悉优势与短板，为您的商业决策提供有力指导！ 核心报表包含： 损益分析、玩家分析、存取款分析、游戏分析、活动分析、代理分析等。',
          img: '/static/ascendant3.png'
        }
      ]
    }
  },
  components: {
    cardItem
  }
}
</script>

<style lang="stylus" scoped>
.info-item
  position relative
  margin-top 50px
  width 100%
  background url(/static/ascendant2.png) no-repeat

.info-content
  position absolute
  width 400px
  top 70px
  right 10%
  h2
    font-size 2.5rem
    color #444444
    text-align center
    margin-bottom 30px
  p
    font-size 1rem
    color #666666
</style>
