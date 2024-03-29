import dateformat from 'dateformat'
// export const formatBalance = function (str) {
//   var newStr = new Array(str.length + parseInt(str.length / 3))
//   var strArray = str.split('')
//   newStr[newStr.length - 1] = strArray[strArray.length - 1]
//   var currentIndex = strArray.length - 1
//   for (var index = newStr.length - 1; index >= 0; index--) {
//     if ((newStr.length - index) % 4 === 0) {
//       newStr[index] = ','
//     } else {
//       newStr[index] = strArray[currentIndex--]
//     }
//   }
//   return newStr.join('')
//   // points = points.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('')
//   // return points
// } // 格式化余额

export const simpleTime = function (time) {
  time = dateformat(time, 'isoDate')
  return time
} // 返回YYYY-MM-DD

export const detailTime = function (time) {
  time = dateformat(time, 'isoDateTime')
  time = time.split('T')
  var a = time[0]
  var b = time[1].slice(0, 8)
  return a + ' ' + b
} // 返回YYYY-MM-DD : HH-MM-SS

export const formatStatus = function (status) {
  var sub = ''
  if (status === 0) {
    sub = '已锁定'
  } else {
    sub = '正常'
  }
  return sub
} // 格式化用户状态

export const formatContractPeriod = function (time) {
  if (time === 0) {
    time = '永久生效'
  } else if (time instanceof Array) {
    var a = time[0]
    var b = time[1]
    a = dateformat(a, 'isoDate')
    b = dateformat(b, 'isoDate')
    time = a + ' 至 ' + b
  }
  return time
} // 格式化合同有效时间

export const formatGamelist = function (arr) {
  if (arr === '' || arr.length === 0) {
    arr = ''
  } else {
    for (var i = 0; i < arr.length; i++) {
      arr = arr.push(arr[i].name)
    }
  }
  return arr
} // 格式化合同有效时间

export const billType = function (type) {
  var str = ''
  if (type === 1) {
    str = '存点'
  } else {
    str = '提点'
  }
  return str
} // 格式化交易类型

export const formatPoints = function (points) {
  if (!points) {
    return '0.00'
  } else {
    if (Number(points) < 0) {
      points = Math.abs(points)
      points = points.toString()
      if (/[^0-9\.]/.test(points)) {
        return '0.00';
      }
      points = points.replace(/^(\d*)$/, "$1.");
      points = (points + "00").replace(/(\d*\.\d\d)\d*/, "$1");
      points = points.replace(".", ",");
      var re = /(\d)(\d{3},)/;
      while (re.test(points)) {
          points = points.replace(re, "$1,$2");
      }
      points = points.replace(/,(\d\d)$/, ".$1");
      return '-' + points
    } else {
      points = points.toString()
      if (/[^0-9\.]/.test(points)) {
        return '0.00';
      }
      points = points.replace(/^(\d*)$/, "$1.");
      points = (points + "00").replace(/(\d*\.\d\d)\d*/, "$1");
      points = points.replace(".", ",");
      var re = /(\d)(\d{3},)/;
      while (re.test(points)) {
          points = points.replace(re, "$1,$2");
      }
      points = points.replace(/,(\d\d)$/, ".$1");
      return points
    }
  }
} // 格式化点数

export const formatRemark = function (remark) {
  if (remark === 'NULL!' || remark === null) {
    remark = '无'
  }
  return remark
} // 格式化备注

export const formatUsername = function (name) {
  if (!name) {
    return
  } else {
    return name.split('_')[1]
  }
} // 格式化用户名

export const formatUserName = function (data) {
  const name = data.split('_')
  return `【${name[0]}】${name[1]}`
} // 将用户名格式化为【XXX】XXX格式

export const formatMSN = function (msn) {
  return ((parseFloat(msn) * 0.001).toFixed(3) + '').substring(2)
} // 格式化用户名

export const thousandFormatter = function (num) {
  num = (num-0).toFixed(2);
  let toString = num.toString()
  let numOne = ''
  let numTwo = ''
  let formatterNum = ''
  if(toString.indexOf('.')>-1){
    [numOne,numTwo] = toString.split('.')
  }
  formatterNum = (numOne || num).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return numTwo ? `${formatterNum}.${numTwo}` : `${formatterNum}.00`
} // 重置千位符

export const formatMillisecond = function (mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24))
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = (mss % (1000 * 60)) / 1000
  return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
}
