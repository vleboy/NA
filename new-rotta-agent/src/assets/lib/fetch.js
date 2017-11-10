import axios from 'axios'
require('es6-promise').polyfill()

export const Axios = axios.create({
  timeout: 10000,
  headers: {
    Authorization: ''
  }
})
// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'JWT ' + localStorage.token
  }
  return config
}, error => {
  alert('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  // 对响应数据做些事
  if (!res.data.code) {
    alert(res.error_msg)
    return Promise.reject(res)
  }
  return res
}, error => {
  // if (error.response.status === 401) {
  // // 401 说明 token 验证失败
  // // 可以直接跳转到登录页面，重新登录获取 token
  //   location.href = '/login'
  // } else {
  // // do something
  // }
  // 返回response里的错误信息
  return Promise.reject(error)
})

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
