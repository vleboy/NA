import * as types from './mutation-types.js'
import variable from './variable'
import getters from './getters'
const state = {
  variable
}

const mutations = {
  // 登录
  [types.LOGIN] (state, res) {
  },
  [types.ADD_VISITED_VIEWS] (state, view) {
    let newTabName = ++state.variable.tabIndex + ''
    if (state.variable.visitedViews.some(v => v.path === view.path)) {
      state.variable.activeIndex = view.name
      state.variable.visitedViews.filter((items, index) => {
        Object.keys(items, index).forEach((k) => {
          if (items[k] === view.path) {
            state.variable.activeIndex = state.variable.visitedViews[index].name
          }
        })
      })
      return
    }
    state.variable.visitedViews.push({ title: view.name, path: view.path, name: newTabName })
    state.variable.activeIndex = newTabName
  },
  [types.DEL_VISITED_VIEWS] (state, targetName) {
    let tabs = state.variable.visitedViews
    let activeName = state.variable.activeIndex
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    state.variable.activeIndex = activeName
    state.variable.visitedViews = tabs.filter(tab => tab.name !== targetName)
  },
  [types.ON_TAB_CLICK] (state, data) {
    state.variable.activeIndex = data
  }
}

export default {
  state,
  mutations,
  getters
}
