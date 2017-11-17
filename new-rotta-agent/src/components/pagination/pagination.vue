<template>
  <div class="components_pagination">
	<el-pagination layout="prev, pager, next, sizes, jumper" :total="0" :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      nowSize: 0,
      nowPage: 0
    }
  },
  methods: {
    getNowsize () {
    },
    getNowpage () {
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
