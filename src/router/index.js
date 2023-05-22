import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/Layout/Layout'

/* Router Modules */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/Index'),
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user-manage',
        component: () => import('@/views/UserManage/Index'),
        name: 'UserManage',
        meta: {
          title: '用户管理',
          icon: 'fa fa-user',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: 'member-manage',
        component: () => import('@/views/MemberManage/Index'),
        name: 'MemberManage',
        meta: {
          title: '会员管理',
          icon: 'fa fa-user',
          noCache: true,
          affix: true
        }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export const asyncRoutes = [{ path: '*', redirect: '/404', hidden: true }]

export default router
