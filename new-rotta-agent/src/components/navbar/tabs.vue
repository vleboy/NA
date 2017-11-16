<template>
  <div class="tabs">
    <el-tabs v-model="activeIndex" v-if ="activeIndex != null" type="card" closable @tab-click="onTabClick" @tab-remove="closeViewTabs">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in Array.from(visitedViews)"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tabs',
  computed: {
    ...mapGetters([
      'activeIndex',
      'visitedViews'
    ])
  },
  methods: {
    closeViewTabs (data) {
      this.$store.dispatch('delVisitedViews', data)
      this.visitedViews.filter((items, index) => {
        Object.keys(items, index).forEach((k) => {
          if (items[k] === this.activeIndex) {
            this.$router.push({ path: this.visitedViews[index].path })
          }
        })
      })
    },
    generateRoute () {
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        return this.$route.matched[this.$route.matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    addViewTabs () {
      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive (path) {
      return path === this.$route.path
    },
    onTabClick (data) {
      this.$router.push({ path: this.visitedViews[data.index].path })
      this.$store.dispatch('onTabClick', data.name)
    }
  },
  watch: {
    $route () {
      this.addViewTabs()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
