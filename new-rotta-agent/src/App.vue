<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import 'assets/style/normalize.css'
body
  margin 0px
	padding 0px
	font-family Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif
	font-size 14px
	-webkit-font-smoothing antialiased

a:focus,
a:active 
  outline none
a,
a:focus,
a:hover
  cursor pointer
  color inherit
  text-decoration none
#app
  position relative
</style>

