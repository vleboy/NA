<template>
<div>
	<div class="steps" v-if="nowindex === 'outcreate'">
	  	<el-steps :active="active" finish-status="success" :align-center= "true" :center= "true" :space= '350'>
	      	<el-step title="填写基本信息"></el-step>
	      	<el-step title="配置线路商信息"></el-step>
	      	<el-step title="创建成功"></el-step>
	    </el-steps>
    </div>

    <div class="steps" v-if="nowindex === 'comcreate'">
	  	<el-steps :active="active" finish-status="success" :align-center= "true" :center= "true" :space= '350'>
	      	<el-step title="填写基本信息"></el-step>
	      	<el-step title="配置商户信息"></el-step>
	      	<el-step title="创建成功"></el-step>
	    </el-steps>
  	</div>

</div>
  
</template>

<script>
export default {
  name: 'steps',
  computed: {
    nowindex () {
      return this.$store.state.variable.nowIndex
    },
    active () {
      return this.$store.state.variable.steps
    }
  }
}
</script>

<style scoped>
.steps{margin-top: 2rem}
</style>
