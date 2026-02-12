/**
 * ec-ui 通用工具函数
 */

/**
 * 获取系统信息
 */
function getSystemInfo() {
  try {
    return wx.getSystemInfoSync()
  } catch (e) {
    return {}
  }
}

/**
 * 防抖
 */
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流
 */
function throttle(fn, delay = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

/**
 * rpx 转 px
 */
function rpx2px(rpx) {
  const sys = getSystemInfo()
  return (rpx / 750) * (sys.windowWidth || 375)
}

module.exports = {
  getSystemInfo,
  debounce,
  throttle,
  rpx2px
}
