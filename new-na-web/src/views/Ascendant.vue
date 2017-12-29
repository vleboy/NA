<template>
  <div class="Ascendant">
     <card-item 
      v-for="(item, index) in info"
      :key="index"
      :class="{'is-reversed': index % 2 === 0}"
      :data= "item"
     />
    <div class="more">
      <h3>NA不仅如此...</h3>
      <p>与我们的客服联系，加入NA大家庭！</p>
    </div>
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
        },
        {
          title: '严谨的权限管理系统',
          desc: '根据日常管理需要，您可针对玩家、资金、运营、统计、分析、内容、系统 等各个模块开放权限，设置后，子账号仅显示已授权的页面。 且子账号权限细化至每一个重要操作，如玩家存取款审核可按层级管理，利于每日交接班对账。',
          img: '/static/ascendant4.png'
        },
        {
          title: '风险监控系统',
          desc: '可根据您的经营状况，随时调配相关数据，系统将不进行任何形式存盘，保障您的权益！ 同时，系统建立完善的玩家欺诈监控提醒机制，让洗水套利团队、职业高手赌客、不良玩家能实时得到稽查，实时预防运营风险。',
          img: '/static/ascendant5.png'
        },
        {
          title: '超强防御系统',
          desc: '建立专业的HACKER团队，帮您全面抵御任何型别的黑客攻击；加密网络传输的信息，防止被拦截后信息泄露；所有软硬件资源均独享，且配置多副本，智能切换，给您一个可靠、稳定的环境。',
          img: '/static/ascendant6.png'
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
.Ascendant
  .is-reversed
    background-color #f9f9f9

.more
  text-align center
  h3
    font-size 2rem
    color #444444
    text-align center
    margin-top 70px
    margin-bottom 30px
  p
    margin-bottom 80px
    font-size 1rem
    color #666666

@media (min-width: 768px) and (max-width: 1200px)
  .more
    h3
      margin-top 50px
      margin-bottom 18px
      font-size 34px
    p
      font-size 14px
      margin-bottom 50px

@media (max-width: 768px)
  .more
    h3
      margin-top 1.4rem
      margin-bottom 18px
      font-size 20px
    p
      width 100%
      padding 0 10px
      margin-bottom 20px
</style>
