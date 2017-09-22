<template>
	<div class="tags">
		<!-- <el-tabs v-model="Array.from(visitedViews).length"  type="card" editable>
			<el-tab-pane
				:key="item.index"
				v-for="(item, index) in Array.from(visitedViews)"
				:label="item.name"
				:name="item.index"
				:active-name="item.name"
			>
			</el-tab-pane>
		</el-tabs> -->
		<!-- <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" :type="isActive(tag.path)?'primary':''" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link> -->
		<router-view></router-view>
	</div>
</template>

<script>
	// export default {
	// 	computed: {
	// 		visitedViews() {
	// 			return this.$store.state.variable.visitedViews
	// 		}
	// 	},
	// 	methods: {
	// 		closeViewTabs(view, $event) {
	// 			this.$store.dispatch('delVisitedViews', view).then((views) => {
	// 				if (this.isActive(view.path)) {
	// 					const latestView = views.slice(-1)[0]
	// 					if (latestView) {
	// 						this.$router.push(latestView.path)
	// 					} else {
	// 						this.$router.push('/')
	// 					}
	// 				}
	// 			})
	// 			$event.preventDefault()
	// 		},
  //     generateRoute() {
	// 			if (this.$route.matched[this.$route.matched.length - 1].name) {
	// 				return this.$route.matched[this.$route.matched.length - 1]
	// 			}
	// 			this.$route.matched[0].path = '/'
	// 			return this.$route.matched[0]
	// 		},
	// 		addViewTabs() {
	// 			this.$store.dispatch('addVisitedViews', this.generateRoute())
	// 		},
	// 		isActive(path) {
	// 			return path === this.$route.path
	// 		}
	// 	},
	// 	watch: {
	// 		$route() {
	// 			this.addViewTabs()
	// 		}
  // }
	// }
</script>

<style scoped>
/* .tags {
	margin: 20px auto;
}
.tabs-view {
	margin: 0 10px;
} */
</style>

