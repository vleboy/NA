<template>
  <div class="helpdetail">
    帮助信息详情
  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'helpdetail'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scpoed>

</style>
