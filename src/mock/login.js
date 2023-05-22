const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
const testUser = {
  data: {
    id: null,
    sysCode: null,
    bizUserid: '3110',
    loginname: 'chenyiy@133.cn',
    loginpwd: null,
    salt: null,
    username: '陈翌阳',
    nickname: null,
    avatar: null,
    email: null,
    qq: null,
    weixin: null,
    phone: null,
    gender: null,
    intro: null,
    remark: null,
    status: null,
    regtime: null,
    logintime: null,
    logouttime: null,
    fbiUserid: null,
    fbiLoginname: null,
    fbiLoginpwd: null,
    createby: null,
    updateby: null,
    createtime: null,
    updatetime: null,
    roles: ['faq-admin', 'skill_admin'],
    permissions: [
      'faq:add',
      'skill:project',
      'skill:course',
      'faq:update',
      'faq:delete',
      'myspace:audit'
    ],
    systems: null,
    orgs: [],
    ssoPwdValidate: null,
    operatorId: 3110,
    backurl: null
  },
  rspCode: 0,
  rspMsg: ''
}
export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return { data: userMap[username], rspCode: '000000' }
  },
  getUserInfo: config => {
    return testUser
  },
  logout: () => 'success'
}
