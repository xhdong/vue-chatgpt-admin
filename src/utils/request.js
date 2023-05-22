import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  // baseURL: '', // api的base_url
  timeout: 20000, // 请求超时时间
  withCredentials: true, // 表示跨域请求时是否需要使用凭证
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改

      // 多用户处理
      const cookiesToken = getToken()
      if (cookiesToken && store.getters.token !== cookiesToken) {
        Message({
          message: '本机已登录其他账号，请登出当前账号',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.rspCode && res.rspCode !== '000000') {
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + '：' + error.message + '：' + error.config.url) // for debug
    // Message({
    //   message: error.message + '：' + error.config.url,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
