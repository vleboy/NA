/**
 * 统一封装表单校验
 * 函数名统一以 `regxp${函数名}` 的形式命名
 */
import * as rules from './regxp'
// 常用校验方法
const regxp = (rule, value, callback, errmsg) => rule.test(value) === true ? callback() : callback(new Error(errmsg))
export default {
  // 校验登录账号
  regxpAccount: (rule, value, callback) => regxp(rules.regxpAccount, value, callback, '只能由英文、数字、下划线组成'),
  // 校验登录密码
  regxpPassword: (rule, value, callback) => regxp(rules.regxpPassword, value, callback, '只能由英文和数字组成'),
  // 校验验证码
  regxpCode: (rule, value, callback) => regxp(rules.regxpCode, value, callback, '只能输入4位数字')
}
