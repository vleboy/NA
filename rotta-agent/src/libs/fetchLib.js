import Vue from 'vue'
import router from '@/router'
import api from '@/api/api'
import axios from 'axios'
import store from '@/store/store'
import { Message } from 'element-ui'
export const invoke = async (cfg) => {
  const token = store.state.variable.token
  const param = {
    data: cfg.data ? cfg.data : {},
    method: cfg.method,
    url: cfg.url
  }
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
    if (!e.response) {
      store.state.variable.isloading = false
      Message.warning('您的网络不稳定,请重试')
    } else {
      if (e.response.data.err.msg && e.response.data.code != 90001) {
        store.state.variable.isloading = false
        Message.warning(e.response.data.err.msg)
      }
      if (e.response.data.code == 90001) {
        router.push('login')
        store.state.variable.islogin = false
        store.state.variable.isloading = false
        store.state.variable.visitedViews = []
        store.state.variable.activeIndex = null
        store.state.variable.tabIndex = null
        localStorage.clear()
        Message.warning('您的Token已过期,请重新登录')
      }
    }
    return [e.response.data.err, 0]
  }  
}
