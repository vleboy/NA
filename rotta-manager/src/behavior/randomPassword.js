const generatePassword = require('password-generator')
export const randomPassword = function (captcha) {
  const minLength = 6
  const maxLength = 16
  let password = ''
  let randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-\.\@\#\$\%\^\&\*\(\)\+\~\!\:\{\}\;]/)
  }
  return password
} // 随机生成密码
function isStrongEnough(password) {
  const maxLength = 16
  const minLength = 6
  const uppercaseMinCount = 1
  const lowercaseMinCount = 1
  const numberMinCount = 1
  const specialMinCount = 1
  const UPPERCASE_RE = /([A-Z])/g
  const LOWERCASE_RE = /([a-z])/g
  const NUMBER_RE = /([\d])/g
  const SPECIAL_CHAR_RE = /([\?\-])/g
  const uc = password.match(UPPERCASE_RE)
  const lc = password.match(LOWERCASE_RE)
  const n = password.match(NUMBER_RE)
  const sc = password.match(SPECIAL_CHAR_RE)
  return password.length >= minLength &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount
}