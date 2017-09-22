<template>
  <div>
  	<outstep class="Noprint"></outstep>
  	<createform v-if="active==0" class="Noprint"></createform>
    <success v-if="active==2" class="Noprint"></success>
    <suclist v-if="active==2"></suclist>
  	<div class="bottom">
      <successbtn v-if="active==2" hash="gameList" detail="gamedetail" class="Noprint"></successbtn>
  	</div>
  </div>
</template>

<script>
import Outstep from '@/components/game/outstep'
import Createform from '@/components/game/createformGame'
import Successbtn from '@/components/game/successbtn'
import Success from '@/components/game/successGame'
import Suclist from '@/components/game/suclistGame'
export default {
  components: {
    Outstep,
    Createform,
    Successbtn,
    Success,
    Suclist
  },
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit('resetSteps')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addGame'
    })
    this.$store.dispatch('getOperatorList') // 获取所属游戏商信息
  },
  data () {
    return {}
  },
  computed: {
    active () {
      return this.$store.state.variable.steps
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom{text-align: center;}
@media print {
  .Noprint { display: none }
  .PageNext{ page-break-after: always }
}
</style>
