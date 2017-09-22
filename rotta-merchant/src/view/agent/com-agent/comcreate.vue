<template>
  <div>
    <steps class="Noprint"></steps>
    <createform v-if="this.$store.state.variable.steps === 0"></createform>
    <setform v-if="this.$store.state.variable.steps === 1"></setform>
    <success v-if="this.$store.state.variable.steps === 3" class="Noprint"></success>
    <successlist v-if="this.$store.state.variable.steps === 3"></successlist>
    <createbtn class="Noprint"></createbtn>
  </div>
</template>

<script>
import Steps from '@/components/steps'
import Success from '@/components/success'
import Createbtn from '@/components/createbtn'
import Createform from '@/simply/com-createform'
import Setform from '@/simply/com-setform'
import Successlist from '@/simply/com-successlist'
export default {
  components: {
    Steps,
    Createform,
    Setform,
    Success,
    Successlist,
    Createbtn
  },
  beforeCreate () {
    this.$store.commit('resetSteps')
    this.$store.commit('resetCheckform')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'comcreate'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scoped>
@media print {
  .Noprint { display: none }
}
</style>
