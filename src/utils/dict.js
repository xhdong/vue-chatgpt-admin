// 数据字典
// 业务订单类型
export const orderTypeMap = {
  1: '机票订单',
  2: '专车订单',
  3: '酒店订单',
  4: '火车票订单',
  5: '商城订单',
  6: '活力出行金',
  12: '打车',
  99: '会员服务'
}

// 业务订单类型--和工单系统保持一致
export const orderTypeList = [
  { value: '1', label: '机票订单' },
  { value: '2', label: '火车订单' },
  { value: '3', label: '专车订单' },
  { value: '4', label: '酒店订单' },
  { value: '5', label: '咖啡订单' },
  { value: '6', label: '商城订单' },
  { value: '7', label: '证件绑定订单' },
  { value: '8', label: '在线客服' },
  { value: '9', label: '汽车票' },
  { value: '10', label: '伙力分期' },
  { value: '11', label: '延误宝订单' },
  { value: '99', label: '其他订单' }
]

// 订单模板
export const orderTemplateList = [
  { value: 1, label: '机票' },
  { value: 2, label: '专车' },
  { value: 3, label: '酒店' },
  { value: 4, label: '火车票' },
  { value: 5, label: '商城' },
  { value: 6, label: '其他订单' }
]

// 应用类型
export const appType = {
  1: '航班管家',
  2: '高铁管家',
  3: '伙力精选',
  5: '幸福减肥教',
  6: '伙力专车',
  7: '企业平台',
  8: '分销商白屏'
}

// 知识点类型
export const faqTypeList = [
  { label: '产品说明', value: 'prod' },
  { label: '业务规则', value: 'rule' },
  { label: '处理流程', value: 'deal' },
  { label: '话术技巧', value: 'talk' },
  { label: '流程引导', value: 'flow' },
  { label: '案例', value: 'case' },
  { label: '我的收藏', value: 'store' }
]

// 审核状态(测试模拟)
export const auditStatusList = [
  { label: '待初审', value: 1 },
  { label: '待终审', value: 2 },
  { label: '审核通过', value: 3 },
  { label: '审核驳回', value: 4 },
  { label: '已撤销', value: 5 }
]

// 客服角色(测试模拟)
export const userRoleList = [
  { label: '普通成员', value: 'member' },
  { label: '组长', value: 'group_leader' },
  { label: '管理员', value: 'assess_admin' }
]
// 请假类型
export const leaveTypeList = [
  { key: 1, label: '事假' },
  { key: 2, label: '病假' },
  { key: 3, label: '婚假' },
  { key: 4, label: '丧假' },
  { key: 5, label: '产假' },
  { key: 6, label: '年假' },
  { key: 7, label: '产检假' },
  { key: 8, label: '其他' },
  { key: 9, label: '陪产假' }
]
