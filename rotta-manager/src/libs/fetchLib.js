// import { ZEUS_GATEWAY } from './fetchConfig'
import api from '@/api/api'
import axios from 'axios'
import store from '@/store/store'
import { Message } from 'element-ui'
export const invoke = async (cfg) => {
  const token = store.state.variable.token
  // console.log('发送请求时的token为', token)
  const requestConfig = {
    baseURL: api,
    headers: {
      Authorization: `Bearer ${token}`
    },
    ...cfg
  }
  try {
    const response = await axios.request(requestConfig)
    return [0, response]
  } catch (e) {
    if (!e.response) {
      store.state.variable.islogin = false
      store.state.variable.isloading = false
      localStorage.clear()
      Message.warning('您的Token已过期,请重新登录！')
    }
    return [e.response.data.err, 0]
  }
}
