import {
  LOGIN
} from './mutation-types.js'
import getters from './getters'
const state = {
  count: 1
}

const mutations = {
  [LOGIN] (state, res) {
    console.log(state, res)
  }
}

export default {
  state,
  mutations,
  getters
}
