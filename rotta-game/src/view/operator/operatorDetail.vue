<template>
  <div>
    <div class="my-title">
      <h2>{{gameDetail.companyName}}</h2>
    </div>
    <outdetailform></outdetailform>
  </div>
</template>

<script>
import Outdetailform from '@/components/operator/outdetailform'
export default {
  components: {
    Outdetailform
  },
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'operatorList'
    })
  },
  computed: {
    gameDetail () {
      return this.$store.state.variable.gameDetailInfo
    }
  }
}
</script>

<style scoped>
/**/
.my-title{text-align: center}
h2{font-size: 3rem;color: #5a5a5a;padding-top: 2rem;}
</style>
