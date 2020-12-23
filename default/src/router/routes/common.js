/**
 * 路由页面配置
 * meta 标签配置
 * @param {String} title 网站标题
 * @param {String} requireAuth 是否需要登录
 *
 **/
const common = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login', requireAuth: false },
    component: () => import('@view/common/login.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404', requireAuth: false },
    component: () => import('@view/common/page404.vue')
  },
  {
    path: '/500',
    name: '500',
    meta: { title: '500', requireAuth: false },
    component: () => import('@view/common/page500.vue')
  }
]
export default common
