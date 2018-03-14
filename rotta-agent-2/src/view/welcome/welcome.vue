<template>
  <div class="welcome">
    <div class="contentBox">
      <img src="static/welcome.png"><br>
      <span class="test">欢迎使用NA后台管理系统</span>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'recordNowindex',
      data: 'welcome'
    })
    this.$store.commit('returnLocalStorage')
  }
}
</script>

<style scpoed>
.welcome{
  margin-top: 15%
}
.welcome .contentBox{
  text-align: center;
}
.test{font-size: 2rem;font-weight: bolder;font-family: '微软雅黑';}
</style>
