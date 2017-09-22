<template>
  <div class="addhelp">
    创建帮助信息
  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'addhelp'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scpoed>

</style>
