<template>
  <div>
    <div class="my-title">
      <h2>{{gameReadyDetail.gameName}}</h2>
    </div>
    <Gamedetailform></Gamedetailform>
  </div>
</template>

<script>
import Gamedetailform from '@/components/game/gameDetailform'
export default {
  components: {
    Gamedetailform
  },
  computed: {
    gameReadyDetail () {
      return this.$store.state.variable.gameReadyDetailInfo
    }
  }
}
</script>

<style scoped>
/**/
.my-title{text-align: center}
h2{font-size: 3rem;color: #5a5a5a;padding-top: 2rem;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
