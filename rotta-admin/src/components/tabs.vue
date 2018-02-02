<template>
	<div class="tags">
		<el-tabs v-model="activeIndex" type="card" closable @tab-click="onTabClick" @tab-remove="closeViewTabs">
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
	export default {
		computed: {
			visitedViews() {
				return this.$store.state.variable.visitedViews
			},
			activeIndex() {
				return this.$store.state.variable.activeIndex
			}
		},
		mounted () {
			// console.log(this.editableTabsValue2)
		},
		methods: {
			closeViewTabs(data) {
				this.$store.dispatch('delVisitedViews', data)
				this.visitedViews.filter((items,index) =>{
					Object.keys(items,index).forEach((k) => {
						if(items[k] === this.activeIndex){
							this.$router.push({ path: this.visitedViews[index].path })
						}
					})
				})
			},
      generateRoute() {
				if (this.$route.matched[this.$route.matched.length - 1].name) {
					return this.$route.matched[this.$route.matched.length - 1]
				}
				this.$route.matched[0].path = '/'
				return this.$route.matched[0]
			},
			addViewTabs() {
				this.$store.dispatch('addVisitedViews', this.generateRoute())
			},
			isActive(path) {
				return path === this.$route.path
			},
			onTabClick(data) {
				this.$store.commit('resetPartLoading')
				this.$router.push({ path: this.visitedViews[data.index].path })
				//console.log(data.name)
				this.$store.dispatch('onTabClick', data.name)
			}
		},
		watch: {
			$route() {
				this.addViewTabs()
			}
  }
	}
</script>

<style scoped>
</style>

