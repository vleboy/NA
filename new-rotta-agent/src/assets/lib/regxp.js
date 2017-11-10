/**
 * 正则表达式
 * 变量名统一以 `regxp${变量名}` 的形式命名
 */
export const regxpAccount = /^\w+$/ // 只能由英文、数字、下划线组成
export const regxpPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/ // 只能由英文和数字组成
export const regxpCode = /^\d{4}$/ // 只能输入4位数字
