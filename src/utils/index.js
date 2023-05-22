export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  })).join('&')
}

export function getQueryStringArgs() {
  const qs = (location.search.length > 0 ? location.search.substring(1) : '')
  const args = {}
  const items = qs.length ? qs.split('&') : []
  let item = null
  let name = null
  let value = null
  const len = items.length
  for (let i = 0; i < len; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

// 格式化持续的秒数
export function parseDurationSecond(second) {
  var str = ''
  if (second) {
    var duration = new Date(second)
    var days = duration / 60 / 60 / 24
    var daysRound = Math.floor(days)
    var hours = duration / 60 / 60 - (24 * daysRound)
    var hoursRound = Math.floor(hours)
    var minutes = duration / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
    var minutesRound = Math.floor(minutes)
    var seconds = duration - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)
    if (daysRound > 0) {
      str += daysRound + '天'
    }
    if (hoursRound > 0) {
      str += hoursRound + '小时'
    }
    if (minutesRound > 0) {
      str += minutesRound + '分'
    }
    if (seconds >= 0) {
      str += seconds + '秒'
    }
  }
  return str
}

/**
 * 将时间戳转换为时分秒
 */
export function parseTimeToHHmmss(data) {
  let str = ''
  let hours = parseInt((data % (60 * 60 * 24)) / (60 * 60))
  let minutes = parseInt((data % (60 * 60)) / (60))
  let seconds = parseInt(data % 60)
  hours = hours.toString().padStart(2, '0')
  minutes = minutes.toString().padStart(2, '0')
  seconds = seconds.toString().padStart(2, '0')
  str = hours + ':' + minutes + ':' + seconds
  return str
}
/**
 * 将时间戳转换为时分秒
 */
export function parseTimeStampToHHmmss(data) {
  let str = ''
  const days = Math.floor(data / (24 * 3600 * 1000))
  // 计算出小时数
  const leave1 = data % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  let hours = days * 24 + Math.floor(leave1 / (3600 * 1000))

  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))

  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000)
  hours = hours.toString().padStart(2, '0')
  minutes = minutes.toString().padStart(2, '0')
  seconds = seconds.toString().padStart(2, '0')
  str = hours + ':' + minutes + ':' + seconds
  return str
}

/**
 * 数组对象升序排序
 */
export function compareUp(propertyName) { // 升序排序
  if (typeof propertyName !== 'number') { // 属性值为非数字
    return function(object1, object2) {
      const value1 = object1[propertyName]
      const value2 = object2[propertyName]
      return value1.localeCompare(value2)
    }
  } else {
    return function(object1, object2) { // 属性值为数字
      const value1 = object1[propertyName]
      const value2 = object2[propertyName]
      return value1 - value2
    }
  }
}

/**
 * 数组对象降序排序
 */
export function compareDown(propertyName) { // 降序排序
  if (typeof propertyName !== 'number') { // 属性值为非数字
    return function(object1, object2) {
      const value1 = object1[propertyName]
      const value2 = object2[propertyName]
      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value2 - value1
      } else {
        return value2.localeCompare(value1)
      }
    }
  } else {
    return function(object1, object2) { // 属性值为数字
      const value1 = object1[propertyName]
      const value2 = object2[propertyName]
      return value2 - value1
    }
  }
}

/**
 * 替换消息文本中的空格
 * @param {String} message 消息文本
 * @param {String} sourcetype 消息来源
 */
export function replaceMsgText(message, sourcetype) {
  let newMessage = ''
  for (let i = 0; i < message.length; i++) {
    // 空格转义符为\b
    if (message.charCodeAt(i) === 32) {
      // 微信空格转义
      if (sourcetype === 3) {
        newMessage += '\b'
      } else {
        newMessage += '\t'
      }
    } else {
      newMessage += message[i]
    }
  }
  return newMessage.trim().replace(/\s+/g, '')
}

/**
 * 格式化日期按yyyy-MM-dd显示
 * timestamp: 时间戳
 * sType: 按类型显示
 */
export function formatDateByTimestamp(timestamp, sType) {
  let str = ''
  const date = new Date(timestamp)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = (date.getDate()).toString().padStart(2, '0')
  const hour = (date.getHours()).toString().padStart(2, '0')
  const minute = (date.getMinutes()).toString().padStart(2, '0')
  const second = (date.getSeconds()).toString().padStart(2, '0')
  switch (sType) {
    case 'yyyy-MM':
      str = `${date.getFullYear()}-${month}`
      break
    case 'yyyy-MM-dd hh:mm:ss':
      str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
      break
    case 'hh:mm:ss':
      str = `${hour}:${minute}:${second}`
      break
    case 'hh:mm':
      str = `${hour}:${minute}`
      break
    default:
      str = `${date.getFullYear()}-${month}-${day}`
  }
  return str
}
