<template>
  <div class="helplist">
    帮助信息列表
  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'helplist'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scpoed>

</style>
