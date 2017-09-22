export const canvas = function (captcha) {
  // console.log(captcha, 'captcha')
  let str = captcha || '获取验证码'
    // 绘制验证码
  var drawPic = () => {
    var canvas = document.getElementById('canvasCode')
    // console.log(canvas)
    var width = canvas.width
    var height = canvas.height
    var ctx = canvas.getContext('2d')
    ctx.textBaseline = 'bottom'
    // 绘制背景色
    ctx.fillStyle = randomColor(180, 240) // 颜色若太深可能导致看不清
    ctx.fillRect(0, 0, width, height)
    if (str === '获取验证码') {
      // 绘制文字
      for (var o = 0; o < 5; o++) {
        var txt1 = Array.from(str.toString())[o]
        ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
        ctx.font = 20 + 'px SimHei' // 随机生成字体大小
        var x1 = 10 + o * 25
        var y1 = randomNum(25, 45)
        var deg1 = randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x1, y1)
        ctx.rotate(deg1 * Math.PI / 180)
        ctx.fillText(txt1, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg1 * Math.PI / 180)
        ctx.translate(-x1, -y1)
      }
    } else {
      // 绘制文字
      for (var i = 0; i < 4; i++) {
        var txt = Array.from(str.toString())[i]
        ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
        ctx.font = randomNum(15, 40) + 'px SimHei' // 随机生成字体大小
        var x = 10 + i * 25
        var y = randomNum(25, 45)
        var deg = randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      }
        // 绘制干扰线
      for (var k = 0; k < 4; k++) {
        ctx.strokeStyle = randomColor(40, 180)
        ctx.beginPath()
        ctx.moveTo(randomNum(0, width), randomNum(0, height))
        ctx.lineTo(randomNum(0, width), randomNum(0, height))
        ctx.stroke()
      }
        // 绘制干扰点
      for (var j = 0; j < 50; j++) {
        ctx.fillStyle = randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
  function randomNum (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  /** 生成一个随机色 **/
  function randomColor (min, max) {
    var r = randomNum(min, max)
    var g = randomNum(min, max)
    var b = randomNum(min, max)
    return 'rgb(' + r + ' , ' + g + ' , ' + b + ')'
  }
  drawPic()
} // 绘制验证码
