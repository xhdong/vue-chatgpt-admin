import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getList(data) {
  return request({
    url: '/chatgpt-user/list',
    method: 'POST',
    data
  })
}
// 禁用用户
export function disabledUser(id) {
  return request({
    url: '/chatgpt-user/disabled',
    method: 'POST',
    data: { id }
  })
}

// 查询用户充值记录
export function queryRecharge(userId) {
  return request({
    url: '/chatgpt-user/recharge/history',
    method: 'GET',
    params: { userId }
  })
}
