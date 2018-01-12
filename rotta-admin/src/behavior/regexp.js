import {invoke} from '@/libs/fetchLib'
import api from '@/api/api'
import store from '@/store/store'

// export const checkUsername = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/) // 检查用户名正则

// export const checkPassword = function passwordLevel (password) {
//   var Modes = 0
//   for (let i = 0; i < password.length; i++) {
//     Modes |= CharMode(password.charCodeAt(i))
//   }
//   return bitTotal(Modes)
//   // CharMode函数
//   function CharMode (iN) {
//     if (iN >= 48 && iN <= 57) {
//       return 1
//     } // 数字
//     if (iN >= 65 && iN <= 90) {
//       return 2
//     } // 大小写
//     if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
//       return 4
//     } else {
//       return 8
//     } // 特殊字符
//   }
//   // bitTotal函数
//   function bitTotal (num) {
//     let modes = 0
//     for (let i = 0; i < 4; i++) {
//       if (num & 1) modes++
//       num >>>= 1
//     }
//     return modes
//   }
// } // 检查密码正则
export const pattern = {
  positiveInteger: new RegExp(/^[0-9]*[1-9][0-9]*$/),  // 正整数
  url: new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/), // url验证
  digitalRange : new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/), // 数字范围验证 （0.00-100.00）
  positive : new RegExp(/^[0-9]+([.]{1}[0-9]{1,2})?$/) // 正数，保留两位小数点
}
// export const checkUsername = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/) // 检查用户名正则
export const checkUsername = (rule, value, callback) => {
  var username = new RegExp(/^[A-Za-z0-9]+$/)
  if (value === '') {
    callback(new Error('用户名不能为空'))
    store.state.checkform.username = false
  } else if (value.length < 5) {
    callback(new Error('用户名不能少于5位'))
    store.state.checkform.username = false
  } else if (value.length > 16) {
    callback(new Error('用户名不能多于16位'))
    store.state.checkform.username = false
  } else if (!username.exec(value)) {
    callback(new Error('用户名只能输入英文、数字'))
    store.state.checkform.username = false
  } else {
    value = value.trim()
    store.state.checkform.username = true
    callback()
  }
} // 验证用户名

export const checkPassword = (rule, value, callback) => {
  var password = function passwordLevel (password) {
    var Modes = 0
    for (let i = 0; i < password.length; i++) {
      Modes |= CharMode(password.charCodeAt(i))
    }
    return bitTotal(Modes)
    // CharMode函数
    function CharMode (iN) {
      if (iN >= 48 && iN <= 57) {
        return 1
      } // 数字
      if (iN >= 65 && iN <= 90) {
        return 2
      } // 大小写
      if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
        return 4
      } else {
        return 8
      } // 特殊字符
    }
    // bitTotal函数
    function bitTotal (num) {
      let modes = 0
      for (let i = 0; i < 4; i++) {
        if (num & 1) modes++
        num >>>= 1
      }
      return modes
    }
  }
  if (value === '') {
    callback(new Error('密码不能为空'))
    store.state.checkform.password = false
  } else if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
    store.state.checkform.password = false
  } else if (value.length > 16) {
    callback(new Error('密码不能多于16位'))
    store.state.checkform.password = false
  } else {
    var x = password(value)
    if (x < 3) {
      callback(new Error('密码中必须包含大写字母、小写字母、数字、符号，中任意三种的组合'))
      store.state.checkform.password = false
    } else {
      value = value.trim()
      store.state.checkform.password = true
      callback()
    }
  }
} // 验证密码

export const checkCaptcha = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else {
    value = value.trim()
    callback()
  }
} // 验证验证码

