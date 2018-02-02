<template>
  <div class="commingSoon">
    <div class="contentBox">
      <span class="test">    <span class="test">  跳转真人后台</span></span>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'commingSoon'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scpoed>
.commingSoon{
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.test{font-size: 2rem;font-weight: bolder;font-family: '微软雅黑'}
</style>
