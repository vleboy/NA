<template>
  <div>
    <div class="outstep">
    	<el-steps :active="active" finish-status="success" :align-center= "center" :center= "center" :space= 'space'>
      		<el-step title="填写基本信息"></el-step>
      		<el-step title="创建成功"></el-step>
    	</el-steps>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'steps',
  data () {
    return {
      center: true,
      space: 50 + '%'
    }
  },
  computed: {
    active () {
      return this.$store.state.variable.steps
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outstep{padding-top: 3rem;margin-left:6rem}
</style>