export const checkSuffix = (rule, value, callback) => {
  var str = new RegExp(/^[a-zA-Z]/)
  // var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
  var suffix = new RegExp(/^[a-zA-Z]{1}[a-zA-z0-9]{1,5}$/)
  if (value === '') {
    callback(new Error('请输入商户简称'))
    store.state.checkform.suffix = false
  } else if (!str.exec(value.slice(0, 1))) {
    callback(new Error('简称必须以字母开头'))
    store.state.checkform.suffix = false
  } else if (value.length > 6) {
    callback(new Error('简称长度不能超过6位'))
    store.state.checkform.suffix = false
  } else if (value.length < 2) {
    callback(new Error('简称长度不能少于2位'))
    store.state.checkform.suffix = false
  } else if (!suffix.exec(value)) {
    callback(new Error('简称只能输入英文、数字'))
    store.state.checkform.suffix = false
  } else {
    if (store.state.variable.nowIndex === 'outcreate') {
      var manager = {
        suffix:{
          role: '10',
          suffix: value,
          username: '0'
        }
      }
      invoke({
        url: api.checkExist,
        method: api.post,
        data: manager
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var suffixStatus = ret.data.payload
            // console.log('标识状态为', suffixStatus)
            if (suffixStatus === false) {
              callback(new Error('该简称已存在'))
              store.state.checkform.suffix = false
            } else {
              store.state.checkform.suffix = true
              callback()
            }
          }
        }
      )
    } else if (store.state.variable.nowIndex === 'comcreate') {
      var merchant = {
        suffix: {
          role: '100',
          suffix: value,
          username: '0'
        }
      }
      invoke({
        url: api.checkExist,
        method: api.post,
        data: merchant
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var suffixStatus = ret.data.payload
            // console.log('标识状态为', suffixStatus)
            if (suffixStatus === false) {
              callback(new Error('该简称已存在'))
              store.state.checkform.suffix = false
            } else {
              store.state.checkform.suffix = true
              callback()
            }
          }
        }
      )
    }
  }
} // 验证商户简称

export const checkDisplayname = (rule, value, callback) => {
  var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
  if (value === '') {
    callback(new Error('请输入昵称'))
    store.state.checkform.displayName = false
  } else if (value.length < 2 || value.length > 10) {
    callback(new Error('昵称的长度应在2-10位之间'))
    store.state.checkform.displayName = false
  } else if (!nick.exec(value)) {
    callback(new Error('昵称只能输入中文、英文、数字'))
    store.state.checkform.displayName = false
  } else {
    store.state.checkform.displayName = false
    var data = {
      nick: {
        role: '',
        displayName: ''
      }
    }
    if (store.state.variable.nowIndex === 'outcreate') {
      data.nick.role = '10'
      data.nick.displayName = value
    } else if (store.state.variable.nowIndex === 'comcreate') {
      data.nick.role = '100'
      data.nick.displayName = value
    }
    invoke({
      url: api.checkExist,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var displayNameStatus = ret.data.payload
          // console.log('昵称状态为', displayNameStatus)
          if (displayNameStatus === false) {
            callback(new Error('该昵称已存在'))
            store.state.checkform.displayName = false
          } else {
            store.state.checkform.displayName = true
            callback()
          }
        }
      }
    )
  }
} // 验证昵称

export const checksn = (rule, value, callback) => {
  var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_@]{3,5}$/)
  if (value === '') {
    callback(new Error('请输入商户标识'))
    store.state.checkform.sn = false
  } else if (value.length < 3 || value.length > 5) {
    callback(new Error('商户标识的长度应在3-5位之间'))
    store.state.checkform.sn = false
  } else if (!nick.exec(value)) {
    callback(new Error('商户标识只能输入中文、英文、数字,@和_'))
    store.state.checkform.sn = false
  } else {
    store.state.checkform.sn = false
    var data = {
      sn: {
        sn: value
      }
    }
    invoke({
      url: api.checkExist,
      method: api.post,
      data: data
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var snStatus = ret.data.payload
          if (snStatus === false) {
            callback(new Error('该商户标识已存在'))
            store.state.checkform.sn = false
          } else {
            store.state.checkform.sn = true
            callback()
          }
        }
      }
    )
  }
} // 验证sn

export const checkEmail = (rule, value, callback) => {
  var email = new RegExp(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)
  // console.log(value)
  if (value === '') {
    callback(new Error('请输入邮箱'))
    store.state.checkform.email = false
  } else if (!email.exec(value)) {
    callback(new Error('请输入正确的邮箱地址'))
    store.state.checkform.email = false
  } else {
    store.state.checkform.email = true
    callback()
  }
} // 验证邮箱

