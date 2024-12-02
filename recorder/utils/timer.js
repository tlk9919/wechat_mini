var sec = 0 // 记录已过去的秒数
var timer = null //存储 setInterval 返回的定时器 ID。用于在重置或暂停时清除定时器
var pause = false// 记录计时器是否处于暂停状态
var callback = null// 存储外部传入的回调函数，用于定时更新

function formatTime(value) {
  var h = parseInt(value / 60 / 60 % 24)  // 计算小时数
  h = h < 10 ? '0' + h : h  // 小于 10 时补充前导零
  var m = parseInt(value / 60 % 60)  // 计算分钟数
  m = m < 10 ? '0' + m : m  // 小于 10 时补充前导零
  var s = parseInt(value % 60)  // 计算秒数
  s = s < 10 ? '0' + s : s  // 小于 10 时补充前导零
  return h + ':' + m + ':' + s  // 返回格式化后的时间字符串
}

function createTimer() {
  return setInterval(() => {
    if (!pause) {
      ++sec// 如果没有暂停，秒数递增
    }
    //如果有传入的回调函数 callback，它会调用这个回调，并传递格式化后的时间（通过 formatTime(sec) 转换的时间）。
    callback && callback(formatTime(sec)) // 如果存在回调函数，调用回调并传递格式化后的时间
  }, 1000)// 每 1000 毫秒（1 秒）执行一次
}

module.exports = {
  onTimeUpdate(cb) {
    callback = cb//将外部传入的回调函数保存到 callback 变量中。
  },
  start() {
    if (pause) {
      pause = false
    }
    if (!timer) {
      timer = createTimer()
    }
  },
  pause() {
    pause = true
  },
  reset() {
    sec = 0
    pause = false
    clearInterval(timer)
    timer = null
  }
}