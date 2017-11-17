import * as types from './mutation-types.js'
export default {
  // 添加标签页
  addVisitedViews: ({ commit }, view) => {
    commit(types.ADD_VISITED_VIEWS, view)
  },
  // 删除标签页
  delVisitedViews: ({ commit, state }, view) => {
    commit(types.DEL_VISITED_VIEWS, view)
  },
  // 标签页选中
  onTabClick: ({ commit }, view) => {
    commit(types.ON_TAB_CLICK, view)
  }
}
