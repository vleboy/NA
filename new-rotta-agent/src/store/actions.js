import * as types from './mutation-types.js'
import api from '@/api/api'
import { Axios } from 'assets/lib/fetch'
import { Message } from 'element-ui'
export default {
  login: ({commit}, userInfo) => {
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
  navbar: ({commit}) => {
    Axios({
      method: 'get',
      url: 'static/data/navbar.json'
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      Message.error(error.response.data.err.msg)
    })
  }
}