export const checkUserEmail = (rule, value, callback) => {
  var email = new RegExp(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)
  // console.log(value)
  if (value === '') {
    callback(new Error('请输入邮箱'))
    store.state.checkform.userEmail = false
  } else if (!email.exec(value)) {
    callback(new Error('请输入正确的邮箱地址'))
    store.state.checkform.userEmail = false
  } else {
    store.state.checkform.userEmail = true
    callback()
  }
} // 验证商户/线路商管理员邮箱

export const checkRate = (rule, value, callback) => {
  var num = new RegExp(/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/)
  // console.log(value)
  if (value === '') {
    callback(new Error('请输入抽成比'))
    store.state.checkform.rate = false
  } else if (!num.test(value)) {
    callback(new Error('抽成比只能为0.00 - 100.00'))
    store.state.checkform.rate = false
  } else if (value < 0 || value > 100) {
    callback(new Error('抽成比应为0~100之间的数字'))
    store.state.checkform.rate = false
  } else {
    store.state.checkform.rate = true
    callback()
  }
} // 验证抽成比

export const checkHostname = (rule, value, callback) => {
  var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z_]+$/)
  if (value === '') {
    callback(new Error('请输入负责人姓名'))
    store.state.checkform.hostName = false
  } else if (!nick.test(value)) {
    callback(new Error('负责人姓名只能输入中文、英文'))
    store.state.checkform.hostName = false
  } else if (value.length < 2 || value.length > 16) {
    callback(new Error('负责人姓名长度在2-16之间'))
    store.state.checkform.hostName = false
  } else {
    store.state.checkform.hostName = true
    callback()
  }
} // 验证负责人姓名

export const checkName = (rule, value, callback) => {
  var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z_]+$/)
  if (value === '') {
    callback(new Error('请输入姓名'))
    store.state.checkform.name = false
  } else if (value.length < 2 || value.length > 16) {
    callback(new Error('姓名的长度应在2-16位之间'))
    store.state.checkform.name = false
  } else if (!nick.test(value)) {
    callback(new Error('姓名只能输入中文、英文'))
    store.state.checkform.name = false
  } else {
    store.state.checkform.name = true
    callback()
  }
} // 验证商户/线路商管理员姓名

export const checkHostcontact = (rule, value, callback) => {
  var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
  if (value === '') {
    callback(new Error('请输入负责人联系方式'))
    store.state.checkform.hostContact = false
  } else if (!nick.exec(value)) {
    callback(new Error('负责人联系方式只能输入中文、英文、数字'))
    store.state.checkform.hostContact = false
  } else if (value.length < 5 || value.length > 40) {
    callback(new Error('负责人联系方式长度应在5-40位之间'))
    store.state.checkform.hostContact = false
  } else {
    store.state.checkform.hostContact = true
    callback()
  }
} // 验证负责人联系方式

export const checkAdmincontact = (rule, value, callback) => {
  var nick = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
  if (value === '') {
    callback(new Error('请输入管理员联系方式'))
    store.state.checkform.userContact = false
  } else if (!nick.exec(value)) {
    callback(new Error('管理员联系方式只能输入中文、英文、数字'))
    store.state.checkform.userContact = false
  } else if (value.length < 5 || value.length > 40) {
    callback(new Error('管理员联系方式长度应在5-40位之间'))
    store.state.checkform.userContact = false
  } else {
    store.state.checkform.userContact = true
    callback()
  }
} // 验证商户/线路商管理员联系方式

