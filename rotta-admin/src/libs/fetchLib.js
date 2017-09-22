// import { ZEUS_GATEWAY } from './fetchConfig'
import api from '@/api/api'
import axios from 'axios'
import store from '@/store/store'
export const invoke = async (cfg) => {
  const token = store.state.variable.token
  const param = {
    data: cfg.data ? cfg.data : {},
    method: cfg.method,
    url: cfg.url
  }
  // console.log('发送请求时的token为', token)
  const requestConfig = {
    baseURL: api,
    headers: {
      Authorization: `Bearer ${token}`
    },
    ...param
  }
  try {
    const response = await axios.request(requestConfig)
    return [0, response]
  } catch (e) {
    return [e.response.data.err, 0]
  }
}
