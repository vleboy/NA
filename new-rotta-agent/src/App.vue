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
@import 'assets/style/common.styl'
#app
  position relative
</style>

