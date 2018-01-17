<template>
  <div>
    <searchbox></searchbox>
    <p class="searchResult">共搜索到 {{searchinfo||0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="goCreate">创建新供应商</el-button>
    <outresult></outresult>
  </div>
</template>

<script>
import Searchbox from '@/components/operator/searchbox'
import Outresult from '@/components/operator/outresult'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('returnLocalStorage')
    this.$store.commit({
      type: 'recordNowindex',
      data: 'operatorList'
    })
  },
  data () {
    return {
    }
  },
  computed: {
    searchinfo () {
      if (this.$store.state.variable.operatorList) {
        return this.$store.state.variable.operatorList.length
      }
    }
  },
  methods: {
    goCreate () {
      this.$router.push('addOperator')
      this.$store.commit('isCloseEdit')
      this.$store.commit({
        type: 'recordNowindex',
        data: 'addOperator'
      })
    }
  },
  components: {
    Searchbox,
    Outresult
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchResult{padding: 1rem 2rem}
.justfy1{margin:0 2rem;}
</style>
