<template>
  <div class="stepbtn">
    <el-button type="primary" class="justfy" @click="next">下一步</el-button>
    <el-button>重置</el-button>
  </div>
</template>
<script>
export default {
  name: 'stepbtn',
  data () {
    return {
    }
  },
  methods: {
    next () {
      this.$store.dispatch('getchangeActive')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stepbtn{margin:2rem 0 4rem 0;}
.justfy{margin-right: 15rem;}
</style>
