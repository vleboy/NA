<template>
<div class="autoTranslate">
  <span>{{second}}秒后自动跳转</span>
</div>
  
</template>

<script>
export default {
  beforeCreate () {
    this.second = 4
  },
  beforeMount () {
  // 设置定时器，3秒自动跳转
    var self = this
    var time = setInterval(gotranstion, 1000)
    function gotranstion () {
      self.second--
      if (self.second < 0) {
        clearInterval(time)
        self.$router.push('comlist')
      }
    }
    gotranstion()
  },
  data () {
    return {
      second: 4
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.autoTranslate{text-align: center;margin-left: -2rem}
</style>
