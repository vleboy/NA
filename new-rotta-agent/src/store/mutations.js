import {
  LOGIN
} from './mutation-types.js'
import getters from './getters'
const state = {
  token: ''
}

const mutations = {
  [LOGIN] (state, res) {
    this.state.token = res
  }
}

export default {
  state,
  mutations,
  getters
}
