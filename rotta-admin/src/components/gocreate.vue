<template>
  <div class="gocreate">
    <el-button type="primary" v-if="this.nowindex === 'outlist'" @click="gocreate">创建线路商</el-button>
    <el-button type="primary" v-if="this.nowindex === 'comlist'" @click="gocreate">创建商户</el-button>
  </div>
</template>

<script>
export default {
  computed: {
    nowindex () {
      return this.$store.state.variable.nowIndex
    }
  },
  methods: {
    gocreate () {
      if (this.nowindex === 'outlist') {
        this.$router.push('outcreate')
      } else if (this.nowindex === 'comlist') {
        this.$router.push('comcreate')
      }
    }
  }
}
</script>

<style scoped>
.gocreate{margin-left: 0.5rem;margin-top: 5.5rem;display: block}
</style>
