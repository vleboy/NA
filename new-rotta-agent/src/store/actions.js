import * as types from './mutation-types.js'
import api from '@/api/api'
import { Axios } from 'assets/lib/fetch'
import { Message } from 'element-ui'
export default {
  login: ({ commit }, userInfo) => {
    Axios({
      method: 'post',
      url: api.agentLogin,
      data: userInfo
    })
    .then(res => {
      alert('登录成功')
      commit(types.LOGIN, res)
    })
    .catch(error => {
      Message.error(error.response.data.err.msg)
    })
  },
  // 添加标签页
  addVisitedViews: ({ commit }, view) => {
    commit(types.ADD_VISITED_VIEWS, view)
  },
  delVisitedViews: ({ commit, state }, view) => {
    return new Promise((resolve) => {
      commit(types.DEL_VISITED_VIEWS, view)
      resolve([...state.variable.visitedViews])
    })
  },
  onTabClick: ({ commit }, view) => {
    commit(types.ON_TAB_CLICK, view)
  }
}
