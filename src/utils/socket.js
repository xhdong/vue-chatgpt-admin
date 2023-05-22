import { MessageBox } from 'element-ui'

const service = {
  io: { isopen: false }
}

service.io.connect = function(option) {
  if (!service.validate) {
    MessageBox.alert(
      '当前浏览器不支持来电通知，请使用新版的谷歌浏览器',
      '提示',
      {
        type: 'error',
        confirmButtonText: '确定'
      }
    )
    return
  }

  WebSocket.other_device = false
  let protocol = 'ws://'
  if (location.protocol === 'https:' || option.url.indexOf('m.133.cn') > -1) {
    protocol = 'wss://'
  }
  const socket = new WebSocket(protocol + option.url)

  const topics = {
    connection: function(data) {
      return data
    },
    error: function(data) {
      throw new Error('Unexpected error ' + data)
    },
    disconnect: function() {
      topics['myclose']()
      console.log('closed')
    },
    message: function(data) {
      if (data) {
        console.log(data)
        socket.send(
          'H:1\nN:publishMessage\nS:' +
            service.sequence.getSequenceByName(data['publishMessage']) +
            '\n\n' +
            JSON.stringify(data)
        )
      }
    },
    postmessage: function(data) {
      console.log(data)
      setTimeout(function() {
        socket.send(
          'H:1\nN:' +
            data['N'] +
            '\nS:' +
            service.sequence.getSequenceByName(data['N']) +
            '\n\n' +
            JSON.stringify(data['args'])
        )
      }, 0)
    }
  }

  function emitter(functionName, argumentsObj, callback) {
    if (!topics[functionName]) {
      return {
        result: false,
        content: 'No have this function,function name:' + functionName
      }
    }
    try {
      setTimeout(function() {
        if (typeof callback === 'function' && argumentsObj['N']) {
          topics[argumentsObj['N']] = callback
        }
        topics[functionName](argumentsObj)
        delete service.DataStream[functionName]
      }, 0)
    } catch (err) {
      return {
        result: false,
        content: 'function run error'
      }
    }
    return {
      result: true,
      content: 'function run success'
    }
  }

  emitter.flush = function(funcName, argsObj) {
    if (typeof topics[funcName] !== 'function') {
      return { result: true, content: 'success' }
    }
    if (!service.DataStream[funcName]) {
      service.DataStream[funcName] = {}
      service.DataStream[funcName]['timer'] = setTimeout(function() {
        emitter(
          funcName,
          Object.prototype.hasOwnProperty.call(
            service.DataStream[funcName]['arg'],
            'arg'
          )
            ? service.DataStream[funcName]['arg']['arg']
            : service.DataStream[funcName]['arg']
        )
      }, 1000)
    }
    if (Object.prototype.toString.call(argsObj) === '[object Array]') {
      service.DataStream[funcName]['arg'] = { arg: argsObj }
    } else {
      service.DataStream[funcName]['arg'] = JSON.parse(
        '{"' + argsObj['personId'] + '":"' + argsObj['code'] + '"}'
      )
    }
    return { result: true, content: 'success' }
  }

  socket.onopen = function() {
    service.io.isopen = true
    topics['connection']()
  }
  socket.onmessage = function(evt) {
    if (!evt.data) {
      return
    }
    const con = service.analysisStr(evt.data)
    if (con.length === 0) {
      return
    } else {
      const run = emitter(
        con['N'],
        JSON.parse(con['args'] === '' ? '{"C":"2000"}' : con['args'])
      )
      if (!run.result) {
        throw new Error(run.content)
      }
    }
  }

  socket.onerror = function(data) {
    emitter('error', data)
  }
  socket.onclose = function(data) {
    emitter('disconnect', data)
  }

  return {
    on: function(functionName, functionBody) {
      if (!topics[functionName]) {
        topics[functionName] = null
      }
      topics[functionName] = functionBody
    },
    emit: function(content, callback) {
      if (socket && service.io.isopen) {
        if (!content.isContinuous) {
          // 如果连续触发则说明有人故意为之。
          if (service.funcPool.isContinuous(content.N)) {
            return
          }
        }
        try {
          emitter('postmessage', content, callback)
        } catch (err) {
          throw new Error(
            'Send Error,please check socket setting,errorMessage:' + err.message
          )
        }
      }
    },
    close: function() {
      socket.close()
    },
    send: function(content) {
      emitter('message', content)
    },
    getSocket: function() {
      return socket
    },
    sendSingal: function(msg) {
      if (socket && socket.readyState === socket.OPEN) {
        socket.send(msg)
      } else if (!WebSocket.other_device) {
        MessageBox.alert(
          '你已与服务器断开连接，请检查网络或联系管理员',
          '提示',
          {
            type: 'error',
            confirmButtonText: '确定',
            callback: action => {
              location.href = location.origin
            }
          }
        )
      }
    }
  }
}

// 判断浏览器是否支持websocket
service.validate = function() {
  return window.WebSocket || window.MozWebSocket
}

// 解析字符串
service.analysisStr = function(str) {
  const temp = str.split(/\n+/g)
  const obj = {}
  temp.forEach(function(x) {
    if (x.indexOf(':') === 1) {
      const kv = x.split(':')
      obj[kv[0]] = kv[1]
    } else {
      obj['args'] = x
    }
  })
  obj.length = temp.length
  return obj
}

// 限流
service.funcPool = {
  isContinuous: function(name) {
    let isCon = false
    if (name in this && Date.now() - this[name] < 1000) {
      isCon = true
    }
    this[name] = Date.now()
    return isCon
  }
}

// 序列
service.sequence = {
  getSequenceByName(name) {
    if (!this[name]) {
      this[name] = 1
    }
    return this[name]++
  }
}

// 数据
service.DataStream = {}

export default service
