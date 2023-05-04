/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: '/manage',
  name: '管理',
  meta: {
    title: '管理',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: '/manage/user',
      component: () => import('@/views/abtest/manage'),
      name: 'User',
      meta: {
        title: '企业管理',
        roles: ['admin']
      }
    }
  ]
}
export default manageRouter
