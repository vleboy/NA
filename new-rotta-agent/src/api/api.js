import baseUrl from './api-config'
export default {
  getCode: `${baseUrl.zues}/${baseUrl.type}/captcha`, // 获取验证码
  agentLogin: `${baseUrl.hulk}/${baseUrl.type}/agentLogin` // 登录
}
