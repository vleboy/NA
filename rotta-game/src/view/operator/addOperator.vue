<template>
  <div>
  	<outstep class="Noprint"></outstep>
  	<createform v-if="active==0" class="Noprint"></createform>
    <success v-if="active==2" class="Noprint"></success>
    <suclist v-if="active==2"></suclist>
  	<div class="bottom">
      <successbtn v-if="active==2" hash="operatorList" detail="operatordetail" class="Noprint"></successbtn>
  	</div>
  </div>
</template>
<script>
import Outstep from '@/components/operator/outstep'
import Createform from '@/components/operator/createform'
import Successbtn from '@/components/operator/successbtn'
import Success from '@/components/operator/success'
import Suclist from '@/components/operator/suclist'
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
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addOperator'
    })
    this.$store.commit({
      type: 'resetSteps',
      data: ''
    })
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
