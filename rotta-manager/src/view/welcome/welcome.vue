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
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.welcome .contentBox{text-align: center;margin-top: -10%}
.test{font-size: 2rem;font-weight: bolder;font-family: '微软雅黑';}
</style>
