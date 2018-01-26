export const getWeek = function () {
    //按周日为一周的最后一天计算
    let date = new Date()
    //今天是这周的第几天
    let today = date.getDay()
    //上周日距离今天的天数（负数表示）
    let stepSunDay = -today + 1
    // 如果今天是周日
    if (today == 0) {
      stepSunDay = -7
    }
    let startTime = ''
    let endTime = ''
    let time = date.getTime()
    startTime = new Date(time + stepSunDay * 24 * 3600 * 1000).setHours(0, 0, 0, 0)
    // endTime = new Date(time + stepSunDay * 24 * 3600 * 1000).setHours(0, 0, 0, 0) + (7 * 24 * 3600 * 1000 - 1)
    endTime = new Date().getTime() - 180000
    return [startTime, endTime]
  } // 处理周次