export const checkPoints = (rule, value, callback) => {
  var num = new RegExp(/^[0-9]/)
  if (value === '') {
    callback(new Error('请输入初始点数'))
    store.state.checkform.points = false
  } else if (!num.exec(value)) {
    callback(new Error('请输入正确的点数'))
    store.state.checkform.points = false
  } else {
    if (store.state.variable.nowIndex === 'outcreate') {
      // console.log('上级Id', store.state.variable.outcreate.parent)
      // console.log('登录用户Id', localStorage.loginId)
      var managerId = ''
      if (!store.state.variable.outcreate.parent) {
        managerId = localStorage.loginId
      } else {
        managerId = store.state.variable.outcreate.parent
      }
      invoke({
        url: api.bills + '/' + managerId,
        method: api.get
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var bills = ret.data.payload.balance
            // console.log('该账户余额', bills)
            if (value > bills) {
              callback(new Error('所属账户余额为 ' + bills + ' , 已超过最大可分配额'))
              store.state.checkform.points = false
            } else {
              store.state.checkform.points = true
              callback()
            }
          }
        }
      )
    } else if (store.state.variable.nowIndex === 'comcreate') {
      var merchantId = ''
      if (!store.state.variable.comcreate.parent) {
        merchantId = localStorage.loginId
      } else {
        merchantId = store.state.variable.comcreate.parent
      }
      invoke({
        url: api.bills + '/' + merchantId,
        method: api.get
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var bills = ret.data.payload.balance
            if (value > bills) {
              callback(new Error('所属账户余额为 ' + bills + ' , 已超过最大可分配额'))
              store.state.checkform.points = false
            } else {
              store.state.checkform.points = true
              callback()
            }
          }
        }
      )
    }
  }
} // 验证初始分配点数

export const checkLimit = (rule, value, callback) => {
  var num = new RegExp(/^[0-9]/)
  if (value === '') {
    callback(new Error('请输入可用名额'))
    store.state.checkform.limit = false
  } else if (!num.exec(value)) {
    callback(new Error('请输入正确的可放商户名额'))
    store.state.checkform.limit = false
  } else if (value > 10) {
    callback(new Error('最大可放商户名额为10'))
    store.state.checkform.limit = false
  } else {
    store.state.checkform.limit = true
    callback()
  }
} // 验证昵称

export const checkLoginWhiteList = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入白名单'))
    store.state.checkform.loginWhitelist = false
  } else {
    var ip = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
    value = value.replace(/[\r\n]/g, '')
    value = value.split(';')
    for (var i = value.length - 1; i >= 0; i--) {
      if (!ip.exec(value[i])) {
        store.state.checkform.loginWhitelist = false
        callback(new Error('请输入正确的白名单'))
      } else {
        store.state.checkform.loginWhitelist = true
        callback()
      }
    }
  }
} // 验证商户白名单

export const checkMSN = (rule, value, callback) => {
  var num = new RegExp(/^[0-9]/)
  if (value === '') {
    callback(new Error('请输入线路号'))
    store.state.checkform.msn = false
  } else if (value && value.slice(0, 3).toString() === '000') {
    callback(new Error('线路号格式错误'))
    store.state.checkform.msn = false
  } else if (value > 999 || value < 1) {
    callback(new Error('线路号的范围在1~999之间'))
    store.state.checkform.msn = false
  } else if (!num.exec(value)) {
    callback(new Error('请输入正确的线路号'))
    store.state.checkform.msn = false
  } else {
    invoke({
      url: api.checkMSN + '/' + value,
      method: api.get
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var data = ret.data.payload.avalible
          if (data === false) {
            callback(new Error('该线路号已注册或已停用'))
            store.state.checkform.msn = false
          } else {
            store.state.checkform.msn = true
            callback()
          }
        }
      }
    )
  }
} // 验证商户线路号

export const checkURL = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入域名'))
    store.state.checkform.frontURL = false
  } else {
    store.state.checkform.frontURL = true
    callback()
  }
} // 验证前端域名

export const checkContractPeriod = (rule, value, callback) => {
  if (value === 0) {
    store.state.checkform.contractPeriod = true
    callback()
  } else if (value[0] === null || value[1] === null) {
    store.state.checkform.contractPeriod = false
    callback(new Error('请选择合同生效时间'))
  } else if (value[0] !== null || value[1] !== null) {
    store.state.checkform.contractPeriod = true
    callback()
  }
} // 验证合同有效时间
