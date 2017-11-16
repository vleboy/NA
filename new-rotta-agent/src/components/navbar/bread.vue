<template>
  <div class="bread">
    <el-breadcrumb separator="/" class="title">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">
      <span :class="{large: index + 1 == breadlist.length}">{{item.name}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread',
  data () {
    return {
      breadlist: []
    }
  },
  created () {
    this.getBread()
  },
  methods: {
    getBread () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }
      this.breadlist = matched
    }
  },
  watch: {
    $route () {
      this.getBread()
    }
  }
}
</script>

<style lang="stylus" scoped>
.large
  font-size 1.2rem
.title
  line-height 1.2rem
</style>



